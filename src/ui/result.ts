import gsap from 'gsap'
import { escapeHtml } from '../data/glossary'
import { PROFILES, type Match } from '../data/profiles'
import type { Result } from '../data/scoring'
import type { Journey } from '../data/model'

export function renderResult(host: HTMLElement, r: Result, name: string, journey: Journey, avatar: string, onRestart: () => void) {
  const p = PROFILES[r.type]
  const who = escapeHtml(name || 'You')

  const bars = r.axes
    .map((a) => {
      const rightPct = 100 - a.leftPct
      const leftWin = a.winner === a.left
      const drivers = a.drivers.length
        ? `<ul class="drivers">${a.drivers.map((d) => `<li>“${escapeHtml(d.summary.replace(/^["“]|["”]$/g, ''))}”</li>`).join('')}</ul>`
        : ''
      return (
        `<div class="axis">` +
        `<div class="axis-labels"><span class="${leftWin ? 'win' : ''}"><b>${a.left}</b> ${a.leftName} <em>${a.leftPct}%</em></span>` +
        `<span class="${leftWin ? '' : 'win'}"><em>${rightPct}%</em> ${a.rightName} <b>${a.right}</b></span></div>` +
        `<div class="axis-bar"><div class="axis-fill left ${leftWin ? 'win' : ''}" data-w="${a.leftPct}"></div><div class="axis-fill right ${leftWin ? '' : 'win'}" data-w="${rightPct}"></div></div>` +
        `<p class="axis-meta"><span class="clarity c-${a.clarity.replace(' ', '-').toLowerCase()}">${a.clarity} ${a.winner}</span> · from ${a.signals} of your choices</p>` +
        drivers +
        `</div>`
      )
    })
    .join('')

  const matchCard = (m: Match) => {
    const mp = PROFILES[m.type]
    return `<div class="match"><div class="match-emoji">${mp.emoji}</div><div><div class="match-type">${m.type} <span>${mp.persona}</span></div><p>${m.why}</p></div></div>`
  }

  host.innerHTML =
    `<section class="result">` +
    `<div class="result-hero card">` +
    `<div class="result-avatar">${avatar}</div>` +
    `<div><p class="eyebrow">${who}, after your ${journey.title} ${journey.emoji}, you are…</p>` +
    `<div class="letters">${[...r.type].map((l) => `<span>${l}</span>`).join('')}</div>` +
    `<h1 class="persona">${p.emoji} ${p.persona}</h1>` +
    `<p class="tagline">${p.tagline}</p></div></div>` +
    `<div class="card"><p class="blurb">${p.blurb}</p>` +
    `<div class="facts"><div><span>📍 Natural habitat</span>${p.habitat}</div><div><span>🍜 Signature order</span>${p.order}</div></div>` +
    `<div class="chips">${p.strengths.map((s) => `<span>${s}</span>`).join('')}</div></div>` +
    `<div class="card"><h2>How your day added up</h2><p class="muted">Every choice leaned mainly one way and nudged a few others, so each split below draws on most of your day. Here's where you landed, and the moments that gave you away.</p>${bars}</div>` +
    `<div class="match-grid">` +
    `<div class="card"><h2>💼 Work kakis</h2><p class="muted">Types that bring out your best at work</p>${p.career.map(matchCard).join('')}</div>` +
    `<div class="card"><h2>💘 Date-able types</h2><p class="muted">Types most likely to make your days better</p>${p.partner.map(matchCard).join('')}</div>` +
    `</div>` +
    `<div class="actions"><button class="cta" data-act="copy">Copy my result 📋</button><button class="cta ghost" data-act="again">Try another day ↺</button></div>` +
    `<p class="fineprint">For fun only, not a clinical assessment. Like checking the weather app before you leave: helpful, never the final word.</p>` +
    `</section>`

  const tl = gsap.timeline()
  tl.from('.result-hero', { y: 40, opacity: 0, duration: 0.6, ease: 'back.out(1.4)' })
    .from('.letters span', { rotationX: -90, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(2)', transformOrigin: '50% 50% -20px' }, '-=0.2')
    .from('.persona, .tagline', { y: 16, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.2')
    .from('.result > .card:not(.result-hero), .match-grid .card, .actions', { y: 30, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.1')
  host.querySelectorAll<HTMLElement>('.axis-fill').forEach((el) => {
    tl.fromTo(el, { width: '0%' }, { width: `${el.dataset.w}%`, duration: 1, ease: 'power3.out' }, 1.4)
  })

  host.querySelector('[data-act="again"]')!.addEventListener('click', onRestart)
  host.querySelector('[data-act="copy"]')!.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement
    const text =
      `My ${journey.title} day on MBTIx says I'm ${r.type}: ${p.persona} ${p.emoji}\n` +
      r.axes.map((a) => `${a.left} ${a.leftPct}% · ${a.right} ${100 - a.leftPct}%`).join('\n') +
      `\nWork kakis: ${p.career.map((m) => m.type).join(', ')} · Date-able: ${p.partner.map((m) => m.type).join(', ')}`
    try {
      await navigator.clipboard.writeText(text)
      btn.textContent = 'Copied! Steady 👍'
    } catch {
      btn.textContent = 'Clipboard blocked 😅'
    }
  })
}
