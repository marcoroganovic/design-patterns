var Singleton = Singleton || (function() {
  function Singleton() {
    this.handlers = [];
  }

  // some silly test logic

  Singleton.prototype.add = function(cb) {
    this.handlers.push(cb);
  }

  var instance;
  return {
    getInstance: function() {
      if(instance === undefined) {
        instance = new Singleton();
        instance.constructor = null;
      }
      return instance;
    }
  }
})();
