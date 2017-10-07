/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Note = __webpack_require__(18);
var Interval = __webpack_require__(5);
var Chord = __webpack_require__(26);
var Scale = __webpack_require__(27);

var teoria;

// never thought I would write this, but: Legacy support
function intervalConstructor(from, to) {
  // Construct a Interval object from string representation
  if (typeof from === 'string') return Interval.toCoord(from);

  if (typeof to === 'string' && from instanceof Note) return Interval.from(from, Interval.toCoord(to));

  if (to instanceof Interval && from instanceof Note) return Interval.from(from, to);

  if (to instanceof Note && from instanceof Note) return Interval.between(from, to);

  throw new Error('Invalid parameters');
}

intervalConstructor.toCoord = Interval.toCoord;
intervalConstructor.from = Interval.from;
intervalConstructor.between = Interval.between;
intervalConstructor.invert = Interval.invert;

function noteConstructor(name, duration) {
  if (typeof name === 'string') return Note.fromString(name, duration);else return new Note(name, duration);
}

noteConstructor.fromString = Note.fromString;
noteConstructor.fromKey = Note.fromKey;
noteConstructor.fromFrequency = Note.fromFrequency;
noteConstructor.fromMIDI = Note.fromMIDI;

function chordConstructor(name, symbol) {
  if (typeof name === 'string') {
    var root, octave;
    root = name.match(/^([a-h])(x|#|bb|b?)/i);
    if (root && root[0]) {
      octave = typeof symbol === 'number' ? symbol.toString(10) : '4';
      return new Chord(Note.fromString(root[0].toLowerCase() + octave), name.substr(root[0].length));
    }
  } else if (name instanceof Note) return new Chord(name, symbol);

  throw new Error('Invalid Chord. Couldn\'t find note name');
}

function scaleConstructor(tonic, scale) {
  tonic = tonic instanceof Note ? tonic : teoria.note(tonic);
  return new Scale(tonic, scale);
}

teoria = {
  note: noteConstructor,

  chord: chordConstructor,

  interval: intervalConstructor,

  scale: scaleConstructor,

  Note: Note,
  Chord: Chord,
  Scale: Scale,
  Interval: Interval
};

__webpack_require__(28)(teoria);
exports = module.exports = teoria;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e) {
  "use strict";
  function t(e, t) {
    this.options = {}, e = e || this.options;var i = { frequency: 350, peak: 1 };this.inputNode = this.filterNode = s.context.createBiquadFilter(), this.filterNode.type = t, this.outputNode = o.context.createGain(), this.filterNode.connect(this.outputNode);for (var n in i) {
      this[n] = e[n], this[n] = void 0 === this[n] || null === this[n] ? i[n] : this[n];
    }
  }function i() {
    var e,
        t,
        i = s.context.sampleRate * this.time,
        n = o.context.createBuffer(2, i, s.context.sampleRate),
        a = n.getChannelData(0),
        r = n.getChannelData(1);for (t = 0; i > t; t++) {
      e = this.reverse ? i - t : t, a[t] = (2 * Math.random() - 1) * Math.pow(1 - e / i, this.decay), r[t] = (2 * Math.random() - 1) * Math.pow(1 - e / i, this.decay);
    }this.reverbNode.buffer = n;
  }function n(e) {
    for (var t = s.context.sampleRate, i = new Float32Array(t), n = Math.PI / 180, o = 0; t > o; o++) {
      var a = 2 * o / t - 1;i[o] = (3 + e) * a * 20 * n / (Math.PI + e * Math.abs(a));
    }return i;
  }var o = {},
      s = o,
      a = "object" == ( false ? "undefined" : _typeof(module)) && module.exports,
      r = "function" == "function" && __webpack_require__(44);a ? module.exports = o : r ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (o),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.Pizzicato = e.Pz = o;var c = e.AudioContext || e.webkitAudioContext;if (!c) return void console.error("No AudioContext found in this environment. Please ensure your window or global object contains a working AudioContext constructor function.");o.context = new c();var h = o.context.createGain();h.connect(o.context.destination), o.Util = { isString: function isString(e) {
      return "[object String]" === toString.call(e);
    }, isObject: function isObject(e) {
      return "[object Object]" === toString.call(e);
    }, isFunction: function isFunction(e) {
      return "[object Function]" === toString.call(e);
    }, isNumber: function isNumber(e) {
      return "[object Number]" === toString.call(e) && e === +e;
    }, isArray: function isArray(e) {
      return "[object Array]" === toString.call(e);
    }, isInRange: function isInRange(e, t, i) {
      return s.Util.isNumber(e) && s.Util.isNumber(t) && s.Util.isNumber(i) ? e >= t && i >= e : !1;
    }, isBool: function isBool(e) {
      return "boolean" == typeof e;
    }, isOscillator: function isOscillator(e) {
      return e && "[object OscillatorNode]" === e.toString();
    }, isAudioBufferSourceNode: function isAudioBufferSourceNode(e) {
      return e && "[object AudioBufferSourceNode]" === e.toString();
    }, isSound: function isSound(e) {
      return e instanceof s.Sound;
    }, isEffect: function isEffect(e) {
      for (var t in o.Effects) {
        if (e instanceof o.Effects[t]) return !0;
      }return !1;
    }, normalize: function normalize(e, t, i) {
      return s.Util.isNumber(e) && s.Util.isNumber(t) && s.Util.isNumber(i) ? (i - t) * e / 1 + t : void 0;
    }, getDryLevel: function getDryLevel(e) {
      return !s.Util.isNumber(e) || e > 1 || 0 > e ? 0 : .5 >= e ? 1 : 1 - 2 * (e - .5);
    }, getWetLevel: function getWetLevel(e) {
      return !s.Util.isNumber(e) || e > 1 || 0 > e ? 0 : e >= .5 ? 1 : 1 - 2 * (.5 - e);
    } };var u = o.context.createGain(),
      d = Object.getPrototypeOf(Object.getPrototypeOf(u)),
      l = d.connect;d.connect = function (e) {
    var t = s.Util.isEffect(e) ? e.inputNode : e;return l.call(this, t), e;
  }, Object.defineProperty(o, "volume", { enumerable: !0, get: function get() {
      return h.gain.value;
    }, set: function set(e) {
      s.Util.isInRange(e, 0, 1) && h && (h.gain.value = e);
    } }), Object.defineProperty(o, "masterGainNode", { enumerable: !1, get: function get() {
      return h;
    }, set: function set(e) {
      console.error("Can't set the master gain node");
    } }), o.Events = { on: function on(e, t, i) {
      if (e && t) {
        this._events = this._events || {};var n = this._events[e] || (this._events[e] = []);n.push({ callback: t, context: i || this, handler: this });
      }
    }, trigger: function trigger(e) {
      if (e) {
        var t, i, n, o;if (this._events = this._events || {}, t = this._events[e] || (this._events[e] = [])) {
          for (i = Math.max(0, arguments.length - 1), n = [], o = 0; i > o; o++) {
            n[o] = arguments[o + 1];
          }for (o = 0; o < t.length; o++) {
            t[o].callback.apply(t[o].context, n);
          }
        }
      }
    }, off: function off(e) {
      e ? this._events[e] = void 0 : this._events = {};
    } }, o.Sound = function (e, t) {
    function i(e) {
      var t = ["wave", "file", "input", "script", "sound"];if (e && !d.isFunction(e) && !d.isString(e) && !d.isObject(e)) return "Description type not supported. Initialize a sound using an object, a function or a string.";if (d.isObject(e)) {
        if (!d.isString(e.source) || -1 === t.indexOf(e.source)) return "Specified source not supported. Sources can be wave, file, input or script";if (!("file" !== e.source || e.options && e.options.path)) return "A path is needed for sounds with a file source";if (!("script" !== e.source || e.options && e.options.audioFunction)) return "An audio function is needed for sounds with a script source";
      }
    }function n(e, t) {
      e = e || {}, this.getRawSourceNode = function () {
        var t = this.sourceNode ? this.sourceNode.frequency.value : e.frequency,
            i = o.context.createOscillator();return i.type = e.type || "sine", i.frequency.value = t || 440, i;
      }, this.sourceNode = this.getRawSourceNode(), this.sourceNode.gainSuccessor = s.context.createGain(), this.sourceNode.connect(this.sourceNode.gainSuccessor), d.isFunction(t) && t();
    }function a(e, t) {
      e = d.isArray(e) ? e : [e];var i = new XMLHttpRequest();i.open("GET", e[0], !0), i.responseType = "arraybuffer", i.onload = function (i) {
        o.context.decodeAudioData(i.target.response, function (e) {
          u.getRawSourceNode = function () {
            var t = o.context.createBufferSource();return t.loop = this.loop, t.buffer = e, t;
          }, d.isFunction(t) && t();
        }.bind(u), function (i) {
          return console.error("Error decoding audio file " + e[0]), e.length > 1 ? (e.shift(), void a(e, t)) : (i = i || new Error("Error decoding audio file " + e[0]), void (d.isFunction(t) && t(i)));
        }.bind(u));
      }, i.onreadystatechange = function (t) {
        4 === i.readyState && 200 !== i.status && console.error("Error while fetching " + e[0] + ". " + i.statusText);
      }, i.send();
    }function r(e, t) {
      return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, navigator.getUserMedia ? void navigator.getUserMedia({ audio: !0 }, function (e) {
        u.getRawSourceNode = function () {
          return o.context.createMediaStreamSource(e);
        }, d.isFunction(t) && t();
      }.bind(u), function (e) {
        d.isFunction(t) && t(e);
      }) : void console.error("Your browser does not support getUserMedia");
    }function c(e, t) {
      var i = d.isFunction(e) ? e : e.audioFunction,
          n = d.isObject(e) && e.bufferSize ? e.bufferSize : null;if (!n) try {
        o.context.createScriptProcessor();
      } catch (s) {
        n = 2048;
      }this.getRawSourceNode = function () {
        var e = o.context.createScriptProcessor(n, 1, 1);return e.onaudioprocess = i, e;
      };
    }function h(e, t) {
      this.getRawSourceNode = e.sound.getRawSourceNode, e.sound.sourceNode && s.Util.isOscillator(e.sound.sourceNode) && (this.sourceNode = this.getRawSourceNode(), this.frequency = e.sound.frequency);
    }var u = this,
        d = o.Util,
        l = i(e),
        f = d.isObject(e) && d.isObject(e.options),
        p = .04,
        v = .04;if (l) throw console.error(l), new Error("Error initializing Pizzicato Sound: " + l);this.detached = f && e.options.detached, this.masterVolume = o.context.createGain(), this.fadeNode = o.context.createGain(), this.fadeNode.gain.value = 0, this.detached || this.masterVolume.connect(o.masterGainNode), this.lastTimePlayed = 0, this.effects = [], this.effectConnectors = [], this.playing = this.paused = !1, this.loop = f && e.options.loop, this.attack = f && d.isNumber(e.options.attack) ? e.options.attack : p, this.volume = f && d.isNumber(e.options.volume) ? e.options.volume : 1, f && d.isNumber(e.options.release) ? this.release = e.options.release : f && d.isNumber(e.options.sustain) ? (console.warn("'sustain' is deprecated. Use 'release' instead."), this.release = e.options.sustain) : this.release = v, e ? d.isString(e) ? a.bind(this)(e, t) : d.isFunction(e) ? c.bind(this)(e, t) : "file" === e.source ? a.bind(this)(e.options.path, t) : "wave" === e.source ? n.bind(this)(e.options, t) : "input" === e.source ? r.bind(this)(e, t) : "script" === e.source ? c.bind(this)(e.options, t) : "sound" === e.source && h.bind(this)(e.options, t) : n.bind(this)({}, t);
  }, o.Sound.prototype = Object.create(o.Events, { play: { enumerable: !0, value: function value(e, t) {
        this.playing || (s.Util.isNumber(t) || (t = this.offsetTime || 0), s.Util.isNumber(e) || (e = 0), this.playing = !0, this.paused = !1, this.sourceNode = this.getSourceNode(), this.applyAttack(), s.Util.isFunction(this.sourceNode.start) && (this.lastTimePlayed = o.context.currentTime - t, this.sourceNode.start(s.context.currentTime + e, t)), this.trigger("play"));
      } }, stop: { enumerable: !0, value: function value() {
        (this.paused || this.playing) && (this.paused = this.playing = !1, this.stopWithRelease(), this.offsetTime = 0, this.trigger("stop"));
      } }, pause: { enumerable: !0, value: function value() {
        if (!this.paused && this.playing) {
          this.paused = !0, this.playing = !1, this.stopWithRelease();var e = s.context.currentTime - this.lastTimePlayed;this.sourceNode.buffer ? this.offsetTime = e % (this.sourceNode.buffer.length / s.context.sampleRate) : this.offsetTime = e, this.trigger("pause");
        }
      } }, clone: { enumerable: !0, value: function value() {
        for (var e = new o.Sound({ source: "sound", options: { loop: this.loop, attack: this.attack, release: this.release, volume: this.volume, sound: this } }), t = 0; t < this.effects.length; t++) {
          e.addEffect(this.effects[t]);
        }return e;
      } }, onEnded: { enumerable: !0, value: function value(e) {
        return function () {
          this.sourceNode && this.sourceNode !== e || (this.playing && this.stop(), this.paused || this.trigger("end"));
        };
      } }, addEffect: { enumerable: !0, value: function value(e) {
        if (!s.Util.isEffect(e)) return console.error("The object provided is not a Pizzicato effect."), this;this.effects.push(e);var t = this.effectConnectors.length > 0 ? this.effectConnectors[this.effectConnectors.length - 1] : this.fadeNode;t.disconnect(), t.connect(e);var i = s.context.createGain();return this.effectConnectors.push(i), e.connect(i), i.connect(this.masterVolume), this;
      } }, removeEffect: { enumerable: !0, value: function value(e) {
        var t = this.effects.indexOf(e);if (-1 === t) return console.warn("Cannot remove effect that is not applied to this sound."), this;var i = this.playing;i && this.pause();var n = 0 === t ? this.fadeNode : this.effectConnectors[t - 1];n.disconnect();var o = this.effectConnectors[t];o.disconnect(), e.disconnect(o), this.effectConnectors.splice(t, 1), this.effects.splice(t, 1);var s;return s = t > this.effects.length - 1 || 0 === this.effects.length ? this.masterVolume : this.effects[t], n.connect(s), i && this.play(), this;
      } }, connect: { enumerable: !0, value: function value(e) {
        return this.masterVolume.connect(e), this;
      } }, disconnect: { enumerable: !0, value: function value(e) {
        return this.masterVolume.disconnect(e), this;
      } }, connectEffects: { enumerable: !0, value: function value() {
        for (var e = [], t = 0; t < this.effects.length; t++) {
          var i = t === this.effects.length - 1,
              n = i ? this.masterVolume : this.effects[t + 1].inputNode;e[t] = s.context.createGain(), this.effects[t].outputNode.disconnect(this.effectConnectors[t]), this.effects[t].outputNode.connect(n);
        }
      } }, volume: { enumerable: !0, get: function get() {
        return this.masterVolume ? this.masterVolume.gain.value : void 0;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && this.masterVolume && (this.masterVolume.gain.value = e);
      } }, frequency: { enumerable: !0, get: function get() {
        return this.sourceNode && s.Util.isOscillator(this.sourceNode) ? this.sourceNode.frequency.value : null;
      }, set: function set(e) {
        this.sourceNode && s.Util.isOscillator(this.sourceNode) && (this.sourceNode.frequency.value = e);
      } }, sustain: { enumerable: !0, get: function get() {
        return console.warn("'sustain' is deprecated. Use 'release' instead."), this.release;
      }, set: function set(e) {
        console.warn("'sustain' is deprecated. Use 'release' instead."), s.Util.isInRange(e, 0, 10) && (this.release = e);
      } }, getSourceNode: { enumerable: !0, value: function value() {
        if (this.sourceNode) {
          var e = this.sourceNode;e.gainSuccessor.gain.setValueAtTime(e.gainSuccessor.gain.value, s.context.currentTime), e.gainSuccessor.gain.linearRampToValueAtTime(1e-4, s.context.currentTime + .2), setTimeout(function () {
            e.disconnect(), e.gainSuccessor.disconnect();
          }, 200);
        }var t = this.getRawSourceNode();return t.gainSuccessor = s.context.createGain(), t.connect(t.gainSuccessor), t.gainSuccessor.connect(this.fadeNode), this.fadeNode.connect(this.getInputNode()), s.Util.isAudioBufferSourceNode(t) && (t.onended = this.onEnded(t).bind(this)), t;
      } }, getInputNode: { enumerable: !0, value: function value() {
        return this.effects.length > 0 ? this.effects[0].inputNode : this.masterVolume;
      } }, applyAttack: { enumerable: !1, value: function value() {
        var e = this.fadeNode.gain.value;if (this.fadeNode.gain.cancelScheduledValues(s.context.currentTime), this.fadeNode.gain.setValueAtTime(e, s.context.currentTime), !this.attack) return void this.fadeNode.gain.setValueAtTime(1, o.context.currentTime);var t = (1 - this.fadeNode.gain.value) * this.attack;this.fadeNode.gain.setValueAtTime(this.fadeNode.gain.value, o.context.currentTime), this.fadeNode.gain.linearRampToValueAtTime(1, o.context.currentTime + t);
      } }, stopWithRelease: { enumerable: !1, value: function value(e) {
        var t = this.sourceNode,
            i = function i() {
          return s.Util.isFunction(t.stop) ? t.stop(0) : t.disconnect();
        },
            n = this.fadeNode.gain.value;if (this.fadeNode.gain.cancelScheduledValues(s.context.currentTime), this.fadeNode.gain.setValueAtTime(n, s.context.currentTime), !this.release) return void i();var a = this.fadeNode.gain.value * this.release;this.fadeNode.gain.setValueAtTime(this.fadeNode.gain.value, o.context.currentTime), this.fadeNode.gain.linearRampToValueAtTime(1e-5, o.context.currentTime + a), window.setTimeout(function () {
          i();
        }, 1e3 * a);
      } } }), o.Group = function (e) {
    e = e || [], this.mergeGainNode = s.context.createGain(), this.masterVolume = s.context.createGain(), this.sounds = [], this.effects = [], this.effectConnectors = [], this.mergeGainNode.connect(this.masterVolume), this.masterVolume.connect(s.masterGainNode);for (var t = 0; t < e.length; t++) {
      this.addSound(e[t]);
    }
  }, o.Group.prototype = Object.create(s.Events, { connect: { enumerable: !0, value: function value(e) {
        return this.masterVolume.connect(e), this;
      } }, disconnect: { enumerable: !0, value: function value(e) {
        return this.masterVolume.disconnect(e), this;
      } }, addSound: { enumerable: !0, value: function value(e) {
        return s.Util.isSound(e) ? this.sounds.indexOf(e) > -1 ? void console.warn("The Pizzicato.Sound object was already added to this group") : (e.detached && console.warn("Groups do not support detached sounds. You can manually create an audio graph to group detached sounds together."), e.disconnect(s.masterGainNode), e.connect(this.mergeGainNode), void this.sounds.push(e)) : void console.error("You can only add Pizzicato.Sound objects");
      } }, removeSound: { enumerable: !0, value: function value(e) {
        var t = this.sounds.indexOf(e);return -1 === t ? void console.warn("Cannot remove a sound that is not part of this group.") : (e.disconnect(this.mergeGainNode), e.connect(s.masterGainNode), void this.sounds.splice(t, 1));
      } }, volume: { enumerable: !0, get: function get() {
        return this.masterVolume ? this.masterVolume.gain.value : void 0;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.masterVolume.gain.value = e);
      } }, play: { enumerable: !0, value: function value() {
        for (var e = 0; e < this.sounds.length; e++) {
          this.sounds[e].play();
        }this.trigger("play");
      } }, stop: { enumerable: !0, value: function value() {
        for (var e = 0; e < this.sounds.length; e++) {
          this.sounds[e].stop();
        }this.trigger("stop");
      } }, pause: { enumerable: !0, value: function value() {
        for (var e = 0; e < this.sounds.length; e++) {
          this.sounds[e].pause();
        }this.trigger("pause");
      } }, addEffect: { enumerable: !0, value: function value(e) {
        if (!s.Util.isEffect(e)) return console.error("The object provided is not a Pizzicato effect."), this;this.effects.push(e);var t = this.effectConnectors.length > 0 ? this.effectConnectors[this.effectConnectors.length - 1] : this.mergeGainNode;t.disconnect(), t.connect(e);var i = s.context.createGain();return this.effectConnectors.push(i), e.connect(i), i.connect(this.masterVolume), this;
      } }, removeEffect: { enumerable: !0, value: function value(e) {
        var t = this.effects.indexOf(e);if (-1 === t) return console.warn("Cannot remove effect that is not applied to this group."), this;var i = 0 === t ? this.mergeGainNode : this.effectConnectors(t - 1);i.disconnect();var n = this.effectConnectors[t];n.disconnect(), e.disconnect(n), this.effectConnectors.splice(t, 1), this.effects.splice(t, 1);var o;return o = t > this.effects.length - 1 || 0 === this.effects.length ? this.masterVolume : this.effects[t], i.connect(o), this;
      } } }), o.Effects = {};var f = Object.create(null, { connect: { enumerable: !0, value: function value(e) {
        return this.outputNode.connect(e), this;
      } }, disconnect: { enumerable: !0, value: function value(e) {
        return this.outputNode.disconnect(e), this;
      } } });o.Effects.Delay = function (e) {
    this.options = {}, e = e || this.options;var t = { feedback: .5, time: .3, mix: .5 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.feedbackGainNode = o.context.createGain(), this.delayNode = o.context.createDelay(), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.delayNode.connect(this.feedbackGainNode), this.feedbackGainNode.connect(this.delayNode), this.inputNode.connect(this.delayNode), this.delayNode.connect(this.wetGainNode), this.wetGainNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.Delay.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } }, time: { enumerable: !0, get: function get() {
        return this.options.time;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 180) && (this.options.time = e, this.delayNode.delayTime.value = e);
      } }, feedback: { enumerable: !0, get: function get() {
        return this.options.feedback;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.feedback = parseFloat(e, 10), this.feedbackGainNode.gain.value = this.feedback);
      } } }), o.Effects.Compressor = function (e) {
    this.options = {}, e = e || this.options;var t = { threshold: -24, knee: 30, attack: .003, release: .25, ratio: 12 };this.inputNode = this.compressorNode = o.context.createDynamicsCompressor(), this.outputNode = o.context.createGain(), this.compressorNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.Compressor.prototype = Object.create(f, { threshold: { enumerable: !0, get: function get() {
        return this.compressorNode.threshold.value;
      }, set: function set(e) {
        o.Util.isInRange(e, -100, 0) && (this.compressorNode.threshold.value = e);
      } }, knee: { enumerable: !0, get: function get() {
        return this.compressorNode.knee.value;
      }, set: function set(e) {
        o.Util.isInRange(e, 0, 40) && (this.compressorNode.knee.value = e);
      } }, attack: { enumerable: !0, get: function get() {
        return this.compressorNode.attack.value;
      }, set: function set(e) {
        o.Util.isInRange(e, 0, 1) && (this.compressorNode.attack.value = e);
      } }, release: { enumerable: !0, get: function get() {
        return this.compressorNode.release.value;
      }, set: function set(e) {
        o.Util.isInRange(e, 0, 1) && (this.compressorNode.release.value = e);
      } }, ratio: { enumerable: !0, get: function get() {
        return this.compressorNode.ratio.value;
      }, set: function set(e) {
        o.Util.isInRange(e, 1, 20) && (this.compressorNode.ratio.value = e);
      } }, getCurrentGainReduction: function getCurrentGainReduction() {
      return this.compressorNode.reduction;
    } }), o.Effects.LowPassFilter = function (e) {
    t.call(this, e, "lowpass");
  }, o.Effects.HighPassFilter = function (e) {
    t.call(this, e, "highpass");
  };var p = Object.create(f, { frequency: { enumerable: !0, get: function get() {
        return this.filterNode.frequency.value;
      }, set: function set(e) {
        o.Util.isInRange(e, 10, 22050) && (this.filterNode.frequency.value = e);
      } }, peak: { enumerable: !0, get: function get() {
        return this.filterNode.Q.value;
      }, set: function set(e) {
        o.Util.isInRange(e, 1e-4, 1e3) && (this.filterNode.Q.value = e);
      } } });o.Effects.LowPassFilter.prototype = p, o.Effects.HighPassFilter.prototype = p, o.Effects.Distortion = function (e) {
    this.options = {}, e = e || this.options;var t = { gain: .5 };this.waveShaperNode = o.context.createWaveShaper(), this.inputNode = this.outputNode = this.waveShaperNode;for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.Distortion.prototype = Object.create(f, { gain: { enumerable: !0, get: function get() {
        return this.options.gain;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.gain = e, this.adjustGain());
      } }, adjustGain: { writable: !1, configurable: !1, enumerable: !1, value: function value() {
        for (var e, t = s.Util.isNumber(this.options.gain) ? parseInt(100 * this.options.gain, 10) : 50, i = 44100, n = new Float32Array(i), o = Math.PI / 180, a = 0; i > a; ++a) {
          e = 2 * a / i - 1, n[a] = (3 + t) * e * 20 * o / (Math.PI + t * Math.abs(e));
        }this.waveShaperNode.curve = n;
      } } }), o.Effects.Flanger = function (e) {
    this.options = {}, e = e || this.options;var t = { time: .45, speed: .2, depth: .1, feedback: .1, mix: .5 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), this.inputFeedbackNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.delayNode = o.context.createDelay(), this.oscillatorNode = o.context.createOscillator(), this.gainNode = o.context.createGain(), this.feedbackNode = o.context.createGain(), this.oscillatorNode.type = "sine", this.inputNode.connect(this.inputFeedbackNode), this.inputNode.connect(this.dryGainNode), this.inputFeedbackNode.connect(this.delayNode), this.inputFeedbackNode.connect(this.wetGainNode), this.delayNode.connect(this.wetGainNode), this.delayNode.connect(this.feedbackNode), this.feedbackNode.connect(this.inputFeedbackNode), this.oscillatorNode.connect(this.gainNode), this.gainNode.connect(this.delayNode.delayTime), this.dryGainNode.connect(this.outputNode), this.wetGainNode.connect(this.outputNode), this.oscillatorNode.start(0);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.Flanger.prototype = Object.create(f, { time: { enumberable: !0, get: function get() {
        return this.options.time;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.time = e, this.delayNode.delayTime.value = s.Util.normalize(e, .001, .02));
      } }, speed: { enumberable: !0, get: function get() {
        return this.options.speed;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.speed = e, this.oscillatorNode.frequency.value = s.Util.normalize(e, .5, 5));
      } }, depth: { enumberable: !0, get: function get() {
        return this.options.depth;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.depth = e, this.gainNode.gain.value = s.Util.normalize(e, 5e-4, .005));
      } }, feedback: { enumberable: !0, get: function get() {
        return this.options.feedback;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.feedback = e, this.feedbackNode.gain.value = s.Util.normalize(e, 0, .8));
      } }, mix: { enumberable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } } }), o.Effects.StereoPanner = function (e) {
    this.options = {}, e = e || this.options;var t = { pan: 0 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), o.context.createStereoPanner ? (this.pannerNode = o.context.createStereoPanner(), this.inputNode.connect(this.pannerNode), this.pannerNode.connect(this.outputNode)) : this.inputNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.StereoPanner.prototype = Object.create(f, { pan: { enumerable: !0, get: function get() {
        return this.options.pan;
      }, set: function set(e) {
        s.Util.isInRange(e, -1, 1) && (this.options.pan = e, this.pannerNode && (this.pannerNode.pan.value = e));
      } } }), o.Effects.Convolver = function (e, t) {
    this.options = {}, e = e || this.options;var i = this,
        n = new XMLHttpRequest(),
        a = { mix: .5 };this.callback = t, this.inputNode = o.context.createGain(), this.convolverNode = o.context.createConvolver(), this.outputNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.inputNode.connect(this.convolverNode), this.convolverNode.connect(this.wetGainNode), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.wetGainNode.connect(this.outputNode);for (var r in a) {
      this[r] = e[r], this[r] = void 0 === this[r] || null === this[r] ? a[r] : this[r];
    }return e.impulse ? (n.open("GET", e.impulse, !0), n.responseType = "arraybuffer", n.onload = function (e) {
      var t = e.target.response;o.context.decodeAudioData(t, function (e) {
        i.convolverNode.buffer = e, i.callback && s.Util.isFunction(i.callback) && i.callback();
      }, function (e) {
        e = e || new Error("Error decoding impulse file"), i.callback && s.Util.isFunction(i.callback) && i.callback(e);
      });
    }, n.onreadystatechange = function (t) {
      4 === n.readyState && 200 !== n.status && console.error("Error while fetching " + e.impulse + ". " + n.statusText);
    }, void n.send()) : void console.error("No impulse file specified.");
  }, o.Effects.Convolver.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } } }), o.Effects.PingPongDelay = function (e) {
    this.options = {}, e = e || this.options;var t = { feedback: .5, time: .3, mix: .5 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), this.delayNodeLeft = o.context.createDelay(), this.delayNodeRight = o.context.createDelay(), this.dryGainNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.feedbackGainNode = o.context.createGain(), this.channelMerger = o.context.createChannelMerger(2), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.delayNodeLeft.connect(this.channelMerger, 0, 0), this.delayNodeRight.connect(this.channelMerger, 0, 1), this.delayNodeLeft.connect(this.delayNodeRight), this.feedbackGainNode.connect(this.delayNodeLeft), this.delayNodeRight.connect(this.feedbackGainNode), this.inputNode.connect(this.feedbackGainNode), this.channelMerger.connect(this.wetGainNode), this.wetGainNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.PingPongDelay.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } }, time: { enumerable: !0, get: function get() {
        return this.options.time;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 180) && (this.options.time = e, this.delayNodeLeft.delayTime.value = e, this.delayNodeRight.delayTime.value = e);
      } }, feedback: { enumerable: !0, get: function get() {
        return this.options.feedback;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.feedback = parseFloat(e, 10), this.feedbackGainNode.gain.value = this.feedback);
      } } }), o.Effects.Reverb = function (e) {
    this.options = {}, e = e || this.options;var t = { mix: .5, time: .01, decay: .01, reverse: !1 };this.inputNode = o.context.createGain(), this.reverbNode = o.context.createConvolver(), this.outputNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.inputNode.connect(this.reverbNode), this.reverbNode.connect(this.wetGainNode), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.wetGainNode.connect(this.outputNode);for (var n in t) {
      this[n] = e[n], this[n] = void 0 === this[n] || null === this[n] ? t[n] : this[n];
    }i.bind(this)();
  }, o.Effects.Reverb.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } }, time: { enumerable: !0, get: function get() {
        return this.options.time;
      }, set: function set(e) {
        s.Util.isInRange(e, 1e-4, 10) && (this.options.time = e, i.bind(this)());
      } }, decay: { enumerable: !0, get: function get() {
        return this.options.decay;
      }, set: function set(e) {
        s.Util.isInRange(e, 1e-4, 10) && (this.options.decay = e, i.bind(this)());
      } }, reverse: { enumerable: !0, get: function get() {
        return this.options.reverse;
      }, set: function set(e) {
        s.Util.isBool(e) && (this.options.reverse = e, i.bind(this)());
      } } }), o.Effects.Tremolo = function (e) {
    this.options = {}, e = e || this.options;var t = { speed: 4, depth: 1, mix: .8 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.tremoloGainNode = o.context.createGain(), this.tremoloGainNode.gain.value = 0, this.lfoNode = o.context.createOscillator(), this.shaperNode = o.context.createWaveShaper(), this.shaperNode.curve = new Float32Array([0, 1]), this.shaperNode.connect(this.tremoloGainNode.gain), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.lfoNode.connect(this.shaperNode), this.lfoNode.type = "sine", this.lfoNode.start(0), this.inputNode.connect(this.tremoloGainNode), this.tremoloGainNode.connect(this.wetGainNode), this.wetGainNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.Tremolo.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } }, speed: { enumerable: !0, get: function get() {
        return this.options.speed;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 20) && (this.options.speed = e, this.lfoNode.frequency.value = e);
      } }, depth: { enumerable: !0, get: function get() {
        return this.options.depth;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.depth = e, this.shaperNode.curve = new Float32Array([1 - e, 1]));
      } } }), o.Effects.DubDelay = function (e) {
    this.options = {}, e = e || this.options;var t = { feedback: .6, time: .7, mix: .5, cutoff: 700 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.feedbackGainNode = o.context.createGain(), this.delayNode = o.context.createDelay(), this.bqFilterNode = o.context.createBiquadFilter(), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.inputNode.connect(this.wetGainNode), this.inputNode.connect(this.feedbackGainNode), this.feedbackGainNode.connect(this.bqFilterNode), this.bqFilterNode.connect(this.delayNode), this.delayNode.connect(this.feedbackGainNode), this.delayNode.connect(this.wetGainNode), this.wetGainNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  }, o.Effects.DubDelay.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } }, time: { enumerable: !0, get: function get() {
        return this.options.time;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 180) && (this.options.time = e, this.delayNode.delayTime.value = e);
      } }, feedback: { enumerable: !0, get: function get() {
        return this.options.feedback;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.feedback = parseFloat(e, 10), this.feedbackGainNode.gain.value = this.feedback);
      } }, cutoff: { enumerable: !0, get: function get() {
        return this.options.cutoff;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 4e3) && (this.options.cutoff = e, this.bqFilterNode.frequency.value = this.cutoff);
      } } }), o.Effects.RingModulator = function (e) {
    this.options = {}, e = e || this.options;var t = { speed: 30, distortion: 1, mix: .5 };this.inputNode = o.context.createGain(), this.outputNode = o.context.createGain(), this.dryGainNode = o.context.createGain(), this.wetGainNode = o.context.createGain(), this.vIn = o.context.createOscillator(), this.vIn.start(0), this.vInGain = o.context.createGain(), this.vInGain.gain.value = .5, this.vInInverter1 = o.context.createGain(), this.vInInverter1.gain.value = -1, this.vInInverter2 = o.context.createGain(), this.vInInverter2.gain.value = -1, this.vInDiode1 = new v(o.context), this.vInDiode2 = new v(o.context), this.vInInverter3 = o.context.createGain(), this.vInInverter3.gain.value = -1, this.vcInverter1 = o.context.createGain(), this.vcInverter1.gain.value = -1, this.vcDiode3 = new v(o.context), this.vcDiode4 = new v(o.context), this.outGain = o.context.createGain(), this.outGain.gain.value = 3, this.compressor = o.context.createDynamicsCompressor(), this.compressor.threshold.value = -24, this.compressor.ratio.value = 16, this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode), this.inputNode.connect(this.vcInverter1), this.inputNode.connect(this.vcDiode4.node), this.vcInverter1.connect(this.vcDiode3.node), this.vIn.connect(this.vInGain), this.vInGain.connect(this.vInInverter1), this.vInGain.connect(this.vcInverter1), this.vInGain.connect(this.vcDiode4.node), this.vInInverter1.connect(this.vInInverter2), this.vInInverter1.connect(this.vInDiode2.node), this.vInInverter2.connect(this.vInDiode1.node), this.vInDiode1.connect(this.vInInverter3), this.vInDiode2.connect(this.vInInverter3), this.vInInverter3.connect(this.compressor), this.vcDiode3.connect(this.compressor), this.vcDiode4.connect(this.compressor), this.compressor.connect(this.outGain), this.outGain.connect(this.wetGainNode), this.wetGainNode.connect(this.outputNode);for (var i in t) {
      this[i] = e[i], this[i] = void 0 === this[i] || null === this[i] ? t[i] : this[i];
    }
  };var v = function v(e) {
    this.context = e, this.node = this.context.createWaveShaper(), this.vb = .2, this.vl = .4, this.h = 1, this.setCurve();
  };return v.prototype.setDistortion = function (e) {
    return this.h = e, this.setCurve();
  }, v.prototype.setCurve = function () {
    var e, t, i, n, o, s, a, r;for (t = 1024, o = new Float32Array(t), e = s = 0, a = o.length; a >= 0 ? a > s : s > a; e = a >= 0 ? ++s : --s) {
      i = (e - t / 2) / (t / 2), i = Math.abs(i), n = i <= this.vb ? 0 : this.vb < i && i <= this.vl ? this.h * (Math.pow(i - this.vb, 2) / (2 * this.vl - 2 * this.vb)) : this.h * i - this.h * this.vl + this.h * (Math.pow(this.vl - this.vb, 2) / (2 * this.vl - 2 * this.vb)), o[e] = n;
    }return r = this.node.curve = o;
  }, v.prototype.connect = function (e) {
    return this.node.connect(e);
  }, o.Effects.RingModulator.prototype = Object.create(f, { mix: { enumerable: !0, get: function get() {
        return this.options.mix;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.mix = e, this.dryGainNode.gain.value = o.Util.getDryLevel(this.mix), this.wetGainNode.gain.value = o.Util.getWetLevel(this.mix));
      } }, speed: { enumerable: !0, get: function get() {
        return this.options.speed;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 2e3) && (this.options.speed = e, this.vIn.frequency.value = e);
      } }, distortion: { enumerable: !0, get: function get() {
        return this.options.distortion;
      }, set: function set(e) {
        if (s.Util.isInRange(e, .2, 50)) {
          this.options.distortion = parseFloat(e, 10);for (var t = [this.vInDiode1, this.vInDiode2, this.vcDiode3, this.vcDiode4], i = 0, n = t.length; n > i; i++) {
            t[i].setDistortion(e);
          }
        }
      } } }), o.Effects.Quadrafuzz = function (e) {
    this.options = {}, e = e || this.options;var t = { lowGain: .6, midLowGain: .8, midHighGain: .5, highGain: .6 };this.inputNode = s.context.createGain(), this.outputNode = s.context.createGain(), this.dryGainNode = s.context.createGain(), this.wetGainNode = s.context.createGain(), this.lowpassLeft = s.context.createBiquadFilter(), this.lowpassLeft.type = "lowpass", this.lowpassLeft.frequency.value = 147, this.lowpassLeft.Q.value = .7071, this.bandpass1Left = s.context.createBiquadFilter(), this.bandpass1Left.type = "bandpass", this.bandpass1Left.frequency.value = 587, this.bandpass1Left.Q.value = .7071, this.bandpass2Left = s.context.createBiquadFilter(), this.bandpass2Left.type = "bandpass", this.bandpass2Left.frequency.value = 2490, this.bandpass2Left.Q.value = .7071, this.highpassLeft = s.context.createBiquadFilter(), this.highpassLeft.type = "highpass", this.highpassLeft.frequency.value = 4980, this.highpassLeft.Q.value = .7071, this.overdrives = [];for (var i = 0; 4 > i; i++) {
      this.overdrives[i] = s.context.createWaveShaper(), this.overdrives[i].curve = n();
    }this.inputNode.connect(this.wetGainNode), this.inputNode.connect(this.dryGainNode), this.dryGainNode.connect(this.outputNode);var o = [this.lowpassLeft, this.bandpass1Left, this.bandpass2Left, this.highpassLeft];for (i = 0; i < o.length; i++) {
      this.wetGainNode.connect(o[i]), o[i].connect(this.overdrives[i]), this.overdrives[i].connect(this.outputNode);
    }for (var a in t) {
      this[a] = e[a], this[a] = void 0 === this[a] || null === this[a] ? t[a] : this[a];
    }
  }, o.Effects.Quadrafuzz.prototype = Object.create(f, { lowGain: { enumerable: !0, get: function get() {
        return this.options.lowGain;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.lowGain = e, this.overdrives[0].curve = n(s.Util.normalize(this.lowGain, 0, 150)));
      } }, midLowGain: { enumerable: !0, get: function get() {
        return this.options.midLowGain;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.midLowGain = e, this.overdrives[1].curve = n(s.Util.normalize(this.midLowGain, 0, 150)));
      } }, midHighGain: { enumerable: !0, get: function get() {
        return this.options.midHighGain;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.midHighGain = e, this.overdrives[2].curve = n(s.Util.normalize(this.midHighGain, 0, 150)));
      } }, highGain: { enumerable: !0, get: function get() {
        return this.options.highGain;
      }, set: function set(e) {
        s.Util.isInRange(e, 0, 1) && (this.options.highGain = e, this.overdrives[3].curve = n(s.Util.normalize(this.highGain, 0, 150)));
      } } }), o;
}("undefined" != typeof window ? window : global);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29), __webpack_require__(30)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Make progressive change on oscillators properties (volume, frequencies, etc…)
*/
var SoundConsole = function () {
  function SoundConsole() {
    _classCallCheck(this, SoundConsole);

    // Intervals are stored in array to ensure there is never two in conflicts
    this.intervals = {};

    // In how many frames per second are the change applied
    this.frequency = 1000 / 60;
  }

  _createClass(SoundConsole, [{
    key: "progressiveChange",
    value: function progressiveChange(oscillator, property, target, key) {
      var _this = this;

      var delay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5000;

      // Clear eventual conflictual interval
      if (this.intervals[key]) {
        clearInterval(this.intervals[key].interval);
        this.intervals[key].resolve();
        delete this.intervals[key];
      }

      // Calculate step to apply on each frame
      var step = (target - oscillator[property]) * this.frequency / delay;

      // Return promise resolved when change is over
      return new Promise(function (resolve, reject) {
        // set interval
        var interval = setInterval(function () {
          // Change slightly the property
          oscillator[property] += step;

          if (Math.abs(target - oscillator[property]) < Math.abs(step)) {
            // When the difference is almost zero (js is bad at math), stop the interval
            oscillator[property] = target;
            clearInterval(interval);
            resolve();

            // In case a conflictual interval comes right as this instant, we need to check before deleting, just for safety
            if (_this.intervals[key] === interval) delete _this.intervals[key];
          }
        }, _this.frequency);

        // Store interval, resolve and reject callbacks
        _this.intervals[key] = {
          interval: interval,
          resolve: resolve,
          reject: reject
        };
      });
    }
  }, {
    key: "sineWave",
    value: function sineWave(oscillator, property, amplitude, delay, key) {
      // Clear eventual conflictual interval
      if (this.intervals[key]) {
        this.stopSine(key);
      }

      var step = 2 * Math.PI * this.frequency / delay;
      var index = 0;
      var initialValue = oscillator[property];

      var interval = setInterval(function () {
        oscillator[property] = initialValue + Math.sin(index) * amplitude;
        index = (index + step) % (2 * Math.PI);
      }, this.frequency);

      this.intervals[key] = interval;
    }
  }, {
    key: "stopSine",
    value: function stopSine(key) {
      clearInterval(this.intervals[key]);
      delete this.intervals[key];0;
    }
  }]);

  return SoundConsole;
}();

