import Context from '../Context';

class TestContext extends Context<any, any> {
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
