---
id: version-0.15.17-testing
title: Testing
original_id: testing
---

Bottender is built with testing in mind. Your tests could be run with any JavaScript test runners, such as [Jest](https://facebook.github.io/jest/), [Mocha](https://mochajs.org/), [AVA](https://github.com/avajs/ava), and so on.

## Unit Test

Unit tests are tests that focus on the isolated portion of your code, and you can find bugs efficiently when the complexity of code grows as time goes on.

When creating bots using Bottender, the primary logic of bot is inside your event handler.

```js
// bot.js
const handler = require('./handler');

bot.onEvent(handler);
```

```js
// handler.js
module.exports = async context => {
  if (context.event.isText) {
    await context.sendText('You say: ' + context.event.text);
  } else if (context.event.isMessage) {
    await context.sendText('Sorry, I only read text messages.');
  }
};
```

Then, we can start to test it with a mock context.

### Context Mocking

Handlers are just async functions that accept a single context argument. Now, we can use fake ones in the unit tests.

Here is an example test written with [Jest](https://facebook.github.io/jest/):

```js
// __tests__/handler.spec.js
const handler = require('../handler');

it('should work', async () => {
  const context = {
    event: {
      isMessage: true,
      isText: true,
      text: 'Awesome',
      message: {
        text: 'Awesome',
      },
    },
    sendText: jest.fn(),
  };

  await handler(context);

  expect(context.sendText).toBeCalledWith('You say: Awesome');
});
```

After calling the async handler, we can write some assertions to make sure that everything works as expected.

> Note: We use `jest.fn` in the example but feel free to use [Sinon](http://sinonjs.org/) or any other mocking libraries.

### Test Utils

We provide some test utils in the package for convenience purpose. It's worth mentioning `ContextSimulator` here, and you can import it from `bottender/test-utils`:

```js
const { ContextSimulator } = require('bottender/test-utils');
```

After simulator instantiated with a specific platform, you can create a mocking context with several helper methods:

```js
const simulator = new ContextSimulator({
  platform: 'messenger',
});

const context = simulator.createTextContext('Awesome');
```

And we can use created context same way as the above example:

```js
// __tests__/handler.spec.js
const { ContextSimulator } = require('bottender/test-utils');

const handler = require('../handler');

const simulator = new ContextSimulator({
  platform: 'messenger',
});

it('should work', async () => {
  const context = simulator.createTextContext('Awesome');

  await handler(context);

  expect(context.sendText).toBeCalledWith('You say: Awesome');
});
```

## E2E Test

Coming Soon. We are working on a brand-new end-to-end testing library for bots. We will release it in the near future.
