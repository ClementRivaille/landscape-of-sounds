import teoria from 'teoria';

class Player {

  constructor(eventEmitter, sheet, tonic) {
    this.eventEmitter = eventEmitter;
    this.sheet = sheet;
    this.color = teoria.scale(tonic, 'major');
    this.mixolydian = teoria.scale(tonic, 'mixolydian');

    this.changeMeasure = this.changeMeasure.bind(this);
    this.stop = this.stop.bind(this);
    this.eventEmitter.subscribe('changeMeasure', this.changeMeasure);
    this.eventEmitter.subscribe('stop', this.stop);
  }

  stop() {
    this.eventEmitter.unsubscribe('changeMeasure', this.changeMeasure);
    this.eventEmitter.unsubscribe('stop', this.stop);
  }
}

export default Player;
