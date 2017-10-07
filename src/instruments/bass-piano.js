import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

class BassPiano {

  constructor() {
    this.soundConsole = new SoundConsole();
    this.playing = [];
    this.buildOscillator();
    this.decay = 15000;
  }

  buildOscillator() {
    this.wave1 = new Pizzicato.Sound({ 
        source: 'wave', 
        options: {
            type: 'sine',
            frequency: 440,
            attack: 0.07
        }
    });
    this.wave2 = new Pizzicato.Sound({ 
        source: 'wave', 
        options: {
            type: 'sine',
            frequency: 440,
            attack: 0.07
        }
    });
    this.oscillator = new Pizzicato.Group([this.wave1, this.wave2]);

    const ringModulator = new Pizzicato.Effects.RingModulator({
        speed: 0.1,
        distortion: 0.06,
        mix: 0.6
    });
    this.oscillator.addEffect(ringModulator);

    const lowFilter = new Pizzicato.Effects.LowPassFilter({
      frequency: 1000,
      peak: 1
    });
    this.oscillator.addEffect(lowFilter);

    // const reverb = new Pizzicato.Effects.Reverb({
    //   time: 0.5,
    //   decay: 1,
    //   reverse: false,
    //   mix: 0.5
    // });
    // this.oscillator.addEffect(reverb);


    this.oscillator.volume = 0.1;
  }

  play(note, stop) {

    if (stop) {
      while(this.playing.length > 0) {
        const oscillator = this.playing.pop();
        oscillator.stop();
        oscillator.disconnect();
      }
    }
    
    this.wave1.frequency = teoria.note(note).fq();
    this.wave2.frequency = teoria.note(note).interval('P-8').fq();

    this.oscillator.play();
    setTimeout(() => {
      this.oscillator.stop();
    }, 100);

    this.playing.push(this.oscillator);
    this.startDecay(this.oscillator, this.playing.length - 1);

    this.buildOscillator();
  }

  startDecay(oscillator, index) {
    this.soundConsole.progressiveChange(oscillator, 'volume', 0, 'bassDecay', this.decay).then( () => {;
      // Stop oscillator once done
      oscillator.stop();
      oscillator.disconnect();
      if(this.playing[index] === oscillator)
        this.playing.splice(index, 1);
    });
  }
}

export default BassPiano;
