import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console';


class LightBells {
  constructor() {
    this.soundConsole = new SoundConsole();
  }

  ring(base, scale) {
    const color = teoria.note(base).scale(scale);
    const notes = [color.get(1), color.get(2), color.get(3), color.get(5), color.get(6)];
    

    for (let note of notes) {
      let bell = this.createBell(note.interval('P8').fq());
      setTimeout(() => {
        bell.play();
        this.soundConsole.progressiveChange(bell, 'volume', 0, 'bell' + Math.random() * 10, 2000);
      }, Math.random() * 1500);
    }
  }

  createBell(frequency) {
    let bell = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'triangle',
        frequency: frequency,
        attack: 0.01,
        volume: 0.2
      },
    });

    bell.addEffect(new Pizzicato.Effects.HighPassFilter({
      frequency: 2000,
      peak: 1
    }));

    return bell;
  }
}

export default LightBells
