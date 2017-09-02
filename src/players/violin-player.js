import Player from './player';
import Violin from '../instruments/violin';

class SynthPadPlayer extends Player {

  constructor(eventEmitter, sheet, tonic) {
    super(eventEmitter, sheet, tonic);
    
    this.violin = new Violin();

    this.settings = {
      filters:
      {
        0: 1000,
        1: 1500,
        2: 2000
      },
      tremolo: {
        0: {
          amp: 500,
          freq: 1000
        },
        1: {
          amp: 400,
          freq: 500
        },
        2: {
          amp: 300,
          freq: 200
        }
      },
      patterns: {
        0: [9, 10, 5, 7],
        1: [1, 2, 8, 9],
        2: [5, 2, 4, 8, 6],
        3: [1, 5, 9, 13],
        4: [8, 2, 5, 6]
      }
    };

    this.state = {
      active: false,
      playing: false,
      notes: [],
      length: 0,
      delay: 0
    }
  }

  changeMeasure(index, note, chord, mixolydian) {
    let measure = this.sheet[index];

    if (measure.filter) {
      this.synth.setLowFilterFrequency(this.settings.filters[measure.filter.level] + (Math.random * 1000 - 500), measure.filter.speed);
    }

    if (measure.tremolo) {
      if (measure.tremolo.stop) {
        this.violin.stopSineFilter('frequency');
      }
      else {
        this.violin.sineFilter('frequency', this.settings.tremolo[measure.tremolo.setting].amp, this.settings.tremolo[measure.tremolo.setting].freq);
      }
    }

    if (measure.play) {
      this.state.notes = this.settings.patterns[measure.play.pattern || 0].map((noteIndex) => {
        let note = (mixolydian ? this.mixolydian : this.color).notes()[noteIndex % 7];
        for (let octave = 0 ; octave < Math.floor((noteIndex - 1) / 7) ; octave++) {
          note = note.interval('P8');
        }

        return note.scientific();
      });

      this.state.length = measure.play.length;
      this.state.delay = measure.play.delay;

      if (!this.state.active) {
        this.state.active = true;
        this.playNotes(0);
      }
    }
    else {
      this.state.active = false;
    }
  }

  playNotes(index) {
    if (this.state.playing) {
      this.violin.stop();
      this.state.playing = false;

      if (this.state.active) {
        setTimeout(() => {
          this.playNotes((index + 1) % this.state.notes.length);
        }, this.state.delay);
      }
    }

    else if (this.state.active) {
      // Reset index if pattern length has changed 
      index = index >= this.state.notes.length ? 0 : index;
      this.violin.play(this.state.notes[index]);
      this.state.playing = true;

      setTimeout(() => {
        this.playNotes(index);
      }, this.state.length);
    }
  }

  stop() {
    if (this.state.playing) {
      this.violin.stop();
      this.state.playing = false;
    }
    this.state.active = false;
    super.stop();
  }
}

export default SynthPadPlayer;
