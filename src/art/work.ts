import { C, INK, bubble, frame, person, stroke, type Painter } from './kit'

/** Monday office scenes. */

const BOSS = { hairStyle: 'short' as const, hair: '#8a8a8a', shirt: C.navy, pants: '#2b2b3a', glasses: true }

const lift: Painter = (you) =>
  frame(
    `<rect x="0" y="0" width="480" height="240" fill="#efe6d8"/>` +
      Array.from({ length: 8 }, (_, i) => `<path d="M${i * 64},0 L${i * 64},240" stroke="#e2d6c3" stroke-width="3"/>`).join('') +
      `<rect x="0" y="240" width="480" height="60" fill="#c9bfae"/><path d="M0,240 L480,240" ${stroke}/>` +
      // closed lift on the left
      `<rect x="34" y="70" width="110" height="170" rx="4" fill="${C.grey}" ${stroke}/><path d="M89,70 L89,240" ${stroke}/>` +
      `<rect x="64" y="40" width="50" height="22" rx="4" fill="${INK}"/><text x="89" y="56" text-anchor="middle" class="tiny" fill="${C.coral}" style="fill:${C.coral}">12 ▼</text>` +
      // open lift with the big boss inside
      `<rect x="190" y="70" width="140" height="170" rx="4" fill="#d9c8a8" ${stroke}/>` +
      `<rect x="200" y="80" width="120" height="160" fill="#b89a6d" opacity=".5"/>` +
      person({ x: 262, y: 236, s: 0.9, ...BOSS, expr: 'calm', pose: 'down' }) +
      `<path d="M190,70 L176,70 L176,240 L190,240Z M330,70 L344,70 L344,240 L330,240Z" fill="${C.grey}" ${stroke}/>` +
      `<rect x="232" y="40" width="60" height="22" rx="4" fill="${INK}"/><text x="262" y="56" text-anchor="middle" class="tiny" style="fill:${C.yellow}">1 ▲ 30</text>` +
      `<rect x="356" y="140" width="16" height="30" rx="4" fill="${C.white}" ${stroke}/><circle cx="364" cy="150" r="3" fill="${C.yellow}"/><circle cx="364" cy="161" r="3" fill="${C.grey}"/>` +
      `<text x="288" y="30" class="sfx small">ding!</text>` +
      // plant
      `<path d="M430,240 L424,206 L460,206 L454,240Z" fill="${C.orange}" ${stroke}/>` +
      `<path d="M442,206 Q430,170 438,150 M442,206 Q458,176 468,170 M442,206 Q446,178 452,160" fill="none" stroke="${C.leaf}" stroke-width="6" stroke-linecap="round"/>` +
      person({ x: 400, y: 290, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'phone', expr: 'worried', flip: true }) +
      `<text x="372" y="140" class="sfx small">😬</text>`,
    '#efe6d8',
  )

