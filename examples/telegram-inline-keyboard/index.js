const { router, telegram, text } = require('bottender/router');

function generateInlineKeyboard(table) {
  return {
    inlineKeyboard: table.map(row => {
      return row.map(cell => {
        return {
          text: cell,
          callbackData: cell,
        };
      });
    }),
  };
}

const mainMenu = {
  text: 'This is main menu, please click an option.',
  replyMarkup: generateInlineKeyboard([
    ['A', 'B'],
    ['C', 'D'],
  ]),
};

const submenuA = {
  text: 'This is submenu A.',
  replyMarkup: generateInlineKeyboard([
    ['A1', 'A2'],
    ['A3', 'A4'],
    ['< back to main menu'],
  ]),
};

const submenuB = {
  text: 'This is submenu B.',
  replyMarkup: generateInlineKeyboard([
    ['B1', 'B2'],
    ['B3', 'B4'],
    ['< back to main menu'],
  ]),
};

const submenuC = {
  text: 'This is submenu C.',
  replyMarkup: generateInlineKeyboard([
    ['C1', 'C2'],
    ['C3', 'C4'],
    ['< back to main menu'],
  ]),
};

const submenuD = {
  text: 'This is submenu D.',
  replyMarkup: generateInlineKeyboard([
    ['D1', 'D2'],
    ['D3', 'D4'],
    ['< back to main menu'],
  ]),
};

const menuMapping = {
  '< back to main menu': mainMenu,
  A: submenuA,
  B: submenuB,
  C: submenuC,
  D: submenuD,
};

async function DefaultAction(context) {
  await context.sendText('Please type "show keyboard" to show the keyboard.');
}

async function ShowKeyboard(context) {
  await context.sendText(mainMenu.text, { replyMarkup: mainMenu.replyMarkup });
}

async function AnswerKeyboard(context) {
  const callbackQuery = context.event.callbackQuery;
  const messageId = callbackQuery.message.messageId;
  const data = callbackQuery.data;
  const menu = menuMapping[data];
  if (menu) {
    context.editMessageText(messageId, menu.text, { replyMarkup: menu.menu });
  } else {
    context.editMessageText(messageId, `Your final choice is ${data}.`);
  }
}

module.exports = async function App(context) {
  return router([
    text('show keyboard', ShowKeyboard),
    telegram.callbackQuery(AnswerKeyboard),
    telegram.any(DefaultAction),
  ]);
};
