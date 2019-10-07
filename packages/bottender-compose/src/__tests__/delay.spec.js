const _delay = require('delay');

const delay = require('../delay');
const series = require('../series');
const { sendText } = require('../');

jest.mock('delay');

it('should have correct name', async () => {
  const action = delay(1000);

  expect(action.name).toEqual('Delay(1000)');
});

it('should create action that will run delay with series', async () => {
  expect.assertions(2);

  const Haha = sendText('Haha');

  const Series = series([delay(1000), Haha]);

  const context = {
    sendText: jest.fn(),
  };

  await Series(context);

  expect(_delay).toBeCalledWith(1000);
  expect(context.sendText).toBeCalledWith('Haha');
});
