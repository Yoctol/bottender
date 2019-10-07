jest.mock('random-item');

const randomItem = require('random-item');

const random = require('../random');
const { sendText } = require('../');

it('should have correct name', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');
  const actions = [Haha, Wow, Cool];

  const Random = random(actions);

  expect(Random.name).toEqual(
    'Random(SendText(Haha), SendText(Wow), SendText(Cool))'
  );
});

it('should create action that will call sendText', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');
  const actions = [Haha, Wow, Cool];

  randomItem.mockReturnValueOnce(Cool);
  const Random = random([Haha, Wow, Cool]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Random(context);

  expect(randomItem).toBeCalledWith(actions);
  expect(Action).toEqual(Cool);
});

xit('should pass extra args to underlying action', () => {
  const Haha = jest.fn();
  const Wow = jest.fn();

  const actions = [Haha, Wow];

  randomItem.mockReturnValueOnce(Haha);
  const action = random(actions);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  action(context, extraArg);

  expect(randomItem).toBeCalledWith(actions);
  expect(Haha).toBeCalledWith(context, extraArg);
});
