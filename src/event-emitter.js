class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (this.listeners[event]) {
      let index = this.listeners[event].findIndex((cb) => {
        return cb === callback;
      });
      if (index > -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      for (let callback of this.listeners[event]) {
        new Promise((resolve) => {
          callback(...args);
          resolve();
        });
      }
    }
  }
}

export default EventEmitter;
