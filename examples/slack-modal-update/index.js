const { router, route, slack } = require('bottender/router');

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

async function ShowModal(context) {
  const { triggerId } = context.event.rawEvent;
  await context.views.open({
    triggerId,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Modal Title',
      },
      blocks: getBlocks('in modal', 'update modal'),
    },
  });
}

async function UpdateModal(context) {
  const viewId = context.event.rawEvent.view.id;
  await context.views.update({
    viewId,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Modal Title',
      },
      blocks: getBlocks('modal updated', 'update modal again'),
    },
  });
}

async function OnBlockActions(context) {
  if (context.event.action.value === 'show modal') {
    return ShowModal;
  }
  if (context.event.action.value === 'update modal') {
    return UpdateModal;
  }
}

async function Default(context) {
  await context.chat.postMessage({
    blocks: getBlocks('message', 'show modal'),
  });
}

module.exports = async function App(context) {
  return router([
    slack.event('block_actions', OnBlockActions),
    route('*', Default),
  ]);
};
