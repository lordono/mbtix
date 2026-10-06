import { C, INK, bubble, cloud, frame, person, stroke, suitcase, type HairStyle, type Painter } from './kit'

/** Sunday-in-Tokyo scenes, ending back at Changi. */

const AUNTIE = { hairStyle: 'bob' as HairStyle, hair: '#7a7a7a', shirt: C.pink, pants: C.purple, glasses: true }

function fuji(x: number, y: number, s: number): string {
  return (
    `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-90,0 L-22,-70 Q0,-80 22,-70 L90,0Z" fill="#7d8fc4" ${stroke}/>` +
    `<path d="M-22,-70 Q0,-80 22,-70 L34,-58 L20,-52 L8,-60 L-6,-50 L-18,-60 L-34,-58Z" fill="${C.white}" ${stroke}/>` +
    `</g>`
  )
}

function tokyoTower(x: number, y: number, s: number, lit = false): string {
  const c = lit ? '#ff7a45' : C.red
  return (
    `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-30,0 L-4,-120 L4,-120 L30,0" fill="none" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>` +
    `<path d="M-30,0 L-4,-120 L4,-120 L30,0" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round"/>` +
    `<path d="M-20,-40 L20,-40 M-12,-76 L12,-76" stroke="${c}" stroke-width="5"/><rect x="-14" y="-48" width="28" height="10" fill="${C.white}" ${stroke}/>` +
    `<path d="M0,-120 L0,-150" ${stroke}/></g>`
  )
}

const hotel: Painter = (you, sceneId) => {
  const phone = sceneId === 'sun-mum'
  return frame(
    `<rect x="40" y="30" width="230" height="150" rx="6" fill="#cfe9ff" ${stroke}/>` +
      fuji(110, 180, 0.9) + tokyoTower(220, 180, 0.9) +
      [[60, 120], [150, 140], [180, 110]].map(([x, y]) => `<rect x="${x}" y="${y}" width="28" height="${180 - y}" fill="#a9b6d6" ${stroke}/>`).join('') +
      `<rect x="40" y="30" width="230" height="150" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>` +
      // shoji-style screen
      `<rect x="290" y="30" width="80" height="150" fill="${C.cream}" ${stroke}/>` +
      `<path d="M330,30 L330,180 M290,80 L370,80 M290,130 L370,130" stroke="${C.wood}" stroke-width="4"/>` +
      `<rect x="0" y="230" width="480" height="70" fill="#d9c49a"/><path d="M0,230 L480,230" ${stroke}/>` +
      `<path d="M0,262 L480,262" stroke="#c4ad80" stroke-width="3"/>` +
      // bed
      `<rect x="250" y="196" width="220" height="40" rx="6" fill="${C.white}" ${stroke}/><rect x="410" y="180" width="54" height="20" rx="8" fill="${C.white}" ${stroke}/>` +
      // open suitcase with Milo and kaya
      `<rect x="40" y="226" width="120" height="40" rx="6" fill="${C.purple}" ${stroke}/><path d="M44,226 L60,196 L156,196 L156,226" fill="#a79bd0" ${stroke}/>` +
      `<rect x="56" y="210" width="20" height="24" rx="3" fill="${C.green}" ${stroke}/><rect x="84" y="214" width="22" height="18" rx="3" fill="${C.yellow}" ${stroke}/><text x="88" y="227" class="tiny">kaya</text>` +
      person({ x: 340, y: 262, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: phone ? 'phone' : 'up', expr: phone ? 'smile' : 'grin', cls: 'bob' }) +
      (phone ? bubble(370, 120, 96, '👩 Mum: eat?') : `<text x="380" y="122" class="sfx small">ohayō!</text>`),
    '#f6ecd9',
  )
}

