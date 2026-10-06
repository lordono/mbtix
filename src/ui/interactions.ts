import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import type { Answer, Choice, Interaction, Scene } from '../data/model'
import { glossaryHtml, plain } from '../data/glossary'

gsap.registerPlugin(Draggable)

export interface Ctx {
  scene: Scene
  name: string
  /** Element that holds the illustration; drag zones are placed over it. */
  stage: HTMLElement
  /** Head avatar markup, used as the drag token. */
  head: string
  host: HTMLElement
  done: (a: Answer) => void
}

const h = (html: string): HTMLElement => {
  const t = document.createElement('template')
  t.innerHTML = html.trim()
  return t.content.firstElementChild as HTMLElement
}

/**
 * Entrance animation for interactive elements, done in CSS rather than GSAP.
 * These elements have CSS transitions for hover/press; letting GSAP tween the same
 * properties makes the two fight and can leave options frozen half-faded or offset.
 * A CSS keyframe animation leaves no inline styles behind once it finishes.
 */
function enter(els: Iterable<Element>, delayMs = 150, stepMs = 70) {
  let i = 0
  for (const el of els) {
    const e = el as HTMLElement
    e.style.animationDelay = `${delayMs + i++ * stepMs}ms`
    e.classList.add('enter')
  }
}

function answer(ctx: Ctx, c: Choice, summary = c.label): Answer {
  return { sceneId: ctx.scene.id, summary: plain(summary, ctx.name), w: c.w }
}

export function mount(ctx: Ctx): () => void {
  const it = ctx.scene.interaction
  switch (it.kind) {
    case 'cards':
      return cards(ctx, it.options)
    case 'chat':
      return chat(ctx, it)
    case 'slider':
      return slider(ctx, it)
    case 'drag':
      return drag(ctx, it)
    case 'timer':
      return timer(ctx, it)
  }
}

function cards(ctx: Ctx, options: Choice[], onPick?: () => void): () => void {
  const grid = h(`<div class="cards" role="list" data-count="${options.length}"></div>`)
  let locked = false
  options.forEach((o) => {
    const btn = h(
      `<button class="opt" role="listitem">${o.emoji ? `<span class="opt-emoji">${o.emoji}</span>` : ''}` +
        `<span class="opt-text"><strong>${glossaryHtml(o.label, ctx.name)}</strong>${o.sub ? `<small>${glossaryHtml(o.sub, ctx.name)}</small>` : ''}</span></button>`,
    )
    btn.addEventListener('click', () => {
      if (locked) return
      locked = true
      onPick?.()
      btn.classList.add('picked')
      grid.classList.add('locked')
      gsap.delayedCall(0.7, () => ctx.done(answer(ctx, o)))
    })
    grid.append(btn)
  })
  ctx.host.append(grid)
  enter(grid.children)
  return () => {
    locked = true
    grid.classList.add('locked')
  }
}

