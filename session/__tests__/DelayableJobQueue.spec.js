import DelayableJobQueue from '../DelayableJobQueue';

describe('#enqueue', () => {
  it('should process job item after enqueue', async () => {
    const queue = new DelayableJobQueue();
    const obj = {
      run: jest.fn(() => Promise.resolve()),
    };
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: ['arg1', 'arg2'],
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(obj.run).toBeCalledWith('arg1', 'arg2');
  });
});

describe('#beforeEach', () => {
  it('should be called before queue process job item', async () => {
    const queue = new DelayableJobQueue();
    const beforeEach = jest.fn(() => Promise.resolve());
    queue.beforeEach(beforeEach);
    const obj = {
      run: () => Promise.resolve(),
    };
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(beforeEach).toBeCalled();
  });
});

describe('#afterEach', () => {
  it('should be called after queue process job item', async () => {
    const queue = new DelayableJobQueue();
    const afterEach = jest.fn(() => Promise.resolve());
    queue.afterEach(afterEach);
    const obj = {
      run: () => Promise.resolve(),
    };
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(afterEach).toHaveBeenCalledTimes(2);
  });
});

describe('#before', () => {
  it('should be called one time before queue process job item', async () => {
    const queue = new DelayableJobQueue();
    const before = jest.fn(() => Promise.resolve());
    queue.before(before);
    const obj = {
      run: () => Promise.resolve(),
    };
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(before).toHaveBeenCalledTimes(1);
  });
});

describe('#after', () => {
  it('should be called one time after queue process job item', async () => {
    const queue = new DelayableJobQueue();
    const after = jest.fn(() => Promise.resolve());
    queue.after(after);
    const obj = {
      run: () => Promise.resolve(),
    };
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    queue.enqueue({
      instance: obj,
      method: 'run',
      args: [],
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(after).toHaveBeenCalledTimes(1);
  });
});
