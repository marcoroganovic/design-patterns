var Registry = Registry || (function() {
  
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function Registry(defaultVal) {
    this._default = defaultVal;
    this._values = Object.create(null);
  }

  Registry.prototype.register = function(name, val) {
    this._values[name] = val;
  }

  Registry.prototype.get = function(name) {
    return hasOwnProperty.call(this._values, name) ? this._values[name] : this._default;
  }

  return Registry;

})();

