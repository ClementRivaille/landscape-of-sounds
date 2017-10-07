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
          chord: tones[1] + '7',
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
          chord: tones[0] + '7',
          mixolydian: false
        },
        {
          toneIndex: 5, // 5 // 2
          chord: tones[5],
          mixolydian: false
        },
        {
          toneIndex: 0,
          chord: tones[0] + '7',
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
          chord: tones[3] + '7',
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
        {}, {active: true, volume: {level: 2, delay: 6000}}, {active: true}, {active: true, global: true, volume: {level: 1, delay: 4000}},
        // A
        {active: true, global: true, volume: {level: 1, delay: 4000}, filter: {level: 2, delay: 8000}, compressor: {level: 2, delay: 8000}}, {active: true, global: true}, {active: true, volume: {level: 0, delay: 10000}, pace: {value: 800, delay: 10000}}, {},
        // C
        {}, {}, {}, {active: true, volume: {level: 3, delay: 8000}},
        // A
        {active: true, volume: {level: 1, delay: 8000}, pace: {value: 600, delay: 10000}}, {active: true, volume: {level: 0, delay: 8000}}, {}, {} ],
      harp: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {playing: true, volume: {level: 1, delay: 9000}},
        // A
        {playing: true, filter: {level: 0, delay: 10000}}, {playing: true, volume: {level: 2, delay: 9000}, filter: {level: 1, delay: 4000}}, {playing: true, volume: {level: 1, delay: 9000}, paces: [{level: 3, delay: 5000}, {level: 1, delay: 2000}]}, {playing: true, volume: {level: 0, delay: 6000}},
        // C
        {}, {}, {}, {playing: true, filter: {level: 2, delay: 5000}, paces: [{level: 0, delay:2000}, {level: 2, delay: 5000}], volume: {level: 2, delay: 4000}},
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
        {volume: {level: 1, delay: 5000}}, {}, {filter: {level: 2, delay: 6000}}, {},
        // C
        {filter: {level: 0, delay: 6000}, volume: {level: 2, delay: 5000}}, {}, {wawah: {level: 2, delay: 6000}}, {},
        // A
        {filter: {level: 1, delay: 6000}, volume: {level: 1, delay: 5000}, wahwah: {level: 1, delay: 5000}}, {}, {volume: {level: 0, delay: 4000}}, {} ],
      tuba: [ {}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, {active: true, pace: 800, delay: 2500, volume: {level: 1}}, {active: true, pace: 800, delay: 2500, volume: {level: 1}},
        // C
        {active: true, pace: 800, delay: 2000, volume: {level: 0}}, {active: true, pace: 800, delay: 2000, volume: {level: 0}}, {active: true, pace: 800, delay: 1800, volume: {level: 2}}, {active: true, pace: 800, delay: 2000, volume: {level: 1}},
        // A
        {active: true, pace: 800, delay: 2500, volume: {level: 1}}, {}, {}, {} ],
      vibraphone: [ {}, {},
        // A
        {}, {}, {active: true, pace: 6000, interval: 400, delay: 1400}, {active: true, pace: 6000, interval: 400, multiple: true, delay: 1571},
        // B
        {}, {active: true, pace: 6000, interval: 400, multiple: true, delay: 1643}, {active: true, pace: 6000, interval: 400, multiple: true, delay: 1346}, {},
        // A
        {active: true, pace: 4000, interval: 600, multiple: true, delay: 1348}, {active: true, pace: 4000, interval: 500, multiple: true, delay: 1649}, {}, {},
        // C
        {}, {active: true, pace: 6000, interval: 400, multiple: true, delay: 843}, {}, {active: true, pace: 6000, interval: 400, multiple: true, delay: 1148},
        // A
        {active: true, pace: 6000, interval: 400, multiple: true, delay: 1469}, {}, {active: true, pace: 6000, interval: 400, delay: 1264}, {} ],

      violon: [ {}, {},
        // A
        {}, {}, {play: {pattern: 2, length: 2000, delay: 3500}, filter: {level: 0, speed: 4000}, delay: 1411}, {play: {pattern: 2, length: 2000, delay: 3500}, delay: 1681},
        // B
        {}, {play: {pattern: 0, length: 2000, delay: 3500}, filter: {level: 1, speed: 4000}, delay: 812}, {play: {pattern: 0, length: 2000, delay: 3500}, delay: 1648}, {},
        // A
        {play: {pattern: 4, length: 2000, delay: 3500}, filter: {level: 2, speed: 8000}, tremolo: {setting: 1}, delay: 1436}, {play: {pattern: 4, length: 2000, delay: 3500}, delay: 1854}, {}, {},
        // C
        {play: {pattern: 2, length: 2000, delay: 3500}, filter: {level: 0, speed: 4000}}, {}, {play: {pattern: 1, length: 1500, delay: 3000}, filter: {level: 1, speed: 4000}}, {},
        // A
        {}, {play: {pattern: 3, length: 2000, delay: 3500}, filter: {level: 1, speed: 4000}, tremolo: {stop: true}}, {}, {} ],
      whistle: [ {}, {active: true, pattern: 0, delay: 1500, volume: {level: 2, delay: 500}, pace: {value: 300, delay: 500}},
        // A
        {active: true, pattern: 0, delay: 1500, volume: {level: 1, delay: 500}}, {active: true, pattern: 1, delay: 1500}, {active: true, pattern: 2, pace: {value: 200, delay: 500}, delay: 1500}, {},
        // B
        {}, {}, {active: true, pattern: 0, delay: 1500}, {},
        // A
        {}, {}, {active: true, pattern: 1, pace: {value: 300, delay: 500}, delay: 1500}, {active: true, pattern: 1, delay: 1500},
        // C
        {active: true, pattern: 0, delay: 1500, pace: {value: 200, delay: 500}}, {active: true, pattern: 1}, {active: true, pattern: 2, delay: 1500}, {active: true, pattern: 1, delay: 1500},
        // A
        {active: true, pattern: 0, delay: 1500, pace: {value: 300, delay: 500}}, {active: true, pattern: 2, delay: 1500}, {active: true, pattern: 0, delay: 1500}, {} ]
    };
  }
  
}

export default Composer;
