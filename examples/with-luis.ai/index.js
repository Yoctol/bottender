const LUISClient = require('luis-sdk');
const { ConsoleBot } = require('bottender');

const luis = new LUISClient({
  appId: process.env.APP_ID,
  appKey: process.env.APP_KEY,
  verbose: true,
});

const bot = new ConsoleBot();

bot.onEvent(async context => {
  if (context.event.isText) {
    try {
      const response = await new Promise((resolve, reject) => {
        LUISClient.predict(context.event.text, {
          onSuccess: resolve,
          onFailure: reject,
        });
      });

      await context.sendText(`Top Intent: ${response.topScoringIntent.intent}`);
      await context.sendText(
        `Entities:\n${response.entities.map(item => item.entity).join(', ')}`
      );
    } catch (err) {
      console.error(err);
    }
  }
});

bot.createRuntime();
