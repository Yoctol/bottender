import delay from 'delay';

import Context from '../Context';

jest.mock('delay');

class TestContext extends Context {
  get platform() {
    return 'test';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendText() {}
}

describe('intent', () => {
  it('should default to null', () => {
    const context = new TestContext({ client: {}, event: {} });

    expect(context.intent).toBeNull();
  });

  it('should support labeling intent', () => {
    const context = new TestContext({ client: {}, event: {} });

    context.setIntent('hello-world');

    expect(context.intent).toEqual('hello-world');
  });
});

describe('handled', () => {
  it('should default to null', () => {
    const context = new TestContext({ client: {}, event: {} });

    expect(context.isHandled).toBeNull();
  });

  it('should be true after calling context.setAsHandled()', () => {
    const context = new TestContext({ client: {}, event: {} });

    context.setAsHandled();

    expect(context.isHandled).toEqual(true);
  });

  it('should be true after calling context.setAsHandled(true)', () => {
    const context = new TestContext({ client: {}, event: {} });

    context.setAsHandled(true);

    expect(context.isHandled).toEqual(true);
  });

  it('should be false after calling context.setAsHandled(false)', () => {
    const context = new TestContext({ client: {}, event: {} });

    context.setAsHandled(false);

    expect(context.isHandled).toEqual(false);
  });

  it('should be false after calling context.setAsNotHandled()', () => {
    const context = new TestContext({ client: {}, event: {} });

    context.setAsNotHandled();

    expect(context.isHandled).toEqual(false);
  });
});

describe('typing', () => {
  it('should avoid calling delay with 0 ms', async () => {
    const context = new TestContext({ client: {}, event: {} });

    await context.typing(0);

    expect(delay).not.toBeCalled();
  });

  it('should call delay if ms > 0', async () => {
    const context = new TestContext({ client: {}, event: {} });

    await context.typing(10);

    expect(delay).toBeCalledWith(10);
  });
});
