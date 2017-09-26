require('babel-register');

const { MessengerBot, withTyping } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken:
    'EAADEbNfFP2MBAAa47Cnol4J7CKq7cQSbbVf3J5gbz6aYArvxm6LunM5ZBF3YHMl8sYY04GIapK4bxXObZChqQBTbOGFX7TQQNELAeZCAn37XfVhpJjd2yVnxOLrlhHRJsuJ9wZCYPMFIWTwOkZAbstpqAGES4EANtZAcR7sJD5bOxGgrnfaybK',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.extendContext(withTyping({ delay: 1000 }));

bot.onEvent(async context => {
  await context.sendText('Hello World');
  await context.sendText('Hello World');
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