function chat(ctx: Ctx, it: Extract<Interaction, { kind: 'chat' }>): () => void {
  const phone = h(
    `<div class="phone"><div class="phone-head"><span class="phone-avatar">${it.contactEmoji}</span><span><strong>${it.contact}</strong><small>online</small></span></div>` +
      `<div class="phone-body"></div><div class="phone-replies"></div></div>`,
  )
  const body = phone.querySelector<HTMLElement>('.phone-body')!
  const replies = phone.querySelector<HTMLElement>('.phone-replies')!
  ctx.host.append(phone)

  let cancelled = false
  const tl = gsap.timeline()
  const bubble = (html: string, mine: boolean) => {
    const b = h(`<div class="bubble ${mine ? 'mine' : ''}">${html}${mine ? '<span class="ticks">✓✓</span>' : ''}</div>`)
    body.append(b)
    body.scrollTop = body.scrollHeight
    gsap.from(b, { y: 12, opacity: 0, scale: 0.9, transformOrigin: mine ? '100% 100%' : '0% 100%', duration: 0.3, ease: 'back.out(2)' })
  }

  it.incoming.forEach((msg) => {
    const typing = h(`<div class="bubble typing"><i></i><i></i><i></i></div>`)
    tl.call(() => {
      body.append(typing)
      body.scrollTop = body.scrollHeight
    })
    tl.to({}, { duration: 0.55 + msg.length * 0.012 })
    tl.call(() => {
      typing.remove()
      bubble(glossaryHtml(msg, ctx.name), false)
    })
    tl.to({}, { duration: 0.25 })
  })

  tl.call(() => {
    if (cancelled) return
    let locked = false
    it.options.forEach((o) => {
      const chip = h(`<button class="reply">${glossaryHtml(o.label, ctx.name)}</button>`)
      chip.addEventListener('click', () => {
        if (locked) return
        locked = true
        // Collapse the reply list as a whole (it has no CSS transitions of its own).
        gsap.to(replies, { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.25, onComplete: () => replies.remove() })
        bubble(glossaryHtml(o.label, ctx.name), true)
        gsap.delayedCall(0.9, () => ctx.done(answer(ctx, o)))
      })
      replies.append(chip)
    })
    enter(replies.children, 0)
  })

  return () => {
    cancelled = true
    tl.kill()
  }
}

