const setDisplayName = require('../setDisplayName');
const { sendText } = require('../');

it('should create named action', async () => {
  const cool = sendText('cool');

  const action = setDisplayName('sayCool', cool);

  expect(action).toHaveProperty('name', 'sayCool');
  expect(action).toHaveProperty('displayName', 'sayCool');
});

it('should create named action using curry', async () => {
  const cool = sendText('cool');

  const action = setDisplayName('sayCool')(cool);

  expect(action).toHaveProperty('displayName', 'sayCool');
});
