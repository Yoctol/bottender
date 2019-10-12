import Context from '../context/Context';
import withProps from '../withProps';
import { PlatformContext } from '../context/PlatformContext';
import { Props } from '../types';
import { run } from '../bot/Bot';

class MockContext extends Context implements PlatformContext {
  get platform() {
    return 'mock';
  }

  sendText = jest.fn();
}

function setup() {
  const context = new MockContext({
    event: {},
    session: {},
  });

  return {
    context,
  };
}

async function SendSomeText(
  context: MockContext,
  { text }: Props
): Promise<void> {
  await context.sendText(text);
}

it('should support', async () => {
  const { context } = setup();

  const SendHello = withProps(SendSomeText, { text: 'hello' });

  await run(SendHello)(context);

  expect(context.sendText).toBeCalledWith('hello');
});