const konbini: Painter = (you, sceneId) => {
  const donki = sceneId === 'sun-souvenir'
  const shelf = (y: number) =>
    `<rect x="20" y="${y}" width="300" height="8" fill="${C.grey}" ${stroke}/>` +
    Array.from({ length: 9 }, (_, i) => {
      const x = 30 + i * 32
      const c = [C.coral, C.yellow, C.teal, C.pink, C.green, C.orange, C.purple, C.red, C.sky][(i + y) % 9]
      return donki
        ? `<rect x="${x}" y="${y - 30}" width="24" height="30" rx="3" fill="${c}" ${stroke}/>`
        : `<path d="M${x},${y} L${x + 12},${y - 22} L${x + 24},${y}Z" fill="${C.white}" ${stroke}/><rect x="${x + 6}" y="${y - 8}" width="12" height="8" fill="${INK}"/>`
    }).join('')
  return frame(
    `<rect x="0" y="0" width="480" height="40" fill="${donki ? C.yellow : C.teal}" ${stroke}/>` +
      `<text x="240" y="28" text-anchor="middle" class="sign" fill="${donki ? C.red : C.white}">${donki ? '激安 MEGA STORE 激安' : 'KONBINI · 24h'}</text>` +
      `<rect x="20" y="56" width="300" height="180" fill="#fafafa" ${stroke}/>` +
      shelf(110) + shelf(170) + shelf(230) +
      (donki
        ? `<g class="float"><rect x="250" y="56" width="70" height="26" fill="${C.red}" ${stroke} transform="rotate(-6 285 69)"/><text x="258" y="74" class="tiny" style="fill:#fff">SALE!!</text></g>`
        : '') +
      // drinks fridge
      `<rect x="340" y="56" width="120" height="180" rx="6" fill="#dff3ff" ${stroke}/><path d="M400,56 L400,236" ${stroke}/>` +
      Array.from({ length: 8 }, (_, i) => `<rect x="${352 + (i % 4) * 26}" y="${76 + Math.floor(i / 4) * 70}" width="14" height="40" rx="4" fill="${[C.green, C.coral, C.yellow, C.sky][i % 4]}" ${stroke}/>`).join('') +
      `<rect x="0" y="236" width="480" height="64" fill="#e6e1d6"/><path d="M0,236 L480,236" ${stroke}/>` +
      person({ x: 240, y: 290, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'open', cls: 'bob' }) +
      // shopping basket
      `<path d="M256,254 L292,254 L288,276 L260,276Z" fill="${C.red}" ${stroke}/>` +
      `<text x="270" y="200" class="sfx">${donki ? '🤑' : '?'}</text>`,
    '#f4f1ea',
  )
}

