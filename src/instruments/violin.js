import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

function makeSound() {
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sawtooth',
      frequency: 440,
      attack: 1,
      release: 1,
      volume: 0.5
    }
  });
}

class Violin {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.buildSynth();

    this._playing = false;
  }

  buildSynth() {
    this.oscillator = makeSound();
    
    this.lowFilter = new Pizzicato.Effects.LowPassFilter({
      frequency: 1500,
      peak: 2
    });
    this.oscillator.addEffect(this.lowFilter);

    this.ringModulator = new Pizzicato.Effects.RingModulator({
        speed: 0.1,
        distortion: 0.1,
        mix: 0.8
    });
    this.oscillator.addEffect(this.ringModulator);

    this.reverb = new Pizzicato.Effects.Reverb({
      time: 0.1,
      decay: 0,
      reverse: false,
      mix: 0.8
    });
    this.oscillator.addEffect(this.reverb);
  }

  play(note) {
    if (!this._playing) {
      this.oscillator.frequency = teoria.note(note).fq();
      this.oscillator.volume = 0.1;
      this.oscillator.play();
      this._playing = true;
    }
    else {
      this.stop();
    }
  }

  stop() {
    if (this._playing) {
      this.soundConsole.progressiveChange(this.oscillator, 'volume', 0, 'violinDecay', 1000).then(() => {
        this.oscillator.stop();
        this._playing = false;
      });
    }
  }

  setLowFilterFrequency(frequency, delay=4000) {
    this.soundConsole.progressiveChange(this.lowFilter, 'frequency', frequency, 'lowFilterFreq', delay);
  }

  sineFilter(property, amplitude, delay) {
    this.soundConsole.sineWave(this.lowFilter, property, amplitude, delay, 'lowFilter-' + property);
  }

  stopSineFilter(property) {
    this.soundConsole.stopSine('lowFilter-' + property);
  }
}

export default Violin;