const office: Painter = (you, sceneId) => {
  const late = sceneId === 'mon-deadline'
  const slides = sceneId === 'mon-feedback'
  const sky = late ? '#ffb38a' : '#bfe6ff'
  const towers = [[30, 70, 60], [100, 40, 50], [160, 90, 46], [216, 56, 56]]
    .map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${150 - y}" fill="${late ? '#8e7dbe' : '#9fb8d6'}" ${stroke}/>` +
      Array.from({ length: Math.floor((150 - y) / 14) }, (_, r) => `<path d="M${x + 6},${y + 10 + r * 14} L${x + w - 6},${y + 10 + r * 14}" stroke="${late ? C.yellow : C.white}" stroke-width="3" opacity=".7"/>`).join(''))
    .join('')
  const screen = slides
    ? `<rect x="292" y="132" width="104" height="58" fill="${C.white}"/><rect x="300" y="140" width="50" height="8" fill="${C.navy}"/><path d="M300,158 L380,158 M300,168 L370,168 M300,178 L360,178" stroke="${C.grey}" stroke-width="4"/>` +
      `<circle cx="372" cy="170" r="12" fill="none" stroke="${C.red}" stroke-width="3"/><text x="384" y="150" class="tiny" style="fill:${C.red}">✗</text>`
    : `<rect x="292" y="132" width="104" height="58" fill="#e8f6f3"/>` +
      `<rect x="300" y="140" width="60" height="12" rx="6" fill="${C.white}" ${stroke}/><rect x="328" y="158" width="60" height="12" rx="6" fill="#d6f5c7" ${stroke}/><rect x="300" y="176" width="44" height="10" rx="5" fill="${C.white}" ${stroke}/>`
  return frame(
    `<rect x="16" y="20" width="260" height="140" rx="6" fill="${sky}" ${stroke}/>` + towers +
      `<rect x="16" y="20" width="260" height="140" rx="6" fill="none" stroke="${INK}" stroke-width="5"/><path d="M146,20 L146,160" stroke="${INK}" stroke-width="4"/>` +
      // clock
      `<circle cx="420" cy="60" r="26" fill="${C.white}" ${stroke}/><path d="M420,60 L420,${late ? 42 : 40} M420,60 L${late ? 434 : 434},${late ? 72 : 60}" ${stroke}/>` +
      `<rect x="0" y="262" width="480" height="38" fill="#b8b0a4"/><path d="M0,262 L480,262" ${stroke}/>` +
      // you on an office chair, behind the desk (desk top at chest height so your face stays clear)
      person({ x: 236, y: 288, s: 0.9, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'sit', chair: '#5b6b8c', expr: late ? 'smile' : slides ? 'worried' : 'calm' }) +
      `<rect x="140" y="238" width="320" height="12" rx="4" fill="${C.wood}" ${stroke}/><path d="M156,250 L156,292 M444,250 L444,292" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
      // monitor + mug on the desk
      `<rect x="290" y="150" width="120" height="74" rx="6" fill="${INK}"/><g transform="translate(6,26)">${screen}</g>` +
      `<path d="M350,224 L350,238 M332,238 L368,238" stroke="${INK}" stroke-width="6"/>` +
      `<rect x="170" y="222" width="18" height="16" rx="3" fill="${C.white}" ${stroke}/><path d="M188,226 Q196,230 188,234" fill="none" ${stroke} stroke-width="2.5"/>` +
      // colleague
      (late
        ? person({ x: 90, y: 290, s: 0.85, hairStyle: 'long', hair: '#2a1b14', shirt: C.purple, pants: C.navy, pose: 'wave', expr: 'grin' }) +
          `<rect x="64" y="236" width="26" height="24" rx="4" fill="${C.brown}" ${stroke}/>` + bubble(110, 150, 104, 'Bye, see you!')
        : person({ x: 90, y: 290, s: 0.85, hairStyle: 'spiky', hair: '#222', shirt: C.white, pants: C.navy, pose: 'phone', expr: 'calm' })),
    '#f3ede2',
  )
}

const meeting: Painter = (you) => {
  const notes = [[60, 70, C.yellow], [110, 92, C.pink], [160, 66, C.teal], [212, 90, C.yellow], [86, 120, C.orange]]
    .map(([x, y, c]) => `<rect x="${x}" y="${y}" width="36" height="30" fill="${c}" ${stroke} transform="rotate(${((x as number) % 7) - 3} ${(x as number) + 18} ${(y as number) + 15})"/>`)
    .join('')
  return frame(
    `<rect x="30" y="24" width="250" height="150" rx="6" fill="${C.white}" ${stroke}/>` +
      `<text x="50" y="52" class="sign small" fill="${INK}">More young users?</text>` + notes +
      `<path d="M220,140 Q240,120 262,140" fill="none" stroke="${C.red}" stroke-width="3"/>` +
      `<text x="330" y="60" class="sfx float">💡</text>` +
      `<rect x="0" y="240" width="480" height="60" fill="#c3b8a8"/><path d="M0,240 L480,240" ${stroke}/>` +
      person({ x: 330, y: 270, s: 0.8, hairStyle: 'bob', hair: '#3a2a33', shirt: C.pink, pants: C.navy, pose: 'sit', chair: '#5b6b8c', expr: 'open' }) +
      person({ x: 400, y: 270, s: 0.8, hairStyle: 'short', hair: '#8a8a8a', shirt: C.navy, glasses: true, pants: C.navy, pose: 'sit', chair: '#5b6b8c', expr: 'calm' }) +
      `<path d="M240,232 L470,232 L460,252 L250,252Z" fill="${C.wood}" ${stroke}/>` +
      `<rect x="300" y="218" width="30" height="14" rx="3" fill="${C.grey}" ${stroke}/><rect x="380" y="222" width="14" height="10" rx="2" fill="${C.white}" ${stroke}/>` +
      person({ x: 200, y: 290, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'wave', expr: 'grin', flip: true }),
    '#f3ede2',
  )
}

const pantry: Painter = (you) =>
  frame(
    `<rect x="0" y="0" width="480" height="300" fill="#e8f0ee"/>` +
      Array.from({ length: 10 }, (_, i) => `<rect x="${i * 48}" y="90" width="44" height="44" fill="#d5e6e1" ${stroke} stroke-opacity=".15"/>`).join('') +
      // cabinets + counter
      `<rect x="20" y="20" width="300" height="60" rx="4" fill="${C.teal}" ${stroke}/><path d="M120,20 L120,80 M220,20 L220,80" ${stroke}/>` +
      `<rect x="20" y="170" width="300" height="80" rx="4" fill="${C.teal}" ${stroke}/><rect x="14" y="160" width="312" height="14" rx="4" fill="${C.cream}" ${stroke}/>` +
      // kettle, milo tin, sachets
      `<path d="M50,160 L54,124 L90,124 L94,160Z" fill="${C.grey}" ${stroke}/><path d="M94,132 Q108,134 102,150" fill="none" ${stroke}/>` +
      `<rect x="120" y="120" width="34" height="40" rx="4" fill="${C.green}" ${stroke}/><text x="137" y="146" text-anchor="middle" class="tiny" style="fill:#fff">MILO</text>` +
      `<rect x="168" y="138" width="16" height="22" rx="2" fill="${C.red}" ${stroke}/><rect x="188" y="138" width="16" height="22" rx="2" fill="${C.red}" ${stroke}/><text x="186" y="132" class="tiny">3in1</text>` +
      // fridge
      `<rect x="350" y="40" width="100" height="210" rx="8" fill="${C.white}" ${stroke}/><path d="M350,120 L450,120" ${stroke}/>` +
      `<circle cx="372" cy="70" r="6" fill="${C.coral}"/><rect x="392" y="140" width="22" height="16" fill="${C.yellow}" ${stroke}/>` +
      `<rect x="0" y="250" width="480" height="50" fill="#c9d3d0"/><path d="M0,250 L480,250" ${stroke}/>` +
      // boss peeking in
      person({ x: 420, y: 296, s: 0.9, hairStyle: 'short', hair: '#8a8a8a', shirt: C.navy, glasses: true, pants: '#2b2b3a', pose: 'wave', expr: 'grin', flip: true }) +
      bubble(300, 110, 128, 'Client in 5 mins!') +
      person({ x: 250, y: 296, s: 0.95, shirt: you.shirt, hairStyle: you.hairStyle, pose: 'down', expr: 'open' }) +
      `<rect x="268" y="244" width="16" height="18" rx="3" fill="${C.white}" ${stroke}/>` +
      `<text x="210" y="160" class="sfx">!?</text>`,
    '#e8f0ee',
  )

export const WORK_PAINTERS = { lift, office, meeting, pantry }
