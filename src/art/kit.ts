/**
 * Tiny SVG illustration kit. Every scene is drawn from these primitives so the
 * whole journey shares one cartoon style: chunky ink outlines, flat fills,
 * round heads, blush cheeks.
 */
export const INK = '#2b2136'
export const C = {
  cream: '#fff4e0',
  coral: '#ff6b6b',
  red: '#e63946',
  teal: '#2ec4b6',
  yellow: '#ffd166',
  orange: '#f4a261',
  navy: '#1d2b53',
  green: '#57a773',
  leaf: '#3d8b5a',
  pink: '#f7a1c4',
  purple: '#8e7dbe',
  sky: '#bfe6ff',
  brown: '#8d5b4c',
  wood: '#c98b5e',
  grey: '#c9ced6',
  white: '#ffffff',
}

export interface Look {
  shirt: string
  hairStyle: HairStyle
}

/** Draws one scene for the player's look; sceneId picks variants when a scene is reused. */
export type Painter = (you: Look, sceneId: string) => string

export type HairStyle = 'short' | 'bob' | 'bun' | 'spiky' | 'long' | 'bald'
export type Pose = 'down' | 'wave' | 'phone' | 'up' | 'tray' | 'sit'
export type Expr = 'smile' | 'open' | 'worried' | 'calm' | 'grin'

export interface PersonOpts {
  x: number
  y: number
  s?: number
  skin?: string
  hair?: string
  hairStyle?: HairStyle
  shirt?: string
  pants?: string
  pose?: Pose
  expr?: Expr
  glasses?: boolean
  back?: boolean
  flip?: boolean
  cls?: string
  /** Seat colour; when set (with pose 'sit') a chair is drawn behind the person. */
  chair?: string
}

const stroke = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`

function hairPath(style: HairStyle, color: string, back: boolean): string {
  if (back) {
    // Seen from behind: hair covers the whole head.
    const len = style === 'long' || style === 'bob' ? -78 : -88
    return `<path d="M-23,${len} Q-27,-124 0,-122 Q27,-124 23,${len} Q0,${len + 6} -23,${len}Z" fill="${color}" ${stroke}/>` +
      (style === 'bun' ? `<circle cx="0" cy="-124" r="9" fill="${color}" ${stroke}/>` : '')
  }
  switch (style) {
    case 'short':
      return `<path d="M-22,-96 Q-24,-123 0,-121 Q24,-123 22,-96 Q16,-108 2,-107 Q-10,-111 -22,-96Z" fill="${color}" ${stroke}/>`
    case 'bob':
      return `<path d="M-24,-80 Q-29,-124 0,-122 Q29,-124 24,-80 L17,-80 Q19,-102 6,-108 Q-6,-101 -17,-104 Q-18,-92 -17,-80Z" fill="${color}" ${stroke}/>`
    case 'long':
      return `<path d="M-24,-66 Q-30,-124 0,-122 Q30,-124 24,-66 L17,-70 Q19,-102 6,-108 Q-6,-101 -17,-104 Q-18,-88 -17,-70Z" fill="${color}" ${stroke}/>`
    case 'bun':
      return `<circle cx="0" cy="-124" r="9" fill="${color}" ${stroke}/>` +
        `<path d="M-22,-94 Q-24,-122 0,-121 Q24,-122 22,-94 Q12,-110 0,-108 Q-12,-110 -22,-94Z" fill="${color}" ${stroke}/>`
    case 'spiky':
      return `<path d="M-22,-98 L-20,-118 L-10,-112 L-4,-127 L5,-113 L15,-122 L17,-110 L23,-98 Q4,-110 -22,-98Z" fill="${color}" ${stroke}/>`
    case 'bald':
      return `<path d="M-22,-96 Q-22,-106 -17,-108 M22,-96 Q22,-106 17,-108" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
  }
}

function mouth(expr: Expr): string {
  switch (expr) {
    case 'smile':
      return `<path d="M-6,-87 Q0,-81 6,-87" fill="none" ${stroke}/>`
    case 'grin':
      return `<path d="M-8,-88 Q0,-78 8,-88Z" fill="${C.white}" ${stroke}/>`
    case 'open':
      return `<ellipse cx="0" cy="-85" rx="4" ry="5" fill="${INK}"/>`
    case 'worried':
      return `<path d="M-6,-84 Q0,-89 6,-84" fill="none" ${stroke}/>`
    case 'calm':
      return `<path d="M-5,-86 L5,-86" fill="none" ${stroke}/>`
  }
}

function arm(x1: number, y1: number, x2: number, y2: number, shirt: string, skin: string): string {
  return (
    `<path d="M${x1},${y1} L${x2},${y2}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M${x1},${y1} L${x2},${y2}" stroke="${shirt}" stroke-width="7" stroke-linecap="round"/>` +
    `<circle cx="${x2}" cy="${y2}" r="5.5" fill="${skin}" ${stroke}/>`
  )
}

