import type { NoteId } from '@/types/types'

export const getNoteIdFromKeyCode = (keyCode: number): NoteId | null => {
  switch (keyCode) {
    case 90:
      return { note: 0, octave: 1 }

    case 83:
      return { note: 1, octave: 1 }

    case 88:
      return { note: 2, octave: 1 }

    case 68:
      return { note: 3, octave: 1 }

    case 67:
      return { note: 4, octave: 1 }

    case 86:
      return { note: 5, octave: 1 }

    case 71:
      return { note: 6, octave: 1 }

    case 66:
      return { note: 7, octave: 1 }

    case 72:
      return { note: 8, octave: 1 }

    case 78:
      return { note: 9, octave: 1 }

    case 74:
      return { note: 10, octave: 1 }

    case 77:
      return { note: 11, octave: 1 }

    case 81:
      return { note: 0, octave: 2 }

    case 50:
      return { note: 1, octave: 2 }

    case 87:
      return { note: 2, octave: 2 }

    case 51:
      return { note: 3, octave: 2 }

    case 69:
      return { note: 4, octave: 2 }

    case 82:
      return { note: 5, octave: 2 }

    case 53:
      return { note: 6, octave: 2 }

    case 84:
      return { note: 7, octave: 2 }

    case 54:
      return { note: 8, octave: 2 }

    case 89:
      return { note: 9, octave: 2 }

    case 55:
      return { note: 10, octave: 2 }

    case 85:
      return { note: 11, octave: 2 }

    case 73:
      return { note: 0, octave: 3 }

    case 57:
      return { note: 1, octave: 3 }

    case 79:
      return { note: 2, octave: 3 }

    case 48:
      return { note: 3, octave: 3 }

    case 80:
      return { note: 4, octave: 3 }

    default:
      return null
  }
}
