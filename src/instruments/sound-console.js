/**
* Make progressive change on oscillators properties (volume, frequencies, etc…)
*/
class SoundConsole {
  constructor() {
    // Intervals are stored in array to ensure there is never two in conflicts
    this.intervals = {};

    // In how many frames per second are the change applied
    this.frequency = 1000 / 60;
  }

  progressiveChange(oscillator, property, target, key, delay=5000) {
    // Clear eventual conflictual interval
    if (this.intervals[key]) {
      clearInterval(this.intervals[key].interval);
      this.intervals[key].reject();
      delete this.intervals[key];
    }

    // Calculate step to apply on each frame
    let step = (target - oscillator[property]) * this.frequency / delay;

    // Return promise resolved when change is over
    return new Promise((resolve, reject) => {
      // set interval
      const interval = setInterval(() => {
        // Change slightly the property
        oscillator[property] += step;

        if (Math.abs(target - oscillator[property]) < Math.abs(step)) {
          // When the difference is almost zero (js is bad at math), stop the interval
          oscillator[property] = target;
          clearInterval(interval);
          resolve();

          // In case a conflictual interval comes right as this instant, we need to check before deleting, just for safety
          if (this.intervals[key] === interval)
            delete this.intervals[key];
        }
      }, this.frequency);

      // Store interval, resolve and reject callbacks
      this.intervals[key] = {
        interval,
        resolve,
        reject
      };
    });
  }

  sineWave(oscillator, property, amplitude, delay, key) {
    // Clear eventual conflictual interval
    if (this.intervals[key]) {
      this.stopSine(key);
    }

    let step = 2 * Math.PI * this.frequency / delay;
    let index = 0;
    let initialValue = oscillator[property];
   
    const interval = setInterval(() => {
      oscillator[property] = initialValue + Math.sin(index) * amplitude;
      index = (index + step) % (2 * Math.PI);
    }, this.frequency)

    this.intervals[key] = interval;
  }

  stopSine(key) {
    clearInterval(this.intervals[key]);
    delete this.intervals[key];0
  }
}

export default SoundConsole;
