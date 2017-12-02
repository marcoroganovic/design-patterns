class Semaphore {
  constructor(max) {
    this.tasks = [];
    this.counter = max;
    this.dispatch = this.dispatch.bind(this);
  }


  dispatch() {
    if(this.counter > 0 && this.task.length > 0) {
      this.counter--;
      this.tasks.shift()();
    }
  }


  release() {
    this.counter++;
    this.dispatch();
  }

  acquire() {
    return new Promise(resolve => {
      this.tasks.push(resolve);
      requestIdleCallback(this.dispatch);
    })
  }
}
