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
  constructor(id: number, name: string, author: string, settings: Settings) {
    this.id = id
    this.name = name
    this.author = author
    this.settings = settings
  }
  id: number
  name: string
  author: string
  settings: Settings
}

export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export type NoteId = {
  note: number
  octave: number
}

export type Octave = {
  octaveClass: string
  keyData: {
    keyStyle: string
    keyButton: {
      id: NoteId
      name: string
      code: number | null
    }
    note: Note
    sound: Sound | null
    keyboardInput: boolean
    mouseInput: boolean
  }[]
}

export type userCredentials = {
  email: string
  password: string
  username: string
}

export type userData = {
  id: string
  email: string
  username: string
}

export type Keyboard = Octave[]
