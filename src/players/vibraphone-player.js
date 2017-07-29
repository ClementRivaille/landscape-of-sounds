import Player from './player';
import Vibraphone from '../instruments/vibraphone';

class VibraphonePlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.vibraphone = new Vibraphone();
    
    this.settings = {
      filters: {
        0: 1,
        0: 2,
        1: 4,
        3: 6
      }
    };
  }

  changeMeasure(index) {
    let measure = this.sheet[index];

    this.active = measure.active;
    this.pace = measure.pace;
    this.interval = measure.interval;
    this.multiple = measure.multiple;

    if (measure.active && !this.playing) {
      this.play(measure.multiple ? 1 + Math.floor(Math.random() * 2) : 1);
      this.playing = true;
    }
    else if (!measure.active) {
      this.playing = false;
    }

    if (measure.filter) {
      this.vibraphone.setHighFilterProperty('peak', this.settings.filters[measure.filter.level]);
    }
  }

  play(nbNotes) {
    let notes = [];
    for (let i = 0 ; i < nbNotes ; i++) {
      notes.push(Math.floor(Math.random() * this.color.notes().length));
    }

    notes.reduce((promise, noteIndex) => {
      return promise.then(() => {
        this.vibraphone.play(this.color.notes()[noteIndex].scientific());
        return new Promise((resolve) => setTimeout(resolve, this.interval));
      });
    }, Promise.resolve());

    if (this.active) {
      let randomDelay = 0.2 * this.pace;
      setTimeout(() => {
        this.play(this.multiple ? 1 + Math.floor(Math.random() * 2) : 1);
      }, this.pace + (Math.random() * 2 * randomDelay - (randomDelay / 2)));
    }
  }

  stop() {
    this.active = false;
    this.playing = false;
    super.stop();
  }

}

export default VibraphonePlayer;
