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
        text: 'Form',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      notifyOnClose: true,
      blocks: [
        {
          blockId: 'date',
          type: 'input',
          element: {
            actionId: 'element',
            type: 'datepicker',
            initialDate: '2020-07-01',
            placeholder: {
              type: 'plain_text',
              text: 'Date',
              emoji: true,
            },
          },
          label: {
            type: 'plain_text',
            text: 'Date',
            emoji: true,
          },
        },
        {
          blockId: 'time',
          type: 'input',
          element: {
            actionId: 'element',
            type: 'plain_text_input',
            initialValue: '10:00',
          },
          label: {
            type: 'plain_text',
            text: 'Time',
            emoji: true,
          },
        },
        {
          blockId: 'checked',
          type: 'input',
          element: {
            actionId: 'element',
            type: 'checkboxes',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: '1',
                  emoji: true,
                },
                value: '1',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '2',
                  emoji: true,
                },
                value: '2',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '3',
                  emoji: true,
                },
                value: '3',
              },
            ],
          },
          label: {
            type: 'plain_text',
            text: 'Check',
            emoji: true,
          },
        },
        {
          blockId: 'radio',
          type: 'input',
          element: {
            actionId: 'element',
            type: 'radio_buttons',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: '1',
                  emoji: true,
                },
                value: '1',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '2',
                  emoji: true,
                },
                value: '2',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '3',
                  emoji: true,
                },
                value: '3',
              },
            ],
          },
          label: {
            type: 'plain_text',
            text: 'Radio',
            emoji: true,
          },
        },
      ],
    },
  });
}

function getFormValues(view) {
  const v = view.state.values;
  return {
    date: v.date && v.date.element.selectedDate,
    time: v.time && v.time.element.value,
    checked: v.checked && v.checked.element.selectedOptions.map(o => o.value),
    radio: v.radio && v.radio.element.selectedOption.value,
  };
}

async function OnBlockActions(context) {
  if (context.event.action.value === 'show modal') {
    return ShowModal;
  }
}

async function OnViewSubmission(context) {
  const values = getFormValues(context.event.rawEvent.view);
  await context.chat.postMessage({
    text: `You submited the form. The contents you provided as follow:
      date: ${values.date}
      time: ${values.time}
      checked: ${values.checked}
      radio: ${values.radio}
    `,
  });
}

async function OnFormClosed(context) {
  const values = getFormValues(context.event.rawEvent.view);
  await context.chat.postMessage({
    text: `You closed the form. The contents you provided as follow:
    date: ${values.date}
    time: ${values.time}
    checked: ${values.checked}
    radio: ${values.radio}
    `,
  });
}

async function Default(context) {
  await context.chat.postMessage({
    blocks: getBlocks('message', 'show modal'),
  });
}

module.exports = async function App(context) {
  return router([
    slack.event('block_actions', OnBlockActions),
    slack.event('view_submission', OnFormSubmitted),
    slack.event('view_closed', OnFormClosed),
    route('*', Default),
  ]);
};