exports.default = SoundConsole;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(eventEmitter, sheet, tonic) {
    _classCallCheck(this, Player);

    this.eventEmitter = eventEmitter;
    this.sheet = sheet;
    this.color = _teoria2.default.scale(tonic, 'major');
    this.mixolydian = _teoria2.default.scale(tonic, 'mixolydian');

    this.changeMeasure = this.changeMeasure.bind(this);
    this.stop = this.stop.bind(this);
    this.eventEmitter.subscribe('changeMeasure', this.changeMeasure);
    this.eventEmitter.subscribe('stop', this.stop);
  }

  _createClass(Player, [{
    key: 'stop',
    value: function stop() {
      this.eventEmitter.unsubscribe('changeMeasure', this.changeMeasure);
      this.eventEmitter.unsubscribe('stop', this.stop);
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note coordinates [octave, fifth] relative to C
module.exports = {
  notes: {
    c: [0, 0],
    d: [-1, 2],
    e: [-2, 4],
    f: [1, -1],
    g: [0, 1],
    a: [-1, 3],
    b: [-2, 5],
    h: [-2, 5]
  },

  intervals: {
    unison: [0, 0],
    second: [3, -5],
    third: [2, -3],
    fourth: [1, -1],
    fifth: [0, 1],
    sixth: [3, -4],
    seventh: [2, -2],
    octave: [1, 0]
  },

  intervalFromFifth: ['second', 'sixth', 'third', 'seventh', 'fourth', 'unison', 'fifth'],

  intervalsIndex: ['unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth'],

  // linear index to fifth = (2 * index + 1) % 7
  fifths: ['f', 'c', 'g', 'd', 'a', 'e', 'b'],
  accidentals: ['bb', 'b', '', '#', 'x'],

  sharp: [-4, 7],
  A4: [3, 3],

  durations: {
    '0.25': 'longa',
    '0.5': 'breve',
    '1': 'whole',
    '2': 'half',
    '4': 'quarter',
    '8': 'eighth',
    '16': 'sixteenth',
    '32': 'thirty-second',
    '64': 'sixty-fourth',
    '128': 'hundred-twenty-eighth'
  },

  qualityLong: {
    P: 'perfect',
    M: 'major',
    m: 'minor',
    A: 'augmented',
    AA: 'doubly augmented',
    d: 'diminished',
    dd: 'doubly diminished'
  },

  alterations: {
    perfect: ['dd', 'd', 'P', 'A', 'AA'],
    minor: ['dd', 'd', 'm', 'M', 'A', 'AA']
  },

  symbols: {
    'min': ['m3', 'P5'],
    'm': ['m3', 'P5'],
    '-': ['m3', 'P5'],

    'M': ['M3', 'P5'],
    '': ['M3', 'P5'],

    '+': ['M3', 'A5'],
    'aug': ['M3', 'A5'],

    'dim': ['m3', 'd5'],
    'o': ['m3', 'd5'],

    'maj': ['M3', 'P5', 'M7'],
    'dom': ['M3', 'P5', 'm7'],
    'ø': ['m3', 'd5', 'm7'],

    '5': ['P5']
  },

  chordShort: {
    'major': 'M',
    'minor': 'm',
    'augmented': 'aug',
    'diminished': 'dim',
    'half-diminished': '7b5',
    'power': '5',
    'dominant': '7'
  },

  stepNumber: {
    'unison': 1,
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'octave': 8,
    'ninth': 9,
    'eleventh': 11,
    'thirteenth': 13
  },

  // Adjusted Shearer syllables - Chromatic solfege system
  // Some intervals are not provided for. These include:
  // dd2 - Doubly diminished second
  // dd3 - Doubly diminished third
  // AA3 - Doubly augmented third
  // dd6 - Doubly diminished sixth
  // dd7 - Doubly diminished seventh
  // AA7 - Doubly augmented seventh
  intervalSolfege: {
    'dd1': 'daw',
    'd1': 'de',
    'P1': 'do',
    'A1': 'di',
    'AA1': 'dai',
    'd2': 'raw',
    'm2': 'ra',
    'M2': 're',
    'A2': 'ri',
    'AA2': 'rai',
    'd3': 'maw',
    'm3': 'me',
    'M3': 'mi',
    'A3': 'mai',
    'dd4': 'faw',
    'd4': 'fe',
    'P4': 'fa',
    'A4': 'fi',
    'AA4': 'fai',
    'dd5': 'saw',
    'd5': 'se',
    'P5': 'so',
    'A5': 'si',
    'AA5': 'sai',
    'd6': 'law',
    'm6': 'le',
    'M6': 'la',
    'A6': 'li',
    'AA6': 'lai',
    'd7': 'taw',
    'm7': 'te',
    'M7': 'ti',
    'A7': 'tai',
    'dd8': 'daw',
    'd8': 'de',
    'P8': 'do',
    'A8': 'di',
    'AA8': 'dai'
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knowledge = __webpack_require__(4);
var vector = __webpack_require__(19);
var toCoord = __webpack_require__(23);

function Interval(coord) {
  if (!(this instanceof Interval)) return new Interval(coord);
  this.coord = coord;
}

Interval.prototype = {
  name: function name() {
    return knowledge.intervalsIndex[this.number() - 1];
  },

  semitones: function semitones() {
    return vector.sum(vector.mul(this.coord, [12, 7]));
  },

  number: function number() {
    return Math.abs(this.value());
  },

  value: function value() {
    var toMultiply = Math.floor((this.coord[1] - 2) / 7) + 1;
    var product = vector.mul(knowledge.sharp, toMultiply);
    var without = vector.sub(this.coord, product);
    var i = knowledge.intervalFromFifth[without[1] + 5];
    var diff = without[0] - knowledge.intervals[i][0];
    var val = knowledge.stepNumber[i] + diff * 7;

    return val > 0 ? val : val - 2;
  },

  type: function type() {
    return knowledge.intervals[this.base()][0] <= 1 ? 'perfect' : 'minor';
  },

  base: function base() {
    var product = vector.mul(knowledge.sharp, this.qualityValue());
    var fifth = vector.sub(this.coord, product)[1];
    fifth = this.value() > 0 ? fifth + 5 : -(fifth - 5) % 7;
    fifth = fifth < 0 ? knowledge.intervalFromFifth.length + fifth : fifth;

    var name = knowledge.intervalFromFifth[fifth];
    if (name === 'unison' && this.number() >= 8) name = 'octave';

    return name;
  },

  direction: function direction(dir) {
    if (dir) {
      var is = this.value() >= 1 ? 'up' : 'down';
      if (is !== dir) this.coord = vector.mul(this.coord, -1);

      return this;
    } else return this.value() >= 1 ? 'up' : 'down';
  },

  simple: function simple(ignore) {
    // Get the (upwards) base interval (with quality)
    var simple = knowledge.intervals[this.base()];
    var toAdd = vector.mul(knowledge.sharp, this.qualityValue());
    simple = vector.add(simple, toAdd);

    // Turn it around if necessary
    if (!ignore) simple = this.direction() === 'down' ? vector.mul(simple, -1) : simple;

    return new Interval(simple);
  },

  isCompound: function isCompound() {
    return this.number() > 8;
  },

  octaves: function octaves() {
    var toSubtract, without, octaves;

    if (this.direction() === 'up') {
      toSubtract = vector.mul(knowledge.sharp, this.qualityValue());
      without = vector.sub(this.coord, toSubtract);
      octaves = without[0] - knowledge.intervals[this.base()][0];
    } else {
      toSubtract = vector.mul(knowledge.sharp, -this.qualityValue());
      without = vector.sub(this.coord, toSubtract);
      octaves = -(without[0] + knowledge.intervals[this.base()][0]);
    }

    return octaves;
  },

  invert: function invert() {
    var i = this.base();
    var qual = this.qualityValue();
    var acc = this.type() === 'minor' ? -(qual - 1) : -qual;
    var idx = 9 - knowledge.stepNumber[i] - 1;
    var coord = knowledge.intervals[knowledge.intervalsIndex[idx]];
    coord = vector.add(coord, vector.mul(knowledge.sharp, acc));

    return new Interval(coord);
  },

  quality: function quality(lng) {
    var quality = knowledge.alterations[this.type()][this.qualityValue() + 2];

    return lng ? knowledge.qualityLong[quality] : quality;
  },

  qualityValue: function qualityValue() {
    if (this.direction() === 'down') return Math.floor((-this.coord[1] - 2) / 7) + 1;else return Math.floor((this.coord[1] - 2) / 7) + 1;
  },

  equal: function equal(interval) {
    return this.coord[0] === interval.coord[0] && this.coord[1] === interval.coord[1];
  },

  greater: function greater(interval) {
    var semi = this.semitones();
    var isemi = interval.semitones();

    // If equal in absolute size, measure which interval is bigger
    // For example P4 is bigger than A3
    return semi === isemi ? this.number() > interval.number() : semi > isemi;
  },

  smaller: function smaller(interval) {
    return !this.equal(interval) && !this.greater(interval);
  },

  add: function add(interval) {
    return new Interval(vector.add(this.coord, interval.coord));
  },

  toString: function toString(ignore) {
    // If given true, return the positive value
    var number = ignore ? this.number() : this.value();

    return this.quality() + number;
  }
};

Interval.toCoord = function (simple) {
  var coord = toCoord(simple);
  if (!coord) throw new Error('Invalid simple format interval');

  return new Interval(coord);
};

Interval.from = function (from, to) {
  return from.interval(to);
};

Interval.between = function (from, to) {
  return new Interval(vector.sub(to.coord, from.coord));
};

Interval.invert = function (sInterval) {
  return Interval.toCoord(sInterval).invert().toString();
};

module.exports = Interval;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BassPiano = function () {
  function BassPiano() {
    _classCallCheck(this, BassPiano);

    this.soundConsole = new _soundConsole2.default();
    this.playing = [];
    this.buildOscillator();
    this.decay = 15000;
  }

  _createClass(BassPiano, [{
    key: 'buildOscillator',
    value: function buildOscillator() {
      this.wave1 = new _pizzicato2.default.Sound({
        source: 'wave',
        options: {
          type: 'sine',
          frequency: 440,
          attack: 0.07
        }
      });
      this.wave2 = new _pizzicato2.default.Sound({
        source: 'wave',
        options: {
          type: 'sine',
          frequency: 440,
          attack: 0.07
        }
      });
      this.oscillator = new _pizzicato2.default.Group([this.wave1, this.wave2]);

      var ringModulator = new _pizzicato2.default.Effects.RingModulator({
        speed: 0.1,
        distortion: 0.06,
        mix: 0.6
      });
      this.oscillator.addEffect(ringModulator);

      var lowFilter = new _pizzicato2.default.Effects.LowPassFilter({
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
  }, {
    key: 'play',
    value: function play(note, stop) {
      var _this = this;

      if (stop) {
        while (this.playing.length > 0) {
          var oscillator = this.playing.pop();
          oscillator.stop();
          oscillator.disconnect();
        }
      }

      this.wave1.frequency = _teoria2.default.note(note).fq();
      this.wave2.frequency = _teoria2.default.note(note).interval('P-8').fq();

      this.oscillator.play();
      setTimeout(function () {
        _this.oscillator.stop();
      }, 100);

      this.playing.push(this.oscillator);
      this.startDecay(this.oscillator, this.playing.length - 1);

      this.buildOscillator();
    }
  }, {
    key: 'startDecay',
    value: function startDecay(oscillator, index) {
      var _this2 = this;

      this.soundConsole.progressiveChange(oscillator, 'volume', 0, 'bassDecay', this.decay).then(function () {
        ;
        // Stop oscillator once done
        oscillator.stop();
        oscillator.disconnect();
        if (_this2.playing[index] === oscillator) _this2.playing.splice(index, 1);
      });
    }
  }]);

  return BassPiano;
}();

exports.default = BassPiano;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeSound() {
  return new _pizzicato2.default.Sound({
    source: 'wave',
    options: {
      type: 'sawtooth',
      frequency: 440,
      attack: 0.01,
      release: 0.2
    }
  });
}

var ChordBeat = function () {
  function ChordBeat() {
    _classCallCheck(this, ChordBeat);

    this.soundConsole = new _soundConsole2.default();

    this.options = {
      pace: 500
    };

    this.buildSynth();
    this.playing = false;
  }

  _createClass(ChordBeat, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.first = makeSound(this.options.volume);
      this.second = makeSound(this.options.volume);
      this.third = makeSound(this.options.volume);

      this.oscillator = new _pizzicato2.default.Group([this.first, this.second, this.third]);
      this.oscillator.volume = 0.3;

      this.filter = new _pizzicato2.default.Effects.HighPassFilter({
        frequency: 600,
        peak: 2.5
      });
      this.oscillator.addEffect(this.filter);

      this.compressor = new _pizzicato2.default.Effects.Compressor({
        threshold: -20,
        // knee: 32,
        ratio: 60
      });
      this.oscillator.addEffect(this.compressor);

      this.reverb = new _pizzicato2.default.Effects.Reverb({
        time: 1.3,
        decay: 1,
        reverse: false,
        mix: 0.8
      });
      this.oscillator.addEffect(this.reverb);

      this.flanger = new _pizzicato2.default.Effects.Flanger({
        time: 0.5,
        speed: 0.4,
        depth: 0.2,
        feedback: 0.2,
        mix: 0.4
      });
      this.oscillator.addEffect(this.flanger);
    }
  }, {
    key: 'turnVolume',
    value: function turnVolume(volume) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.oscillator, 'volume', volume, 'volume', delay);
    }
  }, {
    key: 'turnPace',
    value: function turnPace(pace) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
    }
  }, {
    key: 'setNotes',
    value: function setNotes(note1, note2, note3) {
      this.first.frequency = _teoria2.default.note(note1).fq();
      this.second.frequency = _teoria2.default.note(note2).fq();
      this.third.frequency = _teoria2.default.note(note3).fq();
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.playing) {
        this.playing = true;
        this.playChord();
      }
    }
  }, {
    key: 'playChord',
    value: function playChord() {
      var _this = this;

      if (this.playing) {
        this.playSound();

        setTimeout(function () {
          _this.playChord();
        }, this.options.pace);
      }
    }
  }, {
    key: 'playSound',
    value: function playSound() {
      var _this2 = this;

      this.oscillator.play();
      setTimeout(function () {
        _this2.oscillator.stop();
      }, 50);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.playing = false;
    }
  }, {
    key: 'setFilterProperty',
    value: function setFilterProperty(property, value) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;

      this.soundConsole.progressiveChange(this.filter, property, value, 'filter-' + property, delay);
    }
  }, {
    key: 'setCompressorProperty',
    value: function setCompressorProperty(property, value) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;

      this.soundConsole.progressiveChange(this.compressor, property, value, 'compressor-' + property, delay);
    }
  }]);

  return ChordBeat;
}();

