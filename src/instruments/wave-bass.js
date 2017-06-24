import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

function makeSound() {
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'square',
      frequency: 440,
      attack: 0,
      volume: 1
    }
  });
}

class WaveBass {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.buildSynth();
    this.synth.play();
  }

  buildSynth() {
    this.sound1 = makeSound();
    this.sound2 = makeSound();

    this.synth = new Pizzicato.Group([this.sound1, this.sound2]);
    this.synth.volume = 0;

    this.gainNode = Pizzicato.context.createGain();
    this.gainNode.gain.value = -50;
    this.synth.connect(this.gainNode);

    this.filter = new Pizzicato.Effects.LowPassFilter({
      frequency: 500,
      peak: 0.5,
      mix: 1
    });
    this.synth.addEffect(this.filter);

    const ringModulator = new Pizzicato.Effects.RingModulator({
        speed: 0.1,
        distortion: 0.06,
        mix: 0.6
    });
    this.synth.addEffect(ringModulator);
  }

  play(volume=0.1, delay=1500) { 
    this.soundConsole.progressiveChange(this.synth, 'volume', volume, 'volumeUp', delay).then(() => {
      this.soundConsole.progressiveChange(this.synth, 'volume', 0, 'volumeDown', delay);
    });
  }

  stop(delay=1000) {
    this.soundConsole.stopSine('waveVolume');
    this.soundConsole.progressiveChange(this.synth, 'volume', 0, 'volumeStop', delay);
  }

  setNote(note) {
    this.sound1.frequency = teoria.note(note).fq();
    this.sound2.frequency = teoria.note(note).interval('P-8').fq();
  }

  setFilterFrequency(frequency, delay=4000) {
    this.soundConsole.progressiveChange(this.filter, 'frequency', frequency, 'filterFreq', delay);
  }
}

export default WaveBass;
