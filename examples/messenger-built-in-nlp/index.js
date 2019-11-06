const { withProps } = require('bottender');

async function NoDatetime(context) {
  await context.sendText('Not a date or time');
}

async function ReplyDatetime(context, { datetime }) {
  if (datetime.type === 'value') {
    await context.sendText(`Did you mean ${dt.value} ? :)`);
  } else if (datetime.type === 'interval') {
    const { from, to } = datetime;
    await context.sendText(
      `Did you mean from ${from.value} to ${to.value} ? :)`
    );
  }
}

module.exports = async function App(context) {
  console.log(context.event.message.nlp.entities);
  const { datetime } = context.event.message.nlp.entities;

  if (!datetime) {
    return NoDatetime;
  }

  return withProps(ReplyDatetime, { datetime: datetime[0] });
};
