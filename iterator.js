class Iterator {

  static create(source) {
    return this instanceof Iterator ? this : new Iterator(source);
  }

  constructor(source) {
    if(!Array.isArray(source)) {
      throw new Error(`Expected array, got ${typeof source}`)
    }

    this.source = source;
    this.index = -1;
    this.length = source.length
  }

  getLength() {
    return this.length;
  }

  hasNext() {
    return this.index < this.length; 
  }

  next() {
    this.index += 1;

    if(this.index < this.length) {
      return {
        value: this.source[this.index],
        done: false
      }
    } else {
      return {
        value: undefined,
        done: true
      }
    }
  }


  reset() {
    this.index = -1;
  }


  each(fn) {
    while(this.hasNext()) {
      fn(this.next().value);
    }
  }
}



/* -- Demo -- */
const iterator = Iterator.create([1, 2, 3]);
iterator.each((val) => console.log(val));
