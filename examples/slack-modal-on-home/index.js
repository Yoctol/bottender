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

let userName = 'home';

async function Home(context) {
  await context.views.publish({
    userId: context.session.user.id,
    view: {
      type: 'home',
      blocks: getBlocks(`Hello, *${userName}*.`, 'show modal'),
    },
  });
}

async function ShowModal(context) {
  const { triggerId } = context.event.rawEvent;
  await context.views.open({
    triggerId,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'What is your name?',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true,
      },
      blocks: [
        {
          blockId: 'name',
          type: 'input',
          element: {
            actionId: 'element',
            type: 'plain_text_input',
            placeholder: {
              type: 'plain_text',
              text: 'type your name here',
            },
          },
          label: {
            type: 'plain_text',
            text: 'Name',
            emoji: true,
          },
        },
      ],
    },
  });
}

async function OnBlockActions(context) {
  if (context.event.action.value === 'show modal') {
    return ShowModal;
  }
}

async function OnViewSubmission(context) {
  const v = context.event.rawEvent.view.state.values;
  userName = (v.name && v.name.element.value) || userName;
  return Home;
}

async function Default(context) {
  await context.sendText('Hello World');
}

module.exports = async function App(context) {
  return router([
    slack.event('app_home_opened', Home),
    slack.event('block_actions', OnBlockActions),
    slack.event('view_submission', OnViewSubmission),
    route('*', Default),
  ]);
};