exports.default = ChordBeat;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LightBells = function () {
  function LightBells() {
    _classCallCheck(this, LightBells);

    this.soundConsole = new _soundConsole2.default();
  }

  _createClass(LightBells, [{
    key: 'ring',
    value: function ring(base, scale) {
      var _this = this;

      var color = _teoria2.default.note(base).scale(scale);
      var notes = [color.get(1), color.get(2), color.get(3), color.get(5), color.get(6)];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var note = _step.value;

          var bell = _this.createBell(note.interval('P8').fq());
          setTimeout(function () {
            bell.play();
            _this.soundConsole.progressiveChange(bell, 'volume', 0, 'bell' + Math.random() * 10, 2000).then(function () {
              bell.disconnect();
            });
          }, Math.random() * 1500);
        };

        for (var _iterator = notes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'createBell',
    value: function createBell(frequency) {
      var bell = new _pizzicato2.default.Sound({
        source: 'wave',
        options: {
          type: 'triangle',
          frequency: frequency,
          attack: 0.01,
          volume: 0.1
        }
      });

      bell.addEffect(new _pizzicato2.default.Effects.HighPassFilter({
        frequency: 2000,
        peak: 1
      }));

      return bell;
    }
  }]);

  return LightBells;
}();

exports.default = LightBells;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeSound(volume) {
  return new _pizzicato2.default.Sound({
    source: 'wave',
    options: {
      type: 'square',
      frequency: 440,
      attack: 0.01,
      volume: volume
    }
  });
}

var SquareHarp = function () {
  function SquareHarp() {
    _classCallCheck(this, SquareHarp);

    this.soundConsole = new _soundConsole2.default();

    this.options = {
      volume: 0.02,
      pace: 100
    };

    this.buildSynth();
    this.playing = false;
  }

  _createClass(SquareHarp, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.base = makeSound(this.options.volume);
      this.third = makeSound(this.options.volume);
      this.fifth = makeSound(this.options.volume);
      this.last = makeSound(this.options.volume);

      this.lowFilter = new _pizzicato2.default.Effects.LowPassFilter({
        frequency: 2000,
        peak: 4
      });
      this.applyEffect(this.lowFilter);

      this.reverb = new _pizzicato2.default.Effects.Reverb({
        time: 1,
        decay: 1,
        reverse: false,
        mix: 0.8
      });
      this.applyEffect(this.reverb);
    }
  }, {
    key: 'applyEffect',
    value: function applyEffect(effect) {
      this.base.addEffect(effect);
      this.third.addEffect(effect);
      this.fifth.addEffect(effect);
      this.last.addEffect(effect);
    }
  }, {
    key: 'turnVolume',
    value: function turnVolume(volume) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.base, 'volume', volume, 'baseVolume', delay);
      this.soundConsole.progressiveChange(this.third, 'volume', volume, 'thirdVolume', delay);
      this.soundConsole.progressiveChange(this.fifth, 'volume', volume, 'fifthVolume', delay);
      this.soundConsole.progressiveChange(this.last, 'volume', volume, 'lastVolume', delay);
    }
  }, {
    key: 'turnPace',
    value: function turnPace(pace) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      return this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
    }
  }, {
    key: 'setChord',
    value: function setChord(base, chord) {
      var notes = _teoria2.default.note(base).chord(chord).notes();

      this.base.frequency = notes[0].fq();
      this.third.frequency = notes[1].fq();
      this.fifth.frequency = notes[2].fq();
      this.last.frequency = notes.length > 3 ? notes[3].fq() : notes[0].interval('P8').fq();
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.playing) {
        this.playing = true;
        this.playHarpege(0, [this.last, this.fifth, this.third, this.base]);
      }
    }
  }, {
    key: 'playHarpege',
    value: function playHarpege(index, notes) {
      var _this = this;

      if (this.playing) {
        this.playNote(notes[index]);

        var next = (index + 1) % notes.length;
        setTimeout(function () {
          _this.playHarpege(next, notes);
        }, this.options.pace);
      }
    }
  }, {
    key: 'playNote',
    value: function playNote(sound) {
      sound.play();
      setTimeout(function () {
        sound.stop();
      }, 50);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.playing = false;
    }
  }, {
    key: 'setLowFilterProperty',
    value: function setLowFilterProperty(property, value) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;

      this.soundConsole.progressiveChange(this.lowFilter, property, value, 'lowFilter-' + property, delay);
    }
  }, {
    key: 'setReverbProperty',
    value: function setReverbProperty(property, value) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;

      this.soundConsole.progressiveChange(this.reverb, property, value, 'reverb-' + property, delay);
    }
  }]);

  return SquareHarp;
}();

