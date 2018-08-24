const { ConsoleBot, middleware } = require('bottender');
const { handler: rxHandler } = require('rx-handler');
const { from } = require('rxjs');
const { debounceTime } = require('rxjs/operators');

const bot = new ConsoleBot();

const handler = rxHandler();
const handlerOberverable = from(handler);

bot.onEvent(middleware([handler]));

bot.createRuntime();

const handlerObserver = handlerOberverable.pipe(debounceTime(1000));

handlerObserver.subscribe(async context => {
  console.log(''); // log the message from bot to next line.
  await context.sendText(`Your final message is "${context.event.text}"`);
});