const crossing: Painter = (you, sceneId) => {
  if (sceneId === 'sun-lost') {
    const lanterns = [60, 140, 220, 300, 380]
      .map((x, i) => `<path d="M${x},40 L${x},52" ${stroke}/><ellipse cx="${x}" cy="66" rx="12" ry="16" fill="${C.red}" ${stroke} class="twinkle" style="animation-delay:${i * 0.3}s"/>`)
      .join('')
    return frame(
      `<rect x="0" y="0" width="480" height="300" fill="#f2d6b3"/>` +
        `<path d="M0,0 L140,60 L140,240 L0,300Z" fill="#a8744f" ${stroke}/><path d="M480,0 L340,60 L340,240 L480,300Z" fill="#9a6a47" ${stroke}/>` +
        Array.from({ length: 4 }, (_, i) => `<path d="M${20 + i * 30},${20 + i * 12} L${20 + i * 30},${280 - i * 12}" stroke="${INK}" stroke-width="2" opacity=".4"/><path d="M${460 - i * 30},${20 + i * 12} L${460 - i * 30},${280 - i * 12}" stroke="${INK}" stroke-width="2" opacity=".4"/>`).join('') +
        `<path d="M140,60 L340,60 L340,240 L140,240Z" fill="#fde7c4"/>` +
        `<path d="M140,240 L340,240 L480,300 L0,300Z" fill="#cdb79a" ${stroke}/>` +
        // vending machine
        `<rect x="350" y="140" width="50" height="100" rx="4" fill="${C.white}" ${stroke}/>` +
        Array.from({ length: 6 }, (_, i) => `<rect x="${358 + (i % 3) * 12}" y="${150 + Math.floor(i / 3) * 22}" width="8" height="16" fill="${[C.coral, C.teal, C.yellow][i % 3]}"/>`).join('') +
        `<path d="M30,40 L450,40" stroke="${INK}" stroke-width="2"/>` + lanterns +
        person({ x: 240, y: 280, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'phone', expr: 'worried', cls: 'shiver' }) +
        `<g class="pop-in"><rect x="262" y="120" width="60" height="30" rx="8" fill="${C.white}" ${stroke}/><rect x="270" y="128" width="34" height="14" rx="2" fill="none" stroke="${INK}" stroke-width="2"/><rect x="272" y="130" width="3" height="10" fill="${C.red}"/><rect x="304" y="132" width="4" height="6" fill="${INK}"/><text x="310" y="142" class="tiny"> 2%</text></g>`,
      '#f2d6b3',
    )
  }
  const crowd = Array.from({ length: 9 }, (_, i) =>
    person({ x: 40 + i * 50 + (i % 2) * 12, y: 210 + (i % 3) * 22, s: 0.45, hairStyle: (['short', 'bob', 'bun', 'spiky', 'long'] as HairStyle[])[i % 5], shirt: [C.coral, C.navy, C.yellow, C.purple, C.green, C.grey][i % 6], pose: i % 3 ? 'down' : 'phone', expr: 'calm', flip: i % 2 === 0, cls: 'walk' }),
  ).join('')
  return frame(
    cloud(320, 14, 0.8) +
      // buildings with screens
      `<rect x="10" y="40" width="120" height="140" fill="#7b7fa8" ${stroke}/><rect x="24" y="56" width="92" height="56" rx="4" fill="${C.pink}" ${stroke}/><text x="70" y="90" text-anchor="middle" class="sign small" fill="${C.white}">♪ POP!</text>` +
      `<rect x="140" y="70" width="90" height="110" fill="#9a8fc0" ${stroke}/><rect x="152" y="84" width="66" height="40" rx="4" fill="${C.teal}" ${stroke}/>` +
      `<rect x="240" y="30" width="110" height="150" fill="#6c7aa8" ${stroke}/><rect x="254" y="46" width="82" height="60" rx="4" fill="${C.yellow}" ${stroke}/><text x="295" y="82" text-anchor="middle" class="sign small" fill="${INK}">渋谷</text>` +
      `<rect x="360" y="60" width="110" height="120" fill="#8a8fb8" ${stroke}/>` +
      // road + zebra crossing
      `<rect x="0" y="180" width="480" height="120" fill="#5b6070"/><path d="M0,180 L480,180" ${stroke}/>` +
      Array.from({ length: 12 }, (_, i) => `<rect x="${i * 42 - 8}" y="190" width="22" height="110" fill="${C.white}" opacity=".85" transform="skewX(-18)"/>`).join('') +
      crowd +
      person({ x: 240, y: 296, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'phone', expr: 'grin' }),
    '#cfe9ff',
  )
}

const ramen: Painter = (you) =>
  frame(
    `<rect x="0" y="0" width="480" height="300" fill="#3b2f2f"/>` +
      // left: solo booths
      `<rect x="20" y="40" width="200" height="190" fill="#e7d3b0" ${stroke}/>` +
      `<rect x="20" y="40" width="200" height="34" fill="${C.navy}" ${stroke}/><text x="120" y="63" text-anchor="middle" class="sign small" fill="${C.white}">一人 SOLO</text>` +
      `<path d="M30,74 L30,120 M70,74 L70,120 M110,74 L110,120 M150,74 L150,120 M190,74 L190,120" stroke="${C.navy}" stroke-width="10"/>` +
      Array.from({ length: 4 }, (_, i) => `<rect x="${40 + i * 44}" y="130" width="34" height="70" fill="${C.wood}" ${stroke}/><circle cx="${57 + i * 44}" cy="150" r="7" fill="${C.cream}" ${stroke}/>`).join('') +
      // right: chatty counter
      `<rect x="260" y="40" width="200" height="190" fill="#f6e1c0" ${stroke}/>` +
      `<rect x="260" y="40" width="200" height="34" fill="${C.red}" ${stroke}/><text x="360" y="63" text-anchor="middle" class="sign small" fill="${C.white}">ラーメン</text>` +
      `<path d="M270,74 L270,104 M310,74 L310,104 M350,74 L350,104 M390,74 L390,104 M430,74 L430,104" stroke="${C.red}" stroke-width="10"/>` +
      person({ x: 360, y: 200, s: 0.7, hairStyle: 'short', hair: '#222', shirt: C.white, pants: C.navy, pose: 'wave', expr: 'grin' }) +
      `<rect x="330" y="118" width="60" height="8" rx="4" fill="${C.white}" ${stroke}/>` +
      `<rect x="260" y="180" width="200" height="50" fill="${C.wood}" ${stroke}/>` +
      `<g class="steam"><path d="M300,170 Q296,160 302,150 M420,170 Q424,160 418,150" fill="none" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/></g>` +
      `<ellipse cx="300" cy="180" rx="18" ry="6" fill="${C.white}" ${stroke}/><ellipse cx="420" cy="180" rx="18" ry="6" fill="${C.white}" ${stroke}/>` +
      `<text x="404" y="130" class="sfx small">haha!</text>` +
      `<rect x="0" y="230" width="480" height="70" fill="#6b5446"/><path d="M0,230 L480,230" ${stroke}/>` +
      person({ x: 240, y: 290, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'open', cls: 'bob' }) +
      `<text x="262" y="180" class="sfx" style="fill:#fff">?</text>`,
    '#3b2f2f',
  )

