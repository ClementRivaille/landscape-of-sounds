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

  changeMeasure(index, noteIndex, chord) {
    let measure = this.sheet[index];

    this.harp.setChord(this.color.notes()[noteIndex], chord);

    this.pace = measure.pace;
    if (!this.active && measure.playing) {
      setTimeout(() => {
        this.play();
      }, measure.pace)
    }
    this.active = measure.playing;

    if (measure.filter) {
      this.vibraphone.setHighFilterProperty('peak', this.settings.filters[measure.filter.level]);
    }
  }

  play() {
    let noteIndex = Math.floor(Math.random() * this.color.notes().length);
    this.vibraphone.play(this.color.notes()[noteIndex].scientific());

    if (this.active) {
      setTimeout(() => {
        this.play();
      }, this.pace);
    }
  }

}

export default VibraphonePlayer;
