import teoria from 'teoria';

class Player {

  constructor(eventEmitter, sheet, tonic) {
    this.eventEmitter = eventEmitter;
    this.sheet = sheet;
    this.color = teoria.scale(tonic, 'major');
    this.mixolydian = teoria.scale(tonic, 'mixolydian');

    this.changeMeasure = this.changeMeasure.bind(this);
    this.stop = this.stop.bind(this);
    this.eventEmitter.suscribe('changeMeasure', this.changeMeasure);
    this.eventEmitter.suscribe('stop', this.stop);
  }

  stop() {
    this.eventEmitter.unsuscribe('changeMeasure', this.changeMeasure);
    this.eventEmitter.unsuscribe('stop', this.stop);
  }
}

export default Player;