const shrine: Painter = (you) =>
  frame(
    `<defs><linearGradient id="shr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb38a"/><stop offset="1" stop-color="#ffe3c2"/></linearGradient></defs>` +
      `<rect width="480" height="300" fill="url(#shr)"/>` +
      // trees
      `<circle cx="40" cy="90" r="60" fill="${C.leaf}" ${stroke}/><circle cx="440" cy="80" r="64" fill="${C.green}" ${stroke}/>` +
      // torii gate
      `<path d="M90,70 Q240,48 390,70 L386,86 Q240,66 94,86Z" fill="${C.red}" ${stroke}/>` +
      `<rect x="110" y="98" width="260" height="12" fill="${C.red}" ${stroke}/>` +
      `<rect x="130" y="84" width="18" height="160" fill="${C.red}" ${stroke}/><rect x="332" y="84" width="18" height="160" fill="${C.red}" ${stroke}/>` +
      `<rect x="226" y="98" width="28" height="12" fill="${INK}"/>` +
      `<rect x="0" y="240" width="480" height="60" fill="#c9b79c"/><path d="M0,240 L480,240" ${stroke}/>` +
      // stone lantern
      `<path d="M50,240 L54,200 L74,200 L78,240Z M44,200 L84,200 L76,186 L52,186Z" fill="${C.grey}" ${stroke}/><rect x="58" y="206" width="12" height="12" fill="${C.yellow}"/>` +
      // omikuji rack
      `<path d="M380,170 L460,170 M380,196 L460,196 M384,160 L384,240 M456,160 L456,240" stroke="${C.brown}" stroke-width="6"/>` +
      Array.from({ length: 10 }, (_, i) => `<rect x="${388 + (i % 5) * 14}" y="${i < 5 ? 166 : 192}" width="6" height="12" fill="${C.white}" ${stroke} stroke-width="1.5"/>`).join('') +
      person({ x: 240, y: 290, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'phone', expr: 'worried' }) +
      `<g class="pop-in"><rect x="262" y="140" width="46" height="60" rx="3" fill="${C.white}" ${stroke}/><text x="285" y="182" text-anchor="middle" class="sign" fill="${INK}">凶</text></g>`,
    '#ffe3c2',
  )

