import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'


class Whistle {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.options = {
      volume: 0.2,
      pace: 300
    };

    this.buildSynth();

    this.playingSounds = [];
  }

  makeSound() {
    let sound = new Pizzicato.Sound({
      source: 'wave',
      options: this.soundOptions
    });

    sound.addEffect(new Pizzicato.Effects.LowPassFilter(this.lowFilter));
    // sound.addEffect(new Pizzicato.Effects.Reverb(this.reverb));

    return sound;
  }

  buildSynth() {
    this.soundOptions = {
      type: 'triangle',
      frequency: 440,
      attack: 0.3,
      release: 0.1,
      volume: this.options.volume
    }

    this.lowFilter = {
      frequency: 1000,
      peak: 1
    };

    this.reverb = {
        time: 0.1,
        decay: 0,
        reverse: false,
        mix: 0.8
    };    
  }

  turnVolume(volume, delay = 4000) {
    this.soundConsole.progressiveChange(this.options, 'volume', volume, 'volume', delay);
  }

  turnPace(pace, delay = 4000) {
    this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
  }

  playNotes(notes) {
    let sounds = notes.map((note) => {
      let sound = this.makeSound();
      sound.volume = this.options.volume;
      sound.frequency = teoria.note(note).fq();

      return sound;
    })

    let index = 0;

    let soundInterval = setInterval(() => {
      if (index >= sounds.length) {
        clearInterval(soundInterval);
      }
      else {
        this.playSound(sounds[index]);
        index++;
      }
    }, this.options.pace);

  }

  playSound(sound) {
    sound.play();
    setTimeout(() => {
      sound.stop();
    }, this.options.pace)
  }

  setLowFilterProperty(property, value, delay=4000) {
    this.soundConsole.triangle(this.lowFilter, property, value, 'lowFilter-' + property, delay);
  }

  setReverbProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.reverb, property, value, 'reverb-' + property, delay);
  }
}

export default Whistle;
