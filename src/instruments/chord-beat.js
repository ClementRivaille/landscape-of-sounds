import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

function makeSound() {
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sawtooth',
      frequency: 440,
      attack: 0.01,
      release: 0.2
    }
  });
}

class ChordBeat {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.options = {
      pace: 500
    };

    this.buildSynth();
    this.playing = false;
  }

  buildSynth() {
    this.first = makeSound(this.options.volume);
    this.second = makeSound(this.options.volume);
    this.third = makeSound(this.options.volume);

    this.oscillator = new Pizzicato.Group([this.first, this.second, this.third]);
    this.oscillator.volume = 0.3;

    this.filter = new Pizzicato.Effects.HighPassFilter({
      frequency: 600,
      peak: 2.5
    });
    this.oscillator.addEffect(this.filter);

    this.compressor = new Pizzicato.Effects.Compressor({
      threshold: -20,
      // knee: 32,
      ratio: 60
    });
    this.oscillator.addEffect(this.compressor);

    this.reverb = new Pizzicato.Effects.Reverb({
        time: 1.3,
        decay: 1,
        reverse: false,
        mix: 0.8
    });
    this.oscillator.addEffect(this.reverb);

    this.flanger = new Pizzicato.Effects.Flanger({
      time: 0.5,
      speed: 0.4,
      depth: 0.2,
      feedback: 0.2,
      mix: 0.4
    });
    this.oscillator.addEffect(this.flanger);
  }

  turnVolume(volume, delay = 4000) {
    this.soundConsole.progressiveChange(this.oscillator, 'volume', volume, 'volume', delay);
  }

  turnPace(pace, delay = 4000) {
    this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
  }

  setNotes(note1, note2, note3) {
    this.first.frequency = teoria.note(note1).fq();
    this.second.frequency = teoria.note(note2).fq();
    this.third.frequency = teoria.note(note3).fq();
  }

  play() {
    if (!this.playing) {
      this.playing = true;
      this.playChord();
    }
  }

  playChord() {
    if (this.playing) {
      this.playSound();

      setTimeout(() => {
        this.playChord();
      }, this.options.pace)
    }
  }

  playSound() {
    this.oscillator.play();
    setTimeout(() => {
      this.oscillator.stop();
    }, 50)
  }

  stop() {
    this.playing = false;
  }

  setFilterProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.filter, property, value, 'filter-' + property, delay);
  }

  setCompressorProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.compressor, property, value, 'compressor-' + property, delay);
  }
}

export default ChordBeat;
