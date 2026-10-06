import type { ArtKey } from '../data/model'
import { C, INK, cloud, frame, hdb, mbs, person, stroke, supertree, tree, type HairStyle, type Look, type Painter } from './kit'
import { WORK_PAINTERS } from './work'
import { OVERSEAS_PAINTERS } from './overseas'

export type { Look }

const SAM = { hairStyle: 'bun' as HairStyle, hair: '#5b3a29', shirt: C.yellow, pants: C.purple, skin: '#e8b08c' }

const bedroom: Painter = (you, sceneId) => {
  const night = sceneId === 'mon-night'
  const onPhone = sceneId === 'gang-chat' || night
  const early = sceneId === 'mon-alarm'
  const sky = night ? '#1d2b53' : early ? '#ffc9a8' : C.sky
  const sfx = night ? '' : onPhone ? 'bzzt!' : 'RING!'
  return frame(
    // window with HDB view
    `<rect x="0" y="232" width="480" height="68" fill="${C.wood}"/>` +
      `<path d="M0,232 L480,232" ${stroke}/>` +
      `<rect x="36" y="36" width="170" height="140" rx="6" fill="${sky}" ${stroke}/>` +
      (night
        ? `<circle cx="168" cy="70" r="14" fill="${C.cream}" ${stroke}/><circle cx="174" cy="66" r="12" fill="${sky}"/>`
        : `<circle cx="168" cy="${early ? 96 : 74}" r="18" fill="${C.yellow}" ${stroke} class="spin-slow"/>`) +
      hdb(48, 96, 40, 80, C.pink, night || early) + hdb(96, 80, 46, 96, C.yellow, night || early) + hdb(150, 108, 44, 68, C.teal, night || early) +
      `<path d="M121,36 L121,176 M36,106 L206,106" stroke="${C.white}" stroke-width="6"/>` +
      `<rect x="36" y="36" width="170" height="140" rx="6" fill="none" ${stroke}/>` +
      `<path d="M28,30 Q50,110 30,186 L60,186 Q46,110 60,30Z" fill="${C.coral}" ${stroke}/>` +
      `<path d="M214,30 Q192,110 212,186 L182,186 Q196,110 182,30Z" fill="${C.coral}" ${stroke}/>` +
      `<rect x="20" y="24" width="206" height="8" rx="4" fill="${C.brown}" ${stroke}/>` +
      // bed
      `<rect x="266" y="196" width="196" height="46" rx="8" fill="${C.brown}" ${stroke}/>` +
      `<rect x="270" y="176" width="188" height="30" rx="10" fill="${C.white}" ${stroke}/>` +
      `<rect x="420" y="160" width="40" height="22" rx="10" fill="${C.cream}" ${stroke}/>` +
      `<path d="M300,178 Q360,160 410,182 L410,206 L300,206Z" fill="${C.teal}" ${stroke}/>` +
      // bedside table + clock + phone
      `<rect x="222" y="200" width="40" height="40" rx="4" fill="${C.wood}" ${stroke}/>` +
      `<circle cx="236" cy="188" r="11" fill="${C.white}" ${stroke} class="${onPhone ? '' : 'wobble'}"/>` +
      `<path d="M236,188 L236,181 M236,188 L241,190" ${stroke}/>` +
      (onPhone ? '' : `<rect x="246" y="190" width="12" height="10" rx="2" fill="${INK}" class="buzz"/>`) +
      (night ? `<circle cx="252" cy="176" r="10" fill="${C.yellow}" opacity=".35"/>` : '') +
      (sfx ? `<text x="196" y="166" class="sfx">${sfx}</text>` : '') +
      // plant
      `<path d="M440,232 L436,212 L462,212 L458,232Z" fill="${C.orange}" ${stroke}/>` +
      `<path d="M449,212 Q438,186 444,176 M449,212 Q462,190 470,186 M449,212 Q450,190 454,178" fill="none" stroke="${C.leaf}" stroke-width="5" stroke-linecap="round"/>` +
      person({ x: 340, y: 262, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: onPhone ? 'phone' : 'up', expr: night ? 'calm' : onPhone ? 'grin' : 'open', cls: 'bob' }) +
      (onPhone ? '' : `<text x="372" y="122" class="sfx small">*yawn*</text>`) +
      (night ? `<text x="378" y="126" class="sfx small float">💭</text>` : ''),
    night ? '#cdbfe0' : '#ffe8c7',
  )
}