export function person(o: PersonOpts): string {
  const {
    x, y, s = 1, skin = '#f5c9a5', hair = '#3a2a33', hairStyle = 'short',
    shirt = C.teal, pants = C.navy, pose = 'down', expr = 'smile',
    glasses = false, back = false, flip = false, cls = '', chair,
  } = o

  const sitting = pose === 'sit'
 // Seated, seen from the front: thighs point at the viewer, so we see two knees and the shins below.
  const legs = sitting
    ? `<rect x="-14" y="-24" width="10" height="22" rx="4" fill="${pants}" ${stroke}/>` +
      `<rect x="4" y="-24" width="10" height="22" rx="4" fill="${pants}" ${stroke}/>` +
      `<rect x="-18" y="-36" width="17" height="15" rx="7" fill="${pants}" ${stroke}/>` +
      `<rect x="1" y="-36" width="17" height="15" rx="7" fill="${pants}" ${stroke}/>` +
      `<ellipse cx="-10" cy="0" rx="9" ry="4.5" fill="${INK}"/><ellipse cx="10" cy="0" rx="9" ry="4.5" fill="${INK}"/>`
    : `<rect x="-15" y="-34" width="12" height="32" rx="5" fill="${pants}" ${stroke}/>` +
      `<rect x="3" y="-34" width="12" height="32" rx="5" fill="${pants}" ${stroke}/>` +
      `<ellipse cx="-10" cy="0" rx="9" ry="4.5" fill="${INK}"/><ellipse cx="10" cy="0" rx="9" ry="4.5" fill="${INK}"/>`

  const body = `<path d="M-21,-28 Q-23,-72 0,-74 Q23,-72 21,-28 Q0,-24 -21,-28Z" fill="${shirt}" ${stroke}/>`

  let arms = ''
  let extra = ''
  switch (pose) {
    case 'down':
      arms = arm(-17, -64, -26, -36, shirt, skin) + arm(17, -64, 26, -36, shirt, skin)
      break
    case 'wave':
      arms = arm(-17, -64, -26, -36, shirt, skin) + arm(17, -64, 34, -104, shirt, skin)
      break
    case 'up':
      arms = arm(-17, -64, -32, -112, shirt, skin) + arm(17, -64, 32, -112, shirt, skin)
      break
    case 'phone':
      extra = `<rect x="-7" y="-70" width="16" height="24" rx="3" fill="${INK}"/><rect x="-4.5" y="-67" width="11" height="17" rx="1.5" fill="#9be7ff" class="phone-glow"/>`
      arms = arm(-17, -64, -6, -50, shirt, skin) + arm(17, -64, 8, -50, shirt, skin)
      break
    case 'tray':
      extra =
        `<rect x="-34" y="-62" width="68" height="7" rx="3" fill="${C.orange}" ${stroke}/>` +
        `<rect x="-24" y="-80" width="14" height="18" rx="3" fill="${C.white}" ${stroke}/><rect x="-22" y="-76" width="10" height="6" fill="${C.brown}"/>` +
        `<ellipse cx="12" cy="-66" rx="14" ry="5" fill="${C.white}" ${stroke}/><rect x="4" y="-74" width="16" height="7" rx="2" fill="${C.yellow}" ${stroke}/>`
      arms = arm(-17, -64, -28, -56, shirt, skin) + arm(17, -64, 28, -56, shirt, skin)
      break
    case 'sit':
      arms = arm(-17, -64, -8, -42, shirt, skin) + arm(17, -64, 14, -42, shirt, skin)
      break
  }

  const face = back
    ? ''
    : `<circle cx="-8" cy="-97" r="2.8" fill="${INK}"/><circle cx="8" cy="-97" r="2.8" fill="${INK}"/>` +
      `<ellipse cx="-14" cy="-89" rx="4.5" ry="3" fill="#ff8fa3" opacity=".55"/><ellipse cx="14" cy="-89" rx="4.5" ry="3" fill="#ff8fa3" opacity=".55"/>` +
      mouth(expr) +
      (glasses
        ? `<circle cx="-8" cy="-97" r="7" fill="none" ${stroke}/><circle cx="8" cy="-97" r="7" fill="none" ${stroke}/><path d="M-1,-97 L1,-97" ${stroke}/>`
        : '')

  // The chair sits behind everything: backrest peeks out around the shoulders, seat under the hips.
  const seat = sitting && chair
    ? `<rect x="-28" y="-86" width="56" height="54" rx="10" fill="${chair}" ${stroke}/>` +
      `<path d="M-24,-30 L-26,0 M24,-30 L26,0" ${stroke} stroke-width="5"/>` +
      `<rect x="-31" y="-38" width="62" height="10" rx="5" fill="${chair}" ${stroke}/>`
    : ''

  const t = `translate(${x},${y}) scale(${flip ? -s : s},${s})`
  return (
    `<g class="person ${cls}" transform="${t}">` +
    seat + legs + body + (back ? '' : arms) +
    `<circle cx="0" cy="-96" r="22" fill="${skin}" ${stroke}/>` +
    face + hairPath(hairStyle, hair, back) + (back ? arms : '') + extra +
    `</g>`
  )
}

