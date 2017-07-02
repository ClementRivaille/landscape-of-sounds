import Player from './player';
import LightBells from '../instruments/light-bells';

class LightBellsPlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.bells = new LightBells();
  }

  changeMeasure(index, noteIndex, chord) {
    let measure = this.sheet[index];

    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }

    if (measure.tonic) {
      this.interval = setInterval(() => {
        this.bells.ring(this.color.notes()[0], 'major');
      }, measure.delay);
    }
    else if (measure.chord) {
      this.interval = setInterval(() => {
        this.bells.ring(this.color.notes()[noteIndex], chord.startsWith('M') ? 'major': 'minor');
      }, measure.delay);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }
    super.stop();
  }
}

export default LightBellsPlayer;