function slider(ctx: Ctx, it: Extract<Interaction, { kind: 'slider' }>): () => void {
  const el = h(
    `<div class="slider">` +
      `<div class="slider-ends">` +
      `<div class="end left"><span class="end-badge">${it.left.emoji}</span><span class="end-label">${glossaryHtml(it.left.label, ctx.name)}</span></div>` +
      `<div class="end right"><span class="end-badge">${it.right.emoji}</span><span class="end-label">${glossaryHtml(it.right.label, ctx.name)}</span></div>` +
      `</div>` +
      `<input type="range" min="0" max="100" value="50" aria-label="${ctx.scene.prompt}"/>` +
      `<div class="slider-read"><span class="tick"></span></div>` +
      `<button class="cta">Confirm lah ✓</button></div>`,
  )
  const range = el.querySelector<HTMLInputElement>('input')!
  const tick = el.querySelector<HTMLElement>('.tick')!
  const [left, right] = el.querySelectorAll<HTMLElement>('.end')
  const update = () => {
    const v = Number(range.value) / 100
    const label = it.ticks[Math.min(it.ticks.length - 1, Math.round(v * (it.ticks.length - 1)))]
    if (tick.dataset.label !== label) {
      tick.dataset.label = label
      tick.textContent = label
      gsap.fromTo(tick, { y: 4, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' })
    }
    range.style.setProperty('--fill', `${v * 100}%`)
    // Each end lights up as you lean towards it; sizes stay fixed so nothing jumps around.
    left.style.setProperty('--lean', String(Math.max(0, 1 - v * 2)))
    right.style.setProperty('--lean', String(Math.max(0, v * 2 - 1)))
  }
  range.addEventListener('input', update)
  update()

  el.querySelector('button')!.addEventListener('click', (e) => {
    ;(e.currentTarget as HTMLButtonElement).disabled = true
    range.disabled = true
    const v = Number(range.value) / 100
    const w = { [it.left.pole]: it.weight * (1 - v), [it.right.pole]: it.weight * v }
    gsap.to(el, { scale: 0.98, yoyo: true, repeat: 1, duration: 0.12, onComplete: () => ctx.done({ sceneId: ctx.scene.id, summary: tick.textContent ?? '', w }) })
  })
  ctx.host.append(el)
  enter([el])
  return () => {}
}

function drag(ctx: Ctx, it: Extract<Interaction, { kind: 'drag' }>): () => void {
  const layer = h(`<div class="drop-layer"></div>`)
  const zones = it.zones.map((z) => {
    const zone = h(
      `<button class="zone" style="left:${z.x}%;top:${z.y}%;width:${z.width}%;height:${z.height}%"><span>${glossaryHtml(z.label, ctx.name)}</span></button>`,
    )
    layer.append(zone)
    return zone
  })
  const token = h(`<div class="token" aria-hidden="true">${ctx.head}</div>`)
  layer.append(token)
  ctx.stage.append(layer)
  ctx.host.append(h(`<p class="hint">👆 Drag your face onto a spot, or just tap your choice.</p>`))
  // On small screens the zones get cramped, so the same choices also appear as a list.
  const list = h(`<div class="zone-list"></div>`)
  it.zones.forEach((z, i) => {
    const b = h(`<button class="opt"><span class="opt-text"><strong>${glossaryHtml(z.label, ctx.name)}</strong></span></button>`)
    b.addEventListener('click', () => commit(i))
    list.append(b)
  })
  ctx.host.append(list)

  gsap.set(token, { left: '50%', top: '80%', xPercent: -50, yPercent: -50 })
  enter(zones, 300, 120)
  enter(list.children, 200)
  gsap.to(token, { y: -6, repeat: -1, yoyo: true, duration: 0.6, ease: 'sine.inOut' })

  let locked = false
  const commit = (i: number) => {
    if (locked) return
    locked = true
    gsap.killTweensOf(token)
    const zr = zones[i].getBoundingClientRect()
    const tr = token.getBoundingClientRect()
    const dx = zr.left + zr.width / 2 - (tr.left + tr.width / 2)
    const dy = zr.top + zr.height / 2 - (tr.top + tr.height / 2)
    zones.forEach((z, j) => z.classList.toggle(j === i ? 'hit' : 'miss', true))
    list.querySelectorAll('.opt').forEach((b, j) => b.classList.toggle(j === i ? 'picked' : 'dim', true))
    gsap.to(token, {
      x: `+=${dx}`, y: `+=${dy}`, duration: 0.45, ease: 'back.out(1.8)',
      onComplete: () => {
        gsap.to(token, { scale: 1.2, yoyo: true, repeat: 1, duration: 0.15 })
        gsap.delayedCall(0.7, () => ctx.done(answer(ctx, it.zones[i])))
      },
    })
  }

  const [dr] = Draggable.create(token, {
    bounds: layer,
    onPress() {
      gsap.killTweensOf(token, 'y')
    },
    onDrag() {
      zones.forEach((z) => z.classList.toggle('over', this.hitTest(z, '35%')))
    },
    onRelease() {
      const i = zones.findIndex((z) => this.hitTest(z, '35%'))
      zones.forEach((z) => z.classList.remove('over'))
      if (i >= 0) commit(i)
      else gsap.to(token, { x: 0, y: 0, duration: 0.4, ease: 'back.out(2)' })
    },
  })
  zones.forEach((z, i) => z.addEventListener('click', () => commit(i)))

  return () => {
    dr.kill()
    layer.remove()
  }
}

function timer(ctx: Ctx, it: Extract<Interaction, { kind: 'timer' }>): () => void {
  const bar = h(`<div class="timer"><div class="timer-fill"></div><span class="timer-label">${it.seconds}s</span></div>`)
  ctx.host.append(bar)
  const fill = bar.querySelector<HTMLElement>('.timer-fill')!
  const label = bar.querySelector<HTMLElement>('.timer-label')!
  const state = { left: it.seconds }
  const countdown = gsap.to(state, {
    left: 0,
    duration: it.seconds,
    ease: 'none',
    onUpdate: () => {
      fill.style.width = `${(state.left / it.seconds) * 100}%`
      label.textContent = `${Math.ceil(state.left)}s`
      bar.classList.toggle('urgent', state.left < 3)
    },
    onComplete: () => {
      stopCards()
      label.textContent = 'Too slow! 💦'
      ctx.host.querySelector('.cards')?.classList.add('locked')
      gsap.delayedCall(1, () => ctx.done(answer(ctx, it.timeout)))
    },
  })
  const stopCards = cards(ctx, it.options, () => countdown.kill())
  return () => {
    countdown.kill()
    stopCards()
  }
}
