const { router, text, payload, messenger } = require('bottender/router');
const isEmpty = require('lodash/isEmpty');

const UserStore = require('./stores/UserStore');

const SERVER_ORIGIN = process.env.SERVER_ORIGIN;

/**
 * Account Link Button
 */
const signInButton = {
  type: 'account_link',
  url: `${SERVER_ORIGIN}/users/login`,
};

/**
 * Account Unlink Button
 */
const signOutButton = { type: 'account_unlink' };

async function HandleAccountLinkingLinked(context) {
  const userId = context.session.userId;

  const authCode = context.event.accountLinking.authorizationCode;

  const linkedUser = UserStore.replaceAuthToken(authCode, userId);

  await context.sendText(`Welcome back, ${linkedUser.username}!`);
  await context.sendButtonTemplate(
    'Now you’ll have full access to your order history and shopping list.',
    [signOutButton]
  );
}

async function HandleAccountLinkingUnlinked(context) {
  const userId = context.session.userId;

  UserStore.unlinkMessengerAccount(userId);

  await context.sendButtonTemplate(
    'You’ve been logged out of your Jasper’s account.',
    [signInButton]
  );
}

async function SendWelcomeMessages(context) {
  const userProfile = UserStore.getByMessengerId(context.session.user.id);
  if (!isEmpty(userProfile)) {
    await context.sendText(
      'Oh hey there! I was just napping while you were gone 😴. But I’m awake now!'
    );
    await context.sendButtonTemplate(
      `You’re still logged in as ${userProfile.username}.`,
      [signOutButton]
    );
  } else {
    await context.sendText(
      'Hi! 👋 Welcome to Jasper’s Market!' +
        ' (Messenger Platform Account Linking demo)'
    );
    await context.sendButtonTemplate(
      'Ready to do this? You’ll need to log in to your Jasper’s account so I can access your past orders.',
      [signInButton]
    );
  }
}

module.exports = async function App() {
  return router([
    text('*', SendWelcomeMessages),
    payload('GET_STARTED', SendWelcomeMessages),
    messenger.accountLinking.linked(HandleAccountLinkingLinked),
    messenger.accountLinking.unlinked(HandleAccountLinkingUnlinked),
  ]);
};
