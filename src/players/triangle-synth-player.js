import Player from './player';
import TriangleChord from '../instruments/triangle-chord'

class TriangleSynthPlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.synth = new TriangleChord();

    this.levels = {
      volumes: {
        0: 0,
        1: 0.1,
        2: 0.15
      },
      filters:
      {
        0: 2000,
        1: 2500,
        2: 3000
      },
      wahwah: {
        0: 1000,
        1: 1500,
        2: 2500
      }
    };
  }

  changeMeasure(index, noteIndex, chord, mixolydian) {
    let measure = this.sheet[index];

    this.synth.playChord((mixolydian ? this.mixolydian : this.color).notes()[noteIndex].scientific(), chord);

    if (measure.volume) {
      this.synth.turnVolume(this.levels.volumes[measure.volume.level], measure.volume.delay);
    }
    if (measure.filter) {
      this.synth.setFilterFrequency(this.levels.filters[measure.filter.level] + (Math.random() * 1000 - 500), measure.filter.delay);
    }
    if (measure.wahwah) {
      this.synth.setWahWah(this.levels.wahwah[measure.wahwah.level], measure.wahwah.delay);
    }
  }

  stop() {
    this.synth.turnVolume(0, 100);
    super.stop();
  }
}

export default TriangleSynthPlayer;
