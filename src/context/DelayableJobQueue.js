/* @flow */

type JobItem = {
  instance: Object,
  method: string,
  args: Array<mixed>,
  delay: number,
  showIndicators?: boolean,
  callback?: Function,
};

type Handler = (job: JobItem) => Promise<mixed>;

export default class DelayableJobQueue {
  _queue: Array<JobItem>;
  _processing: boolean;
  _beforeEach: Handler;
  _afterEach: Handler;
  _before: Handler;
  _after: Handler;
  _beforeProcessing: boolean;

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

  before(fn: Handler): DelayableJobQueue {
    this._before = fn;
    return this;
  }

  after(fn: Handler): DelayableJobQueue {
    this._after = fn;
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
      this._beforeProcessing = true;
      /* eslint-disable no-await-in-loop */
      while (this._hasItem) {
        const item = this._dequeue();
        const { instance, method, args, callback } = item;

        if (this._beforeProcessing) {
          if (typeof this._before === 'function') {
            await this._before(item);
          }
          this._beforeProcessing = false;
        }

        if (typeof this._beforeEach === 'function') {
          await this._beforeEach(item);
        }

        const response = await instance[method](...args);
        if (callback) {
          callback(response);
        }

        if (typeof this._afterEach === 'function') {
          await this._afterEach(item);
        }

        if (!this._hasItem) {
          if (typeof this._after === 'function') {
            await this._after(item);
          }
        }
      }
      this._processing = false;
      /* eslint-enable no-await-in-loop */
    } catch (err) {
      console.error(err);
    }
  }
}
