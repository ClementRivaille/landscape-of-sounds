import Player from './player';
import Tuba from '../instruments/tuba';

class TubaPlayer extends Player {
  constructor(eventEmitter, sheet, tonic) {

    super(eventEmitter, sheet, tonic);

    this.tuba = new Tuba();

    this.settings = {
      volumes: {
        0: 0.5,
        1: 1,
        2: 1.5,
      },
      filters: {
        0: 300,
        1: 500,
        2: 700
      }
    }

    this.tuba.setNote(this.color.notes()[0].interval('P-8').interval('P-8').scientific());
  }

  changeMeasure(index) {
    let measure = this.sheet[index];

    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }

    if (measure.active) {
      this.interval = setInterval(() => {
        this.tuba.play(this.settings.volumes[measure.volume.level], measure.pace);
      }, measure.delay + Math.random() * 0.4 * measure.delay - 0.2 * measure.delay);
    }

    if (measure.filter) {
      this.tuba.setFilterFrequency(this.settings.filters[measure.filter.level], measure.filter.delay);
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


export default TubaPlayer;

