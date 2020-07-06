const { router, route, slack } = require('bottender/router');

let counter = 1;

function getBlocks(text, buttonValue) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: buttonValue,
            emoji: true,
          },
          value: buttonValue,
        },
      ],
    },
  ];
}

function getModalView() {
  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: `Modal ${counter}`,
    },
    clearOnClose: true,
    notifyOnClose: true,
    blocks: getBlocks(`in modal ${counter}`, 'push modal'),
  };
}

async function ShowModal(context) {
  const { triggerId } = context.event.rawEvent;
  await context.views.open({
    triggerId,
    view: getModalView(),
  });
}

async function PushModal(context) {
  const { triggerId } = context.event.rawEvent;
  counter += 1;
  await context.views.push({
    triggerId,
    view: getModalView(),
  });
}

async function OnBlockActions(context) {
  if (context.event.action.value === 'show modal') {
    return ShowModal;
  }
  if (context.event.action.value === 'push modal') {
    return PushModal;
  }
}

async function OnViewClosed(context) {
  console.log(context.event.rawEvent);
}

async function Default(context) {
  await context.chat.postMessage({
    blocks: getBlocks('message', 'show modal'),
  });
}

module.exports = async function App(context) {
  return router([
    slack.event('block_actions', OnBlockActions),
    slack.event('view_closed', OnViewClosed),
    route('*', Default),
  ]);
};
