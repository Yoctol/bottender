const { SlackBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  verificationToken: '__FILL_YOUR_VERIFICATION_TOKEN_HERE__',
});

bot.onEvent(async context => {
  if (context.event.isText && context.event.text === 'heyo') {
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
    // check if an event is from interacitve message
  } else if (context.event.isInteractiveMessage) {
    // check the action from button or menu
    console.log(context.event.action);
    // check the callback_id
    await context.sendText(
      `I received your '${context.event.callbackId}' action`
    );
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
