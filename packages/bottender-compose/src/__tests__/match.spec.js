const _ = require('../_');
const match = require('../match');
const { sendText } = require('../');

it('should have correct name', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const value = 2;

  const Match = match(value, [[1, Haha], [2, Wow], [3, Cool]]);

  expect(Match.name).toEqual(
    'Match(SendText(Haha), SendText(Wow), SendText(Cool))'
  );
});

it('should create action that will call underlying matching action', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const value = 2;

  const Match = match(value, [[1, Haha], [2, Wow], [3, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Match(context);

  expect(Action).toEqual(Wow);
});

it('should support context value function', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const value = context => context.state.x;

  const Match = match(value, [[1, Haha], [2, Wow], [3, Cool]]);

  const context = {
    state: { x: 2 },
    sendText: jest.fn(),
  };

  const Action = await Match(context);

  expect(Action).toEqual(Wow);
});

it('should support async value function', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const value = jest.fn().mockResolvedValue(2);

  const Match = match(value, [[1, Haha], [2, Wow], [3, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Match(context);

  expect(Action).toEqual(Wow);
});

it('should create action that will do nothing when no match', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');

  const value = 3;

  const Match = match(value, [[1, Haha], [2, Wow]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Match(context);

  expect(Action).toBeUndefined();
});

it('should create action that will call default action when no match', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const value = 3;

  const Match = match(value, [[1, Haha], [2, Wow], [_, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Match(context);

  expect(Action).toEqual(Cool);
});

xit('should pass extra args to underlying matched action', async () => {
  const Haha = jest.fn();
  const Wow = jest.fn();
  const Cool = jest.fn();

  const value = 2;

  const Match = match(value, [[1, Haha], [2, Wow], [3, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  await Match(context, extraArg);

  expect(Wow).toBeCalledWith(context, extraArg);
});

xit('should pass extra args to underlying default action', async () => {
  const Haha = jest.fn();
  const Wow = jest.fn();
  const Cool = jest.fn();

  const value = 3;

  const Match = match(value, [[1, Haha], [2, Wow], [_, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  await Match(context, extraArg);

  expect(Cool).toBeCalledWith(context, extraArg);
});

it('should pass extra args to value function', async () => {
  const Haha = jest.fn();
  const Wow = jest.fn();
  const Cool = jest.fn();

  const value = jest.fn(() => 3);

  const Match = match(value, [[1, Haha], [2, Wow], [_, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  await Match(context, extraArg);

  expect(value).toBeCalledWith(context, extraArg);
});

it('should create action that will run in curried match', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const value = 3;

  const matchValue = match(value);
  const Match = matchValue([[1, Haha], [2, Wow], [_, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Match(context);

  expect(Action).toEqual(Cool);
});
