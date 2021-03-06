import Player from './player';
import Whistle from '../instruments/whistle';

class WhistlePlayer extends Player {
  constructor(eventEmitter, sheet, tonic) {

    super(eventEmitter, sheet, tonic);

    this.whistle = new Whistle();
    this.whistle.setLowFilterProperty('frequency', Math.floor(Math.random() * 1000 + 500));

    this.settings = {
      volumes: {
        0: 0,
        1: 0.2,
        2: 0.25,
      }
    }

    // Generate three random patterns
    this.settings.patterns = [];
    for (let i = 0 ; i < 3 ; i++) {
      let pattern = [];
      let nbNotes = 3 + Math.round(Math.random());
      for (let j = 0 ; j < nbNotes ; j++) {
        // third pattern is mixolydian
        pattern.push((i < 2 ? this.color : this.mixolydian).notes()[Math.floor(Math.random() * this.color.notes().length)].scientific());
      }
      this.settings.patterns.push(pattern);
    }
  }

  changeMeasure(index) {
    let measure = this.sheet[index];

    if (measure.active) {
      setTimeout(() => {
        this.whistle.playNotes(this.settings.patterns[measure.pattern]);
      }, measure.delay + Math.random() * 0.4 * measure.delay - 0.2 * measure.delay);
    }

    if (measure.volume) {
      this.whistle.turnVolume(this.settings.volumes[measure.volume.level], measure.volume.delay);
    }

    if (measure.pace) {
      this.whistle.turnPace(measure.pace.value, measure.pace.delay);
    }
  }
}


export default WhistlePlayer;

