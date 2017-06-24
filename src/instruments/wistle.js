import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'


class Wistle {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.options = {
      volume: 0.02,
      pace: 300
    };

    this.buildSynth();

    this.playingSounds = [];
  }

  makeSound(frequency) {
    let sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'triangle',
        frequency: frequency,
        attack: 0.3,
        volume: this.options.volume
      }
    });

    sound.addEffect(this.lowFilter);
    sound.addEffect(this.reverb);

    return sound;
  }

  buildSynth() {
    this.lowFilter = new Pizzicato.Effects.LowPassFilter({
      frequency: 1000,
      peak: 1
    });

    this.reverb = new Pizzicato.Effects.Reverb({
        time: 0.5,
        decay: 0.7,
        reverse: false,
        mix: 0.8
    });    
  }

  turnVolume(volume, delay = 4000) {
    this.soundConsole.progressiveChange(this.options, 'volume', volume, 'volume', delay);
  }

  turnPace(pace, delay = 4000) {
    this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
  }

  playNotes(notes) {
    let index = 0;

    let soundInterval = setInterval(() => {
      if (index >= notes.length) {
        clearInterval(soundInterval);
        for (let sound of this.playingSounds) {
          sound.disconnect();
        }
        this.playingSounds = [];
      }
      else {
        let sound = this.makeSound(teoria.note(notes[index]).fq());
        sound.play();
        index++;
      }
    }, this.options.pace);

  }

  setLowFilterProperty(property, value, delay=4000) {
    this.soundConsole.triangle(this.lowFilter, property, value, 'lowFilter-' + property, delay);
  }

  setReverbProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.reverb, property, value, 'reverb-' + property, delay);
  }
}

export default Wistle;
