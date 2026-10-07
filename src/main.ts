import './style.css'
import gsap from 'gsap'
import { World } from './world/world'
import { JOURNEYS } from './data/journeys'
import type { Answer, Journey } from './data/model'
import { score } from './data/scoring'
import { escapeHtml, glossaryHtml } from './data/glossary'
import { avatarSvg, headSvg, paint, type Look } from './art/scenes'
import { C, type HairStyle } from './art/kit'
import { mount } from './ui/interactions'
import { renderResult } from './ui/result'
import { audio } from './audio/audio'

const app = document.querySelector<HTMLDivElement>('#app')!
const world = new World(document.querySelector<HTMLCanvasElement>('#world')!)

const state = {
  name: '',
  look: { shirt: C.coral, hairStyle: 'short' } as Look,
  journey: JOURNEYS[1] as Journey,
  answers: [] as Answer[],
  index: 0,
  unmount: () => {},
}

const LEAD =
  `No boring questionnaire. Pick a day, live it like a true Singaporean, and we'll work out your personality from what you do. Tap any <span class="lingo" tabindex="0" data-def="Like this! Tap or hover on underlined words for Singlish definitions.">underlined word</span> if the Singlish gets a bit {jialat}.`

const SHIRTS = [C.coral, C.teal, C.yellow, C.purple, C.green]
const HAIRS: HairStyle[] = ['short', 'bob', 'bun', 'spiky', 'long']

/** Short buzz on phones when something is picked. Silently does nothing elsewhere. */
const touch = window.matchMedia('(pointer: coarse)').matches
function haptic(ms = 12) {
  // Browsers reject vibration before the first real tap, so only buzz on touch devices after one.
  if (!touch || !navigator.userActivation?.hasBeenActive) return
  try {
    navigator.vibrate?.(ms)
  } catch {
    /* not supported */
  }
}

function useJourney(j: Journey) {
  state.journey = j
  document.documentElement.style.setProperty('--line', j.line)
  world.setTheme(j.theme)
}

/* ───────────── Intro ───────────── */

function ticket(j: Journey): string {
  const on = j.id === state.journey.id
  return (
    `<button class="ticket ${on ? 'on' : ''}" data-journey="${j.id}" style="--tl:${j.line}" aria-pressed="${on}">` +
    `<span class="ticket-day">${j.day}</span>` +
    `<span class="ticket-emoji">${j.emoji}</span>` +
    `<span class="ticket-text"><strong>${j.title}</strong><small>${j.tagline}</small></span>` +
    `<span class="ticket-meta">${j.lineName} · ${j.scenes.length} stops</span>` +
    `</button>`
  )
}

