const axios = require('axios');

module.exports = async function App(context) {
  if (context.event.isText) {
    const { data } = await axios.post(`http://localhost:5005/model/parse`, {
      text: context.event.text,
    });

    const { intent } = data;

    // You can define your own score threshold here.
    if (intent.confidence > 0.7) {
      if (intent.name === 'greeting') {
        await context.sendText('Hello!');
      }
    }
  }
};
