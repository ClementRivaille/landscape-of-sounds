let tones = ['M', 'm', 'm', 'M', 'M', 'm',  'dim'];
// let mixolydianTones = ['M', 'm', 'dim', 'M', 'm', 'm', 'M'];

class Composer {


  getTone() {
    return 'A';
  }

  getSheet() {
    return {
      conductor: [
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        // A
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 3, // 5 // 2
          chord: tones[3],
          mixolydian: false
        },
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 3,
          chord: tones[3],
          mixolydian: false
        },
        // B
        {
          toneIndex: 1,  // 3  // 5
          chord: tones[1],
          mixolydian: false
        },
        {
          toneIndex:2,  // 3  // 5
          chord: tones[2],
          mixolydian: false
        },
        {
          toneIndex: 1,  // 3  // 5
          chord: tones[1],
          mixolydian: false
        },
        {
          toneIndex: 6,  // 3  // 5
          chord: tones[6],
          mixolydian: false
        },
        // A
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 5, // 5 // 2
          chord: tones[5],
          mixolydian: false
        },
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 5,
          chord: tones[5],
          mixolydian: false
        },
        // C
        {
          toneIndex: 1,
          chord: tones[1],
          mixolydian: true
        },
        {
          toneIndex: 2,
          chord: tones[2],
          mixolydian: true
        },
        {
          toneIndex: 5,
          chord: tones[5],
          mixolydian: true
        },
        {
          toneIndex: 4,
          chord: tones[4],
          mixolydian: false
        },
        // A
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 3, // 5 // 2
          chord: tones[3],
          mixolydian: false
        },
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }
      ],
      bass: [
        {
          interval: 8000, active: false
        },
        {
          interval: 8000, active: true
        },
        // A
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        // B
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        // A
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        // C
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        // A
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: true
        },
        {
          interval: 8000, active: false
        }
      ],
      chordBeat: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, {}, {},
        // C
        {}, {}, {}, {},
        // A
        {}, {}, {}, {} ],
      harp: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {playing: true, volume: {level: 1, delay: 9000}},
        // A
        {playing: true, filter: {level: 0, delay: 10000}}, {playing: true, volume: {level: 2, delay: 9000}, filter: {level: 1, delay: 4000}}, {playing: true, volume: {level: 1, delay: 9000}, paces: [{level: 3, delay: 5000}, {level: 1, delay: 2000}]}, {playing: true, volume: {level: 0, delay: 6000}},
        // C
        {}, {}, {playing: true, volume: {level: 1, delay: 4000}, paces: [{level: 0, delay:2000}, {level: 2, delay: 5000}]}, {playing: true, filter: {level: 2, delay: 5000}},
        // A
        {playing: true}, {}, {}, {} ],
      bells: [ {}, {},
        // A
        {tonic: true, delay: 5000}, {tonic: true, delay: 5000}, {tonic: true, delay: 5000}, {tonic: true, delay: 5000},
        // B
        {}, {}, {tonic: true, delay: 5000}, {tonic: true, delay: 5000},
        // A
        {}, {}, {}, {},
        // C
        {chord: true, delay: 5000}, {chord: true, delay: 5000}, {chord: true, delay: 5000}, {chord: true, delay: 5000},
        // A
        {tonic: true, delay: 5000}, {tonic: true, delay: 5000}, {tonic: true, delay: 5000}, {tonic: true, delay: 5000} ],
      synth: [
        {
          volume: {
            level: 1, speed: 9000
          },
          filter: {
            level: 0, speed: 100
          }
        },
        {},
        // A
        {},
        {},
        {},
        {},
        // B
        {filter: {
            level: 2, speed: 9000
          }},
        {},
        {},
        {},
        // A
        {},
        {},
        {},
        {},
        // C
        {volume: {
            level: 2, speed: 9000
          },
        filter: {
            level: 0, speed: 9000
          }},
        {},
        {},
        {},
        // A
        {volume: {
            level: 1, speed: 9000
          },
        filter: {
            level: 1, speed: 9000
          }},
        {},
        {},
        {}
      ],
      triangleSynth: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, {}, {},
        // C
        {}, {}, {}, {},
        // A
        {}, {}, {}, {} ],
      tuba: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, {}, {},
        // C
        {}, {}, {}, {},
        // A
        {}, {}, {}, {} ],
      vibraphone: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, {}, {},
        // C
        {}, {}, {}, {},
        // A
        {}, {}, {}, {} ],
      violon: [ {}, {},
        // A
        {}, {}, {play: {pattern: 2, length: 2000, delay: 3500}, filter: {level: 0, speed: 4000}}, {play: {pattern: 2, length: 2000, delay: 3500}},
        // B
        {}, {play: {pattern: 0, length: 2000, delay: 3500}, filter: {level: 1, speed: 4000}}, {play: {pattern: 0, length: 2000, delay: 3500}}, {},
        // A
        {play: {pattern: 4, length: 2000, delay: 3500}, filter: {level: 2, speed: 8000}, tremolo: {setting: 1}}, {play: {pattern: 4, length: 2000, delay: 3500}}, {}, {},
        // C
        {}, {}, {}, {},
        // A
        {}, {play: {pattern: 3, length: 2000, delay: 3500}, filter: {level: 1, speed: 4000}, tremolo: {stop: true}}, {}, {} ],
      whistle: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, {}, {},
        // C
        {}, {}, {}, {},
        // A
        {}, {}, {}, {} ]
    };
  }
  
}

export default Composer;
