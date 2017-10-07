import EventEmitter from './event-emitter';

import BassPlayer from './players/bass-player';
import ChordBeat from './players/chord-beat-player';
import HarpPlayer from './players/harp-player';
import LightBellsPlayer from './players/light-bells-player';
import SynthPadPlayer from './players/synth-pad-player';
import TriangleSynthPlayer from './players/triangle-synth-player';
import TubaPlayer from './players/tuba-player';
import VibraphonePlayer from './players/vibraphone-player';
import ViolinPlayer from './players/violin-player';
import WhistlePlayer from './players/whistle-player';

import Composer from './composer';

class Conductor {

  constructor() {
    // Go fetch a global sheet
    // TODO

    let composer = new Composer();
    this.sheet = composer.getSheet();
    let tonic = 'A4';
    this.pace = 15000;

    // Create event manager
    this.eventEmitter = new EventEmitter();

    // Create players
    this.bassPlayer = new BassPlayer(this.eventEmitter, this.sheet.bass, tonic);
    this.chordBeat = new ChordBeat(this.eventEmitter, this.sheet.chordBeat, tonic);
    this.harpPlayer = new HarpPlayer(this.eventEmitter, this.sheet.harp, tonic);
    this.lightBellsPlayer = new LightBellsPlayer(this.eventEmitter, this.sheet.bells, tonic);
    this.synthPadPlayer = new SynthPadPlayer(this.eventEmitter, this.sheet.synth, tonic);
    this.triangleSynthPlayer = new TriangleSynthPlayer(this.eventEmitter, this.sheet.triangleSynth, tonic);
    this.tubaPlayer = new TubaPlayer(this.eventEmitter, this.sheet.tuba, tonic);
    this.vibraphonePlayer = new VibraphonePlayer(this.eventEmitter, this.sheet.vibraphone, tonic);
    this.violinPlayer = new ViolinPlayer(this.eventEmitter, this.sheet.violon, tonic);
    this.whistlePlayer = new WhistlePlayer(this.eventEmitter, this.sheet.whistle, tonic);


    // Let's play music
    // this.playMeasure(0);
  }
  
  playMeasure(index) {
    let measure = this.sheet.conductor[index];
    this.eventEmitter.emit('changeMeasure', index, measure.toneIndex, measure.chord, measure.mixolydian);

    if (index + 1 < this.sheet.conductor.length) {
      setTimeout(() => this.playMeasure(index + 1), this.pace);
    }
    else {
      setTimeout(() => this.eventEmitter.emit('stop'), this.pace);
    }
  }

}

export default Conductor;
