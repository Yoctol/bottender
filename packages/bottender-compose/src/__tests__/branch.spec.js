const branch = require('../branch');
const { sendText } = require('../');

it('should have correct name', async () => {
  const cond = jest.fn(() => Promise.resolve(true));

  const OnTrue = sendText(
    "Sometimes it's easier livin' the lie. - Catch Me If You Can"
  );
  const OnFalse = sendText(
    'You are the butter to my bread, and the breath to my life - Julie & Julia'
  );

  const Branch = branch(cond, OnTrue, OnFalse);

  expect(Branch.name).toEqual(
    "Branch(SendText(Sometimes it's ...), SendText(You are the but...))"
  );
});

it('should call second parameter function if first parameter return true, or call third parameter', async () => {
  const cond = jest.fn(() => Promise.resolve(true));

  const OnTrue = sendText(
    "Sometimes it's easier livin' the lie. - Catch Me If You Can"
  );
  const OnFalse = sendText(
    'You are the butter to my bread, and the breath to my life - Julie & Julia'
  );

  const Branch = branch(cond, OnTrue, OnFalse);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Branch(context);

  expect(Action).toEqual(OnTrue);
});

it('should call third parameter function if first parameter return false, or call second parameter', async () => {
  const cond = jest.fn(() => Promise.resolve(false));

  const OnTrue = sendText(
    "Sometimes it's easier livin' the lie. - Catch Me If You Can"
  );
  const OnFalse = sendText(
    'You are the butter to my bread, and the breath to my life - Julie & Julia'
  );

  const Branch = branch(cond, OnTrue, OnFalse);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Branch(context);

  expect(Action).toEqual(OnFalse);
});

it('should do nothing if third parameter is not provided', async () => {
  const cond = jest.fn(() => Promise.resolve(false));

  const OnTrue = sendText(
    "Sometimes it's easier livin' the lie. - Catch Me If You Can"
  );

  const Branch = branch(cond, OnTrue);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Branch(context);

  expect(Action.name).toEqual('Noop');
});

it('should call second parameter function if first parameter return true, or call third parameter in curried branch', async () => {
  const cond = jest.fn(() => Promise.resolve(true));

  const OnTrue = sendText(
    "Sometimes it's easier livin' the lie. - Catch Me If You Can"
  );
  const OnFalse = sendText(
    'You are the butter to my bread, and the breath to my life - Julie & Julia'
  );

  const trueCondBranch = branch(cond);
  const Branch = trueCondBranch(OnTrue, OnFalse);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Branch(context);

  expect(Action).toEqual(OnTrue);
});

describe('should pass extra args to underlying action', () => {
  xit('on true', async () => {
    const cond = jest.fn(() => true);

    const OnTrue = jest.fn();

    const Branch = branch(cond, OnTrue);

    const context = {
      sendText: jest.fn(),
    };

    const extraArg = {};

    Branch(context, extraArg);

    await flushPromises();

    expect(cond).toHaveBeenCalled();
    expect(OnTrue).toBeCalledWith(context, extraArg);
  });

  xit('on false', async () => {
    const cond = jest.fn(() => false);

    const OnTrue = jest.fn();
    const OnFalse = jest.fn();

    const Branch = branch(cond, OnTrue, OnFalse);

    const context = {
      sendText: jest.fn(),
    };

    const extraArg = {};

    Branch(context, extraArg);

    await flushPromises();

    expect(cond).toHaveBeenCalled();
    expect(OnFalse).toBeCalledWith(context, extraArg);
  });
});
