const condition = require('../condition');
const { sendText } = require('../');

it('should have correct name', async () => {
  const condA = jest.fn(() => Promise.resolve(false));
  const condB = jest.fn(() => Promise.resolve(true));

  const ActionA = sendText(
    "You've seen them once, you've seen them all. - Singin' in the Rain"
  );
  const ActionB = sendText('You Shall Not Pass - The Lord of the Rings');

  const Condition = condition([[condA, ActionA], [condB, ActionB]]);

  expect(Condition.name).toEqual(
    "Condition(SendText(You've seen the...), SendText(You Shall Not P...))"
  );
});

it('should run second function in the element which first function return true', async () => {
  const condA = jest.fn(() => Promise.resolve(false));
  const condB = jest.fn(() => Promise.resolve(true));

  const ActionA = sendText(
    "You've seen them once, you've seen them all. - Singin' in the Rain"
  );
  const ActionB = sendText('You Shall Not Pass - The Lord of the Rings');

  const conds = condition([[condA, ActionA], [condB, ActionB]]);

  const context = {
    sendText: jest.fn(),
  };

  const Action = await conds(context);

  expect(Action).toEqual(ActionB);
});

xit('should pass extra args to underlying action', async () => {
  const condA = jest.fn(() => true);
  const condB = jest.fn(() => false);

  const actionA = jest.fn();
  const actionB = sendText('You Shall Not Pass - The Lord of the Rings');

  const conds = condition([[condA, actionA], [condB, actionB]]);

  const context = {
    sendText: jest.fn(),
  };

  const extraArg = {};

  conds(context, extraArg);

  await flushPromises();

  expect(condA).toHaveBeenCalled();
  expect(actionA).toBeCalledWith(context, extraArg);
});
