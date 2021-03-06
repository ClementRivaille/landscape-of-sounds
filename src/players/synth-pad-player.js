import Player from './player';
import SynthPad from '../instruments/synth-pad';

class SynthPadPlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.synth = new SynthPad();

    this.levels = {
      volumes: {
        0: 0,
        1: 0.05,
        2: 0.1
      },
      filters:
      {
        0: 1000,
        1: 2000,
        2: 2500
      }
    };
  }

  changeMeasure(index, noteIndex, chord, mixolydian) {
    let measure = this.sheet[index];

    this.synth.playChord((mixolydian ? this.mixolydian : this.color).notes()[noteIndex].interval('P-8').scientific(), chord);

    if (measure.volume) {
      this.synth.turnVolume(this.levels.volumes[measure.volume.level], measure.volume.speed);
    }
    if (measure.filter) {
      let freq = this.levels.filters[measure.filter.level] + (Math.random() * 1000 - 500);
      this.synth.setLowFilterFrequency(freq, measure.filter.speed);
    }
  }

  stop() {
    this.synth.turnVolume(0, 100);
    super.stop();
  }
}

export default SynthPadPlayer;
