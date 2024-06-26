import { type oscType } from '@/types/types'

export const getOscType = (sliderValue: number) => {
  switch (sliderValue) {
    case 0:
      return 'sine'
    case 33:
      return 'triangle'
    case 66:
      return 'square'
    case 99:
      return 'sawtooth'
    default:
      return 'sine'
  }
}

export const getOscSliderValue = (oscType: oscType) => {
  switch (oscType) {
    case 'sine':
      return 0
    case 'triangle':
      return 33
    case 'square':
      return 66
    case 'sawtooth':
      return 99
    default:
      return 0
  }
}
