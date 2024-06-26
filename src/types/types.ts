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
