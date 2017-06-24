import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

function makeSound() {
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sawtooth',
      frequency: 440,
      attack: 0
    }
  });
}

class SynthPad {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.buildSynth();
    this.synth.play();
  }

  buildSynth() {
    this.base = makeSound();
    this.third = makeSound();
    this.fifth = makeSound();
    this.last = makeSound();

    this.synth = new Pizzicato.Group([this.base, this.third, this.fifth, this.last]);
    this.synth.volume = 0;

    this.lowFilter = new Pizzicato.Effects.LowPassFilter({
      frequency: 500,
      peak: 0.1
    });
    this.synth.addEffect(this.lowFilter);
  }

  turnVolume(volume, delay = 4000) {
    this.soundConsole.progressiveChange(this.synth, 'volume', volume, 'synthVolume', delay);
  }

  playChord(base, chord) {
    const notes = teoria.note(base).chord(chord).notes();

    this.base.frequency = notes[0].fq();
    this.third.frequency = notes[1].fq();
    this.fifth.frequency = notes[2].fq();
    this.last.frequency = notes.length > 3 ? notes[3].fq() : notes[0].interval('P8').fq();
  }

  setLowFilterFrequency(frequency, delay=4000) {
    this.soundConsole.progressiveChange(this.lowFilter, 'frequency', frequency, 'lowFilterFreq', delay);
  }
}

export default SynthPad;
