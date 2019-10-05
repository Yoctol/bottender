import chain from '../chain';

function setup() {
  const context = {
    sendText: jest.fn(),
  };

  return {
    context,
  };
}

it('should resolve undefined if First action return undefined', async () => {
  const { context } = setup();

  function First(ctx, { next }) {} // eslint-disable-line @typescript-eslint/no-empty-function
  function Second(ctx, { next }) {} // eslint-disable-line @typescript-eslint/no-empty-function

  const Chain = chain([First, Second]);

  const Action = await Chain(context);
  const ActionReturnedByFirst = await Action(context);

  expect(ActionReturnedByFirst).toBeUndefined();
});

it('should resolve SayHi if first action return SayHi', async () => {
  const { context } = setup();

  async function SayHi(ctx) {
    await ctx.sendText('hi');
  }
  function First(ctx, { next }) {
    return SayHi;
  }
  function Second(ctx, { next }) {} // eslint-disable-line @typescript-eslint/no-empty-function

  const Chain = chain([First, Second]);

  const Action = await Chain(context);
  const ActionReturnedByFirst = await Action(context);

  expect(ActionReturnedByFirst).toEqual(SayHi);
});

it('should resolve SayHi if second action return SayHi', async () => {
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

  const Action = await Chain(context);
  const ActionReturnedByFirst = await Action(context);
  const ActionReturnedBySecond = await ActionReturnedByFirst(context);

  expect(ActionReturnedBySecond).toEqual(SayHi);
});

it('should resolve SayHi if second action return next', async () => {
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

  const Action = await Chain(context, { next: SayHi });
  const ActionReturnedByFirst = await Action(context);
  const ActionReturnedBySecond = await ActionReturnedByFirst(context);

  expect(ActionReturnedBySecond).toEqual(SayHi);
});
