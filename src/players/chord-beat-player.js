import Player from './player';
import ChordBeat from '../instruments/chord-beat';

class ChordBeatPlayer extends Player {
  constructor(eventEmitter, sheet, tonic) {

    super(eventEmitter, sheet, tonic);

    this.chordbeat = new ChordBeat();
    this.chordbeat.turnVolume(0, 100);
    this.volume = 0;

    this.settings = {
      volumes: {
        0: 0,
        1: 0.15,
        2: 0.2,
        3: 0.3
      },
      filters: {
        0: 400,
        1: 600,
        2: 800
      },
      compressors: {
        0: -10,
        1: -20,
        2: -40
      }
    }
  }

  changeMeasure(index, noteIndex, chord, mixolydian) {
    let measure = this.sheet[index]
    let scale = mixolydian ? this.mixolydian : this.color;

    if (measure.active) {
      let notes = [];
      if (measure.global) {
        notes.push(scale.notes()[2].scientific());
        notes.push(scale.notes()[4].scientific());
        notes.push(scale.notes()[1].interval('P8').scientific());
      }
      else {
        for (let interval of [2, 4, 8]) {
          let chordIndex = (noteIndex + interval) % scale.notes().length;
          let note = scale.notes()[chordIndex];
          if (chordIndex === 0) {
            note = note.interval('P8');
          }
          notes.push(note.scientific());
        }
      }

      this.chordbeat.setNotes(notes[0], notes[1], notes[2]);

      if (!this.playing) {
        this.chordbeat.play();
        this.playing = true;
      }
    }
    else {
      if (this.playing) {
        this.chordbeat.stop();
      }
      this.playing = false;
    }


    if (measure.volume) {
      this.chordbeat.turnVolume(this.settings.volumes[measure.volume.level], measure.volume.delay);
      this.volume = measure.volume.level;
    }
    if (measure.pace) {
      this.chordbeat.turnPace(measure.pace.value, measure.pace.delay);
    }

    if (measure.filter) {
      this.chordbeat.setFilterProperty('frequency', this.settings.filters[measure.filter.level] + (Math.random() * 200 - 100), measure.filter.delay);
    }

    if (measure.compressor) {
      this.chordbeat.setCompressorProperty('threshold', this.settings.compressors[measure.compressor.level] + (Math.random() * 10 - 5), measure.compressor.delay);
    }
  }

  stop() {
    if (this.playing) {
      this.chordbeat.stop();
      this.playing = false;
    }
    super.stop();
  }  
}


export default ChordBeatPlayer;