/** A generic HDB block with a grid of windows. */
export function hdb(x: number, y: number, w: number, h: number, color: string, lit = false): string {
  let windows = ''
  const cols = Math.max(2, Math.floor(w / 14))
  const rows = Math.max(3, Math.floor(h / 16))
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = lit && (r * 7 + c * 3) % 5 < 2
      windows += `<rect x="${x + 6 + c * ((w - 12) / cols)}" y="${y + 8 + r * ((h - 12) / rows)}" width="${(w - 12) / cols - 4}" height="${(h - 12) / rows - 6}" rx="1" fill="${on ? C.yellow : 'rgba(43,33,54,.18)'}"/>`
    }
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${color}" ${stroke}/>${windows}`
}

export function cloud(x: number, y: number, s = 1, fill = C.white): string {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,20 Q-4,4 12,4 Q16,-10 32,-4 Q44,-14 54,2 Q70,2 66,20Z" fill="${fill}" ${stroke}/></g>`
}

export function tree(x: number, y: number, s = 1): string {
  return (
    `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M-5,0 L-4,-50 L4,-50 L5,0Z" fill="${C.brown}" ${stroke}/>` +
    `<path d="M-50,-50 Q-58,-80 -30,-86 Q-20,-110 10,-100 Q40,-112 50,-84 Q66,-64 44,-50 Q0,-40 -50,-50Z" fill="${C.green}" ${stroke}/>` +
    `<path d="M-30,-70 Q-20,-80 -6,-76 M14,-86 Q26,-90 34,-80" fill="none" stroke="${C.leaf}" stroke-width="3" stroke-linecap="round"/>` +
    `</g>`
  )
}

export function supertree(x: number, y: number, h: number, color: string, lit: boolean): string {
  const top = y - h
  let lights = ''
  if (lit) {
    for (let i = 0; i < 9; i++) {
      const lx = x - 34 + i * 8.5
      lights += `<circle cx="${lx}" cy="${top + 4 + Math.abs(i - 4) * -1.5}" r="2.5" fill="${C.yellow}" class="twinkle" style="animation-delay:${i * 0.17}s"/>`
    }
  }
  return (
    `<path d="M${x - 9},${y} L${x - 4},${top + 20} L${x - 38},${top} L${x + 38},${top} L${x + 4},${top + 20} L${x + 9},${y}Z" fill="${color}" ${stroke}/>` +
    `<path d="M${x - 6},${y - 20} L${x + 6},${y - 50} M${x + 6},${y - 20} L${x - 6},${y - 50} M${x - 5},${y - 60} L${x + 5},${y - 90} M${x + 5},${y - 60} L${x - 5},${y - 90}" stroke="${INK}" stroke-width="1.5" opacity=".5"/>` +
    `<ellipse cx="${x}" cy="${top}" rx="38" ry="6" fill="${lit ? '#ff9ff3' : C.pink}" ${stroke}/>` +
    lights
  )
}

/** Marina Bay Sands-ish silhouette. */
export function mbs(x: number, y: number, s: number, fill: string, lit = false): string {
  const towers = [0, 34, 68]
    .map((dx) => `<path d="M${dx},0 L${dx + 4},-120 L${dx + 22},-120 L${dx + 24},0Z" fill="${fill}" ${stroke}/>` +
      (lit ? `<path d="M${dx + 8},-108 L${dx + 8},-10 M${dx + 16},-108 L${dx + 16},-10" stroke="${C.yellow}" stroke-width="1.5" stroke-dasharray="3 5" opacity=".9"/>` : ''))
    .join('')
  return (
    `<g transform="translate(${x},${y}) scale(${s})">` +
    towers +
    `<path d="M-10,-120 L104,-126 Q110,-124 104,-118 L-10,-114Z" fill="${fill}" ${stroke}/>` +
    `</g>`
  )
}

export function frame(inner: string, bg: string): string {
  return `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" class="art" role="img"><rect width="480" height="300" fill="${bg}"/>${inner}</svg>`
}

export { stroke }

export function suitcase(x: number, y: number, color: string, s = 1): string {
  return (
    `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M14,-46 L14,-58 L30,-58 L30,-46" fill="none" ${stroke}/>` +
    `<rect x="0" y="-46" width="44" height="44" rx="6" fill="${color}" ${stroke}/>` +
    `<path d="M10,-40 L10,-8 M34,-40 L34,-8" stroke="${INK}" stroke-width="2" opacity=".4"/>` +
    `<circle cx="8" cy="0" r="3.5" fill="${INK}"/><circle cx="36" cy="0" r="3.5" fill="${INK}"/>` +
    `</g>`
  )
}

/** Speech bubble with a tail pointing down-left. */
export function bubble(x: number, y: number, w: number, text: string): string {
  return (
    `<g class="pop-in"><path d="M${x + 14},${y + 30} L${x + 6},${y + 42} L${x + 26},${y + 30}Z" fill="#fff" ${stroke}/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="32" rx="12" fill="#fff" ${stroke}/>` +
    `<path d="M${x + 13},${y + 30} L${x + 25},${y + 30}" stroke="#fff" stroke-width="4"/>` +
    `<text x="${x + 12}" y="${y + 21}" class="tiny">${text}</text></g>`
  )
}
