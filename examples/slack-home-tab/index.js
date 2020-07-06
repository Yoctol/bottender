const { router, route, slack } = require('bottender/router');

let counter = 0;

function getBlocks(text) {
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
            text: 'add count',
            emoji: true,
          },
          value: 'add count',
        },
      ],
    },
  ];
}

async function Home(context) {
  await context.views.publish({
    userId: context.session.user.id,
    view: {
      type: 'home',
      blocks: getBlocks(`click count: ${counter}`),
    },
  });
}

async function OnBlockActions(context) {
  if (context.event.action.value === 'add count') {
    counter += 1;
    return Home;
  }
}

async function Default(context) {
  await context.sendText('Hello World');
}

module.exports = async function App(context) {
  return router([
    slack.event('app_home_opened', Home),
    slack.event('block_actions', OnBlockActions),
    route('*', Default),
  ]);
};
