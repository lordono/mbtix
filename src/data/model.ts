export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
export type Axis = 'EI' | 'SN' | 'TF' | 'JP'
export type Weights = Partial<Record<Pole, number>>

export const AXES: { axis: Axis; left: Pole; right: Pole; leftName: string; rightName: string }[] = [
  { axis: 'EI', left: 'E', right: 'I', leftName: 'Extraverted', rightName: 'Introverted' },
  { axis: 'SN', left: 'S', right: 'N', leftName: 'Sensing', rightName: 'Intuitive' },
  { axis: 'TF', left: 'T', right: 'F', leftName: 'Thinking', rightName: 'Feeling' },
  { axis: 'JP', left: 'J', right: 'P', leftName: 'Judging', rightName: 'Perceiving' },
]

export interface Choice {
  label: string
  sub?: string
  emoji?: string
  w: Weights
}

export interface SliderEnd {
  label: string
  emoji: string
  pole: Pole
}

export interface DropZone extends Choice {
  /** Position inside the illustration, in percent. */
  x: number
  y: number
  width: number
  height: number
}

export type Interaction =
  | { kind: 'cards'; options: Choice[] }
  | { kind: 'chat'; contact: string; contactEmoji: string; incoming: string[]; options: Choice[] }
  | { kind: 'slider'; left: SliderEnd; right: SliderEnd; weight: number; ticks: string[] }
  | { kind: 'drag'; token: string; zones: DropZone[] }
  | { kind: 'timer'; seconds: number; options: Choice[]; timeout: Choice }

export type ArtKey =
  | 'bedroom'
  | 'kopitiam'
  | 'chope'
  | 'mrt'
  | 'orchard'
  | 'hawker'
  | 'rain'
  | 'cafe'
  | 'gardens'
  | 'laupasat'
  | 'marina'
  | 'bus'
  // Monday
  | 'lift'
  | 'office'
  | 'meeting'
  | 'pantry'
  // Sunday overseas
  | 'hotel'
  | 'konbini'
  | 'crossing'
  | 'ramen'
  | 'shrine'
  | 'airport'
  | 'plane'

export interface Scene {
  id: string
  time: string
  station: string
  art: ArtKey
  /** Time of day for the 3D sky, 0 = dawn … 1 = night. */
  tod: number
  title: string
  narration: string
  prompt: string
  interaction: Interaction
}

/** What the player picked in a scene, kept for the "why you got this" breakdown. */
export interface Answer {
  sceneId: string
  summary: string
  w: Weights
}

export interface Journey {
  id: 'mon' | 'sat' | 'sun'
  day: string
  title: string
  tagline: string
  emoji: string
  /** MRT line colour used for the progress bar. */
  line: string
  lineName: string
  /** Which 3D skyline to show behind the story. */
  theme: 'sg' | 'tokyo'
  scenes: Scene[]
}
