module.exports = async function App(context) {
  if (
    context.event.rawEvent.subtype === 'message_changed' ||
    context.event.rawEvent.subtype === 'message_deleted'
  ) {
    return;
  }

  const response = await context.chat.postMessage({
    text: 'This is a normal message by chat.postMessage.',
  });

  const { ts, channel } = response;

  await context.chat.update({
    text: 'Message updated.',
    ts,
    channel,
  });

  await context.chat.delete({
    ts,
  });
};
