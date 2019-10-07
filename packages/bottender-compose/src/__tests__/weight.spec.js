const weight = require('../weight');
const { sendText } = require('../');

const mathRandom = Math.random;

beforeEach(() => {
  Math.random = jest.fn();
});

afterEach(() => {
  Math.random = mathRandom;
});

it('should have correct name', () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  const Weight = weight([[0.5, Haha], [0.2, Wow], [0.3, Cool]]);

  expect(Weight.name).toEqual(
    'Weight(SendText(Haha)(0.5/1), SendText(Wow)(0.2/1), SendText(Cool)(0.3/1))'
  );
});

it('should call first action when random is less than first weight', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  Math.random.mockReturnValueOnce(0.4);
  const Weight = weight([[0.5, Haha], [0.2, Wow], [0.3, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Weight(context);

  expect(Action).toEqual(Haha);
});

it('should call 2nd action when random result is between first and second weight', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');

  Math.random.mockReturnValueOnce(0.6);
  const Weight = weight([[0.5, Haha], [0.2, Wow], [0.3, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Weight(context);

  expect(Action).toEqual(Wow);
});

it('should call last action', async () => {
  const Haha = sendText('Haha');
  const Wow = sendText('Wow');
  const Cool = sendText('Cool');
  const conds = [[0.5, Haha], [0.2, Wow], [0.3, Cool]];

  Math.random.mockReturnValueOnce(0.99);
  const Weight = weight(conds);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await Weight(context);

  expect(Action).toEqual(Cool);
});

xit('should pass extra args to underlying action', async () => {
  const Haha = jest.fn();
  const Wow = jest.fn();
  const Cool = jest.fn();

  Math.random.mockReturnValueOnce(0.4);

  const Weight = weight([[0.5, Haha], [0.2, Wow], [0.3, Cool]]);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  await Weight(context, extraArg);

  expect(Haha).toBeCalledWith(context, extraArg);
});
