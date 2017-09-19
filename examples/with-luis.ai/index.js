require('babel-register');
const LUISClient = require('luis-sdk');

const { ConsoleBot } = require('../../src');

const luis = new LUISClient({
  appId: process.env.APP_ID,
  appKey: process.env.APP_KEY,
  verbose: true,
});

const bot = new ConsoleBot();

bot.onEvent(async context => {
  if (context.event.isTextMessage) {
    try {
      const response = await new Promise((resolve, reject) => {
        luis.predict(context.event.message.text, {
          onSuccess: resolve,
          onFailure: reject,
        });
      });

      context.sendText(`Top Intent: ${response.topScoringIntent.intent}`);
      context.sendText(
        `Entities:\n${response.entities.map(item => item.entity).join(', ')}`
      );
    } catch (err) {
      console.error(err);
    }
  }
});

bot.createRuntime();
