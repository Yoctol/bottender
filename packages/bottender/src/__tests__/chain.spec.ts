import chain from '../chain';
import withProps from '../withProps';
import { run } from '../bot/Bot';

function setup() {
  const context = {
    sendText: jest.fn(),
  };

  return {
    context,
  };
}

it('should not call sendText if First action return undefined', async () => {
  const { context } = setup();

  function First(ctx, { next }) {} // eslint-disable-line @typescript-eslint/no-empty-function
  function Second(ctx, { next }) {} // eslint-disable-line @typescript-eslint/no-empty-function

  const Chain = chain([First, Second]);

  await run(Chain)(context);

  expect(context.sendText).not.toBeCalled();
});

it('should call sendText with hi if first action return SayHi', async () => {
  const { context } = setup();

  async function SayHi(ctx) {
    await ctx.sendText('hi');
  }
  function First(ctx, { next }) {
    return SayHi;
  }
  function Second(ctx, { next }) {} // eslint-disable-line @typescript-eslint/no-empty-function

  const Chain = chain([First, Second]);

  await run(Chain)(context);

  expect(context.sendText).toBeCalledWith('hi');
});

it('should call sendText with hi if second action return SayHi', async () => {
  const { context } = setup();

  async function SayHi(ctx) {
    await ctx.sendText('hi');
  }
  function First(ctx, { next }) {
    return next;
  }
  function Second(ctx, { next }) {
    return SayHi;
  }

  const Chain = chain([First, Second]);

  await run(Chain)(context);

  expect(context.sendText).toBeCalledWith('hi');
});

it('should call sendText with hi if second action return next', async () => {
  const { context } = setup();

  async function SayHi(ctx) {
    await ctx.sendText('hi');
  }
  function First(ctx, { next }) {
    return next;
  }
  function Second(ctx, { next }) {
    return next;
  }

  const Chain = chain([First, Second]);

  await run(withProps(Chain, { next: SayHi }))(context);

  expect(context.sendText).toBeCalledWith('hi');
});
