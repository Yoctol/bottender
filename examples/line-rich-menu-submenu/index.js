module.exports = async function App(context) {
  const richMenu = await context.getLinkedRichMenu();
  if (!richMenu) {
    await context.linkRichMenu(process.env.RICH_MENU_ID);
  }

  if (context.event.text === 'A') {
    await context.linkRichMenu(process.env.SUB_RICH_MENU_A_ID);
  } else if (context.event.text === 'B') {
    await context.linkRichMenu(process.env.SUB_RICH_MENU_B_ID);
  } else if (context.event.text === 'Back') {
    await context.linkRichMenu(process.env.RICH_MENU_ID);
  } else {
    await context.sendText(`User have clicked ${context.event.text}`);
  }
};
