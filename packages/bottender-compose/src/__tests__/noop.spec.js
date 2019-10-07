const noop = require('../noop');

it('should have correct name', async () => {
  const action = noop();

  expect(action.name).toEqual('Noop');
});
