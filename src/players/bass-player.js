import Player from './player';
import BassPiano from './instruments/bass-piano';

class BassPlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.bass = new BassPiano();
    this.color = this.color.interval('P-8').interval('P-8');
  }

  changeMeasure(index, noteIndex) {
    let measure = this.sheet[index];

    let bassNote = this.color.notes()[noteIndex].scientific();

    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }

    this.play(bassNote, true);
    this.interval = setInterval(()=> {
      this.play(bassNote, false);
    }, measure.interval);
  }

  play(note, stop) {
    this.bass.play(note, stop);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }
    super.stop();
  }
}

export default BassPlayer;
