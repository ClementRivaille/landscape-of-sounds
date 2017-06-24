import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'


class Vibraphone {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.buildSynth();
  }

  buildSynth() {
    this.soundOptions = {
      type: 'sine',
      frequency: 440,
      attack: 0.01,
      decay: 0.1,
      volume: 0.1
    };

    this.highFilterOptions = {
      frequency: 500,
      peak: 4.2
    };

    this.delayOptions = {
      feedback: 0.7,
      time: 0.1,
      mix: 0.8
    };

    this.reverbOptions = {
        time: 1,
        decay: 1,
        reverse: false,
        mix: 0.8
    };
  }

  makeSound(note) {
    let sound = new Pizzicato.Sound({
      source: 'wave',
      options: this.soundOptions
    });
    sound.frequency = teoria.note(note).fq();
    let octave = new Pizzicato.Sound({
      source: 'wave',
      options: this.soundOptions
    });
    octave.frequency = teoria.note(note).interval('P8').fq();
    let oscillator = new Pizzicato.Group([sound, octave]);
    oscillator.addEffect(new Pizzicato.Effects.HighPassFilter(this.highFilterOptions));
    oscillator.addEffect(new Pizzicato.Effects.Delay(this.delayOptions));
    // sound.addEffect(new Pizzicato.Effects.Reverb(this.reverbOptions));

    return oscillator;
  }

  play(note) {
    let sound = this.makeSound(note);

    sound.play();
    setTimeout(() => {
      sound.stop();
    }, 50)
  }

  setHighFilterProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.highFilterOptions, property, value, 'highFilter-' + property, delay);
  }
}

export default Vibraphone;
