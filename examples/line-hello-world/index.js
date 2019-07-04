const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new LineBot({
  channelSecret: 'd941279e4ebe2b25745839fe91ab7240',
  accessToken: 'vklqL09ScF2CZyoZTjFuP7DU45nOFlu3JDuHZ69/rAbYQakN9mMDB6qIKi86tUnsUTbZmNW+wwFMQXy56tDQiLWMvddHRf7BD5IMyNOrD4DYCxljZZlLzsWMZX5KcJC++2f1UPoDmBXCdH2AD5+AQgdB04t89/1O/w1cDnyilFU=',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