const kopitiam: Painter = (you) =>
  frame(
    `<rect x="0" y="170" width="480" height="60" fill="${C.green}"/>` +
      Array.from({ length: 20 }, (_, i) => `<path d="M${i * 24},170 L${i * 24},230" stroke="${C.cream}" stroke-width="2" opacity=".6"/>`).join('') +
      `<rect x="0" y="230" width="480" height="70" fill="#e9d8c4"/>` +
      Array.from({ length: 12 }, (_, i) => `<rect x="${i * 40 + ((i % 2) * 20)}" y="${230 + (i % 2) * 35}" width="20" height="35" fill="#d9c2a6"/>`).join('') +
      `<path d="M0,230 L480,230" ${stroke}/>` +
      // ceiling fan
      `<path d="M240,0 L240,18" ${stroke}/><g class="spin" style="transform-box:view-box;transform-origin:240px 22px"><ellipse cx="214" cy="22" rx="26" ry="5" fill="${C.white}" ${stroke}/><ellipse cx="266" cy="22" rx="26" ry="5" fill="${C.white}" ${stroke}/></g><circle cx="240" cy="22" r="6" fill="${C.grey}" ${stroke}/>` +
      // sign
      `<rect x="30" y="40" width="230" height="44" rx="6" fill="${C.red}" ${stroke}/>` +
      `<text x="145" y="70" text-anchor="middle" class="sign" fill="${C.yellow}">KOPI · TEH · MILO</text>` +
      // uncle behind counter
      person({ x: 140, y: 222, s: 0.95, hairStyle: 'bald', hair: '#999', shirt: C.white, pants: C.navy, glasses: true, expr: 'grin', pose: 'wave' }) +
      `<rect x="30" y="160" width="230" height="70" rx="4" fill="${C.coral}" ${stroke}/>` +
      `<rect x="30" y="160" width="230" height="12" fill="${C.cream}" ${stroke}/>` +
      `<rect x="200" y="138" width="16" height="22" rx="3" fill="${C.white}" ${stroke}/><rect x="203" y="142" width="10" height="7" fill="${C.brown}"/>` +
      `<path d="M204,132 Q200,124 206,118 M212,132 Q216,124 210,116" fill="none" stroke="${C.grey}" stroke-width="3" stroke-linecap="round" class="steam"/>` +
      // chalkboard
      `<rect x="290" y="50" width="120" height="96" rx="6" fill="#2f4a3a" ${stroke}/>` +
      `<text x="350" y="78" text-anchor="middle" class="chalk">UNCLE</text><text x="350" y="98" text-anchor="middle" class="chalk">SPECIAL ✨</text>` +
      `<text x="350" y="122" text-anchor="middle" class="chalk small">gula melaka</text><text x="350" y="136" text-anchor="middle" class="chalk small">pandan cold brew</text>` +
      // table + you
      `<ellipse cx="410" cy="230" rx="52" ry="12" fill="${C.white}" ${stroke}/><path d="M410,242 L410,282" stroke="${INK}" stroke-width="6"/>` +
      `<rect x="390" y="208" width="26" height="12" rx="3" fill="${C.yellow}" ${stroke}/><path d="M394,214 L412,214" stroke="${C.teal}" stroke-width="3"/>` +
      `<ellipse cx="434" cy="222" rx="7" ry="9" fill="${C.white}" ${stroke}/>` +
      person({ x: 320, y: 284, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'smile', cls: 'bob' }),
    C.cream,
  )

