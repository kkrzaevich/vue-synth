import { defineStore, storeToRefs } from 'pinia'
import { watch, onBeforeMount, ref } from 'vue'
import { defineNoteFrequency } from '@/hooks/defineNoteFrequency'
import type { Keyboard, NoteId } from '@/types/types'
import { Sound } from '@/types/sound'
import { useSettingsStore } from '@/stores/settings'

export const useKeyboardStore = defineStore('keyboard', () => {
  const settingStore = useSettingsStore()

  const settings = settingStore.getSettings()

  const { stereoWidth, transposition } = storeToRefs(settingStore)

  const context = ref<null | AudioContext>(null)

  const keyboard = ref<Keyboard>([
    {
      octaveClass: 'octave-1',
      keyData: [
        {
          keyStyle: 'key-white c-key',
          keyButton: { id: { note: 0, octave: 0 }, name: '', code: null },
          note: 'C',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black csh-key',
          keyButton: { id: { note: 1, octave: 0 }, name: '', code: null },
          note: 'C#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white d-key',
          keyButton: { id: { note: 2, octave: 0 }, name: '', code: null },
          note: 'D',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black dsh-key',
          keyButton: { id: { note: 3, octave: 0 }, name: '', code: null },
          note: 'D#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white e-key',
          keyButton: { id: { note: 4, octave: 0 }, name: '', code: null },
          note: 'E',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white f-key',
          keyButton: { id: { note: 5, octave: 0 }, name: '', code: null },
          note: 'F',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black fsh-key',
          keyButton: { id: { note: 6, octave: 0 }, name: '', code: null },
          note: 'F#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white g-key',
          keyButton: { id: { note: 7, octave: 0 }, name: '', code: null },
          note: 'G',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black gsh-key',
          keyButton: { id: { note: 8, octave: 0 }, name: '', code: null },
          note: 'G#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white a-key',
          keyButton: { id: { note: 9, octave: 0 }, name: '', code: null },
          note: 'A',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black ash-key',
          keyButton: { id: { note: 10, octave: 0 }, name: '', code: null },
          note: 'A#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white b-key',
          keyButton: { id: { note: 11, octave: 0 }, name: '', code: null },
          note: 'B',
          sound: null,
          playing: false
        }
      ]
    },
    {
      octaveClass: 'octave-2',
      keyData: [
        {
          keyStyle: 'key-white c-key',
          keyButton: { id: { note: 0, octave: 1 }, name: 'Z', code: 90 },
          note: 'C',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black csh-key',
          keyButton: { id: { note: 1, octave: 1 }, name: 'S', code: 83 },
          note: 'C#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white d-key',
          keyButton: { id: { note: 2, octave: 1 }, name: 'X', code: 88 },
          note: 'D',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black dsh-key',
          keyButton: { id: { note: 3, octave: 1 }, name: 'D', code: 68 },
          note: 'D#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white e-key',
          keyButton: { id: { note: 4, octave: 1 }, name: 'C', code: 67 },
          note: 'E',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white f-key',
          keyButton: { id: { note: 5, octave: 1 }, name: 'V', code: 86 },
          note: 'F',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black fsh-key',
          keyButton: { id: { note: 6, octave: 1 }, name: 'G', code: 71 },
          note: 'F#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white g-key',
          keyButton: { id: { note: 7, octave: 1 }, name: 'B', code: 66 },
          note: 'G',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black gsh-key',
          keyButton: { id: { note: 8, octave: 1 }, name: 'H', code: 72 },
          note: 'G#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white a-key',
          keyButton: { id: { note: 9, octave: 1 }, name: 'N', code: 78 },
          note: 'A',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black ash-key',
          keyButton: { id: { note: 10, octave: 1 }, name: 'J', code: 74 },
          note: 'A#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white b-key',
          keyButton: { id: { note: 11, octave: 1 }, name: 'M', code: 77 },
          note: 'B',
          sound: null,
          playing: false
        }
      ]
    },
    {
      octaveClass: 'octave-3',
      keyData: [
        {
          keyStyle: 'key-white c-key',
          keyButton: { id: { note: 0, octave: 2 }, name: 'Q', code: 81 },
          note: 'C',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black csh-key',
          keyButton: { id: { note: 1, octave: 2 }, name: '2', code: 50 },
          note: 'C#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white d-key',
          keyButton: { id: { note: 2, octave: 2 }, name: 'W', code: 87 },
          note: 'D',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black dsh-key',
          keyButton: { id: { note: 3, octave: 2 }, name: '3', code: 51 },
          note: 'D#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white e-key',
          keyButton: { id: { note: 4, octave: 2 }, name: 'E', code: 69 },
          note: 'E',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white f-key',
          keyButton: { id: { note: 5, octave: 2 }, name: 'R', code: 82 },
          note: 'F',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black fsh-key',
          keyButton: { id: { note: 6, octave: 2 }, name: '5', code: 53 },
          note: 'F#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white g-key',
          keyButton: { id: { note: 7, octave: 2 }, name: 'T', code: 84 },
          note: 'G',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black gsh-key',
          keyButton: { id: { note: 8, octave: 2 }, name: '6', code: 54 },
          note: 'G#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white a-key',
          keyButton: { id: { note: 9, octave: 2 }, name: 'Y', code: 89 },
          note: 'A',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black ash-key',
          keyButton: { id: { note: 10, octave: 2 }, name: '7', code: 55 },
          note: 'A#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white b-key',
          keyButton: { id: { note: 11, octave: 2 }, name: 'U', code: 85 },
          note: 'B',
          sound: null,
          playing: false
        }
      ]
    },
    {
      octaveClass: 'octave-4',
      keyData: [
        {
          keyStyle: 'key-white c-key',
          keyButton: { id: { note: 0, octave: 3 }, name: 'I', code: 73 },
          note: 'C',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black csh-key',
          keyButton: { id: { note: 1, octave: 3 }, name: '9', code: 57 },
          note: 'C#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white d-key',
          keyButton: { id: { note: 2, octave: 3 }, name: 'O', code: 79 },
          note: 'D',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black dsh-key',
          keyButton: { id: { note: 3, octave: 3 }, name: '0', code: 48 },
          note: 'D#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white e-key',
          keyButton: { id: { note: 4, octave: 3 }, name: 'P', code: 80 },
          note: 'E',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white f-key',
          keyButton: { id: { note: 5, octave: 3 }, name: '', code: null },
          note: 'F',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black fsh-key',
          keyButton: { id: { note: 6, octave: 3 }, name: '', code: null },
          note: 'F#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white g-key',
          keyButton: { id: { note: 7, octave: 3 }, name: '', code: null },
          note: 'G',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black gsh-key',
          keyButton: { id: { note: 8, octave: 3 }, name: '', code: null },
          note: 'G#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white a-key',
          keyButton: { id: { note: 9, octave: 3 }, name: '', code: null },
          note: 'A',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-black ash-key',
          keyButton: { id: { note: 10, octave: 3 }, name: '', code: null },
          note: 'A#',
          sound: null,
          playing: false
        },
        {
          keyStyle: 'key-white b-key',
          keyButton: { id: { note: 11, octave: 3 }, name: '', code: null },
          note: 'B',
          sound: null,
          playing: false
        }
      ]
    }
  ])

  const panList: number[] = []

  for (let i = 0; i < 48; i++) {
    const pan = (2 / 48) * i - 1
    panList.push(pan)
  }

  function getNotePan(panList: number[], i: number) {
    let pan = panList[i] * settingStore.stereoWidth
    if (pan > 1) {
      pan = 1
    }
    if (pan < -1) {
      pan = -1
    }
    return pan
  }

  function setSounds() {
    let i = 0
    for (const [index, octave] of keyboard.value.entries()) {
      const transposedOctave = 2 + index + settingStore.transposition
      for (const key of octave.keyData) {
        const frequency = defineNoteFrequency(key.note, transposedOctave)
        key.sound = new Sound(settings, getNotePan(panList, i), frequency)
        i++
      }
    }
  }

  function changeFrequencies() {
    for (const [index, octave] of keyboard.value.entries()) {
      const transposedOctave = 2 + index + settingStore.transposition

      for (const key of octave.keyData) {
        const frequency = defineNoteFrequency(key.note, transposedOctave)
        key.sound?.changeFrequency(frequency)
      }
    }
  }

  function createContext() {
    context.value = new AudioContext()
  }

  settingStore.$subscribe(() => {
    for (const octave of keyboard.value) {
      for (const key of octave.keyData) {
        if (key.sound) {
          key.sound.settings = { ...settingStore.getSettings() }
          key.sound.changeSettings()
        }
      }
    }
  })

  watch(stereoWidth, () => {
    let i = 0
    for (const octave of keyboard.value) {
      for (const key of octave.keyData) {
        if (key.sound) {
          const pan = getNotePan(panList, i)
          key.sound.panSetting = pan
          if (key.sound.stereoPan) {
            key.sound.stereoPan.pan.value = pan
          }
          i++
        }
      }
    }
  })

  watch(transposition, () => {
    changeFrequencies()
  })

  const playList = ref<NoteId[]>([])

  function addNote(NoteId: NoteId) {
    const newArray = [...playList.value]
    if (!newArray.includes(NoteId)) {
      newArray.push(NoteId)
    }
    playList.value = [...newArray]
  }

  function removeNote(NoteId: NoteId) {
    const newArray = [...playList.value]
    const index = newArray.indexOf(NoteId)
    newArray.splice(index, 1)
    playList.value = [...newArray]
  }

  watch(playList, (newPlayList, oldPlayList) => {
    console.log(playList.value)
    newPlayList.forEach((note) => {
      if (
        context.value !== null &&
        keyboard.value[note.octave].keyData[note.note].playing === false
      ) {
        keyboard.value[note.octave].keyData[note.note].sound?.play(context.value)
        keyboard.value[note.octave].keyData[note.note].playing = true
      }
    })
    oldPlayList.forEach((note) => {
      if (!newPlayList.includes(note)) {
        keyboard.value[note.octave].keyData[note.note].sound?.stop()
        keyboard.value[note.octave].keyData[note.note].playing = false
      }
    })
  })

  return {
    keyboard,
    context,
    playList,
    addNote,
    removeNote,
    setSounds,
    createContext
  }
})
