/**
 * Cartoon soundtrack + sound effects, synthesised live with the Web Audio API.
 * No audio files: every theme is a tiny 4-bar loop played by a look-ahead
 * sequencer, so there is nothing to download or license.
 *
 * Browsers only allow audio after a user gesture, so nothing starts until the
 * first tap/click/keypress. Everything goes through a compressor at a low
 * master level so it stays background music, not a jingle.
 */

export type ThemeId = 'home' | 'mon' | 'sat' | 'sun' | 'results'

type Note = number | null
interface Theme {
  bpm: number
  /** Delay applied to off-beat 8ths, as a fraction of a step (0 = straight). */
  swing: number
  /** One chord per bar (MIDI notes). */
  chords: number[][]
  /** 8 steps per bar, 32 steps total. */
  melody: Note[]
  bass: Note[]
  /** Which steps of each bar play the chord. */
  comp: number[]
  lead: 'glock' | 'pizz' | 'steel' | 'koto' | 'brass'
  chord: 'uke' | 'stab' | 'skank' | 'koto' | 'brass'
  drums: { kick: number[]; snare: number[]; hat: number[]; extra?: 'clock' | 'taiko' | 'shaker' }
}

const _ = null

const THEMES: Record<ThemeId, Theme> = {
  // Bouncy ukulele + glockenspiel, C major, I–vi–IV–V.
  home: {
    bpm: 108,
    swing: 0.12,
    chords: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]],
    melody: [72, _, 76, _, 79, 77, 76, _, 76, _, 72, _, 74, 72, 69, _, 69, _, 72, _, 77, 76, 74, _, 74, _, 71, _, 74, _, 79, _],
    bass: [48, _, _, _, 55, _, _, _, 45, _, _, _, 52, _, _, _, 41, _, _, _, 48, _, _, _, 43, _, _, _, 50, _, 47, _],
    comp: [0, 3, 4, 6],
    lead: 'glock',
    chord: 'uke',
    drums: { kick: [0, 4], snare: [2, 6], hat: [1, 3, 5, 7] },
  },
  // Monday: swingy walking bass, pizzicato "typing" melody, clock ticks.
  mon: {
    bpm: 124,
    swing: 0.3,
    chords: [[53, 57, 60, 64], [50, 53, 57, 60], [55, 58, 62, 65], [48, 52, 55, 58]],
    melody: [72, 74, 76, _, 72, _, 69, _, 74, _, 77, 74, 72, _, 69, _, 70, 72, 74, _, 77, _, 74, _, 72, _, 70, 67, 64, _, 67, _],
    bass: [41, _, 45, _, 48, _, 50, _, 38, _, 41, _, 45, _, 43, _, 43, _, 46, _, 50, _, 47, _, 36, _, 40, _, 43, _, 40, _],
    comp: [1, 5],
    lead: 'pizz',
    chord: 'stab',
    drums: { kick: [0, 4], snare: [2, 6], hat: [0, 2, 4, 6], extra: 'clock' },
  },
  // Saturday: tropical steel drum over an off-beat skank, G major.
  sat: {
    bpm: 100,
    swing: 0.08,
    chords: [[55, 59, 62], [52, 55, 60], [55, 59, 62], [54, 57, 62]],
    melody: [79, _, 76, 79, _, 81, 79, _, 76, _, 72, _, 74, 76, _, _, 74, _, 71, 74, _, 76, 74, _, 74, 72, 71, _, 69, _, 67, _],
    bass: [43, _, _, 43, _, 50, _, _, 48, _, _, 48, _, 43, _, _, 43, _, _, 43, _, 50, _, _, 50, _, _, 50, _, 45, _, _],
    comp: [1, 3, 5, 7],
    lead: 'steel',
    chord: 'skank',
    drums: { kick: [0, 4], snare: [4], hat: [0, 1, 2, 3, 4, 5, 6, 7], extra: 'shaker' },
  },
  // Sunday in Tokyo: koto plucks on the yo scale (D E G A B), taiko and wood block.
  sun: {
    bpm: 92,
    swing: 0,
    chords: [[50, 57, 62], [52, 59, 64], [55, 62, 67], [57, 64, 69]],
    melody: [74, _, 76, 79, _, 76, 74, _, 71, _, 74, _, 76, _, _, _, 79, _, 81, 79, 76, _, 74, _, 76, 74, 71, _, 69, _, _, _],
    bass: [38, _, _, _, 45, _, _, _, 40, _, _, _, 47, _, _, _, 43, _, _, _, 50, _, _, _, 45, _, _, _, 52, _, _, _],
    comp: [0, 2, 4, 6],
    lead: 'koto',
    chord: 'koto',
    drums: { kick: [0], snare: [], hat: [6], extra: 'taiko' },
  },
  // Results: a little brass fanfare loop.
  results: {
    bpm: 126,
    swing: 0,
    chords: [[60, 64, 67], [53, 57, 60, 65], [55, 59, 62, 67], [60, 64, 67, 72]],
    melody: [72, _, 72, 76, _, 79, _, _, 77, _, 76, _, 74, _, 72, _, 74, _, 74, 77, _, 81, _, 79, 77, 76, 74, _, 72, _, _, _],
    bass: [48, _, _, 48, _, _, 55, _, 41, _, _, 41, _, _, 48, _, 43, _, _, 43, _, _, 50, _, 48, _, _, 48, _, _, 55, _],
    comp: [0, 3, 6],
    lead: 'brass',
    chord: 'brass',
    drums: { kick: [0, 3, 4], snare: [2, 6], hat: [1, 3, 5, 7] },
  },
}

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

