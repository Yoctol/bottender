const series = require('../series');
const { sendText } = require('../');

it('should have correct name', async () => {
  const haha = sendText('haha');
  const wow = sendText('wow');
  const cool = sendText('cool');
  const actions = [haha, wow, cool];

  const action = series(actions);

  expect(action.name).toEqual(
    'Series(SendText(haha), SendText(wow), SendText(cool))'
  );
});

it('should create action that will run in series', async () => {
  let resolveHaha;
  const haha = async context => {
    await sendText('haha')(context);
    await new Promise(resolve => {
      resolveHaha = resolve;
    });
  };

  let resolveWow;
  const wow = async context => {
    await sendText('wow')(context);
    await new Promise(resolve => {
      resolveWow = resolve;
    });
  };

  const cool = sendText('cool');

  const action = series([haha, wow, cool]);

  const context = {
    sendText: jest.fn(),
  };

  action(context);

  await flushPromises();

  expect(context.sendText.mock.calls).toContainEqual(['haha']);

  resolveHaha();

  await flushPromises();

  expect(context.sendText.mock.calls).toContainEqual(['wow']);

  resolveWow();

  await flushPromises();

  expect(context.sendText.mock.calls).toContainEqual(['cool']);
});

xit('should pass extra args to underlying action', async () => {
  const haha = jest.fn();
  const wow = jest.fn();

  const action = series([haha, wow]);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  await action(context, extraArg);

  expect(haha).toBeCalledWith(context, extraArg);
  expect(wow).toBeCalledWith(context, extraArg);
});
