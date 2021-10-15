import { Context, Props, run } from '@bottender/core';

import withProps from '../withProps';

function setup() {
  const context = {
    sendText: jest.fn(),
  };

  return {
    context,
  };
}

async function SendSomeText(context: Context, { text }: Props) {
  await context.sendText(text);
}

it('should support', async () => {
  const { context } = setup();

  const SendHello = withProps(SendSomeText, { text: 'hello' });

  await run(SendHello)(context);

  expect(context.sendText).toBeCalledWith('hello');
});