function intro() {
  world.setFireworks(false)
  audio.play('home')
  useJourney(state.journey)
  gsap.to(world, { tod: 0, duration: 1.2 })
  app.innerHTML =
    `<section class="intro card">` +
    `<p class="eyebrow">MBTIx · a personality test disguised as a day out</p>` +
    `<h1 class="title">Live one day.<br/><span>Find your type.</span></h1>` +
    `<p class="lead">${glossaryHtml(LEAD, '')}</p>` +
    `<h2 class="step"><i>1</i> Pick your day</h2>` +
    `<div class="tickets" role="group" aria-label="Choose a journey">${JOURNEYS.map(ticket).join('')}</div>` +
    `<h2 class="step"><i>2</i> Make your character</h2>` +
    `<div class="maker">` +
    `<div class="maker-preview">${avatarSvg(state.look)}</div>` +
    `<div class="maker-controls">` +
    `<label class="field"><span>What should we call you?</span><input id="name" maxlength="18" placeholder="e.g. James" autocomplete="nickname" value="${escapeHtml(state.name)}"/></label>` +
    `<div class="field"><span>Hair</span><div class="swatches" id="hair">${HAIRS.map((hs) => `<button class="swatch head ${hs === state.look.hairStyle ? 'on' : ''}" data-hair="${hs}" aria-label="${hs} hair">${headSvg({ ...state.look, hairStyle: hs }, 40)}</button>`).join('')}</div></div>` +
    `<div class="field"><span>Outfit</span><div class="swatches" id="shirt">${SHIRTS.map((c) => `<button class="swatch ${c === state.look.shirt ? 'on' : ''}" data-shirt="${c}" style="--c:${c}" aria-label="shirt colour"></button>`).join('')}</div></div>` +
    `</div></div>` +
    `<div class="start"><button class="cta big" id="start"></button>` +
    `<p class="muted small" id="start-meta"></p></div>` +
    `</section>`

  const startBtn = app.querySelector<HTMLButtonElement>('#start')!
  const startMeta = app.querySelector<HTMLElement>('#start-meta')!
  const syncStart = () => {
    const j = state.journey
    const dayName = { MON: 'Monday', SAT: 'Saturday', SUN: 'Sunday' }[j.day] ?? j.day
    startBtn.textContent = `Start my ${dayName} →`
    startMeta.textContent = `${j.scenes.length} moments · about 4 minutes · best with kopi in hand`
  }
  syncStart()

  app.querySelector('.tickets')!.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-journey]')
    if (!b) return
    useJourney(JOURNEYS.find((j) => j.id === b.dataset.journey)!)
    haptic()
    audio.sfx('tap')
    app.querySelectorAll<HTMLElement>('.ticket').forEach((t) => {
      const on = t === b
      t.classList.toggle('on', on)
      t.setAttribute('aria-pressed', String(on))
    })
    syncStart()
  })

  const preview = app.querySelector<HTMLElement>('.maker-preview')!
  const refresh = () => {
    preview.innerHTML = avatarSvg(state.look)
    gsap.from(preview.firstElementChild, { scale: 0.9, duration: 0.3, ease: 'back.out(3)' })
    app.querySelectorAll<HTMLElement>('[data-hair]').forEach((b) => {
      b.classList.toggle('on', b.dataset.hair === state.look.hairStyle)
      b.innerHTML = headSvg({ ...state.look, hairStyle: b.dataset.hair as HairStyle }, 40)
    })
    app.querySelectorAll<HTMLElement>('[data-shirt]').forEach((b) => b.classList.toggle('on', b.dataset.shirt === state.look.shirt))
    haptic()
    audio.sfx('tap')
  }
  app.querySelector('#hair')!.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-hair]')
    if (b) (state.look.hairStyle = b.dataset.hair as HairStyle), refresh()
  })
  app.querySelector('#shirt')!.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-shirt]')
    if (b) (state.look.shirt = b.dataset.shirt!), refresh()
  })
  startBtn.addEventListener('click', () => {
    state.name = (app.querySelector<HTMLInputElement>('#name')!.value.trim() || 'You').slice(0, 18)
    state.answers = []
    state.index = 0
    haptic(20)
    doors(state.journey.scenes[0].station, () => renderScene(), true)
  })

  gsap.from('.intro > *', { y: 30, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' })
}

/* ───────────── Journey ───────────── */

function progress(): string {
  const { scenes, day } = state.journey
  const dots = scenes.map((s, i) => {
    const cls = i < state.index ? 'done' : i === state.index ? 'now' : ''
    return `<li class="${cls}" title="${s.station}"><i></i></li>`
  }).join('')
  const scene = scenes[state.index]
  return (
    `<header class="hud">` +
    `<div class="clock"><span class="clock-time">${scene.time}</span><span class="clock-day">${day}</span></div>` +
    `<div class="line"><ol>${dots}</ol><div class="line-label">Now at <b>${scene.station}</b> · ${state.index + 1}/${scenes.length}</div></div>` +
    `</header>`
  )
}

function renderScene() {
  const { scenes } = state.journey
  const scene = scenes[state.index]
  gsap.to(world, { tod: scene.tod, duration: 2, ease: 'sine.inOut' })
  audio.play(state.journey.id)

  app.innerHTML =
    progress() +
    `<section class="scene card">` +
    `<div class="stage">${paint(scene.art, state.look, scene.id)}</div>` +
    `<div class="scene-body">` +
    `<h2 class="scene-title">${scene.title}</h2>` +
    `<p class="narration">${glossaryHtml(scene.narration, state.name)}</p>` +
    `<p class="prompt">${glossaryHtml(scene.prompt, state.name)}</p>` +
    `<div class="interaction"></div>` +
    `</div></section>`

  const stage = app.querySelector<HTMLElement>('.stage')!
  gsap.from(stage, { clipPath: 'circle(0% at 50% 60%)', duration: 0.9, ease: 'power3.inOut' })
  gsap.from('.scene-title, .narration, .prompt', { y: 16, opacity: 0, stagger: 0.08, duration: 0.5, delay: 0.25 })

  state.unmount = mount({
    scene,
    name: state.name,
    stage,
    head: headSvg(state.look, 64),
    host: app.querySelector<HTMLElement>('.interaction')!,
    done: (a) => {
      haptic(18)
      state.unmount()
      state.answers.push(a)
      state.index++
      if (state.index < scenes.length) doors(scenes[state.index].station, renderScene)
      else finish()
    },
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** MRT-door wipe between scenes: "Next station…". */
function doors(station: string, then: () => void, first = false) {
  const el = document.querySelector<HTMLElement>('#doors')!
  el.querySelector('.door-msg')!.innerHTML = `<small>Next station</small>${escapeHtml(station)}`
  // Proper MRT beeps once, as the journey departs; softer rotating chimes after that.
  audio.sfx(first ? 'doorBeeps' : 'doorClose')
  gsap.timeline()
    .set(el, { display: 'block' })
    .fromTo('.door.l', { xPercent: -100 }, { xPercent: 0, duration: 0.45, ease: 'power3.in' })
    .fromTo('.door.r', { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: 'power3.in' }, '<')
    .fromTo('.door-msg', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25 })
    .call(then)
    .to({}, { duration: 0.45 })
    .to('.door-msg', { opacity: 0, duration: 0.15 })
    .call(() => audio.sfx('doorOpen'))
    .to('.door.l', { xPercent: -100, duration: 0.5, ease: 'power3.out' })
    .to('.door.r', { xPercent: 100, duration: 0.5, ease: 'power3.out' }, '<')
    .set(el, { display: 'none' })
}

function finish() {
  app.innerHTML =
    `<section class="computing card"><div class="kopi-spin">☕</div><h2>Tallying your ${escapeHtml(state.journey.title)}…</h2><p class="muted">Results arriving in 1 min. Faster than the next train, promise.</p></section>`
  gsap.from('.computing', { scale: 0.9, opacity: 0, duration: 0.4 })
  gsap.to('.kopi-spin', { rotation: 360, repeat: -1, duration: 1.2, ease: 'none' })
  world.setFireworks(true)
  audio.play('results')
  gsap.delayedCall(1.8, () => {
    audio.sfx('fanfare')
    gsap.killTweensOf('.kopi-spin')
    renderResult(app, score(state.answers), state.name, state.journey, avatarSvg(state.look, 110), () => doors('Home', intro))
    haptic(40)
    window.scrollTo({ top: 0 })
  })
}

/* ───────────── Sound toggle ───────────── */

const soundBtn = document.querySelector<HTMLButtonElement>('#sound')!
audio.onChange((muted) => {
  soundBtn.textContent = muted ? '🔇' : '🔊'
  soundBtn.setAttribute('aria-label', muted ? 'Turn sound on' : 'Mute sound')
  soundBtn.setAttribute('aria-pressed', String(muted))
})
soundBtn.addEventListener('click', () => audio.toggle())
// "M" toggles sound, unless you're typing your name.
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'm' && !(e.target as HTMLElement).closest('input, textarea')) audio.toggle()
})
world.onBurst = () => audio.sfx('firework')

