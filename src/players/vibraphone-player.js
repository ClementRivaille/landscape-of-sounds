import Player from './player';
import Vibraphone from '../instruments/vibraphone';

class VibraphonePlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.vibraphone = new Vibraphone();
    
    this.mixolydianActive = false;
  }

  changeMeasure(index, noteIndex, chord, mixolydian) {
    let measure = this.sheet[index];

    this.active = measure.active;
    // delay before activations
    this.pace = measure.pace;
    // delay between individual notes
    this.interval = measure.interval;
    // Several note for each activation
    this.multiple = measure.multiple;
    this.mixolydianActive = mixolydian;

    if (measure.active && !this.playing) {
      this.play(measure.multiple ? 1 + Math.round(Math.random() * 2) : 1);
      this.playing = true;
    }
    else if (!measure.active) {
      this.playing = false;
    }
  }

  play(nbNotes) {
    let notes = [];
    for (let i = 0 ; i < nbNotes ; i++) {
      notes.push(Math.floor(Math.random() * this.color.notes().length));
    }

    notes.reduce((promise, noteIndex) => {
      return promise.then(() => {
        this.vibraphone.play((this.mixolydianActive ? this.mixolydian : this.color).notes()[noteIndex].scientific());
        return new Promise((resolve) => setTimeout(resolve, this.interval));
      });
    }, Promise.resolve());

    if (this.active) {
      let randomDelay = 0.2 * this.pace;
      setTimeout(() => {
        this.play(this.multiple ? 1 + Math.round(Math.random() * 2) : 1);
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
