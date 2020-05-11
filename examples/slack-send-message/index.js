function afterSeconds(n) {
  const date = new Date();
  const unixTimestamp = Math.floor(date / 1000);
  return unixTimestamp + n;
}

module.exports = async function App(context) {
  if (context.event.rawEvent.subtype === 'me_message') {
    return;
  }

  await context.chat.scheduleMessage({
    text: 'This is a scheduled message.',
    postAt: afterSeconds(20),
  });

  await context.sendText('This is a normal message by sendText.');

  await context.chat.postMessage({
    text: 'This is a normal message by chat.postMessage.',
  });

  await context.chat.postEphemeral({
    text: 'This is a ephemeral message.',
  });

  await context.chat.meMessage({
    text: 'This is a me message.',
  });
};
