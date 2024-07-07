import type { Note } from '@/types/types'

export const defineNoteFrequency = (note: Note, octave: number): number => {
  if (octave < 0 || octave > 7) {
    throw new Error('Invalid octave number')
  }

  const multiplier = Math.pow(2, octave)

  switch (note) {
    case 'C':
      return 32.7 * multiplier

    case 'C#':
      return 34.65 * multiplier

    case 'D':
      return 36.71 * multiplier

    case 'D#':
      return 38.89 * multiplier

    case 'E':
      return 41.2 * multiplier

    case 'F':
      return 43.65 * multiplier

    case 'F#':
      return 46.25 * multiplier

    case 'G':
      return 49.0 * multiplier

    case 'G#':
      return 51.91 * multiplier

    case 'A':
      return 55.0 * multiplier

    case 'A#':
      return 58.27 * multiplier

    case 'B':
      return 61.74 * multiplier

    default:
      return 32.7 * multiplier
  }
}
