const dialogflow = require('dialogflow');

const PROJECT_ID = process.env.GOOGLE_APPLICATION_PROJECT_ID;

const sessionClient = new dialogflow.SessionsClient();

module.exports = async function App(context) {
  if (context.event.isText) {
    const sessionPath = sessionClient.sessionPath(
      PROJECT_ID,
      context.session.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: context.event.text,
          languageCode: 'en',
        },
      },
      queryParams: {
        timeZone: '',
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const { intent } = responses[0].queryResult;

    if (intent.displayName === 'greeting') {
      await context.sendText('Hello!');
    }
  }
};
