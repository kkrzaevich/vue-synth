import type { Settings } from '@/types/types.ts'

// const loadButton = document.querySelector('#load')

// let context: AudioContext | null = null

// loadButton?.addEventListener(
//   'click',
//   () => {
//     context = new AudioContext()
//     loadButton.remove()
//   },
//   { once: true }
// )

// const playButton = document.querySelector('#play')

// playButton?.addEventListener('pointerdown', () => {
//   startPlaying()
// })

// playButton?.addEventListener('pointerup', () => {
//   stopPlaying()
// })

// const startPlaying = async () => {
//   note.play()
// }

// const stopPlaying = async () => {
//   note.stop()
// }

export class Note {
  settings: Settings
  stage: 'attack' | 'decay' | 'release' | 'sustain' = 'attack'
  interval: ReturnType<typeof setInterval> | null = null
  prevGain: number = 0
  oscillator: OscillatorNode | null = null
  gainNode: GainNode | null = null
  delayNode: {
    node: DelayNode | null
    gain: GainNode | null
    feedback: GainNode | null
  } = {
    node: null,
    gain: null,
    feedback: null
  }
  filterNode: BiquadFilterNode | null = null
  stereoPan: StereoPannerNode | null = null
  panSetting: number = 0
  noteFreq: number = 440

  constructor(settings: Settings, panSetting: number, noteFreq: number) {
    this.settings = settings
    this.panSetting = panSetting
    this.noteFreq = noteFreq
  }

  createOsc(context: AudioContext) {
    this.gainNode = context.createGain()
    this.gainNode.gain.value = 0

    this.oscillator = context.createOscillator()
    this.oscillator.type = this.settings.oscType
    this.oscillator.frequency.setValueAtTime(this.noteFreq, 0)

    this.oscillator.start(0)
  }
  createFilter(context: AudioContext) {
    this.filterNode = context.createBiquadFilter()
    this.filterNode.type = 'lowpass'
    this.filterNode.frequency.value = this.settings.filterFreq
  }
  createStereoPan(context: AudioContext) {
    this.stereoPan = context.createStereoPanner()
    this.stereoPan.pan.value = this.panSetting
  }
  createDelay(context: AudioContext) {
    this.delayNode.node = context.createDelay()
    this.delayNode.node.delayTime.value = this.settings.delayTime
    this.delayNode.feedback = context.createGain()
    this.delayNode.feedback.gain.value = this.settings.delayFeedback
    this.delayNode.gain = context.createGain()
    this.delayNode.gain.gain.value = this.settings.delayVolume
  }
  makeConnections(context: AudioContext) {
    if (
      this.oscillator &&
      this.gainNode &&
      this.filterNode &&
      this.stereoPan &&
      this.delayNode.node &&
      this.delayNode.gain &&
      this.delayNode.feedback
    ) {
      this.oscillator.connect(this.gainNode)
      this.gainNode.connect(this.filterNode)
      this.filterNode.connect(this.stereoPan)
      this.stereoPan.connect(this.delayNode.node)
      this.stereoPan.connect(context.destination)
      this.delayNode.node.connect(this.delayNode.gain)
      this.delayNode.node.connect(this.delayNode.feedback)
      this.delayNode.feedback.connect(this.delayNode.node)
      this.delayNode.gain.connect(context.destination)
    }
  }
  deleteOsc() {
    if (this.oscillator && this.interval) {
      this.oscillator.stop(0)
      this.oscillator.disconnect()
      this.oscillator = null
      this.gainNode = null
      this.filterNode = null
      this.stereoPan = null
      this.delayNode.node = null
      this.delayNode.feedback = null
      this.delayNode.gain = null
      clearInterval(this.interval)
      this.interval = null
      console.log('deleted')
    }
  }
  getTimeStep() {
    if (this.stage === 'attack') {
      return this.settings.attack / 10
    } else if (this.stage === 'decay') {
      return this.settings.decay / 10
    } else if (this.stage === 'release') {
      return this.settings.release / 10
    }
  }
  evaluateVolumeDifference(targetVolume: number, currentGain: number) {
    const difference = Math.abs((targetVolume - currentGain) / currentGain)
    if (this.stage === 'release') {
      console.log('targetVolume', targetVolume)
    }
    if (difference < 0.001) {
      return true
    } else {
      return false
    }
  }
  evaluateStageChange(currentGain: number) {
    if (this.stage === 'attack') {
      if (this.evaluateVolumeDifference(this.settings.volume, currentGain)) {
        if (this.settings.sustain === 1) {
          this.stage = 'sustain'
        } else {
          this.stage = 'decay'
        }
      }
    } else if (this.stage === 'decay') {
      if (this.settings.sustain === 0 && currentGain < this.prevGain && currentGain < 0.001) {
        this.deleteOsc()
      }

      if (this.settings.sustain !== 0) {
        if (
          this.evaluateVolumeDifference(this.settings.volume * this.settings.sustain, currentGain)
        ) {
          this.stage = 'sustain'
        }
      }
    } else if (this.stage === 'sustain') {
      return
    } else if (this.stage === 'release') {
      if (currentGain < this.prevGain && currentGain < 0.001) {
        this.deleteOsc()
      }
    }
  }
  playAttack(context: AudioContext) {
    if (this.gainNode) {
      const timeStep = this.settings.attack / 3
      const newVal = this.settings.volume
      this.gainNode.gain.setTargetAtTime(newVal, context.currentTime, timeStep / 1000)

      this.evaluateStageChange(this.gainNode.gain.value)
    }
  }
  playDecay(context: AudioContext) {
    if (this.gainNode) {
      const timeStep = this.settings.decay / 3
      const newVal = this.settings.volume * this.settings.sustain
      this.gainNode.gain.setTargetAtTime(newVal, context.currentTime, timeStep / 1000)

      this.evaluateStageChange(this.gainNode.gain.value)
    }
  }
  playSustain(context: AudioContext) {
    return
  }
  playRelease(context: AudioContext) {
    if (this.gainNode) {
      const timeStep = this.settings.release / 3
      const newVal = 0
      this.gainNode.gain.setTargetAtTime(newVal, context.currentTime, timeStep / 1000)

      this.evaluateStageChange(this.gainNode.gain.value)
    }
  }
  tick(context: AudioContext) {
    if (this.stage === 'attack') {
      this.playAttack(context)
    } else if (this.stage === 'decay') {
      this.playDecay(context)
    } else if (this.stage === 'sustain') {
      this.playSustain(context)
    } else if (this.stage === 'release') {
      this.playRelease(context)
    }
    if (this.gainNode) {
      this.prevGain = this.gainNode.gain.value
    }
  }
  pulse(context: AudioContext) {
    const timeStep = this.getTimeStep()
    this.interval = setInterval(() => {
      this.tick(context)
    }, timeStep)
  }
  play(context: AudioContext) {
    if (!this.oscillator) {
      this.createOsc(context)
      this.createFilter(context)
      this.createStereoPan(context)
      this.createDelay(context)
      this.makeConnections(context)
    }
    if (!this.interval) {
      this.pulse(context)
    }
    this.stage = 'attack'
  }
  stop() {
    this.stage = 'release'
  }
}
