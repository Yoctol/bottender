import Context from '../context/Context';
import chain from '../chain';
import withProps from '../withProps';
import { Action, Props } from '../types';
import { PlatformContext } from '../context/PlatformContext';
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

it('should not call sendText if First action return undefined', async () => {
  const { context } = setup();

  function First(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  function Second(): void {} // eslint-disable-line @typescript-eslint/no-empty-function

  const Chain = chain([First, Second]);

  await run(Chain)(context);

  expect(context.sendText).not.toBeCalled();
});

it('should call sendText with hi if first action return SayHi', async () => {
  const { context } = setup();

  async function SayHi(ctx: MockContext) {
    await ctx.sendText('hi');
  }
  function First(): Action {
    return SayHi;
  }
  function Second(): void {} // eslint-disable-line @typescript-eslint/no-empty-function

  const Chain = chain([First, Second]);

  await run(Chain)(context);

  expect(context.sendText).toBeCalledWith('hi');
});

it('should call sendText with hi if second action return SayHi', async () => {
  const { context } = setup();

  async function SayHi(ctx: MockContext) {
    await ctx.sendText('hi');
  }
  function First(_: MockContext, { next }: Props): Action {
    return next;
  }
  function Second(): Action {
    return SayHi;
  }

  const Chain = chain([First, Second]);

  await run(Chain)(context);

  expect(context.sendText).toBeCalledWith('hi');
});

it('should call sendText with hi if second action return next', async () => {
  const { context } = setup();

  async function SayHi(ctx: MockContext) {
    await ctx.sendText('hi');
  }
  function First(_: MockContext, { next }: Props) {
    return next;
  }
  function Second(_: MockContext, { next }: Props) {
    return next;
  }

  const Chain = chain([First, Second]);

  await run(withProps(Chain, { next: SayHi }))(context);

  expect(context.sendText).toBeCalledWith('hi');
});