exports.default = SquareHarp;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeSound() {
  return new _pizzicato2.default.Sound({
    source: 'wave',
    options: {
      type: 'sawtooth',
      frequency: 440,
      attack: 0
    }
  });
}

var SynthPad = function () {
  function SynthPad() {
    _classCallCheck(this, SynthPad);

    this.soundConsole = new _soundConsole2.default();

    this.buildSynth();
    this.synth.play();
  }

  _createClass(SynthPad, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.base = makeSound();
      this.third = makeSound();
      this.fifth = makeSound();
      this.last = makeSound();

      this.synth = new _pizzicato2.default.Group([this.base, this.third, this.fifth, this.last]);
      this.synth.volume = 0;

      this.lowFilter = new _pizzicato2.default.Effects.LowPassFilter({
        frequency: 500,
        peak: 0.1
      });
      this.synth.addEffect(this.lowFilter);
    }
  }, {
    key: 'turnVolume',
    value: function turnVolume(volume) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.synth, 'volume', volume, 'synthVolume', delay);
    }
  }, {
    key: 'playChord',
    value: function playChord(base, chord) {
      var notes = _teoria2.default.note(base).chord(chord).notes();

      this.base.frequency = notes[0].fq();
      this.third.frequency = notes[1].fq();
      this.fifth.frequency = notes[2].fq();
      this.last.frequency = notes.length > 3 ? notes[3].fq() : notes[0].interval('P8').fq();
    }
  }, {
    key: 'setLowFilterFrequency',
    value: function setLowFilterFrequency(frequency) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.lowFilter, 'frequency', frequency, 'lowFilterFreq', delay);
    }
  }]);

  return SynthPad;
}();

exports.default = SynthPad;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeSound() {
  return new _pizzicato2.default.Sound({
    source: 'wave',
    options: {
      type: 'triangle',
      frequency: 440,
      attack: 0
    }
  });
}

var TriangleChord = function () {
  function TriangleChord() {
    _classCallCheck(this, TriangleChord);

    this.soundConsole = new _soundConsole2.default();

    this.buildSynth();
    this.synth.play();
  }

  _createClass(TriangleChord, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.third = makeSound();
      this.fifth = makeSound();
      this.last = makeSound();

      this.synth = new _pizzicato2.default.Group([this.third, this.fifth, this.last]);
      this.synth.volume = 0;

      this.filter = new _pizzicato2.default.Effects.HighPassFilter({
        frequency: 2000,
        peak: 4
      });
      this.synth.addEffect(this.filter);

      this.wahwahFilter = new _pizzicato2.default.Effects.LowPassFilter({
        frequency: 3000,
        peak: 1,
        mix: 0.1
      });
      this.synth.addEffect(this.wahwahFilter);
      this.soundConsole.sineWave(this.wahwahFilter, 'frequency', 1000, 5000, 'wahwah');

      this.tremolo = new _pizzicato2.default.Effects.Tremolo({
        speed: 1,
        depth: 0.5,
        mix: 0.6
      });
    }
  }, {
    key: 'turnVolume',
    value: function turnVolume(volume) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.synth, 'volume', volume, 'synthVolume', delay);
    }
  }, {
    key: 'playChord',
    value: function playChord(base, chord) {
      var notes = _teoria2.default.note(base).chord(chord).notes();

      this.third.frequency = notes[1].fq();
      this.fifth.frequency = notes[2].fq();
      this.last.frequency = notes.length > 3 ? notes[3].fq() : notes[0].interval('P8').fq();
    }
  }, {
    key: 'setFilterFrequency',
    value: function setFilterFrequency(frequency) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.filter, 'frequency', frequency, 'filterFreq', delay);
    }
  }, {
    key: 'setWahWah',
    value: function setWahWah(amplitude, delay) {
      this.soundConsole.stopSine('wahwah');
      this.soundConsole.sineWave(this.wahwahFilter, 'frequency', amplitude, delay, 'wahwah');
    }
  }]);

  return TriangleChord;
}();

exports.default = TriangleChord;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeSound() {
  return new _pizzicato2.default.Sound({
    source: 'wave',
    options: {
      type: 'square',
      frequency: 440,
      attack: 0,
      volume: 1
    }
  });
}

var Tuba = function () {
  function Tuba() {
    _classCallCheck(this, Tuba);

    this.soundConsole = new _soundConsole2.default();

    this.buildSynth();
    this.synth.play();
  }

  _createClass(Tuba, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.sound1 = makeSound();
      this.sound2 = makeSound();

      this.synth = new _pizzicato2.default.Group([this.sound1, this.sound2]);
      this.synth.volume = 0;

      this.gainNode = _pizzicato2.default.context.createGain();
      this.gainNode.gain.value = -50;
      this.synth.connect(this.gainNode);

      this.filter = new _pizzicato2.default.Effects.LowPassFilter({
        frequency: 500,
        peak: 0.5,
        mix: 1
      });
      this.synth.addEffect(this.filter);

      var ringModulator = new _pizzicato2.default.Effects.RingModulator({
        speed: 0.1,
        distortion: 0.06,
        mix: 0.6
      });
      this.synth.addEffect(ringModulator);
    }
  }, {
    key: 'play',
    value: function play() {
      var _this = this;

      var volume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.1;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

      this.soundConsole.progressiveChange(this.synth, 'volume', volume, 'volumeUp', delay).then(function () {
        _this.soundConsole.progressiveChange(_this.synth, 'volume', 0, 'volumeDown', delay);
      });
    }
  }, {
    key: 'setNote',
    value: function setNote(note) {
      this.sound1.frequency = _teoria2.default.note(note).fq();
      this.sound2.frequency = _teoria2.default.note(note).interval('P-8').fq();
    }
  }, {
    key: 'setFilterFrequency',
    value: function setFilterFrequency(frequency) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.filter, 'frequency', frequency, 'filterFreq', delay);
    }
  }]);

  return Tuba;
}();

