import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

function makeSound() {
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'triangle',
      frequency: 440,
      attack: 0
    }
  });
}

class TriangleChord {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.buildSynth();
    this.synth.play();
  }

  buildSynth() {
    this.third = makeSound();
    this.fifth = makeSound();
    this.last = makeSound();

    this.synth = new Pizzicato.Group([this.third, this.fifth, this.last]);
    this.synth.volume = 0;

    this.filter = new Pizzicato.Effects.HighPassFilter({
      frequency: 2000,
      peak: 4
    });
    this.synth.addEffect(this.filter);

    this.wahwahFilter = new Pizzicato.Effects.LowPassFilter({
      frequency: 3000,
      peak: 1,
      mix: 0.1
    });
    this.synth.addEffect(this.wahwahFilter);
    this.soundConsole.sineWave(this.wahwahFilter, 'frequency', 1000, 5000, 'wahwah');

    this.tremolo = new Pizzicato.Effects.Tremolo({
      speed: 1,
      depth: 0.5,
      mix: 0.6
    });
  }

  turnVolume(volume, delay = 4000) {
    this.soundConsole.progressiveChange(this.synth, 'volume', volume, 'synthVolume', delay);
  }

  playChord(base, chord) {
    const notes = teoria.note(base).chord(chord).notes();

    this.third.frequency = notes[1].fq();
    this.fifth.frequency = notes[2].fq();
    this.last.frequency = notes.length > 3 ? notes[3].fq() : notes[0].interval('P8').fq();
  }

  setFilterFrequency(frequency, delay=4000) {
    this.soundConsole.progressiveChange(this.filter, 'frequency', frequency, 'filterFreq', delay);
  }

  setWahWah(amplitude, delay) {
    this.soundConsole.sineWave.stopSine('wahwah');
    this.soundConsole.sineWave(this.wahwahFilter, 'frequency', amplitude, delay, 'wahwah');
  }
}

export default TriangleChord;
