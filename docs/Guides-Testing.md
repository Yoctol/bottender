# Testing

## Unit Test

The primary logic of bot is inside your event handler. 

```js
bot.onEvent(handler);
```

You can test it easily with a simple call to handler using async function:

```js
const handler = require('../handler');

it('should work', async () => {
  const context = {
    session: {
      user: {
        id: '__ID__',
      },
    },
    event: {
      isMessage: true,
      isTextMessage: true,
      message: {
        text: 'Test',
      },
    },
    sendText: jest.fn(),
  };
  
  await handler(context);
  
  expect(context.sendText).toBeCalledWith('Awesome');
});
```

## E2E Test

Comming Soon. We are planning to release an e2e bot testing library in the near future.
