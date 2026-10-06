import { AXES, type Answer, type Axis, type Pole } from './model'

export interface AxisResult {
  axis: Axis
  left: Pole
  right: Pole
  leftName: string
  rightName: string
  /** Percentage (0–100) leaning to the left pole. */
  leftPct: number
  winner: Pole
  /** The answers that pushed hardest towards the winning pole. */
  drivers: Answer[]
}

export interface Result {
  type: string
  axes: AxisResult[]
}

export function score(answers: Answer[]): Result {
  const total: Record<Pole, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  for (const a of answers) {
    for (const [pole, v] of Object.entries(a.w) as [Pole, number][]) total[pole] += v
  }

  const axes = AXES.map(({ axis, left, right, leftName, rightName }) => {
    const sum = total[left] + total[right]
    // Laplace smoothing keeps a single answer from producing a cartoonish 100/0 split.
    const leftPct = Math.round(((total[left] + 0.5) / (sum + 1)) * 100)
    let winner: Pole = leftPct >= 50 ? left : right
    if (leftPct === 50) {
      // Dead heat: let the most recent answer on this axis break the tie.
      const last = [...answers].reverse().find((a) => a.w[left] || a.w[right])
      if (last) winner = (last.w[left] ?? 0) >= (last.w[right] ?? 0) ? left : right
    }
    const drivers = answers
      .filter((a) => (a.w[winner] ?? 0) > 0)
      .sort((a, b) => (b.w[winner] ?? 0) - (a.w[winner] ?? 0))
      .slice(0, 2)
    return { axis, left, right, leftName, rightName, leftPct, winner, drivers }
  })

  return { type: axes.map((a) => a.winner).join(''), axes }
}
