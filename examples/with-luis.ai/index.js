const LUISClient = require('luis-sdk');

const luis = new LUISClient({
  appId: process.env.LUIS_APP_ID,
  appKey: process.env.LUIS_APP_KEY,
  verbose: true,
});

module.exports = async function App(context) {
  if (context.event.isText) {
    try {
      const response = await new Promise((resolve, reject) => {
        luis.predict(context.event.text, {
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
};
