import BassPiano from './instruments/bass-piano';
import SynthPad from './instruments/synth-pad';
import LightBells from './instruments/light-bells';
import Violin from './instruments/violin';
import SquareHarp from './instruments/square-harp';
import Vibraphone from './instruments/vibraphone';
import ChordBeat from './instruments/chord-beat';
import TriangleChord from './instruments/triangle-chord'
import Tuba from './instruments/tuba';
import Whistle from './instruments/whistle';

import teoria from 'teoria';
window.teoria = teoria;
let scaleNotes = teoria.scale('a4', 'major').notes();

const bassPiano = new BassPiano();

const synthPad = new SynthPad();
synthPad.playChord('a3', 'M7');

const lightBells = new LightBells();

const violin = new Violin();

const squareHarp = new SquareHarp();
squareHarp.setChord('a3', 'M7');
let paces = [600, 50, 100];
let indexPace = 0;

const vibraphone = new Vibraphone();

const chordBeat = new ChordBeat();
chordBeat.setNotes(scaleNotes[2].scientific(), scaleNotes[4].scientific(), scaleNotes[1].interval('P8').scientific());

const triangleChord = new TriangleChord();
triangleChord.playChord('a4', 'M7');
let trianglePlaying = false;

const waveBass = new Tuba();
waveBass.setNote('E2');

const whistle = new Whistle();

let shift = false
let someNotes = ['a4', 'c#4', 'e4', 'g#4', 'b4'];
let index = 0;

window.playA4 = function() {
  bassPiano.play(shift ? 'c#3' : 'a2', true);
}

window.turnSynthOn = function() {
  synthPad.turnVolume(0.1, 5000);
}

window.turnSynthOff = function() {
  synthPad.turnVolume(0, 5000);
}

window.changeSynthFrequency = function() {
  synthPad.setLowFilterFrequency(Math.random() * 2500 + 500, 5000);
}

window.playBells = function() {
  lightBells.ring('a4', 'major');
}

window.playViolin = function() {
  let note = someNotes[index]
  violin.play(note);
  index = (index+1)%someNotes.length
}

window.waveViolinFreq = function() {
  violin.sineFilter('frequency', 300, 200);
}

window.playSquareHarp = function() {
  squareHarp.playing ? squareHarp.stop() : squareHarp.play();
}

window.switchHarpPace = function() {
  squareHarp.turnPace(paces[indexPace]);
  indexPace = (indexPace + 1) % paces.length;
}

window.playVibraphone = function() {
  vibraphone.play(scaleNotes[Math.floor(Math.random() * scaleNotes.length)].scientific());
}

window.playChordBeat = function() {
  chordBeat.playing ? chordBeat.stop() : chordBeat.play();
}

window.switchTriangle = function() {
  if (!trianglePlaying) {
    triangleChord.turnVolume(0.2, 5000);
  }
  else {
    triangleChord.turnVolume(0, 5000);
  }

  trianglePlaying = !trianglePlaying;
}

window.changeTriangleFrequency = function() {
  triangleChord.setFilterFrequency(Math.random() * 2500 + 2000, 5000);
}

window.switchWaveBass = function() {
  waveBass.play(0.05, 1000);
}

// window.changeWaveBassFrequency = function() {
//   triangleChord.setFilterFrequency(Math.random() * 1000 + 200, 5000);
// }

window.playWhistle = function() {
  whistle.playNotes([scaleNotes[4].scientific(), scaleNotes[1].scientific(), scaleNotes[5].scientific(), scaleNotes[6].interval('P-8').scientific()])
}



window.switchChord = function() {
  shift = !shift;

  if (!shift) {
    synthPad.playChord('a3', 'M7');
    squareHarp.setChord('a3', 'M7');
  }
  else {
    synthPad.playChord('c#3', 'm');
    squareHarp.setChord('c#3', 'm');
  }

}
