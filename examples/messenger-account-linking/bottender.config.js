module.exports = {
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      fields: [
        // For text message events
        'messages',
        // For the get started button
        'messaging_postbacks',
        // For account_linking linked and unlinked events
        'messaging_account_linking',
      ],
      profile: {
        getStarted: {
          payload: 'GET_STARTED',
        },
      },
    },
  },
};
