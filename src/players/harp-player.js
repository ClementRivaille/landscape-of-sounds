import Player from './player';
import SquareHarp from '../instruments/square-harp';

class HarpPlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.harp = new SquareHarp();
    this.harp.turnVolume(0, 100);
    this.volume = 0;

    this.settings = {
      volumes: {
        0: 0,
        1: 0.01,
        2: 0.02
      },
      filters: {
        0: 1500,
        1: 2000,
        2: 2500,
        3: 3000
      },
      paces: {
        0: 600,
        1: 300,
        2: 100,
        4: 50
      }
    };

    this.playing = false;
  }

  changeMeasure(index, noteIndex, chord, mixolydian) {
    let measure = this.sheet[index];

    this.harp.setChord((mixolydian ? this.mixolydian : this.color).notes()[noteIndex], chord);

    if (measure.playing && !this.playing) {
      this.harp.play();
      this.playing = true;
    }
    else if (!measure.playing && this.playing) {
      this.harp.stop();
      this.playing = false;
    }

    if (measure.volume.value !== this.volume) {
      this.harp.turnVolume(this.settings.volumes[measure.volume.level], measure.volume.delay);
      this.volume = measure.volume.value;
    }

    if (measure.filter) {
      this.harp.setLowFilterProperty('frequency', this.settings.filters[measure.filter.level] + (Math.random * 1000 - 500), measure.filter.delay);
    }

    if (measure.paces && measure.paces > 0) {
      measure.paces.reduce((promise, pace) => {
        return promise.then(() => {
          let rngPace = this.settings.paces[pace.level];
          rngPace += Math.random() * rngPace * 2/3 - rngPace/3;
          return this.harp.turnPace(rngPace, pace.delay);
        });
      }, Promise.resolve());
    }
  }

  stop() {
    if (this.playing) {
      this.harp.stop();
      this.playing = false;
    }
    super.stop();
  }
}

export default HarpPlayer;
