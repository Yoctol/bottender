async function HandleText(context) {
  // send a message with buttons and menu
  await context.postMessage({
    attachments: [
      {
        text: 'Choose a game to play',
        fallback: 'You are unable to choose a game',
        callback_id: 'wopr_game',
        color: '#3AA3E3',
        attachment_type: 'default',
        actions: [
          {
            name: 'game',
            text: 'Chess',
            type: 'button',
            value: 'chess',
          },
          {
            name: 'game',
            text: "Falken's Maze",
            type: 'button',
            value: 'maze',
          },
          {
            name: 'game',
            text: 'Thermonuclear War',
            style: 'danger',
            type: 'button',
            value: 'war',
            confirm: {
              title: 'Are you sure?',
              text: "Wouldn't you prefer a good game of chess?",
              ok_text: 'Yes',
              dismiss_text: 'No',
            },
          },
        ],
      },
      {
        text: 'Choose a game to play',
        fallback:
          "If you could read this message, you'd be choosing something fun to do right now.",
        color: '#3AA3E3',
        attachment_type: 'default',
        callback_id: 'game_selection',
        actions: [
          {
            name: 'games_list',
            text: 'Pick a game...',
            type: 'select',
            options: [
              {
                text: 'Hearts',
                value: 'hearts',
              },
              {
                text: 'Bridge',
                value: 'bridge',
              },
              {
                text: 'Checkers',
                value: 'checkers',
              },
              {
                text: 'Chess',
                value: 'chess',
              },
              {
                text: 'Poker',
                value: 'poker',
              },
              {
                text: "Falken's Maze",
                value: 'maze',
              },
              {
                text: 'Global Thermonuclear War',
                value: 'war',
              },
            ],
          },
        ],
      },
    ],
  });
}

async function HandleInteractiveMessage(context) {
  // check the action from button or menu
  console.log(context.event.action);
  // check the callbackId
  await context.sendText(
    `I received your '${context.event.callbackId}' action`
  );
}

module.exports = async function App(context) {
  if (context.event.isText) {
    return HandleText;
  }

  // check if an event is from interacitve message
  if (context.event.isInteractiveMessage) {
    return HandleInteractiveMessage;
  }
};