/* ───────────── Singlish tooltips ───────────── */

const tip = document.querySelector<HTMLElement>('#tip')!
function showTip(target: HTMLElement) {
  tip.textContent = target.dataset.def ?? ''
  const r = target.getBoundingClientRect()
  tip.style.display = 'block'
  const w = tip.offsetWidth
  tip.style.left = `${Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2))}px`
  tip.style.top = `${r.bottom + 8}px`
  gsap.fromTo(tip, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.15 })
}
const hideTip = () => (tip.style.display = 'none')
document.addEventListener('pointerover', (e) => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('.lingo')
  if (t && e.pointerType === 'mouse') showTip(t)
})
document.addEventListener('pointerout', (e) => {
  if ((e.target as HTMLElement).closest('.lingo')) hideTip()
})
document.addEventListener('focusin', (e) => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('.lingo')
  t ? showTip(t) : hideTip()
})
// A tap on a Singlish word inside an answer shows the definition instead of picking the answer.
document.addEventListener(
  'click',
  (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('.lingo')
    if (!t) return hideTip()
    e.preventDefault()
    e.stopPropagation()
    showTip(t)
  },
  true,
)
window.addEventListener('scroll', hideTip, { passive: true })

// Handy for poking at the journey from devtools during development.
if (import.meta.env.DEV) Object.assign(window, { gsap, world, state, audio })

intro()
