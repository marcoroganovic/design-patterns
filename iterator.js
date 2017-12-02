class Iterator {

  static create(source) {
    return this instanceof Iterator ? this : new Iterator(source);
  }

  constructor(source) {
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

}



/* -- Demo -- */
const iterator = Iterator.create([1, 2, 3]);
while(iterator.hasNext()) {
  console.log(iterator.next());
}
