import delay from 'delay';

import withTyping from '../withTyping';

jest.mock('delay');

function setup() {
  const context = {
    typingOn: jest.fn(),
    sendText: jest.fn(),
  };
  return {
    context,
  };
}

describe('default typing', () => {
  it('should typingOn and delay', async () => {
    const { context } = setup();

    const _send = context.sendText;

    withTyping({ delay: 1000 })(context);

    await context.sendText('Hello');

    expect(context.typingOn).toBeCalled();
    expect(delay).toBeCalledWith(1000);
    expect(_send).toBeCalledWith('Hello');
  });
});

describe('withDelay methods', () => {
  it('should attch sendTextWithDelay', () => {
    const { context } = setup();

    withTyping({ delay: 1000 })(context);

    expect(context.sendTextWithDelay).toBeDefined();
  });
});