exports.default = Tuba;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vibraphone = function () {
  function Vibraphone() {
    _classCallCheck(this, Vibraphone);

    this.soundConsole = new _soundConsole2.default();

    this.buildSynth();
  }

  _createClass(Vibraphone, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.soundOptions = {
        type: 'sine',
        frequency: 440,
        attack: 0.01,
        decay: 0.1,
        volume: 0.07
      };

      this.highFilterOptions = {
        frequency: 300 + Math.random() * 1200,
        peak: 4.2
      };

      this.delayOptions = {
        feedback: 0.7,
        time: 0.1,
        mix: 0.8
      };

      this.reverbOptions = {
        time: 1,
        decay: 1,
        reverse: false,
        mix: 0.8
      };
    }
  }, {
    key: 'makeSound',
    value: function makeSound(note) {
      var sound = new _pizzicato2.default.Sound({
        source: 'wave',
        options: this.soundOptions
      });
      sound.frequency = _teoria2.default.note(note).fq();
      var octave = new _pizzicato2.default.Sound({
        source: 'wave',
        options: this.soundOptions
      });
      octave.frequency = _teoria2.default.note(note).interval('P8').fq();
      var oscillator = new _pizzicato2.default.Group([sound, octave]);
      oscillator.addEffect(new _pizzicato2.default.Effects.HighPassFilter(this.highFilterOptions));
      oscillator.addEffect(new _pizzicato2.default.Effects.Delay(this.delayOptions));
      // sound.addEffect(new Pizzicato.Effects.Reverb(this.reverbOptions));

      return oscillator;
    }
  }, {
    key: 'play',
    value: function play(note) {
      var sound = this.makeSound(note);

      sound.play();
      setTimeout(function () {
        sound.stop();
        setTimeout(function () {
          sound.disconnect();
        }, 5000);
      }, 50);
    }
  }, {
    key: 'setHighFilterProperty',
    value: function setHighFilterProperty(property, value) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;

      this.soundConsole.progressiveChange(this.highFilterOptions, property, value, 'highFilter-' + property, delay);
    }
  }]);

  return Vibraphone;
}();

exports.default = Vibraphone;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeSound() {
  return new _pizzicato2.default.Sound({
    source: 'wave',
    options: {
      type: 'sawtooth',
      frequency: 440,
      attack: 1,
      release: 1,
      volume: 0.5
    }
  });
}

var Violin = function () {
  function Violin() {
    _classCallCheck(this, Violin);

    this.soundConsole = new _soundConsole2.default();

    this.buildSynth();

    this._playing = false;
  }

  _createClass(Violin, [{
    key: 'buildSynth',
    value: function buildSynth() {
      this.oscillator = makeSound();

      this.lowFilter = new _pizzicato2.default.Effects.LowPassFilter({
        frequency: 1500,
        peak: 2
      });
      this.oscillator.addEffect(this.lowFilter);

      this.ringModulator = new _pizzicato2.default.Effects.RingModulator({
        speed: 0.1,
        distortion: 0.1,
        mix: 0.8
      });
      this.oscillator.addEffect(this.ringModulator);

      this.reverb = new _pizzicato2.default.Effects.Reverb({
        time: 0.1,
        decay: 0,
        reverse: false,
        mix: 0.8
      });
      this.oscillator.addEffect(this.reverb);
    }
  }, {
    key: 'play',
    value: function play(note) {
      if (!this._playing) {
        this.oscillator.frequency = _teoria2.default.note(note).fq();
        this.oscillator.volume = 0.1;
        this.oscillator.play();
        this._playing = true;
      } else {
        this.stop();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this = this;

      if (this._playing) {
        this.soundConsole.progressiveChange(this.oscillator, 'volume', 0, 'violinDecay', 1000).then(function () {
          _this.oscillator.stop();
          _this._playing = false;
        });
      }
    }
  }, {
    key: 'setLowFilterFrequency',
    value: function setLowFilterFrequency(frequency) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.lowFilter, 'frequency', frequency, 'lowFilterFreq', delay);
    }
  }, {
    key: 'sineFilter',
    value: function sineFilter(property, amplitude, delay) {
      this.soundConsole.sineWave(this.lowFilter, property, amplitude, delay, 'lowFilter-' + property);
    }
  }, {
    key: 'stopSineFilter',
    value: function stopSineFilter(property) {
      this.soundConsole.stopSine('lowFilter-' + property);
    }
  }]);

  return Violin;
}();

exports.default = Violin;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _soundConsole = __webpack_require__(2);

var _soundConsole2 = _interopRequireDefault(_soundConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Whistle = function () {
  function Whistle() {
    _classCallCheck(this, Whistle);

    this.soundConsole = new _soundConsole2.default();

    this.options = {
      volume: 0.2,
      pace: 300
    };

    this.buildSynth();

    this.playingSounds = [];
  }

  _createClass(Whistle, [{
    key: 'makeSound',
    value: function makeSound() {
      var sound = new _pizzicato2.default.Sound({
        source: 'wave',
        options: this.soundOptions
      });

      sound.addEffect(new _pizzicato2.default.Effects.LowPassFilter(this.lowFilter));
      // sound.addEffect(new Pizzicato.Effects.Reverb(this.reverb));
      sound.addEffect(new _pizzicato2.default.Effects.Delay(this.delay));

      return sound;
    }
  }, {
    key: 'buildSynth',
    value: function buildSynth() {
      this.soundOptions = {
        type: 'triangle',
        frequency: 440,
        attack: 0.3,
        release: 0.1,
        volume: this.options.volume
      };

      this.lowFilter = {
        frequency: 1000,
        peak: 1
      };

      this.reverb = {
        time: 0.1,
        decay: 0,
        reverse: false,
        mix: 0.8
      };

      this.delay = {
        feedback: 0.6,
        time: 0.4,
        mix: 0.5
      };
    }
  }, {
    key: 'turnVolume',
    value: function turnVolume(volume) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.options, 'volume', volume, 'volume', delay);
    }
  }, {
    key: 'turnPace',
    value: function turnPace(pace) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

      this.soundConsole.progressiveChange(this.options, 'pace', pace, 'harpegePace', delay);
    }
  }, {
    key: 'playNotes',
    value: function playNotes(notes) {
      var _this = this;

      var sounds = notes.map(function (note) {
        var sound = _this.makeSound();
        sound.volume = _this.options.volume;
        sound.frequency = _teoria2.default.note(note).fq();

        return sound;
      });

      var index = 0;

      var soundInterval = setInterval(function () {
        if (index >= sounds.length) {
          clearInterval(soundInterval);
        } else {
          _this.playSound(sounds[index]);
          index++;
        }
      }, this.options.pace);
    }
  }, {
    key: 'playSound',
    value: function playSound(sound) {
      sound.play();
      setTimeout(function () {
        sound.stop();
        setTimeout(function () {
          sound.disconnect();
        }, 5000);
      }, this.options.pace);
    }
  }, {
    key: 'setLowFilterProperty',
    value: function setLowFilterProperty(property, value) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

      this.soundConsole.progressiveChange(this.lowFilter, property, value, 'lowFilter-' + property, delay);
    }
  }]);

  return Whistle;
}();

exports.default = Whistle;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var accidentalValues = {
  'bb': -2,
  'b': -1,
  '': 0,
  '#': 1,
  'x': 2
};

module.exports = function accidentalNumber(acc) {
  return accidentalValues[acc];
};

