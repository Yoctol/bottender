const { ContextSimulator } = require('toolbot-core-experiment/test-utils');

const handler = require('../handler');

const simulator = new ContextSimulator({
  platform: 'messenger',
});

it('should work', async () => {
  const context = simulator.createTextContext('Awesome');

  await handler(context);

  expect(context.sendText).toBeCalledWith('You say: Awesome');
});