const STORE_KEY = 'mbtix-muted'
/** Levels: background-music quiet (about -36 dB RMS), effects a touch above the music. */
const MASTER = 0.9
const MUSIC = 0.42
const SFX = 1.1

class AudioEngine {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private music!: GainNode
  private sfxBus!: GainNode
  private noise!: AudioBuffer
  private theme: ThemeId = 'home'
  private step = 0
  private nextTime = 0
  private wanted: ThemeId = 'home'
  muted = false
  private listeners = new Set<(muted: boolean) => void>()
  /** Rotates the scene-change chime so twelve doors in a row never sound identical. */
  private doorTurn = 0

  constructor() {
    try {
      this.muted = localStorage.getItem(STORE_KEY) === '1'
    } catch {
      /* storage blocked: default to sound on */
    }
    const unlock = () => {
      this.ensure()
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return
      if (document.hidden) this.ctx.suspend()
      else if (!this.muted) this.ctx.resume()
    })
  }

  /** Create the audio graph on the first user gesture. */
  private ensure() {
    if (this.ctx) return
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    this.ctx = ctx
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.ratio.value = 4
    this.master = ctx.createGain()
    this.master.gain.value = this.muted ? 0 : MASTER
    this.music = ctx.createGain()
    this.music.gain.value = MUSIC
    this.sfxBus = ctx.createGain()
    this.sfxBus.gain.value = SFX
    this.music.connect(this.master)
    this.sfxBus.connect(this.master)
    this.master.connect(comp).connect(ctx.destination)

    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const d = this.noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1

    this.theme = this.wanted
    this.step = 0
    this.nextTime = ctx.currentTime + 0.1
    window.setInterval(() => this.schedule(), 25)
  }

  onChange(fn: (muted: boolean) => void) {
    this.listeners.add(fn)
    fn(this.muted)
  }

  toggle() {
    this.setMuted(!this.muted)
  }

  setMuted(m: boolean) {
    this.muted = m
    try {
      localStorage.setItem(STORE_KEY, m ? '1' : '0')
    } catch {
      /* ignore */
    }
    this.ensure()
    if (this.ctx) {
      const t = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(t)
      this.master.gain.setTargetAtTime(m ? 0 : MASTER, t, 0.05)
      if (!m) this.ctx.resume()
    }
    this.listeners.forEach((fn) => fn(m))
  }

  /** Crossfade to another theme at the next bar line. */
  play(id: ThemeId) {
    this.wanted = id
    if (!this.ctx || id === this.theme) return
    const t = this.ctx.currentTime
    this.music.gain.cancelScheduledValues(t)
    this.music.gain.setTargetAtTime(0, t, 0.12)
    window.setTimeout(() => {
      if (!this.ctx) return
      this.theme = this.wanted
      this.step = 0
      this.nextTime = this.ctx.currentTime + 0.05
      this.music.gain.setTargetAtTime(MUSIC, this.ctx.currentTime, 0.2)
    }, 450)
  }

  /* ───────── Sequencer ───────── */

  private schedule() {
    const ctx = this.ctx
    if (!ctx || ctx.state !== 'running') return
    const th = THEMES[this.theme]
    const stepDur = 60 / th.bpm / 2
    while (this.nextTime < ctx.currentTime + 0.12) {
      const s = this.step % 32
      const inBar = s % 8
      const bar = Math.floor(s / 8)
      const t = this.nextTime + (inBar % 2 ? th.swing * stepDur : 0)

      const m = th.melody[s]
      if (m != null) this.lead(th.lead, m, t, stepDur * 1.6)
      const b = th.bass[s]
      if (b != null) this.tone('triangle', mtof(b), t, stepDur * 1.8, 0.16, 900)
      if (th.comp.includes(inBar)) this.chord(th.chord, th.chords[bar], t, stepDur)

      if (th.drums.kick.includes(inBar)) this.kick(t)
      if (th.drums.snare.includes(inBar)) this.snare(t)
      if (th.drums.hat.includes(inBar)) this.hat(t, th.drums.extra === 'shaker' ? (inBar % 2 ? 0.05 : 0.03) : 0.035)
      if (th.drums.extra === 'clock' && inBar % 2 === 1) this.block(t, 2400, 0.03)
      if (th.drums.extra === 'taiko' && (inBar === 0 || inBar === 5)) this.taiko(t)
      if (th.drums.extra === 'taiko' && inBar === 6) this.block(t, 1300, 0.06)

      this.nextTime += stepDur
      this.step++
    }
  }

  /* ───────── Instruments ───────── */

  private env(g: GainNode, t: number, peak: number, attack: number, decay: number) {
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay)
  }

  private tone(type: OscillatorType, freq: number, t: number, dur: number, peak: number, cutoff = 4000, bus?: GainNode, bend = 0) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const f = ctx.createBiquadFilter()
    const g = ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq * (bend ? Math.pow(2, bend / 12) : 1), t)
    if (bend) o.frequency.exponentialRampToValueAtTime(freq, t + 0.06)
    f.type = 'lowpass'
    f.frequency.value = cutoff
    this.env(g, t, peak, 0.008, dur)
    o.connect(f).connect(g).connect(bus ?? this.music)
    o.start(t)
    o.stop(t + dur + 0.05)
  }

  private lead(kind: Theme['lead'], m: number, t: number, dur: number) {
    const f = mtof(m)
    switch (kind) {
      case 'glock':
        this.tone('sine', f * 2, t, 0.5, 0.1)
        this.tone('sine', f * 5.04, t, 0.12, 0.02)
        break
      case 'pizz':
        this.tone('square', f, t, 0.14, 0.05, 1800)
        break
      case 'steel':
        // Steel drum: fundamental plus slightly inharmonic overtones.
        this.tone('sine', f, t, 0.45, 0.11)
        this.tone('sine', f * 2.01, t, 0.25, 0.05)
        this.tone('sine', f * 3.02, t, 0.12, 0.025)
        break
      case 'koto':
        this.tone('triangle', f, t, 0.7, 0.12, 3000, undefined, 0.6)
        this.tone('sawtooth', f * 2, t, 0.08, 0.015, 2500)
        break
      case 'brass':
        this.tone('sawtooth', f, t, dur, 0.06, 1600)
        this.tone('square', f / 2, t, dur, 0.02, 900)
        break
    }
  }

  private chord(kind: Theme['chord'], notes: number[], t: number, stepDur: number) {
    notes.forEach((n, i) => {
      const f = mtof(n)
      switch (kind) {
        case 'uke':
          this.tone('triangle', f, t + i * 0.012, 0.28, 0.05, 2600)
          break
        case 'stab':
          this.tone('square', f, t, 0.09, 0.022, 1200)
          break
        case 'skank':
          this.tone('triangle', f, t, 0.1, 0.045, 2200)
          break
        case 'koto':
          if (i === 0) this.tone('triangle', f / 2, t, stepDur * 3, 0.06, 1500)
          break
        case 'brass':
          this.tone('sawtooth', f, t, 0.22, 0.025, 1400)
          break
      }
    })
  }

  private noiseHit(t: number, dur: number, peak: number, type: BiquadFilterType, freq: number, bus?: GainNode) {
    const ctx = this.ctx!
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const f = ctx.createBiquadFilter()
    f.type = type
    f.frequency.value = freq
    const g = ctx.createGain()
    this.env(g, t, peak, 0.002, dur)
    src.connect(f).connect(g).connect(bus ?? this.music)
    src.start(t, Math.random() * 0.5)
    src.stop(t + dur + 0.05)
  }

  private kick(t: number) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.frequency.setValueAtTime(140, t)
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12)
    this.env(g, t, 0.35, 0.003, 0.18)
    o.connect(g).connect(this.music)
    o.start(t)
    o.stop(t + 0.25)
  }

  private snare(t: number) {
    this.noiseHit(t, 0.12, 0.12, 'bandpass', 1800)
  }

  private hat(t: number, peak: number) {
    this.noiseHit(t, 0.04, peak, 'highpass', 7000)
  }

  private block(t: number, freq: number, peak: number) {
    this.tone('sine', freq, t, 0.05, peak)
  }

  private taiko(t: number) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.frequency.setValueAtTime(110, t)
    o.frequency.exponentialRampToValueAtTime(55, t + 0.25)
    this.env(g, t, 0.3, 0.004, 0.35)
    o.connect(g).connect(this.music)
    o.start(t)
    o.stop(t + 0.45)
    this.noiseHit(t, 0.06, 0.05, 'lowpass', 600)
  }

  /* ───────── Sound effects ───────── */

  sfx(name: Sfx) {
    this.ensure()
    const ctx = this.ctx
    if (!ctx || this.muted) return
    const t = ctx.currentTime + 0.01
    const bus = this.sfxBus
    const blip = (freq: number, at: number, dur: number, peak: number, type: OscillatorType = 'sine', bend = 0) =>
      this.tone(type, freq, t + at, dur, peak, 5000, bus, bend)
    switch (name) {
      case 'tap':
        blip(880, 0, 0.06, 0.08)
        break
      case 'pick':
        // Bubbly "pop" upward.
        blip(523, 0, 0.08, 0.12, 'triangle')
        blip(784, 0.06, 0.08, 0.12, 'triangle')
        blip(1047, 0.12, 0.16, 0.1, 'triangle')
        break
      case 'msgIn':
        blip(988, 0, 0.07, 0.07)
        blip(1319, 0.07, 0.12, 0.07)
        break
      case 'msgOut':
        this.noiseHit(t, 0.12, 0.06, 'bandpass', 2500, bus)
        blip(1319, 0.05, 0.1, 0.06)
        break
      case 'tick':
        blip(1200, 0, 0.03, 0.05, 'square')
        break
      case 'tickUrgent':
        blip(1600, 0, 0.04, 0.08, 'square')
        break
      case 'slide':
        blip(660, 0, 0.04, 0.05, 'triangle')
        break
      case 'boing': {
        // Cartoon spring for drag-and-drop landing.
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'sine'
        o.frequency.setValueAtTime(180, t)
        o.frequency.exponentialRampToValueAtTime(520, t + 0.08)
        o.frequency.exponentialRampToValueAtTime(260, t + 0.3)
        this.env(g, t, 0.18, 0.005, 0.3)
        o.connect(g).connect(bus)
        o.start(t)
        o.stop(t + 0.4)
        break
      }
      case 'womp':
        // Sad trombone for running out of time.
        ;[392, 370, 349, 330].forEach((f, i) => blip(f, i * 0.22, i === 3 ? 0.6 : 0.2, 0.09, 'sawtooth'))
        break
      case 'doorBeeps':
        // The MRT "doors closing" beeps, kept for the first door of a journey only,
        // and rounded off (triangle, lower pitch) so it's a nod rather than an alarm.
        ;[0, 0.17, 0.34].forEach((at) => blip(880, at, 0.08, 0.04, 'triangle'))
        break
      case 'doorClose': {
        // Every other scene change: a soft whoosh and a gentle two-note chime that
        // rotates through a few motifs from the major pentatonic.
        const motifs = [[76, 79], [79, 84], [74, 79], [81, 76], [72, 76], [79, 74]]
        const [a, b] = motifs[this.doorTurn++ % motifs.length]
        this.noiseHit(t, 0.3, 0.025, 'bandpass', 700, bus)
        blip(mtof(a), 0.05, 0.35, 0.035)
        blip(mtof(b), 0.17, 0.5, 0.03)
        break
      }
      case 'doorOpen':
        // Arrival chime: a quiet ding-dong.
        blip(784, 0, 0.4, 0.045)
        blip(659, 0.22, 0.55, 0.04)
        break
      case 'whoosh':
        this.noiseHit(t, 0.35, 0.05, 'bandpass', 900, bus)
        break
      case 'fanfare':
        ;[60, 64, 67, 72].forEach((n, i) => blip(mtof(n), i * 0.11, i === 3 ? 0.7 : 0.15, 0.1, 'sawtooth'))
        break
      case 'firework': {
        this.noiseHit(t, 0.4, 0.05, 'lowpass', 1200, bus)
        for (let i = 0; i < 5; i++) this.noiseHit(t + 0.15 + Math.random() * 0.3, 0.03, 0.03, 'highpass', 5000, bus)
        break
      }
    }
  }
}

export type Sfx =
  | 'tap'
  | 'pick'
  | 'msgIn'
  | 'msgOut'
  | 'tick'
  | 'tickUrgent'
  | 'slide'
  | 'boing'
  | 'womp'
  | 'doorBeeps'
  | 'doorClose'
  | 'doorOpen'
  | 'whoosh'
  | 'fanfare'
  | 'firework'

export const audio = new AudioEngine()