const chope: Painter = (you) =>
  frame(
    `<rect x="0" y="0" width="480" height="150" fill="#f0e3cf"/>` +
      `<rect x="60" y="0" width="22" height="200" fill="${C.grey}" ${stroke}/><rect x="398" y="0" width="22" height="200" fill="${C.grey}" ${stroke}/>` +
      `<rect x="0" y="150" width="480" height="150" fill="#d8cbb8"/><path d="M0,150 L480,150" ${stroke}/>` +
      // auntie at next table
      `<ellipse cx="90" cy="214" rx="60" ry="14" fill="${C.white}" ${stroke}/>` +
      person({ x: 64, y: 266, s: 0.8, hairStyle: 'bob', hair: '#6b6b6b', shirt: C.pink, pants: C.purple, pose: 'sit', chair: C.orange, expr: 'calm', glasses: true }) +
      `<path d="M90,226 L90,270" stroke="${INK}" stroke-width="6"/>` +
      `<ellipse cx="104" cy="206" rx="14" ry="5" fill="${C.white}" ${stroke}/>` +
      // the chope table
      `<ellipse cx="250" cy="226" rx="110" ry="30" fill="${C.white}" ${stroke}/>` +
      `<path d="M250,256 L250,296" stroke="${INK}" stroke-width="8"/>` +
      `<g class="glow-pulse"><rect x="226" y="208" width="48" height="24" rx="6" fill="${C.pink}" ${stroke}/>` +
      `<path d="M234,214 Q250,222 266,214" fill="none" stroke="${C.white}" stroke-width="3"/><text x="250" y="230" text-anchor="middle" class="tiny">TISSUE</text></g>` +
      `<path d="M210,196 L216,186 M290,196 L284,186 M250,190 L250,178" stroke="${C.yellow}" stroke-width="4" stroke-linecap="round" class="twinkle"/>` +
      `<text x="320" y="110" class="sfx">?!</text>` +
      person({ x: 400, y: 286, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'tray', expr: 'worried', flip: true }),
    '#f0e3cf',
  )

