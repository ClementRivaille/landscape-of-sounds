import Player from './player';
import Tuba from '../instruments/tuba';

class TubaPlayer extends Player {
  constructor(eventEmitter, sheet, tonic) {

    super(eventEmitter, sheet, tonic);

    this.tuba = new Tuba();

    this.settings = {
      volumes: {
        0: 0,
        1: 0.5,
        2: 0.1,
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
      let volume = measure.volume ? this.settings.volumes[measure.volume.level] : this.settings[0];
      this.interval = setInterval(() => {
        this.tuba.play(volume, measure.pace);
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

