export default class DelayableJobQueue {
  constructor() {
    this._queue = [];
    this._processing = false;
  }

  beforeEach(fn) {
    this._beforeEach = fn;
    return this;
  }

  afterEach(fn) {
    this._afterEach = fn;
    return this;
  }

  async process() {
    try {
      this._processing = true;
      /* eslint-disable no-await-in-loop */
      while (this.hasItem()) {
        const item = this.dequeue();
        const { instance, method, args } = item;
        if (typeof this._beforeEach === 'function') {
          await this._beforeEach(item);
        }

        await instance[method](...args);

        if (typeof this._afterEach === 'function') {
          await this._afterEach(item);
        }
      }
      this._processing = false;
      /* eslint-enable no-await-in-loop */
    } catch (err) {
      console.error(err);
    }
  }

  hasItem() {
    return !!this._queue.length;
  }

  enqueue(item) {
    this._queue.push(item);
    if (!this._processing) {
      this.process();
    }
  }

  dequeue() {
    return this._queue.shift();
  }
}