const mrt: Painter = (_you, sceneId) => {
  const tokyo = sceneId === 'sun-train'
  const rush = sceneId === 'mon-mrt'
  const stripe = tokyo ? '#80c241' : rush ? '#009645' : C.red
  // Tokyo: two Singaporean tourists in jackets. Rush hour: office crowd. Saturday: school kids.
  const crowd = tokyo
    ? person({ x: 170, y: 286, s: 0.7, hairStyle: 'short', shirt: C.orange, pants: C.navy, expr: 'grin', pose: 'wave' }) +
      person({ x: 202, y: 290, s: 0.7, hairStyle: 'bun', hair: '#1e1e1e', shirt: C.coral, pants: C.navy, expr: 'open' }) +
      person({ x: 104, y: 284, s: 0.85, hairStyle: 'short', hair: '#222', shirt: C.navy, pants: '#444', expr: 'calm', pose: 'phone' }) +
      `<text x="150" y="182" class="sfx small">"so cold sia!"</text>`
    : rush
      ? [170, 196, 222, 248].map((x, i) => person({ x, y: 288, s: 0.68, hairStyle: (['short', 'bob', 'short', 'bun'] as HairStyle[])[i], shirt: [C.white, C.sky, C.grey, C.pink][i], pants: C.navy, expr: 'calm', pose: i % 2 ? 'phone' : 'down' })).join('') +
        person({ x: 104, y: 284, s: 0.85, hairStyle: 'long', hair: '#2a1b14', shirt: C.purple, pants: C.navy, expr: 'grin', pose: 'wave' }) +
        `<text x="160" y="182" class="sfx small">squeeze…</text>`
      : person({ x: 170, y: 286, s: 0.7, hairStyle: 'spiky', shirt: C.white, pants: C.navy, expr: 'grin', pose: 'wave' }) +
        person({ x: 200, y: 290, s: 0.7, hairStyle: 'bob', hair: '#1e1e1e', shirt: C.white, pants: C.navy, expr: 'open' }) +
        person({ x: 104, y: 284, s: 0.85, hairStyle: 'long', hair: '#2a1b14', shirt: C.purple, pants: C.navy, expr: 'smile', pose: 'phone' }) +
        `<text x="166" y="182" class="sfx small">hahaha</text>`
  const map = tokyo
    ? `<circle cx="245" cy="56" r="26" fill="none" stroke="${stripe}" stroke-width="6"/>` +
      [0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${245 + Math.cos(i) * 26}" cy="${56 + Math.sin(i) * 26}" r="4" fill="${C.white}" stroke="${INK}" stroke-width="2"/>`).join('') +
      `<text x="186" y="30" class="tiny">山手線</text>`
    : `<path d="M188,60 L300,60" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M240,30 L240,80" stroke="${C.green}" stroke-width="6" stroke-linecap="round"/>` +
      [196, 218, 262, 284].map((x) => `<circle cx="${x}" cy="60" r="4" fill="${C.white}" stroke="${INK}" stroke-width="2"/>`).join('') +
      `<circle cx="240" cy="60" r="6" fill="${C.white}" stroke="${INK}" stroke-width="2.5"/>` +
      `<text x="245" y="34" class="tiny">NS · EW</text>`
  return frame(
    `<rect x="0" y="0" width="480" height="20" fill="${C.grey}"/><path d="M0,20 L480,20" ${stroke}/>` +
      // windows with tunnel blur
      `<rect x="150" y="104" width="180" height="62" rx="10" fill="#22304f" ${stroke}/>` +
      `<g class="whoosh"><path d="M160,122 L230,122 M200,140 L300,140 M170,154 L240,154 M250,118 L320,118" stroke="${C.sky}" stroke-width="3" stroke-linecap="round" opacity=".6"/></g>` +
      // doors
      `<rect x="14" y="40" width="58" height="236" rx="6" fill="#dfe5ea" ${stroke}/><rect x="72" y="40" width="58" height="236" rx="6" fill="#dfe5ea" ${stroke}/>` +
      `<rect x="24" y="70" width="38" height="80" rx="6" fill="#22304f" ${stroke}/><rect x="82" y="70" width="38" height="80" rx="6" fill="#22304f" ${stroke}/>` +
      `<rect x="14" y="30" width="116" height="10" fill="${stripe}" ${stroke}/>` +
      // route map
      `<rect x="174" y="14" width="142" height="80" rx="6" fill="${C.white}" ${stroke}/>` +
      map +
      // poles
      `<path d="M150,20 L150,280 M340,20 L340,280" stroke="${C.grey}" stroke-width="8"/><path d="M146,20 L146,280 M336,20 L336,280" stroke="${INK}" stroke-width="2"/>` +
      // floor
      `<rect x="0" y="276" width="480" height="24" fill="#a7b0bb"/><path d="M0,276 L480,276" ${stroke}/>` +
      // corner seats
      `<rect x="346" y="200" width="124" height="30" rx="8" fill="${tokyo ? '#4f7cc2' : C.teal}" ${stroke}/><rect x="346" y="150" width="124" height="54" rx="8" fill="${tokyo ? '#3e68aa' : '#3fb3a6'}" ${stroke}/>` +
      `<path d="M346,230 L346,276 M470,230 L470,276" ${stroke}/>` +
      crowd,
    '#eef2f5',
  )
}

const orchard: Painter = (you, sceneId) => {
  const evening = sceneId === 'mon-drinks'
  const bubble = evening ? '🍻 Jason: happy hour!' : '🐢 Marcus: bro…'
  return frame(
    (evening
      ? `<defs><linearGradient id="eve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a7a"/><stop offset="1" stop-color="#ffd29a"/></linearGradient></defs><rect width="480" height="300" fill="url(#eve)"/>`
      : '') +
      cloud(40, 30, 0.9) + cloud(330, 18, 1.1) +
      // mall
      `<path d="M150,200 L150,90 Q240,50 330,90 L330,200Z" fill="${evening ? '#b9a3d6' : '#9bd0e8'}" ${stroke}/>` +
      Array.from({ length: 6 }, (_, i) => `<path d="M${170 + i * 28},${84 - Math.sin(i / 1.6) * 16} L${170 + i * 28},200" stroke="${C.white}" stroke-width="2" opacity=".7"/>`).join('') +
      `<rect x="200" y="160" width="80" height="40" rx="4" fill="${evening ? C.yellow : C.white}" opacity=".6" ${stroke}/>` +
      // road + pavement
      `<rect x="0" y="200" width="480" height="40" fill="#cfc6b8"/><rect x="0" y="240" width="480" height="60" fill="#55606e"/>` +
      `<path d="M0,240 L480,240" ${stroke}/><path d="M20,272 L80,272 M140,272 L200,272 M260,272 L320,272 M380,272 L440,272" stroke="${C.white}" stroke-width="4"/>` +
      tree(60, 210, 1.2) + tree(420, 210, 1.1) +
      person({ x: 240, y: 238, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'phone', expr: evening ? 'grin' : 'worried', cls: 'walk' }) +
      `<g class="pop-in"><rect x="262" y="96" width="${evening ? 148 : 120}" height="34" rx="12" fill="${C.white}" ${stroke}/><text x="274" y="118" class="tiny">${bubble}</text></g>`,
    C.sky,
  )
}

const hawker: Painter = (you) => {
  const queue = [0, 1, 2, 3].map((i) =>
    person({ x: 40 + i * 30, y: 236, s: 0.6, hairStyle: (['short', 'bob', 'spiky', 'bun'] as HairStyle[])[i], shirt: [C.coral, C.purple, C.green, C.orange][i], expr: 'calm', pose: i === 2 ? 'phone' : 'down' }),
  ).join('')
  return frame(
    `<path d="M0,40 L240,0 L480,40 L480,56 L0,56Z" fill="${C.orange}" ${stroke}/>` +
      `<rect x="0" y="56" width="480" height="150" fill="#f6e7cf"/>` +
      // stall left
      `<rect x="20" y="70" width="190" height="120" rx="4" fill="${C.white}" ${stroke}/>` +
      `<rect x="20" y="70" width="190" height="34" fill="${C.red}" ${stroke}/><text x="115" y="94" text-anchor="middle" class="sign small" fill="${C.white}">CHICKEN RICE 鸡饭</text>` +
      `<path d="M60,120 L60,150 M60,120 Q70,112 78,120 L78,150" stroke="${INK}" stroke-width="3" fill="${C.yellow}"/>` +
      `<text x="150" y="146" class="tiny">⭐ since 1986</text>` +
      // stall right
      `<rect x="270" y="70" width="190" height="120" rx="4" fill="${C.white}" ${stroke}/>` +
      `<rect x="270" y="70" width="190" height="34" fill="${C.purple}" ${stroke}/><text x="365" y="94" text-anchor="middle" class="sign small" fill="${C.white}">LAKSA CARBONARA</text>` +
      `<path d="M280,104 L300,116 L320,104 L340,116 L360,104 L380,116 L400,104 L420,116 L440,104 L450,110" fill="none" stroke="${C.yellow}" stroke-width="4"/>` +
      `<text x="380" y="150" class="tiny">✨ NEW ✨</text>` +
      person({ x: 320, y: 190, s: 0.6, hairStyle: 'spiky', hair: C.pink, shirt: C.navy, expr: 'grin', pose: 'wave' }) +
      `<rect x="270" y="168" width="190" height="22" fill="${C.purple}" ${stroke}/>` +
      `<rect x="0" y="206" width="480" height="94" fill="#d8cbb8"/><path d="M0,206 L480,206" ${stroke}/>` +
      queue +
      `<text x="20" y="150" class="tiny">⏱ 30 min</text>` +
      `<ellipse cx="400" cy="262" rx="60" ry="14" fill="${C.white}" ${stroke}/>` +
      person({ x: 240, y: 290, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'open', cls: 'bob' }) +
      `<text x="262" y="180" class="sfx">?</text>`,
    '#f6e7cf',
  )
}

const rain: Painter = (you) => {
  const drops = Array.from({ length: 60 }, (_, i) => {
    const x = (i * 53) % 480
    const y = (i * 37) % 300
    return `<path d="M${x},${y} L${x - 6},${y + 16}" stroke="#bcd3f2" stroke-width="2.5" stroke-linecap="round"/>`
  }).join('')
  return frame(
    cloud(10, 10, 1.6, '#6c7a92') + cloud(200, 0, 1.8, '#5b6880') + cloud(360, 16, 1.4, '#6c7a92') +
      `<path d="M300,60 L284,100 L298,100 L280,140" fill="none" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" class="flash"/>` +
      hdb(380, 110, 70, 130, '#8a94a6') +
      `<rect x="0" y="240" width="480" height="60" fill="#4a5466"/><path d="M0,240 L480,240" ${stroke}/>` +
      `<ellipse cx="120" cy="270" rx="40" ry="6" fill="#6f7d96"/><ellipse cx="380" cy="282" rx="50" ry="6" fill="#6f7d96"/>` +
      // shelter
      `<path d="M120,96 L340,96 L330,116 L130,116Z" fill="${C.green}" ${stroke}/>` +
      `<path d="M140,116 L140,240 M320,116 L320,240" stroke="${INK}" stroke-width="7"/>` +
      `<rect x="170" y="196" width="120" height="10" rx="3" fill="${C.grey}" ${stroke}/>` +
      `<rect x="340" y="120" width="30" height="40" rx="4" fill="${C.white}" ${stroke}/><text x="355" y="138" text-anchor="middle" class="tiny">BUS</text><text x="355" y="152" text-anchor="middle" class="tiny">7 · 14</text>` +
      person({ x: 230, y: 250, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'worried', cls: 'shiver' }) +
      `<g class="rain">${drops}</g>`,
    '#7b889e',
  )
}

const cafe: Painter = (you) =>
  frame(
    // window onto shophouses
    `<rect x="24" y="28" width="250" height="160" rx="8" fill="${C.sky}" ${stroke}/>` +
      [[34, C.pink], [92, C.yellow], [150, C.teal], [208, C.orange]].map(([x, c]) =>
        `<rect x="${x}" y="80" width="56" height="108" fill="${c}" ${stroke}/><path d="M${x},80 L${(x as number) + 28},62 L${(x as number) + 56},80Z" fill="${C.coral}" ${stroke}/>` +
        `<rect x="${(x as number) + 10}" y="96" width="14" height="20" rx="7" fill="${C.white}" ${stroke}/><rect x="${(x as number) + 32}" y="96" width="14" height="20" rx="7" fill="${C.white}" ${stroke}/>`,
      ).join('') +
      `<rect x="24" y="28" width="250" height="160" rx="8" fill="none" stroke="${INK}" stroke-width="5"/>` +
      // Bali poster
      `<rect x="320" y="30" width="120" height="90" rx="6" fill="${C.yellow}" ${stroke}/>` +
      `<circle cx="380" cy="70" r="20" fill="${C.orange}" ${stroke}/><path d="M330,110 Q380,86 430,110" fill="${C.teal}" ${stroke}/>` +
      `<text x="380" y="52" text-anchor="middle" class="sign small" fill="${INK}">BALI 🌴</text>` +
      `<text x="420" y="152" class="sfx small float">✈️</text>` +
      // table, laptop, latte
      `<rect x="0" y="236" width="480" height="64" fill="${C.wood}"/><path d="M0,236 L480,236" ${stroke}/>` +
      person({ x: 300, y: 262, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'sit', chair: C.brown, expr: 'calm' }) +
      `<rect x="180" y="224" width="260" height="14" rx="4" fill="${C.brown}" ${stroke}/>` +
      `<path d="M340,224 L352,176 L428,176 L420,224Z" fill="${C.grey}" ${stroke}/>` +
      `<rect x="358" y="184" width="58" height="32" fill="${C.white}"/>` +
      `<path d="M358,192 L416,192 M358,200 L416,200 M358,208 L416,208 M374,184 L374,216 M392,184 L392,216" stroke="${C.green}" stroke-width="1.5"/>` +
      `<rect x="210" y="196" width="22" height="28" rx="4" fill="${C.white}" opacity=".85" ${stroke}/><rect x="213" y="208" width="16" height="14" fill="${C.brown}"/><path d="M226,196 L232,180" ${stroke}/>`,
    '#f9e4cf',
  )

const gardens: Painter = (you) =>
  frame(
    `<defs><linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a8b"/><stop offset=".6" stop-color="#ffc48c"/><stop offset="1" stop-color="#ffe3a3"/></linearGradient></defs>` +
      `<rect width="480" height="300" fill="url(#sunset)"/>` +
      `<circle cx="240" cy="170" r="40" fill="${C.yellow}" opacity=".85"/>` +
      mbs(330, 200, 0.9, '#c7738a') +
      supertree(70, 240, 170, C.purple, true) + supertree(170, 240, 130, '#7a6bb0', true) + supertree(400, 240, 150, C.purple, true) +
      `<path d="M70,140 Q120,128 170,150" fill="none" stroke="${INK}" stroke-width="5"/><path d="M70,140 Q120,128 170,150" fill="none" stroke="${C.grey}" stroke-width="2"/>` +
      `<rect x="0" y="240" width="480" height="60" fill="${C.leaf}"/><path d="M0,240 L480,240" ${stroke}/>` +
      `<path d="M0,268 L480,262" stroke="${C.cream}" stroke-width="14"/>` +
      person({ x: 150, y: 286, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'smile' }) +
      person({ x: 330, y: 284, s: 0.9, ...SAM, pose: 'wave', expr: 'grin', cls: 'bob' }) +
      `<text x="226" y="214" class="sfx float">💗</text>`,
    '#ffc48c',
  )

const laupasat: Painter = (you, sceneId) => {
  const bill = sceneId === 'bill'
  return frame(
    `<defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b3f72"/><stop offset="1" stop-color="#c06c84"/></linearGradient></defs>` +
      `<rect width="480" height="300" fill="url(#dusk)"/>` +
      // Lau Pa Sat clock tower
      `<path d="M60,190 L60,110 L100,80 L140,110 L140,190Z" fill="#b7a5d6" ${stroke}/>` +
      `<path d="M90,80 L100,40 L110,80Z" fill="#b7a5d6" ${stroke}/><circle cx="100" cy="112" r="12" fill="${C.cream}" ${stroke}/><path d="M100,112 L100,104 M100,112 L106,114" ${stroke}/>` +
      hdb(320, 60, 50, 140, '#6b5b95', true) + hdb(380, 30, 60, 170, '#594a85', true) +
      // string lights
      `<path d="M0,40 Q120,80 240,40 Q360,80 480,40" fill="none" stroke="${INK}" stroke-width="2"/>` +
      Array.from({ length: 12 }, (_, i) => `<circle cx="${20 + i * 40}" cy="${50 + Math.sin((i / 11) * Math.PI * 2) * 6 + 10}" r="5" fill="${C.yellow}" class="twinkle" style="animation-delay:${i * 0.2}s"/>`).join('') +
      // satay grill and smoke
      `<rect x="160" y="180" width="140" height="30" rx="4" fill="${C.grey}" ${stroke}/>` +
      Array.from({ length: 9 }, (_, i) => `<path d="M${170 + i * 14},176 L${178 + i * 14},196" stroke="${C.brown}" stroke-width="4" stroke-linecap="round"/>`).join('') +
      `<g class="smoke"><circle cx="190" cy="150" r="14" fill="#fff" opacity=".35"/><circle cx="230" cy="130" r="18" fill="#fff" opacity=".3"/><circle cx="270" cy="150" r="12" fill="#fff" opacity=".35"/></g>` +
      `<rect x="0" y="210" width="480" height="90" fill="#3a2f55"/><path d="M0,210 L480,210" ${stroke}/>` +
      // table + diners
      person({ x: 140, y: 286, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'sit', chair: C.red, expr: bill ? 'calm' : 'open' }) +
      person({ x: 340, y: 286, s: 0.9, ...SAM, pose: 'sit', chair: C.red, expr: bill ? 'smile' : 'worried', flip: true }) +
      `<rect x="150" y="246" width="180" height="12" rx="4" fill="${C.wood}" ${stroke}/><path d="M240,258 L240,298" stroke="${INK}" stroke-width="6"/>` +
      (bill
        ? `<g class="pop-in"><path d="M218,190 L262,190 L262,244 L254,240 L246,244 L238,240 L230,244 L218,240Z" fill="${C.white}" ${stroke}/><text x="240" y="208" text-anchor="middle" class="tiny">BILL</text><text x="240" y="228" text-anchor="middle" class="tiny bold">$58.40</text></g>`
        : `<ellipse cx="210" cy="244" rx="20" ry="5" fill="${C.white}" ${stroke}/><path d="M196,242 L222,232 M200,244 L226,236" stroke="${C.brown}" stroke-width="3"/>` +
          `<rect x="258" y="224" width="14" height="22" rx="3" fill="#cdeac0" ${stroke}/>` +
          `<text x="324" y="150" class="sfx small">🥐 !!</text>`),
    '#4b3f72',
  )
}

const marina: Painter = (you) => {
  const stars = Array.from({ length: 24 }, (_, i) => `<circle cx="${(i * 97) % 480}" cy="${(i * 41) % 120}" r="${(i % 3) + 1}" fill="${C.white}" class="twinkle" style="animation-delay:${i * 0.13}s"/>`).join('')
  return frame(
    stars +
      `<g class="lasers"><path d="M200,96 L60,0 M216,96 L250,0 M230,96 L420,0" stroke="${C.teal}" stroke-width="3" opacity=".7"/><path d="M210,96 L140,0 M222,96 L340,0" stroke="${C.pink}" stroke-width="3" opacity=".7"/></g>` +
      mbs(170, 214, 1, '#2c3b6b', true) +
      // ArtScience lotus
      `<path d="M50,214 Q40,180 60,170 Q66,190 74,172 Q84,190 92,172 Q102,186 104,170 Q122,184 108,214Z" fill="${C.cream}" ${stroke}/>` +
      `<path d="M380,214 L380,180 L420,180 L420,214Z" fill="#3b4c80" ${stroke}/>` +
      `<rect x="0" y="214" width="480" height="50" fill="#14224a"/>` +
      `<g class="ripple">${Array.from({ length: 10 }, (_, i) => `<path d="M${20 + i * 46},${226 + (i % 3) * 10} l24,0" stroke="${i % 2 ? C.yellow : C.teal}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`).join('')}</g>` +
      `<path d="M0,214 L480,214" ${stroke}/>` +
      `<rect x="0" y="262" width="480" height="38" fill="#3b3550"/><path d="M0,262 L480,262" ${stroke}/>` +
      `<path d="M0,252 L480,252" stroke="${C.grey}" stroke-width="4"/>` +
      person({ x: 210, y: 300, s: 0.85, shirt: you.shirt, hairStyle: you.hairStyle, back: true, pose: 'down' }) +
      person({ x: 270, y: 300, s: 0.85, ...SAM, back: true, pose: 'down' }) +
      `<text x="234" y="190" class="sfx float">💭</text>`,
    '#0d1838',
  )
}

const bus: Painter = (you) => {
  const bokeh = Array.from({ length: 18 }, (_, i) => `<circle cx="${30 + ((i * 71) % 420)}" cy="${60 + ((i * 29) % 90)}" r="${6 + (i % 4) * 3}" fill="${[C.yellow, C.coral, C.teal, C.pink][i % 4]}" opacity=".45"/>`).join('')
  return frame(
    `<rect x="20" y="24" width="440" height="150" rx="16" fill="#101a3a" ${stroke}/>` +
      `<g class="drift">${bokeh}</g>` +
      `<rect x="20" y="24" width="440" height="150" rx="16" fill="none" stroke="${INK}" stroke-width="6"/>` +
      `<rect x="0" y="174" width="480" height="126" fill="#5d4c7e"/><path d="M0,174 L480,174" ${stroke}/>` +
      `<rect x="40" y="196" width="150" height="80" rx="14" fill="${C.red}" ${stroke}/><rect x="300" y="196" width="150" height="80" rx="14" fill="${C.red}" ${stroke}/>` +
      person({ x: 370, y: 284, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'phone', expr: 'smile' }) +
      `<rect x="300" y="240" width="150" height="40" rx="10" fill="${C.red}" ${stroke}/>` +
      `<g class="pop-in"><rect x="200" y="196" width="70" height="30" rx="8" fill="${C.white}" ${stroke}/><rect x="208" y="204" width="40" height="14" rx="2" fill="none" stroke="${INK}" stroke-width="2"/><rect x="210" y="206" width="5" height="10" fill="${C.red}"/><rect x="248" y="208" width="4" height="6" fill="${INK}"/><text x="258" y="216" class="tiny">3%</text></g>`,
    '#5d4c7e',
  )
}

const PAINTERS: Record<ArtKey, Painter> = {
  bedroom, kopitiam, chope, mrt, orchard, hawker, rain, cafe, gardens, laupasat, marina, bus,
  ...WORK_PAINTERS,
  ...OVERSEAS_PAINTERS,
}

export function paint(key: ArtKey, you: Look, sceneId: string): string {
  return PAINTERS[key](you, sceneId)
}

/** Standalone avatar used on the intro screen, the drag token and the results. */
export function avatarSvg(you: Look, size = 120, expr: 'smile' | 'grin' = 'grin'): string {
  return `<svg viewBox="-40 -135 80 140" width="${size}" height="${size * 1.75}" xmlns="http://www.w3.org/2000/svg">${person({ x: 0, y: 0, shirt: you.shirt, hairStyle: you.hairStyle, expr, pose: 'wave' })}</svg>`
}

export function headSvg(you: Look, size = 56): string {
  return `<svg viewBox="-30 -128 60 60" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${person({ x: 0, y: 0, shirt: you.shirt, hairStyle: you.hairStyle, expr: 'grin' })}</svg>`
}