const airport: Painter = (you, sceneId) => {
  if (sceneId === 'sun-changi') {
    const greens = Array.from({ length: 5 }, (_, i) => `<path d="M${20 + i * 20},${250 - i * 34} Q${90 + i * 4},${236 - i * 34} 180,${250 - i * 34}" fill="${i % 2 ? C.green : C.leaf}" ${stroke}/><path d="M${460 - i * 20},${250 - i * 34} Q${390 - i * 4},${236 - i * 34} 300,${250 - i * 34}" fill="${i % 2 ? C.leaf : C.green}" ${stroke}/>`).join('')
    return frame(
      // Jewel dome
      `<path d="M0,250 Q0,30 240,20 Q480,30 480,250Z" fill="#1d2b53" ${stroke}/>` +
        Array.from({ length: 7 }, (_, i) => `<path d="M${40 + i * 67},250 Q240,${30 + Math.abs(i - 3) * 6} ${440 - i * 67},250" fill="none" stroke="${C.sky}" stroke-width="1.5" opacity=".35"/>`).join('') +
        greens +
        // rain vortex
        `<path d="M222,30 L258,30 L250,250 L230,250Z" fill="${C.sky}" opacity=".55"/>` +
        `<g class="rain">${Array.from({ length: 10 }, (_, i) => `<path d="M${228 + i * 3},${30 + (i * 37) % 200} l0,26" stroke="${C.white}" stroke-width="2" opacity=".8"/>`).join('')}</g>` +
        `<ellipse cx="240" cy="22" rx="40" ry="10" fill="#0d1838" ${stroke}/>` +
        `<rect x="0" y="250" width="480" height="50" fill="#5c5470"/><path d="M0,250 L480,250" ${stroke}/>` +
        `<ellipse cx="240" cy="256" rx="70" ry="10" fill="${C.sky}" opacity=".4"/>` +
        suitcase(100, 292, C.purple) +
        person({ x: 170, y: 292, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'up', expr: 'grin', cls: 'bob' }) +
        `<g class="pop-in"><rect x="318" y="196" width="148" height="34" rx="8" fill="${C.white}" ${stroke}/><text x="330" y="218" class="tiny">Welcome to Singapore 🇸🇬</text></g>`,
      '#0d1838',
    )
  }
  return frame(
    `<rect x="0" y="0" width="480" height="300" fill="#e9eef2"/>` +
      // departures board
      `<rect x="30" y="20" width="240" height="90" rx="6" fill="${INK}" ${stroke}/>` +
      ['SQ 637  SINGAPORE  21:00', 'NH 801  SINGAPORE  22:10', 'JL 037  SINGAPORE  23:45'].map((t, i) => `<text x="44" y="${48 + i * 22}" class="tiny" style="fill:${i ? C.yellow : C.teal}">${t}</text>`).join('') +
      // counter + staff
      person({ x: 360, y: 200, s: 0.75, hairStyle: 'bun', hair: '#222', shirt: C.navy, pants: C.navy, pose: 'down', expr: 'worried' }) +
      `<rect x="290" y="150" width="180" height="90" rx="4" fill="${C.white}" ${stroke}/><rect x="290" y="150" width="180" height="16" fill="${C.teal}" ${stroke}/>` +
      // the scale
      `<rect x="160" y="226" width="110" height="18" rx="4" fill="${C.grey}" ${stroke}/>` +
      `<path d="M262,226 L262,150" ${stroke}/>` +
      `<rect x="232" y="124" width="62" height="28" rx="4" fill="${INK}" ${stroke}/><text x="263" y="143" text-anchor="middle" class="tiny bold" style="fill:${C.coral}">25.4kg</text>` +
      suitcase(190, 228, C.purple, 1.1) +
      `<rect x="0" y="244" width="480" height="56" fill="#c3cad3"/><path d="M0,244 L480,244" ${stroke}/>` +
      person({ x: 110, y: 292, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'worried', cls: 'shiver' }) +
      `<text x="134" y="166" class="sfx">!!</text>`,
    '#e9eef2',
  )
}

const plane: Painter = (you) =>
  frame(
    `<rect x="0" y="0" width="480" height="300" fill="#e7e2f0"/>` +
      `<path d="M0,0 L480,0 L480,40 Q240,70 0,40Z" fill="#d4cde3" ${stroke}/>` +
      // windows
      [60, 190, 320].map((x) => `<rect x="${x}" y="70" width="70" height="90" rx="34" fill="#0d1838" ${stroke}/>` +
        `<circle cx="${x + 20}" cy="96" r="2" fill="#fff" class="twinkle"/><circle cx="${x + 46}" cy="120" r="1.5" fill="#fff" class="twinkle"/><circle cx="${x + 34}" cy="140" r="2" fill="#fff" class="twinkle"/>`).join('') +
      `<circle cx="374" cy="100" r="9" fill="${C.cream}"/>` +
      `<rect x="0" y="250" width="480" height="50" fill="#8e86a6"/>` +
      // seats
      `<rect x="96" y="150" width="120" height="110" rx="20" fill="${C.navy}" ${stroke}/><rect x="256" y="150" width="120" height="110" rx="20" fill="${C.navy}" ${stroke}/>` +
      person({ x: 150, y: 272, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'sit', expr: 'smile' }) +
      person({ x: 316, y: 272, s: 0.9, ...AUNTIE, pose: 'sit', expr: 'grin', flip: true }) +
      `<rect x="90" y="236" width="300" height="24" rx="8" fill="#3d4c80" ${stroke}/>` +
      bubble(300, 110, 150, 'You work where ah? 🍬'),
    '#e7e2f0',
  )

export const OVERSEAS_PAINTERS = { hotel, konbini, crossing, ramen, shrine, airport, plane }
