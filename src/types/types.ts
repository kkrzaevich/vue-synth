import type { Sound } from './sound'

export type oscType = 'sine' | 'triangle' | 'square' | 'sawtooth'

export interface Settings {
  attack: number
  release: number
  sustain: number
  decay: number
  oscType: oscType
  volume: number
  transposition: number
  filterFreq: number
  stereoWidth: number
  delayVolume: number
  delayTime: number
  delayFeedback: number
}

export class Preset {
  constructor(name: string, settings: Settings) {
    this.name = name
    this.settings = settings
  }
  name: string
  settings: Settings
}

export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export type Octave = {
  octaveClass: string
  keyData: {
    keyStyle: string
    keyButton: { name: string; code: number | null }
    note: Note
    sound: Sound | null
  }[]
}

export type Keyboard = Octave[]
