var Observer = Observer || (function() {
  
  function Observer() {
    this.handlers = {};
  }

  Observer.prototype.subscribe = function(event, cb) {
    this.handlers[event] = this.handlers[event] || [];
    this.handlers[event].push(cb);
  }

  Observer.prototype.unsubscribe = function(event, cb) {
    if(!this.handlers[event]) return;
    this.handlers[event] = this.handlers[event].filter(fn => {
      if(fn !== cb) return fn;
    });
  }

  Observer.prototype.trigger = function(eventType, e) {
    this.handlers[eventType].forEach(cb => cb(e));
  }

  Observer.prototype.flush = function(eventType) {
    if(this.handlers[eventType]) {
      delete this.handlers[eventType];
    }
  }

  return Observer;

})();
