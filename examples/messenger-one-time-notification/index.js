const { getClient } = require('bottender');
const { router, text, messenger } = require('bottender/router');

// always out of stock for the demo
const inStock = false;
const client = getClient('messenger');

async function SendOneTimeNotif(context) {
  await context.sendText(
    "Unfortunately, this item isn't in stock at the moment, but we can let you know when it is!"
  );
  await context.sendOneTimeNotifReqTemplate({
    title: 'When our Signature Black Long Sleeve T-shirt is back in stock!',
    payload: 'NOTIFY_ME_WHEN_IN_STOCK',
  });
}

async function HandleQuestion(context) {
  if (!inStock) {
    return SendOneTimeNotif;
  }

  await context.sendText('Fortunately, This item is in stock!');
}

async function HandleOptin(context) {
  const { optin } = context.event;

  // optin.type -> should be "one_time_notif_req"
  // optin.payload -> the payload you sent in `context.sendOneTimeNotifReqTemplate` request
  if (
    optin.type === 'one_time_notif_req' &&
    optin.payload === 'NOTIFY_ME_WHEN_IN_STOCK'
  ) {
    // Notify the user after 1 minute for the demo
    setTimeout(() => {
      client.sendText(
        { oneTimeNotifToken: optin.oneTimeNotifToken },
        'This item is in stock now!'
      );
    }, 1000 * 60);
  }
}

module.exports = async function App() {
  return router([
    text('Is this item in stock?', HandleQuestion),
    messenger.optin(HandleOptin),
  ]);
};
