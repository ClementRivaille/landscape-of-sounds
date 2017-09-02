class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  suscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);
  }

  unsuscribe(event, callback) {
    if (this.listeners.event) {
      let index = this.listeners.findIndex((cb) => {
        return cb === callback;
      });
      if (index > -1) {
        this.listeners.splice(index, 1);
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
