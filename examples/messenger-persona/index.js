module.exports = async function App(context) {
  if (context.event.text === '/help') {
    context.usePersona(process.env.PERSONA_1);
    await context.sendText('Hello');
    await context.sendText('World');
  } else {
    await context.sendText('Hello', {
      persona_id: process.env.PERSONA_2,
    });
    await context.sendText('World', {
      persona_id: process.env.PERSONA_2,
    });
  }
};