module.exports.interval = function accidentalInterval(acc) {
  var val = accidentalValues[acc];
  return [-4 * val, 7 * val];
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// First coord is octaves, second is fifths. Distances are relative to c
var notes = {
  c: [0, 0],
  d: [-1, 2],
  e: [-2, 4],
  f: [1, -1],
  g: [0, 1],
  a: [-1, 3],
  b: [-2, 5],
  h: [-2, 5]
};

module.exports = function (name) {
  return name in notes ? [notes[name][0], notes[name][1]] : null;
};

module.exports.notes = notes;
module.exports.A4 = [3, 3]; // Relative to C0 (scientic notation, ~16.35Hz)
module.exports.sharp = [-4, 7];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var scientific = __webpack_require__(25);
var helmholtz = __webpack_require__(22);
var pitchFq = __webpack_require__(24);
var knowledge = __webpack_require__(4);
var vector = __webpack_require__(19);
var Interval = __webpack_require__(5);

function pad(str, ch, len) {
  for (; len > 0; len--) {
    str += ch;
  }

  return str;
}

function Note(coord, duration) {
  if (!(this instanceof Note)) return new Note(coord, duration);
  duration = duration || {};

  this.duration = { value: duration.value || 4, dots: duration.dots || 0 };
  this.coord = coord;
}

Note.prototype = {
  octave: function octave() {
    return this.coord[0] + knowledge.A4[0] - knowledge.notes[this.name()][0] + this.accidentalValue() * 4;
  },

  name: function name() {
    var value = this.accidentalValue();
    var idx = this.coord[1] + knowledge.A4[1] - value * 7 + 1;
    return knowledge.fifths[idx];
  },

  accidentalValue: function accidentalValue() {
    return Math.round((this.coord[1] + knowledge.A4[1] - 2) / 7);
  },

  accidental: function accidental() {
    return knowledge.accidentals[this.accidentalValue() + 2];
  },

  /**
   * Returns the key number of the note
   */
  key: function key(white) {
    if (white) return this.coord[0] * 7 + this.coord[1] * 4 + 29;else return this.coord[0] * 12 + this.coord[1] * 7 + 49;
  },

  /**
  * Returns a number ranging from 0-127 representing a MIDI note value
  */
  midi: function midi() {
    return this.key() + 20;
  },

  /**
   * Calculates and returns the frequency of the note.
   * Optional concert pitch (def. 440)
   */
  fq: function fq(concertPitch) {
    return pitchFq(this.coord, concertPitch);
  },

  /**
   * Returns the pitch class index (chroma) of the note
   */
  chroma: function chroma() {
    var value = (vector.sum(vector.mul(this.coord, [12, 7])) - 3) % 12;

    return value < 0 ? value + 12 : value;
  },

  interval: function interval(_interval) {
    if (typeof _interval === 'string') _interval = Interval.toCoord(_interval);

    if (_interval instanceof Interval) return new Note(vector.add(this.coord, _interval.coord));else if (_interval instanceof Note) return new Interval(vector.sub(_interval.coord, this.coord));
  },

  transpose: function transpose(interval) {
    this.coord = vector.add(this.coord, interval.coord);
    return this;
  },

  /**
   * Returns the Helmholtz notation form of the note (fx C,, d' F# g#'')
   */
  helmholtz: function helmholtz() {
    var octave = this.octave();
    var name = this.name();
    name = octave < 3 ? name.toUpperCase() : name.toLowerCase();
    var padchar = octave < 3 ? ',' : '\'';
    var padcount = octave < 2 ? 2 - octave : octave - 3;

    return pad(name + this.accidental(), padchar, padcount);
  },

  /**
   * Returns the scientific notation form of the note (fx E4, Bb3, C#7 etc.)
   */
  scientific: function scientific() {
    return this.name().toUpperCase() + this.accidental() + this.octave();
  },

  /**
   * Returns notes that are enharmonic with this note.
   */
  enharmonics: function enharmonics(oneaccidental) {
    var key = this.key(),
        limit = oneaccidental ? 2 : 3;

    return ['m3', 'm2', 'm-2', 'm-3'].map(this.interval.bind(this)).filter(function (note) {
      var acc = note.accidentalValue();
      var diff = key - (note.key() - acc);

      if (diff < limit && diff > -limit) {
        var product = vector.mul(knowledge.sharp, diff - acc);
        note.coord = vector.add(note.coord, product);
        return true;
      }
    });
  },

  solfege: function solfege(scale, showOctaves) {
    var interval = scale.tonic.interval(this),
        solfege,
        stroke,
        count;
    if (interval.direction() === 'down') interval = interval.invert();

    if (showOctaves) {
      count = (this.key(true) - scale.tonic.key(true)) / 7;
      count = count >= 0 ? Math.floor(count) : -Math.ceil(-count);
      stroke = count >= 0 ? '\'' : ',';
    }

    solfege = knowledge.intervalSolfege[interval.simple(true).toString()];
    return showOctaves ? pad(solfege, stroke, Math.abs(count)) : solfege;
  },

  scaleDegree: function scaleDegree(scale) {
    var inter = scale.tonic.interval(this);

    // If the direction is down, or we're dealing with an octave - invert it
    if (inter.direction() === 'down' || inter.coord[1] === 0 && inter.coord[0] !== 0) {
      inter = inter.invert();
    }

    inter = inter.simple(true).coord;

    return scale.scale.reduce(function (index, current, i) {
      var coord = Interval.toCoord(current).coord;
      return coord[0] === inter[0] && coord[1] === inter[1] ? i + 1 : index;
    }, 0);
  },

  /**
   * Returns the name of the duration value,
   * such as 'whole', 'quarter', 'sixteenth' etc.
   */
  durationName: function durationName() {
    return knowledge.durations[this.duration.value];
  },

  /**
   * Returns the duration of the note (including dots)
   * in seconds. The first argument is the tempo in beats
   * per minute, the second is the beat unit (i.e. the
   * lower numeral in a time signature).
   */
  durationInSeconds: function durationInSeconds(bpm, beatUnit) {
    var secs = 60 / bpm / (this.duration.value / 4) / (beatUnit / 4);
    return secs * 2 - secs / Math.pow(2, this.duration.dots);
  },

  /**
   * Returns the name of the note, with an optional display of octave number
   */
  toString: function toString(dont) {
    return this.name() + this.accidental() + (dont ? '' : this.octave());
  }
};

Note.fromString = function (name, dur) {
  var coord = scientific(name);
  if (!coord) coord = helmholtz(name);
  return new Note(coord, dur);
};

Note.fromKey = function (key) {
  var octave = Math.floor((key - 4) / 12);
  var distance = key - octave * 12 - 4;
  var name = knowledge.fifths[(2 * Math.round(distance / 2) + 1) % 7];
  var subDiff = vector.sub(knowledge.notes[name], knowledge.A4);
  var note = vector.add(subDiff, [octave + 1, 0]);
  var diff = key - 49 - vector.sum(vector.mul(note, [12, 7]));

  var arg = diff ? vector.add(note, vector.mul(knowledge.sharp, diff)) : note;
  return new Note(arg);
};

Note.fromFrequency = function (fq, concertPitch) {
  var key, cents, originalFq;
  concertPitch = concertPitch || 440;

  key = 49 + 12 * ((Math.log(fq) - Math.log(concertPitch)) / Math.log(2));
  key = Math.round(key);
  originalFq = concertPitch * Math.pow(2, (key - 49) / 12);
  cents = 1200 * (Math.log(fq / originalFq) / Math.log(2));

  return { note: Note.fromKey(key), cents: cents };
};

Note.fromMIDI = function (note) {
  return Note.fromKey(note - 20);
};

module.exports = Note;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  add: function add(note, interval) {
    return [note[0] + interval[0], note[1] + interval[1]];
  },

  sub: function sub(note, interval) {
    return [note[0] - interval[0], note[1] - interval[1]];
  },

  mul: function mul(note, interval) {
    if (typeof interval === 'number') return [note[0] * interval, note[1] * interval];else return [note[0] * interval[0], note[1] * interval[1]];
  },

  sum: function sum(coord) {
    return coord[0] + coord[1];
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(32);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _bassPlayer = __webpack_require__(34);

var _bassPlayer2 = _interopRequireDefault(_bassPlayer);

var _chordBeatPlayer = __webpack_require__(35);

var _chordBeatPlayer2 = _interopRequireDefault(_chordBeatPlayer);

var _harpPlayer = __webpack_require__(36);

var _harpPlayer2 = _interopRequireDefault(_harpPlayer);

var _lightBellsPlayer = __webpack_require__(37);

var _lightBellsPlayer2 = _interopRequireDefault(_lightBellsPlayer);

var _synthPadPlayer = __webpack_require__(38);

var _synthPadPlayer2 = _interopRequireDefault(_synthPadPlayer);

var _triangleSynthPlayer = __webpack_require__(39);

var _triangleSynthPlayer2 = _interopRequireDefault(_triangleSynthPlayer);

var _tubaPlayer = __webpack_require__(40);

var _tubaPlayer2 = _interopRequireDefault(_tubaPlayer);

var _vibraphonePlayer = __webpack_require__(41);

var _vibraphonePlayer2 = _interopRequireDefault(_vibraphonePlayer);

var _violinPlayer = __webpack_require__(42);

var _violinPlayer2 = _interopRequireDefault(_violinPlayer);

var _whistlePlayer = __webpack_require__(43);

var _whistlePlayer2 = _interopRequireDefault(_whistlePlayer);

var _composer = __webpack_require__(31);

var _composer2 = _interopRequireDefault(_composer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conductor = function () {
  function Conductor() {
    _classCallCheck(this, Conductor);

    // Go fetch a global sheet
    // TODO

    var composer = new _composer2.default();
    this.sheet = composer.getSheet();
    var tonic = 'A4';
    this.pace = 15000;

    // Create event manager
    this.eventEmitter = new _eventEmitter2.default();

    // Create players
    this.bassPlayer = new _bassPlayer2.default(this.eventEmitter, this.sheet.bass, tonic);
    this.chordBeat = new _chordBeatPlayer2.default(this.eventEmitter, this.sheet.chordBeat, tonic);
    this.harpPlayer = new _harpPlayer2.default(this.eventEmitter, this.sheet.harp, tonic);
    this.lightBellsPlayer = new _lightBellsPlayer2.default(this.eventEmitter, this.sheet.bells, tonic);
    this.synthPadPlayer = new _synthPadPlayer2.default(this.eventEmitter, this.sheet.synth, tonic);
    this.triangleSynthPlayer = new _triangleSynthPlayer2.default(this.eventEmitter, this.sheet.triangleSynth, tonic);
    this.tubaPlayer = new _tubaPlayer2.default(this.eventEmitter, this.sheet.tuba, tonic);
    this.vibraphonePlayer = new _vibraphonePlayer2.default(this.eventEmitter, this.sheet.vibraphone, tonic);
    this.violinPlayer = new _violinPlayer2.default(this.eventEmitter, this.sheet.violon, tonic);
    this.whistlePlayer = new _whistlePlayer2.default(this.eventEmitter, this.sheet.whistle, tonic);

    // Let's play music
    // this.playMeasure(0);
  }

  _createClass(Conductor, [{
    key: 'playMeasure',
    value: function playMeasure(index) {
      var _this = this;

      var measure = this.sheet.conductor[index];
      this.eventEmitter.emit('changeMeasure', index, measure.toneIndex, measure.chord, measure.mixolydian);

      if (index + 1 < this.sheet.conductor.length) {
        setTimeout(function () {
          return _this.playMeasure(index + 1);
        }, this.pace);
      } else {
        setTimeout(function () {
          return _this.eventEmitter.emit('stop');
        }, this.pace);
      }
    }
  }]);

  return Conductor;
}();

exports.default = Conductor;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SYMBOLS = {
  'm': ['m3', 'P5'],
  'mi': ['m3', 'P5'],
  'min': ['m3', 'P5'],
  '-': ['m3', 'P5'],

  'M': ['M3', 'P5'],
  'ma': ['M3', 'P5'],
  '': ['M3', 'P5'],

  '+': ['M3', 'A5'],
  'aug': ['M3', 'A5'],

  'dim': ['m3', 'd5'],
  'o': ['m3', 'd5'],

  'maj': ['M3', 'P5', 'M7'],
  'dom': ['M3', 'P5', 'm7'],
  'ø': ['m3', 'd5', 'm7'],

  '5': ['P5'],

  '6/9': ['M3', 'P5', 'M6', 'M9']
};

module.exports = function (symbol) {
  var c,
      parsing = 'quality',
      additionals = [],
      name,
      chordLength = 2;
  var notes = ['P1', 'M3', 'P5', 'm7', 'M9', 'P11', 'M13'];
  var explicitMajor = false;

  function setChord(name) {
    var intervals = SYMBOLS[name];
    for (var i = 0, len = intervals.length; i < len; i++) {
      notes[i + 1] = intervals[i];
    }

    chordLength = intervals.length;
  }

  // Remove whitespace, commas and parentheses
  symbol = symbol.replace(/[,\s\(\)]/g, '');
  for (var i = 0, len = symbol.length; i < len; i++) {
    if (!(c = symbol[i])) return;

    if (parsing === 'quality') {
      var sub3 = i + 2 < len ? symbol.substr(i, 3).toLowerCase() : null;
      var sub2 = i + 1 < len ? symbol.substr(i, 2).toLowerCase() : null;
      if (sub3 in SYMBOLS) name = sub3;else if (sub2 in SYMBOLS) name = sub2;else if (c in SYMBOLS) name = c;else name = '';

      if (name) setChord(name);

      if (name === 'M' || name === 'ma' || name === 'maj') explicitMajor = true;

      i += name.length - 1;
      parsing = 'extension';
    } else if (parsing === 'extension') {
      c = c === '1' && symbol[i + 1] ? +symbol.substr(i, 2) : +c;

      if (!isNaN(c) && c !== 6) {
        chordLength = (c - 1) / 2;

        if (chordLength !== Math.round(chordLength)) return new Error('Invalid interval extension: ' + c.toString(10));

        if (name === 'o' || name === 'dim') notes[3] = 'd7';else if (explicitMajor) notes[3] = 'M7';

        i += c >= 10 ? 1 : 0;
      } else if (c === 6) {
        notes[3] = 'M6';
        chordLength = Math.max(3, chordLength);
      } else i -= 1;

      parsing = 'alterations';
    } else if (parsing === 'alterations') {
      var alterations = symbol.substr(i).split(/(#|b|add|maj|sus|M)/i),
          next,
          flat = false,
          sharp = false;

      if (alterations.length === 1) return new Error('Invalid alteration');else if (alterations[0].length !== 0) return new Error('Invalid token: \'' + alterations[0] + '\'');

      var ignore = false;
      alterations.forEach(function (alt, i, arr) {
        if (ignore || !alt.length) return ignore = false;

        var next = arr[i + 1],
            lower = alt.toLowerCase();
        if (alt === 'M' || lower === 'maj') {
          if (next === '7') ignore = true;

          chordLength = Math.max(3, chordLength);
          notes[3] = 'M7';
        } else if (lower === 'sus') {
          var type = 'P4';
          if (next === '2' || next === '4') {
            ignore = true;

            if (next === '2') type = 'M2';
          }

          notes[1] = type; // Replace third with M2 or P4
        } else if (lower === 'add') {
          if (next === '9') additionals.push('M9');else if (next === '11') additionals.push('P11');else if (next === '13') additionals.push('M13');

          ignore = true;
        } else if (lower === 'b') {
          flat = true;
        } else if (lower === '#') {
          sharp = true;
        } else {
          var token = +alt,
              quality,
              intPos;
          if (isNaN(token) || String(token).length !== alt.length) return new Error('Invalid token: \'' + alt + '\'');

          if (token === 6) {
            if (sharp) notes[3] = 'A6';else if (flat) notes[3] = 'm6';else notes[3] = 'M6';

            chordLength = Math.max(3, chordLength);
            return;
          }

          // Calculate the position in the 'note' array
          intPos = (token - 1) / 2;
          if (chordLength < intPos) chordLength = intPos;

          if (token < 5 || token === 7 || intPos !== Math.round(intPos)) return new Error('Invalid interval alteration: ' + token);

          quality = notes[intPos][0];

          // Alterate the quality of the interval according the accidentals
          if (sharp) {
            if (quality === 'd') quality = 'm';else if (quality === 'm') quality = 'M';else if (quality === 'M' || quality === 'P') quality = 'A';
          } else if (flat) {
            if (quality === 'A') quality = 'M';else if (quality === 'M') quality = 'm';else if (quality === 'm' || quality === 'P') quality = 'd';
          }

          sharp = flat = false;
          notes[intPos] = quality + token;
        }
      });
      parsing = 'ended';
    } else if (parsing === 'ended') {
      break;
    }
  }

  return notes.slice(0, chordLength + 1).concat(additionals);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coords = __webpack_require__(17);
var accval = __webpack_require__(16);

module.exports = function helmholtz(name) {
  var name = name.replace(/\u2032/g, "'").replace(/\u0375/g, ',');
  var parts = name.match(/^(,*)([a-h])(x|#|bb|b?)([,\']*)$/i);

  if (!parts || name !== parts[0]) throw new Error('Invalid formatting');

  var note = parts[2];
  var octaveFirst = parts[1];
  var octaveLast = parts[4];
  var lower = note === note.toLowerCase();
  var octave;

  if (octaveFirst) {
    if (lower) throw new Error('Invalid formatting - found commas before lowercase note');

    octave = 2 - octaveFirst.length;
  } else if (octaveLast) {
    if (octaveLast.match(/^'+$/) && lower) octave = 3 + octaveLast.length;else if (octaveLast.match(/^,+$/) && !lower) octave = 2 - octaveLast.length;else throw new Error('Invalid formatting - mismatch between octave ' + 'indicator and letter case');
  } else octave = lower ? 3 : 2;

  var accidentalValue = accval.interval(parts[3].toLowerCase());
  var coord = coords(note.toLowerCase());

  coord[0] += octave;
  coord[0] += accidentalValue[0] - coords.A4[0];
  coord[1] += accidentalValue[1] - coords.A4[1];

  return coord;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pattern = /^(AA|A|P|M|m|d|dd)(-?\d+)$/;

// The interval it takes to raise a note a semitone
var sharp = [-4, 7];

var pAlts = ['dd', 'd', 'P', 'A', 'AA'];
var mAlts = ['dd', 'd', 'm', 'M', 'A', 'AA'];

var baseIntervals = [[0, 0], [3, -5], [2, -3], [1, -1], [0, 1], [3, -4], [2, -2], [1, 0]];

module.exports = function (simple) {
  var parser = simple.match(pattern);
  if (!parser) return null;

  var quality = parser[1];
  var number = +parser[2];
  var sign = number < 0 ? -1 : 1;

  number = sign < 0 ? -number : number;

  var lower = number > 8 ? number % 7 || 7 : number;
  var octaves = (number - lower) / 7;

  var base = baseIntervals[lower - 1];
  var alts = base[0] <= 1 ? pAlts : mAlts;
  var alt = alts.indexOf(quality) - 2;

  // this happens, if the alteration wasn't suitable for this type
  // of interval, such as P2 or M5 (no "perfect second" or "major fifth")
  if (alt === -3) return null;

  return [sign * (base[0] + octaves + sharp[0] * alt), sign * (base[1] + sharp[1] * alt)];
};

// Copy to avoid overwriting internal base intervals
module.exports.coords = baseIntervals.slice(0);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (coord, stdPitch) {
  if (typeof coord === 'number') {
    stdPitch = coord;
    return function (coord) {
      return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
    };
  }

  stdPitch = stdPitch || 440;
  return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coords = __webpack_require__(17);
var accval = __webpack_require__(16);

module.exports = function scientific(name) {
  var format = /^([a-h])(x|#|bb|b?)(-?\d*)/i;

  var parser = name.match(format);
  if (!(parser && name === parser[0] && parser[3].length)) return;

  var noteName = parser[1];
  var octave = +parser[3];
  var accidental = parser[2].length ? parser[2].toLowerCase() : '';

  var accidentalValue = accval.interval(accidental);
  var coord = coords(noteName.toLowerCase());

  coord[0] += octave;
  coord[0] += accidentalValue[0] - coords.A4[0];
  coord[1] += accidentalValue[1] - coords.A4[1];

  return coord;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var daccord = __webpack_require__(21);
var knowledge = __webpack_require__(4);
var Note = __webpack_require__(18);
var Interval = __webpack_require__(5);

function Chord(root, name) {
  if (!(this instanceof Chord)) return new Chord(root, name);
  name = name || '';
  this.name = root.name().toUpperCase() + root.accidental() + name;
  this.symbol = name;
  this.root = root;
  this.intervals = [];
  this._voicing = [];

  var bass = name.split('/');
  if (bass.length === 2 && bass[1].trim() !== '9') {
    name = bass[0];
    bass = bass[1].trim();
  } else {
    bass = null;
  }

  this.intervals = daccord(name).map(Interval.toCoord);
  this._voicing = this.intervals.slice();

  if (bass) {
    var intervals = this.intervals,
        bassInterval,
        note;
    // Make sure the bass is atop of the root note
    note = Note.fromString(bass + (root.octave() + 1)); // crude

    bassInterval = Interval.between(root, note);
    bass = bassInterval.simple();
    bassInterval = bassInterval.invert().direction('down');

    this._voicing = [bassInterval];
    for (var i = 0, length = intervals.length; i < length; i++) {
      if (!intervals[i].simple().equal(bass)) this._voicing.push(intervals[i]);
    }
  }
}

Chord.prototype = {
  notes: function notes() {
    var root = this.root;
    return this.voicing().map(function (interval) {
      return root.interval(interval);
    });
  },

  simple: function simple() {
    return this.notes().map(function (n) {
      return n.toString(true);
    });
  },

  bass: function bass() {
    return this.root.interval(this._voicing[0]);
  },

  voicing: function voicing(_voicing) {
    // Get the voicing
    if (!_voicing) {
      return this._voicing;
    }

    // Set the voicing
    this._voicing = [];
    for (var i = 0, length = _voicing.length; i < length; i++) {
      this._voicing[i] = Interval.toCoord(_voicing[i]);
    }

    return this;
  },

  resetVoicing: function resetVoicing() {
    this._voicing = this.intervals;
  },

  dominant: function dominant(additional) {
    additional = additional || '';
    return new Chord(this.root.interval('P5'), additional);
  },

  subdominant: function subdominant(additional) {
    additional = additional || '';
    return new Chord(this.root.interval('P4'), additional);
  },

  parallel: function parallel(additional) {
    additional = additional || '';
    var quality = this.quality();

    if (this.chordType() !== 'triad' || quality === 'diminished' || quality === 'augmented') {
      throw new Error('Only major/minor triads have parallel chords');
    }

    if (quality === 'major') {
      return new Chord(this.root.interval('m3', 'down'), 'm');
    } else {
      return new Chord(this.root.interval('m3', 'up'));
    }
  },

  quality: function quality() {
    var third,
        fifth,
        seventh,
        intervals = this.intervals;

    for (var i = 0, length = intervals.length; i < length; i++) {
      if (intervals[i].number() === 3) {
        third = intervals[i];
      } else if (intervals[i].number() === 5) {
        fifth = intervals[i];
      } else if (intervals[i].number() === 7) {
        seventh = intervals[i];
      }
    }

    if (!third) {
      return;
    }

    third = third.direction() === 'down' ? third.invert() : third;
    third = third.simple().toString();

    if (fifth) {
      fifth = fifth.direction === 'down' ? fifth.invert() : fifth;
      fifth = fifth.simple().toString();
    }

    if (seventh) {
      seventh = seventh.direction === 'down' ? seventh.invert() : seventh;
      seventh = seventh.simple().toString();
    }

    if (third === 'M3') {
      if (fifth === 'A5') {
        return 'augmented';
      } else if (fifth === 'P5') {
        return seventh === 'm7' ? 'dominant' : 'major';
      }

      return 'major';
    } else if (third === 'm3') {
      if (fifth === 'P5') {
        return 'minor';
      } else if (fifth === 'd5') {
        return seventh === 'm7' ? 'half-diminished' : 'diminished';
      }

      return 'minor';
    }
  },

  chordType: function chordType() {
    // In need of better name
    var length = this.intervals.length,
        interval,
        has,
        invert,
        i,
        name;

    if (length === 2) {
      return 'dyad';
    } else if (length === 3) {
      has = { first: false, third: false, fifth: false };
      for (i = 0; i < length; i++) {
        interval = this.intervals[i];
        invert = interval.invert();
        if (interval.base() in has) {
          has[interval.base()] = true;
        } else if (invert.base() in has) {
          has[invert.base()] = true;
        }
      }

      name = has.first && has.third && has.fifth ? 'triad' : 'trichord';
    } else if (length === 4) {
      has = { first: false, third: false, fifth: false, seventh: false };
      for (i = 0; i < length; i++) {
        interval = this.intervals[i];
        invert = interval.invert();
        if (interval.base() in has) {
          has[interval.base()] = true;
        } else if (invert.base() in has) {
          has[invert.base()] = true;
        }
      }

      if (has.first && has.third && has.fifth && has.seventh) {
        name = 'tetrad';
      }
    }

    return name || 'unknown';
  },

  get: function get(interval) {
    if (typeof interval === 'string' && interval in knowledge.stepNumber) {
      var intervals = this.intervals,
          i,
          length;

      interval = knowledge.stepNumber[interval];
      for (i = 0, length = intervals.length; i < length; i++) {
        if (intervals[i].number() === interval) {
          return this.root.interval(intervals[i]);
        }
      }

      return null;
    } else {
      throw new Error('Invalid interval name');
    }
  },

  interval: function interval(_interval) {
    return new Chord(this.root.interval(_interval), this.symbol);
  },

  transpose: function transpose(interval) {
    this.root.transpose(interval);
    this.name = this.root.name().toUpperCase() + this.root.accidental() + this.symbol;

    return this;
  },

  toString: function toString() {
    return this.name;
  }
};

module.exports = Chord;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knowledge = __webpack_require__(4);
var Interval = __webpack_require__(5);

var scales = {
  aeolian: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  blues: ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'],
  chromatic: ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'],
  dorian: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
  doubleharmonic: ['P1', 'm2', 'M3', 'P4', 'P5', 'm6', 'M7'],
  harmonicminor: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'],
  ionian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  locrian: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
  lydian: ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
  majorpentatonic: ['P1', 'M2', 'M3', 'P5', 'M6'],
  melodicminor: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'],
  minorpentatonic: ['P1', 'm3', 'P4', 'P5', 'm7'],
  mixolydian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
  phrygian: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  wholetone: ['P1', 'M2', 'M3', 'A4', 'A5', 'A6']
};

// synonyms
scales.harmonicchromatic = scales.chromatic;
scales.minor = scales.aeolian;
scales.major = scales.ionian;
scales.flamenco = scales.doubleharmonic;

function Scale(tonic, scale) {
  if (!(this instanceof Scale)) return new Scale(tonic, scale);
  var scaleName, i;
  if (!('coord' in tonic)) {
    throw new Error('Invalid Tonic');
  }

  if (typeof scale === 'string') {
    scaleName = scale;
    scale = scales[scale];
    if (!scale) throw new Error('Invalid Scale');
  } else {
    for (i in scales) {
      if (scales.hasOwnProperty(i)) {
        if (scales[i].toString() === scale.toString()) {
          scaleName = i;
          break;
        }
      }
    }
  }

  this.name = scaleName;
  this.tonic = tonic;
  this.scale = scale;
}

Scale.prototype = {
  notes: function notes() {
    var notes = [];

    for (var i = 0, length = this.scale.length; i < length; i++) {
      notes.push(this.tonic.interval(this.scale[i]));
    }

    return notes;
  },

  simple: function simple() {
    return this.notes().map(function (n) {
      return n.toString(true);
    });
  },

  type: function type() {
    var length = this.scale.length - 2;
    if (length < 8) {
      return ['di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa'][length] + 'tonic';
    }
  },

  get: function get(i) {
    var isStepStr = typeof i === 'string' && i in knowledge.stepNumber;
    i = isStepStr ? knowledge.stepNumber[i] : i;

    return this.tonic.interval(this.scale[i - 1]);
  },

  solfege: function solfege(index, showOctaves) {
    if (index) return this.get(index).solfege(this, showOctaves);

    return this.notes().map(function (n) {
      return n.solfege(this, showOctaves);
    });
  },

  interval: function interval(_interval) {
    _interval = typeof _interval === 'string' ? Interval.toCoord(_interval) : _interval;
    return new Scale(this.tonic.interval(_interval), this.scale);
  },

  transpose: function transpose(interval) {
    var scale = this.interval(interval);
    this.scale = scale.scale;
    this.tonic = scale.tonic;

    return this;
  }
};
Scale.KNOWN_SCALES = Object.keys(scales);

module.exports = Scale;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knowledge = __webpack_require__(4);

module.exports = function (teoria) {
  var Note = teoria.Note;
  var Chord = teoria.Chord;
  var Scale = teoria.Scale;

  Note.prototype.chord = function (chord) {
    var isShortChord = chord in knowledge.chordShort;
    chord = isShortChord ? knowledge.chordShort[chord] : chord;

    return new Chord(this, chord);
  };

  Note.prototype.scale = function (scale) {
    return new Scale(this, scale);
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tones = ['M', 'm', 'm', 'M', 'M', 'm', 'dim'];
// let mixolydianTones = ['M', 'm', 'dim', 'M', 'm', 'm', 'M'];

var Composer = function () {
  function Composer() {
    _classCallCheck(this, Composer);
  }

  _createClass(Composer, [{
    key: 'getTone',
    value: function getTone() {
      return 'A';
    }
  }, {
    key: 'getSheet',
    value: function getSheet() {
      return {
        conductor: [{
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }, {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        },
        // A
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }, {
          toneIndex: 3, // 5 // 2
          chord: tones[3],
          mixolydian: false
        }, {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }, {
          toneIndex: 3,
          chord: tones[3],
          mixolydian: false
        },
        // B
        {
          toneIndex: 1, // 3  // 5
          chord: tones[1] + '7',
          mixolydian: false
        }, {
          toneIndex: 2, // 3  // 5
          chord: tones[2],
          mixolydian: false
        }, {
          toneIndex: 1, // 3  // 5
          chord: tones[1],
          mixolydian: false
        }, {
          toneIndex: 6, // 3  // 5
          chord: tones[6],
          mixolydian: false
        },
        // A
        {
          toneIndex: 0,
          chord: tones[0] + '7',
          mixolydian: false
        }, {
          toneIndex: 5, // 5 // 2
          chord: tones[5],
          mixolydian: false
        }, {
          toneIndex: 0,
          chord: tones[0] + '7',
          mixolydian: false
        }, {
          toneIndex: 5,
          chord: tones[5],
          mixolydian: false
        },
        // C
        {
          toneIndex: 1,
          chord: tones[1],
          mixolydian: true
        }, {
          toneIndex: 2,
          chord: tones[2],
          mixolydian: true
        }, {
          toneIndex: 5,
          chord: tones[5],
          mixolydian: true
        }, {
          toneIndex: 4,
          chord: tones[4],
          mixolydian: false
        },
        // A
        {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }, {
          toneIndex: 3, // 5 // 2
          chord: tones[3] + '7',
          mixolydian: false
        }, {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }, {
          toneIndex: 0,
          chord: tones[0],
          mixolydian: false
        }],
        bass: [{
          interval: 8000, active: false
        }, {
          interval: 8000, active: true
        },
        // A
        {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        },
        // B
        {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        },
        // A
        {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        },
        // C
        {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        },
        // A
        {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: true
        }, {
          interval: 8000, active: false
        }],
        chordBeat: [{}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, { active: true, volume: { level: 2, delay: 6000 } }, { active: true }, { active: true, global: true, volume: { level: 1, delay: 4000 } },
        // A
        { active: true, global: true, volume: { level: 1, delay: 4000 }, filter: { level: 2, delay: 8000 }, compressor: { level: 2, delay: 8000 } }, { active: true, global: true }, { active: true, volume: { level: 0, delay: 10000 }, pace: { value: 800, delay: 10000 } }, {},
        // C
        {}, {}, {}, { active: true, volume: { level: 3, delay: 8000 } },
        // A
        { active: true, volume: { level: 1, delay: 8000 }, pace: { value: 600, delay: 10000 } }, { active: true, volume: { level: 0, delay: 8000 } }, {}, {}],
        harp: [{}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, { playing: true, volume: { level: 1, delay: 9000 } },
        // A
        { playing: true, filter: { level: 0, delay: 10000 } }, { playing: true, volume: { level: 2, delay: 9000 }, filter: { level: 1, delay: 4000 } }, { playing: true, volume: { level: 1, delay: 9000 }, paces: [{ level: 3, delay: 5000 }, { level: 1, delay: 2000 }] }, { playing: true, volume: { level: 0, delay: 6000 } },
        // C
        {}, {}, {}, { playing: true, filter: { level: 2, delay: 5000 }, paces: [{ level: 0, delay: 2000 }, { level: 2, delay: 5000 }], volume: { level: 2, delay: 4000 } },
        // A
        { playing: true }, {}, {}, {}],
        bells: [{}, {},
        // A
        { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 },
        // B
        {}, {}, { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 },
        // A
        {}, {}, {}, {},
        // C
        { chord: true, delay: 5000 }, { chord: true, delay: 5000 }, { chord: true, delay: 5000 }, { chord: true, delay: 5000 },
        // A
        { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 }, { tonic: true, delay: 5000 }],
        synth: [{
          volume: {
            level: 1, speed: 9000
          },
          filter: {
            level: 0, speed: 100
          }
        }, {},
        // A
        {}, {}, {}, {},
        // B
        { filter: {
            level: 2, speed: 9000
          } }, {}, {}, {},
        // A
        {}, {}, {}, {},
        // C
        { volume: {
            level: 2, speed: 9000
          },
          filter: {
            level: 0, speed: 9000
          } }, {}, {}, {},
        // A
        { volume: {
            level: 1, speed: 9000
          },
          filter: {
            level: 1, speed: 9000
          } }, {}, {}, {}],
        triangleSynth: [{}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        { volume: { level: 1, delay: 5000 } }, {}, { filter: { level: 2, delay: 6000 } }, {},
        // C
        { filter: { level: 0, delay: 6000 }, volume: { level: 2, delay: 5000 } }, {}, { wawah: { level: 2, delay: 6000 } }, {},
        // A
        { filter: { level: 1, delay: 6000 }, volume: { level: 1, delay: 5000 }, wahwah: { level: 1, delay: 5000 } }, {}, { volume: { level: 0, delay: 4000 } }, {}],
        tuba: [{}, {},
        // A
        {}, {}, {}, {},
        // B
        {}, {}, {}, {},
        // A
        {}, {}, { active: true, pace: 800, delay: 2500, volume: { level: 1 } }, { active: true, pace: 800, delay: 2500, volume: { level: 1 } },
        // C
        { active: true, pace: 800, delay: 2000, volume: { level: 0 } }, { active: true, pace: 800, delay: 2000, volume: { level: 0 } }, { active: true, pace: 800, delay: 1800, volume: { level: 2 } }, { active: true, pace: 800, delay: 2000, volume: { level: 1 } },
        // A
        { active: true, pace: 800, delay: 2500, volume: { level: 1 } }, {}, {}, {}],
        vibraphone: [{}, {},
        // A
        {}, {}, { active: true, pace: 6000, interval: 400, delay: 1400 }, { active: true, pace: 6000, interval: 400, multiple: true, delay: 1571 },
        // B
        {}, { active: true, pace: 6000, interval: 400, multiple: true, delay: 1643 }, { active: true, pace: 6000, interval: 400, multiple: true, delay: 1346 }, {},
        // A
        { active: true, pace: 4000, interval: 600, multiple: true, delay: 1348 }, { active: true, pace: 4000, interval: 500, multiple: true, delay: 1649 }, {}, {},
        // C
        {}, { active: true, pace: 6000, interval: 400, multiple: true, delay: 843 }, {}, { active: true, pace: 6000, interval: 400, multiple: true, delay: 1148 },
        // A
        { active: true, pace: 6000, interval: 400, multiple: true, delay: 1469 }, {}, { active: true, pace: 6000, interval: 400, delay: 1264 }, {}],

        violon: [{}, {},
        // A
        {}, {}, { play: { pattern: 2, length: 2000, delay: 3500 }, filter: { level: 0, speed: 4000 }, delay: 1411 }, { play: { pattern: 2, length: 2000, delay: 3500 }, delay: 1681 },
        // B
        {}, { play: { pattern: 0, length: 2000, delay: 3500 }, filter: { level: 1, speed: 4000 }, delay: 812 }, { play: { pattern: 0, length: 2000, delay: 3500 }, delay: 1648 }, {},
        // A
        { play: { pattern: 4, length: 2000, delay: 3500 }, filter: { level: 2, speed: 8000 }, tremolo: { setting: 1 }, delay: 1436 }, { play: { pattern: 4, length: 2000, delay: 3500 }, delay: 1854 }, {}, {},
        // C
        { play: { pattern: 2, length: 2000, delay: 3500 }, filter: { level: 0, speed: 4000 } }, {}, { play: { pattern: 1, length: 1500, delay: 3000 }, filter: { level: 1, speed: 4000 } }, {},
        // A
        {}, { play: { pattern: 3, length: 2000, delay: 3500 }, filter: { level: 1, speed: 4000 }, tremolo: { stop: true } }, {}, {}],
        whistle: [{}, { active: true, pattern: 0, delay: 1500, volume: { level: 2, delay: 500 }, pace: { value: 300, delay: 500 } },
        // A
        { active: true, pattern: 0, delay: 1500, volume: { level: 1, delay: 500 } }, { active: true, pattern: 1, delay: 1500 }, { active: true, pattern: 2, pace: { value: 200, delay: 500 }, delay: 1500 }, {},
        // B
        {}, {}, { active: true, pattern: 0, delay: 1500 }, {},
        // A
        {}, {}, { active: true, pattern: 1, pace: { value: 300, delay: 500 }, delay: 1500 }, { active: true, pattern: 1, delay: 1500 },
        // C
        { active: true, pattern: 0, delay: 1500, pace: { value: 200, delay: 500 } }, { active: true, pattern: 1 }, { active: true, pattern: 2, delay: 1500 }, { active: true, pattern: 1, delay: 1500 },
        // A
        { active: true, pattern: 0, delay: 1500, pace: { value: 300, delay: 500 } }, { active: true, pattern: 2, delay: 1500 }, { active: true, pattern: 0, delay: 1500 }, {}]
      };
    }
  }]);

  return Composer;
}();

exports.default = Composer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.listeners = {};
  }

  _createClass(EventEmitter, [{
    key: "subscribe",
    value: function subscribe(event, callback) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(callback);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(event, callback) {
      if (this.listeners[event]) {
        var index = this.listeners[event].findIndex(function (cb) {
          return cb === callback;
        });
        if (index > -1) {
          this.listeners[event].splice(index, 1);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.listeners[event]) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var callback = _step.value;

            new Promise(function (resolve) {
              callback.apply(undefined, args);
              resolve();
            });
          };

          for (var _iterator = this.listeners[event][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bassPiano = __webpack_require__(6);

var _bassPiano2 = _interopRequireDefault(_bassPiano);

var _synthPad = __webpack_require__(10);

var _synthPad2 = _interopRequireDefault(_synthPad);

var _lightBells = __webpack_require__(8);

var _lightBells2 = _interopRequireDefault(_lightBells);

var _violin = __webpack_require__(14);

var _violin2 = _interopRequireDefault(_violin);

var _squareHarp = __webpack_require__(9);

var _squareHarp2 = _interopRequireDefault(_squareHarp);

var _vibraphone = __webpack_require__(13);

var _vibraphone2 = _interopRequireDefault(_vibraphone);

var _chordBeat = __webpack_require__(7);

var _chordBeat2 = _interopRequireDefault(_chordBeat);

var _triangleChord = __webpack_require__(11);

var _triangleChord2 = _interopRequireDefault(_triangleChord);

var _tuba = __webpack_require__(12);

var _tuba2 = _interopRequireDefault(_tuba);

var _whistle = __webpack_require__(15);

var _whistle2 = _interopRequireDefault(_whistle);

var _conductor = __webpack_require__(20);

var _conductor2 = _interopRequireDefault(_conductor);

var _teoria = __webpack_require__(0);

var _teoria2 = _interopRequireDefault(_teoria);

var _pizzicato = __webpack_require__(1);

var _pizzicato2 = _interopRequireDefault(_pizzicato);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.teoria = _teoria2.default;
var scaleNotes = _teoria2.default.scale('a4', 'major').notes();

var bassPiano = new _bassPiano2.default();

var synthPad = new _synthPad2.default();
synthPad.playChord('a3', 'M7');

var lightBells = new _lightBells2.default();

var violin = new _violin2.default();

var squareHarp = new _squareHarp2.default();
squareHarp.setChord('a3', 'M7');
var paces = [600, 50, 100];
var indexPace = 0;

var vibraphone = new _vibraphone2.default();

var chordBeat = new _chordBeat2.default();
chordBeat.setNotes(scaleNotes[2].scientific(), scaleNotes[4].scientific(), scaleNotes[1].interval('P8').scientific());

var triangleChord = new _triangleChord2.default();
triangleChord.playChord('a4', 'M7');
var trianglePlaying = false;

var waveBass = new _tuba2.default();
waveBass.setNote('E2');

var whistle = new _whistle2.default();

var shift = false;
var someNotes = ['a4', 'c#4', 'e4', 'g#4', 'b4'];
var index = 0;

_pizzicato2.default.volume = 0.3;
window.playA4 = function () {
  bassPiano.play(shift ? 'c#3' : 'a2', true);
};

window.turnSynthOn = function () {
  synthPad.turnVolume(0.1, 5000);
};

window.turnSynthOff = function () {
  synthPad.turnVolume(0, 5000);
};

window.changeSynthFrequency = function () {
  synthPad.setLowFilterFrequency(Math.random() * 2500 + 500, 5000);
};

window.playBells = function () {
  lightBells.ring('a4', 'major');
};

window.playViolin = function () {
  var note = someNotes[index];
  violin.play(note);
  index = (index + 1) % someNotes.length;
};

window.waveViolinFreq = function () {
  violin.sineFilter('frequency', 300, 200);
};

window.playSquareHarp = function () {
  squareHarp.playing ? squareHarp.stop() : squareHarp.play();
};

window.switchHarpPace = function () {
  squareHarp.turnPace(paces[indexPace]);
  indexPace = (indexPace + 1) % paces.length;
};

window.playVibraphone = function () {
  vibraphone.play(scaleNotes[Math.floor(Math.random() * scaleNotes.length)].scientific());
};

window.playChordBeat = function () {
  chordBeat.playing ? chordBeat.stop() : chordBeat.play();
};

window.switchTriangle = function () {
  if (!trianglePlaying) {
    triangleChord.turnVolume(0.2, 5000);
  } else {
    triangleChord.turnVolume(0, 5000);
  }

  trianglePlaying = !trianglePlaying;
};

window.changeTriangleFrequency = function () {
  triangleChord.setFilterFrequency(Math.random() * 2500 + 2000, 5000);
};

window.switchWaveBass = function () {
  waveBass.play(0.05, 1000);
};

// window.changeWaveBassFrequency = function() {
//   triangleChord.setFilterFrequency(Math.random() * 1000 + 200, 5000);
// }

window.playWhistle = function () {
  whistle.playNotes([scaleNotes[4].scientific(), scaleNotes[1].scientific(), scaleNotes[5].scientific(), scaleNotes[6].interval('P-8').scientific()]);
};

window.switchChord = function () {
  shift = !shift;

  if (!shift) {
    synthPad.playChord('a3', 'M7');
    squareHarp.setChord('a3', 'M7');
  } else {
    synthPad.playChord('c#3', 'm');
    squareHarp.setChord('c#3', 'm');
  }
};

window.createConductor = function () {
  var conductor = new _conductor2.default();
  conductor.playMeasure(0);
  document.getElementById('intro').className += ' hidden';
  document.getElementById('intro').setAttribute('aria-hidden', true);
  document.getElementById('playing').className = '';
  document.getElementById('playing').setAttribute('aria-hidden', false);
};

window.playInstruments = function () {
  document.getElementById('intro').className += ' hidden';
  document.getElementById('intro').setAttribute('aria-hidden', true);
  document.getElementById('instruments').className = '';
  document.getElementById('instruments').setAttribute('aria-hidden', false);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _bassPiano = __webpack_require__(6);

var _bassPiano2 = _interopRequireDefault(_bassPiano);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BassPlayer = function (_Player) {
  _inherits(BassPlayer, _Player);

  function BassPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, BassPlayer);

    var _this = _possibleConstructorReturn(this, (BassPlayer.__proto__ || Object.getPrototypeOf(BassPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.bass = new _bassPiano2.default();
    _this.color = _this.color.interval('P-8').interval('P-8');
    _this.mixolydian = _this.mixolydian.interval('P-8').interval('P-8');
    return _this;
  }

  _createClass(BassPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord, mixolydian) {
      var _this2 = this;

      var measure = this.sheet[index];

      var bassNote = (mixolydian ? this.mixolydian : this.color).notes()[noteIndex].scientific();

      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }

      if (measure.active) {
        this.play(bassNote, true);
        this.interval = setInterval(function () {
          _this2.play(bassNote, false);
        }, measure.interval);
      }
    }
  }, {
    key: 'play',
    value: function play(note, stop) {
      this.bass.play(note, stop);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }
      _get(BassPlayer.prototype.__proto__ || Object.getPrototypeOf(BassPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return BassPlayer;
}(_player2.default);

exports.default = BassPlayer;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _chordBeat = __webpack_require__(7);

var _chordBeat2 = _interopRequireDefault(_chordBeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChordBeatPlayer = function (_Player) {
  _inherits(ChordBeatPlayer, _Player);

  function ChordBeatPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, ChordBeatPlayer);

    var _this = _possibleConstructorReturn(this, (ChordBeatPlayer.__proto__ || Object.getPrototypeOf(ChordBeatPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.chordbeat = new _chordBeat2.default();
    _this.chordbeat.turnVolume(0, 100);
    _this.volume = 0;

    _this.settings = {
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
    };
    return _this;
  }

  _createClass(ChordBeatPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord, mixolydian) {
      var measure = this.sheet[index];
      var scale = mixolydian ? this.mixolydian : this.color;

      if (measure.active) {
        var notes = [];
        if (measure.global) {
          notes.push(scale.notes()[2].scientific());
          notes.push(scale.notes()[4].scientific());
          notes.push(scale.notes()[1].interval('P8').scientific());
        } else {
          var _arr = [2, 4, 8];

          for (var _i = 0; _i < _arr.length; _i++) {
            var interval = _arr[_i];
            var chordIndex = (noteIndex + interval) % scale.notes().length;
            var note = scale.notes()[chordIndex];
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
      } else {
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
  }, {
    key: 'stop',
    value: function stop() {
      if (this.playing) {
        this.chordbeat.stop();
        this.playing = false;
      }
      _get(ChordBeatPlayer.prototype.__proto__ || Object.getPrototypeOf(ChordBeatPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return ChordBeatPlayer;
}(_player2.default);

exports.default = ChordBeatPlayer;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _squareHarp = __webpack_require__(9);

var _squareHarp2 = _interopRequireDefault(_squareHarp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HarpPlayer = function (_Player) {
  _inherits(HarpPlayer, _Player);

  function HarpPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, HarpPlayer);

    var _this = _possibleConstructorReturn(this, (HarpPlayer.__proto__ || Object.getPrototypeOf(HarpPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.harp = new _squareHarp2.default();
    _this.harp.turnVolume(0, 100);
    _this.volume = 0;

    _this.settings = {
      volumes: {
        0: 0,
        1: 0.01,
        2: 0.02
      },
      filters: {
        0: 1500,
        1: 2000,
        2: 2500,
        3: 3000
      },
      paces: {
        0: 600,
        1: 300,
        2: 100,
        3: 50
      }
    };

    _this.playing = false;
    return _this;
  }

  _createClass(HarpPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord, mixolydian) {
      var _this2 = this;

      var measure = this.sheet[index];

      this.harp.setChord((mixolydian ? this.mixolydian : this.color).notes()[noteIndex].interval('P-8').scientific(), chord);

      if (measure.playing && !this.playing) {
        this.harp.play();
        this.playing = true;
      } else if (!measure.playing && this.playing) {
        this.harp.stop();
        this.playing = false;
      }

      if (measure.volume && measure.volume.level !== this.volume) {
        this.harp.turnVolume(this.settings.volumes[measure.volume.level], measure.volume.delay);
        this.volume = measure.volume.level;
      }

      if (measure.filter) {
        this.harp.setLowFilterProperty('frequency', this.settings.filters[measure.filter.level] + (Math.random() * 1000 - 500), measure.filter.delay);
      }

      if (measure.paces && measure.paces.length > 0) {
        measure.paces.reduce(function (promise, pace) {
          return promise.then(function () {
            var rngPace = _this2.settings.paces[pace.level];
            rngPace += Math.random() * rngPace * 2 / 3 - rngPace / 3;
            return _this2.harp.turnPace(rngPace, pace.delay);
          });
        }, Promise.resolve());
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.playing) {
        this.harp.stop();
        this.playing = false;
      }
      _get(HarpPlayer.prototype.__proto__ || Object.getPrototypeOf(HarpPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return HarpPlayer;
}(_player2.default);

exports.default = HarpPlayer;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _lightBells = __webpack_require__(8);

var _lightBells2 = _interopRequireDefault(_lightBells);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightBellsPlayer = function (_Player) {
  _inherits(LightBellsPlayer, _Player);

  function LightBellsPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, LightBellsPlayer);

    var _this = _possibleConstructorReturn(this, (LightBellsPlayer.__proto__ || Object.getPrototypeOf(LightBellsPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.bells = new _lightBells2.default();
    return _this;
  }

  _createClass(LightBellsPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord) {
      var _this2 = this;

      var measure = this.sheet[index];

      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }

      if (measure.tonic) {
        this.interval = setInterval(function () {
          _this2.bells.ring(_this2.color.notes()[0].scientific(), 'major');
        }, measure.delay);
      } else if (measure.chord) {
        this.interval = setInterval(function () {
          _this2.bells.ring(_this2.color.notes()[noteIndex].scientific(), chord.startsWith('M') ? 'major' : 'minor');
        }, measure.delay);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }
      _get(LightBellsPlayer.prototype.__proto__ || Object.getPrototypeOf(LightBellsPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return LightBellsPlayer;
}(_player2.default);

exports.default = LightBellsPlayer;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _synthPad = __webpack_require__(10);

var _synthPad2 = _interopRequireDefault(_synthPad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SynthPadPlayer = function (_Player) {
  _inherits(SynthPadPlayer, _Player);

  function SynthPadPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, SynthPadPlayer);

    var _this = _possibleConstructorReturn(this, (SynthPadPlayer.__proto__ || Object.getPrototypeOf(SynthPadPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.synth = new _synthPad2.default();

    _this.levels = {
      volumes: {
        0: 0,
        1: 0.05,
        2: 0.1
      },
      filters: {
        0: 1000,
        1: 2000,
        2: 2500
      }
    };
    return _this;
  }

  _createClass(SynthPadPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord, mixolydian) {
      var measure = this.sheet[index];

      this.synth.playChord((mixolydian ? this.mixolydian : this.color).notes()[noteIndex].interval('P-8').scientific(), chord);

      if (measure.volume) {
        this.synth.turnVolume(this.levels.volumes[measure.volume.level], measure.volume.speed);
      }
      if (measure.filter) {
        var freq = this.levels.filters[measure.filter.level] + (Math.random() * 1000 - 500);
        this.synth.setLowFilterFrequency(freq, measure.filter.speed);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.synth.turnVolume(0, 100);
      _get(SynthPadPlayer.prototype.__proto__ || Object.getPrototypeOf(SynthPadPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return SynthPadPlayer;
}(_player2.default);

exports.default = SynthPadPlayer;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _triangleChord = __webpack_require__(11);

var _triangleChord2 = _interopRequireDefault(_triangleChord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TriangleSynthPlayer = function (_Player) {
  _inherits(TriangleSynthPlayer, _Player);

  function TriangleSynthPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, TriangleSynthPlayer);

    var _this = _possibleConstructorReturn(this, (TriangleSynthPlayer.__proto__ || Object.getPrototypeOf(TriangleSynthPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.synth = new _triangleChord2.default();

    _this.levels = {
      volumes: {
        0: 0,
        1: 0.1,
        2: 0.15
      },
      filters: {
        0: 2000,
        1: 2500,
        2: 3000
      },
      wahwah: {
        0: 1000,
        1: 1500,
        2: 2500
      }
    };
    return _this;
  }

  _createClass(TriangleSynthPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord, mixolydian) {
      var measure = this.sheet[index];

      this.synth.playChord((mixolydian ? this.mixolydian : this.color).notes()[noteIndex].scientific(), chord);

      if (measure.volume) {
        this.synth.turnVolume(this.levels.volumes[measure.volume.level], measure.volume.delay);
      }
      if (measure.filter) {
        this.synth.setFilterFrequency(this.levels.filters[measure.filter.level] + (Math.random() * 1000 - 500), measure.filter.delay);
      }
      if (measure.wahwah) {
        this.synth.setWahWah(this.levels.wahwah[measure.wahwah.level], measure.wahwah.delay);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.synth.turnVolume(0, 100);
      _get(TriangleSynthPlayer.prototype.__proto__ || Object.getPrototypeOf(TriangleSynthPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return TriangleSynthPlayer;
}(_player2.default);

exports.default = TriangleSynthPlayer;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _tuba = __webpack_require__(12);

var _tuba2 = _interopRequireDefault(_tuba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TubaPlayer = function (_Player) {
  _inherits(TubaPlayer, _Player);

  function TubaPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, TubaPlayer);

    var _this = _possibleConstructorReturn(this, (TubaPlayer.__proto__ || Object.getPrototypeOf(TubaPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.tuba = new _tuba2.default();

    _this.settings = {
      volumes: {
        0: 0,
        1: 0.05,
        2: 0.1
      },
      filters: {
        0: 300,
        1: 500,
        2: 700
      }
    };

    _this.tuba.setNote(_this.color.notes()[0].interval('P-8').interval('P-8').scientific());
    return _this;
  }

  _createClass(TubaPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index) {
      var _this2 = this;

      var measure = this.sheet[index];

      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }

      if (measure.active) {
        var volume = measure.volume ? this.settings.volumes[measure.volume.level] : this.settings[0];
        this.interval = setInterval(function () {
          _this2.tuba.play(volume, measure.pace);
        }, measure.delay + Math.random() * 0.4 * measure.delay - 0.2 * measure.delay);
      }

      if (measure.filter) {
        this.tuba.setFilterFrequency(this.settings.filters[measure.filter.level], measure.filter.delay);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }
      _get(TubaPlayer.prototype.__proto__ || Object.getPrototypeOf(TubaPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return TubaPlayer;
}(_player2.default);

exports.default = TubaPlayer;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _vibraphone = __webpack_require__(13);

var _vibraphone2 = _interopRequireDefault(_vibraphone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VibraphonePlayer = function (_Player) {
  _inherits(VibraphonePlayer, _Player);

  function VibraphonePlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, VibraphonePlayer);

    var _this = _possibleConstructorReturn(this, (VibraphonePlayer.__proto__ || Object.getPrototypeOf(VibraphonePlayer)).call(this, eventEmitter, sheet, tonic));

    _this.vibraphone = new _vibraphone2.default();

    _this.mixolydianActive = false;
    return _this;
  }

  _createClass(VibraphonePlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, noteIndex, chord, mixolydian) {
      var _this2 = this;

      var measure = this.sheet[index];

      this.active = measure.active;
      // delay before activations
      this.pace = measure.pace;
      // delay between individual notes
      this.interval = measure.interval;
      // Several note for each activation
      this.multiple = measure.multiple;
      this.mixolydianActive = mixolydian;

      if (measure.active && !this.playing) {
        setTimeout(function () {
          _this2.play(measure.multiple ? 1 + Math.round(Math.random() * 2) : 1);
        }, measure.delay || 0);
        this.playing = true;
      } else if (!measure.active) {
        this.playing = false;
      }
    }
  }, {
    key: 'play',
    value: function play(nbNotes) {
      var _this3 = this;

      var notes = [];
      for (var i = 0; i < nbNotes; i++) {
        notes.push(Math.floor(Math.random() * this.color.notes().length));
      }

      notes.reduce(function (promise, noteIndex) {
        return promise.then(function () {
          _this3.vibraphone.play((_this3.mixolydianActive ? _this3.mixolydian : _this3.color).notes()[noteIndex].scientific());
          return new Promise(function (resolve) {
            return setTimeout(resolve, _this3.interval);
          });
        });
      }, Promise.resolve());

      if (this.active) {
        var randomDelay = 0.2 * this.pace;
        setTimeout(function () {
          _this3.play(_this3.multiple ? 1 + Math.round(Math.random() * 2) : 1);
        }, this.pace + (Math.random() * 2 * randomDelay - randomDelay / 2));
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.active = false;
      this.playing = false;
      _get(VibraphonePlayer.prototype.__proto__ || Object.getPrototypeOf(VibraphonePlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return VibraphonePlayer;
}(_player2.default);

exports.default = VibraphonePlayer;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _violin = __webpack_require__(14);

var _violin2 = _interopRequireDefault(_violin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SynthPadPlayer = function (_Player) {
  _inherits(SynthPadPlayer, _Player);

  function SynthPadPlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, SynthPadPlayer);

    var _this = _possibleConstructorReturn(this, (SynthPadPlayer.__proto__ || Object.getPrototypeOf(SynthPadPlayer)).call(this, eventEmitter, sheet, tonic));

    _this.violin = new _violin2.default();

    _this.settings = {
      filters: {
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

    _this.state = {
      active: false,
      playing: false,
      notes: [],
      length: 0,
      delay: 0
    };
    return _this;
  }

  _createClass(SynthPadPlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index, note, chord, mixolydian) {
      var _this2 = this;

      var measure = this.sheet[index];

      if (measure.filter) {
        this.violin.setLowFilterFrequency(this.settings.filters[measure.filter.level] + (Math.random() * 1000 - 500), measure.filter.speed);
      }

      if (measure.tremolo) {
        if (measure.tremolo.stop) {
          this.violin.stopSineFilter('frequency');
        } else {
          this.violin.sineFilter('frequency', this.settings.tremolo[measure.tremolo.setting].amp, this.settings.tremolo[measure.tremolo.setting].freq);
        }
      }

      if (measure.play) {
        this.state.notes = this.settings.patterns[measure.play.pattern || 0].map(function (noteIndex) {
          var note = (mixolydian ? _this2.mixolydian : _this2.color).notes()[noteIndex % 7];
          for (var octave = 0; octave < Math.floor((noteIndex - 1) / 7); octave++) {
            note = note.interval('P8');
          }

          return note.scientific();
        });

        this.state.length = measure.play.length;
        this.state.delay = measure.play.delay;

        if (!this.state.active) {
          this.state.active = true;
          setTimeout(function () {
            _this2.playNotes(0);
          }, measure.delay || 0);
        }
      } else {
        this.state.active = false;
      }
    }
  }, {
    key: 'playNotes',
    value: function playNotes(index) {
      var _this3 = this;

      if (this.state.playing) {
        this.violin.stop();
        this.state.playing = false;

        if (this.state.active) {
          setTimeout(function () {
            _this3.playNotes((index + 1) % _this3.state.notes.length);
          }, this.state.delay);
        }
      } else if (this.state.active) {
        // Reset index if pattern length has changed 
        index = index >= this.state.notes.length ? 0 : index;
        this.violin.play(this.state.notes[index]);
        this.state.playing = true;

        setTimeout(function () {
          _this3.playNotes(index);
        }, this.state.length);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.state.playing) {
        this.violin.stop();
        this.state.playing = false;
      }
      this.state.active = false;
      _get(SynthPadPlayer.prototype.__proto__ || Object.getPrototypeOf(SynthPadPlayer.prototype), 'stop', this).call(this);
    }
  }]);

  return SynthPadPlayer;
}(_player2.default);

exports.default = SynthPadPlayer;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _whistle = __webpack_require__(15);

var _whistle2 = _interopRequireDefault(_whistle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WhistlePlayer = function (_Player) {
  _inherits(WhistlePlayer, _Player);

  function WhistlePlayer(eventEmitter, sheet, tonic) {
    _classCallCheck(this, WhistlePlayer);

    var _this = _possibleConstructorReturn(this, (WhistlePlayer.__proto__ || Object.getPrototypeOf(WhistlePlayer)).call(this, eventEmitter, sheet, tonic));

    _this.whistle = new _whistle2.default();
    _this.whistle.setLowFilterProperty('frequency', Math.floor(Math.random() * 1000 + 500));

    _this.settings = {
      volumes: {
        0: 0,
        1: 0.2,
        2: 0.25
      }
    };

    // Generate three random patterns
    _this.settings.patterns = [];
    for (var i = 0; i < 3; i++) {
      var pattern = [];
      var nbNotes = 3 + Math.round(Math.random());
      for (var j = 0; j < nbNotes; j++) {
        // third pattern is mixolydian
        pattern.push((i < 2 ? _this.color : _this.mixolydian).notes()[Math.floor(Math.random() * _this.color.notes().length)].scientific());
      }
      _this.settings.patterns.push(pattern);
    }
    return _this;
  }

  _createClass(WhistlePlayer, [{
    key: 'changeMeasure',
    value: function changeMeasure(index) {
      var _this2 = this;

      var measure = this.sheet[index];

      if (measure.active) {
        setTimeout(function () {
          _this2.whistle.playNotes(_this2.settings.patterns[measure.pattern]);
        }, measure.delay + Math.random() * 0.4 * measure.delay - 0.2 * measure.delay);
      }

      if (measure.volume) {
        this.whistle.turnVolume(this.settings.volumes[measure.volume.level], measure.volume.delay);
      }

      if (measure.pace) {
        this.whistle.turnPace(measure.pace.value, measure.pace.delay);
      }
    }
  }]);

  return WhistlePlayer;
}(_player2.default);

exports.default = WhistlePlayer;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map