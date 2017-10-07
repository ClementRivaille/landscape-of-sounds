import Pizzicato from 'pizzicato';
import teoria from 'teoria';
import SoundConsole from './sound-console'

function makeSound(volume) {
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'square',
      frequency: 440,
      attack: 0.01,
      volume: volume
    }
  });
}

class SquareHarp {

  constructor() {
    this.soundConsole = new SoundConsole();

    this.options = {
      volume: 0.02,
      pace: 100
    };

    this.buildSynth();
    this.playing = false;
  }

  buildSynth() {
    this.base = makeSound(this.options.volume);
    this.third = makeSound(this.options.volume);
    this.fifth = makeSound(this.options.volume);
    this.last = makeSound(this.options.volume);


    this.lowFilter = new Pizzicato.Effects.LowPassFilter({
      frequency: 2000,
      peak: 4
    });
    this.applyEffect(this.lowFilter);

    this.reverb = new Pizzicato.Effects.Reverb({
        time: 1,
        decay: 1,
        reverse: false,
        mix: 0.8
    });
    this.applyEffect(this.reverb);
  }

  applyEffect(effect) {
    this.base.addEffect(effect);
    this.third.addEffect(effect);
    this.fifth.addEffect(effect);
    this.last.addEffect(effect);
  }

  turnVolume(volume, delay = 4000) {
    this.soundConsole.progressiveChange(this.base, 'volume', volume, 'baseVolume', delay);
    this.soundConsole.progressiveChange(this.third, 'volume', volume, 'thirdVolume', delay);
    this.soundConsole.progressiveChange(this.fifth, 'volume', volume, 'fifthVolume', delay);
    this.soundConsole.progressiveChange(this.last, 'volume', volume, 'lastVolume', delay);
  }

  turnPace(pace, delay = 4000) {
    return this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
  }

  setChord(base, chord) {
    const notes = teoria.note(base).chord(chord).notes();

    this.base.frequency = notes[0].fq();
    this.third.frequency = notes[1].fq();
    this.fifth.frequency = notes[2].fq();
    this.last.frequency = notes.length > 3 ? notes[3].fq() : notes[0].interval('P8').fq();
  }

  play() {
    if (!this.playing) {
      this.playing = true;
      this.playHarpege(0, [this.last, this.fifth, this.third, this.base]);
    }
  }

  playHarpege(index, notes) {
    if (this.playing) {
      this.playNote(notes[index]);

      let next = (index + 1) % notes.length;
      setTimeout(() => {
        this.playHarpege(next, notes);
      }, this.options.pace)
    }
  }

  playNote(sound) {
    sound.play();
    setTimeout(() => {
      sound.stop();
    }, 50)
  }

  stop() {
    this.playing = false;
  }

  setLowFilterProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.lowFilter, property, value, 'lowFilter-' + property, delay);
  }

  setReverbProperty(property, value, delay=4000) {
    this.soundConsole.progressiveChange(this.reverb, property, value, 'reverb-' + property, delay);
  }
}

export default SquareHarp;
