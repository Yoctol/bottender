/* @flow */

type JobItem = {
  instance: Object,
  method: string,
  args: Array<mixed>,
  delay: number,
  showIndicators?: boolean,
};

type Handler = (job: JobItem) => Promise<mixed>;

export default class DelayableJobQueue {
  _queue: Array<JobItem>;
  _processing: boolean;
  _beforeEach: Handler;
  _afterEach: Handler;

  constructor() {
    this._queue = [];
    this._processing = false;
  }

  beforeEach(fn: Handler): DelayableJobQueue {
    this._beforeEach = fn;
    return this;
  }

  afterEach(fn: Handler): DelayableJobQueue {
    this._afterEach = fn;
    return this;
  }

  enqueue(item: JobItem): void {
    this._queue.push(item);
    if (!this._processing) {
      this._process();
    }
  }

  get _hasItem(): boolean {
    return !!this._queue.length;
  }

  _dequeue(): JobItem {
    return this._queue.shift();
  }

  async _process(): ?Promise<void> {
    try {
      this._processing = true;
      /* eslint-disable no-await-in-loop */
      while (this._hasItem) {
        const item = this._dequeue();
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
}
