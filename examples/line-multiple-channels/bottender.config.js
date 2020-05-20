module.exports = {
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line/:channelId',

      // [Optional] If you want to avoid user id conflict between LINE channels in the same provider,
      // you must add prefix to the session keys using the parameters from the URL
      getSessionKeyPrefix(event, { params }) {
        return `${params.channelId}:`;
        // or you can use the destination to avoid the conflict
        // return `${event.destination}:`;
      },

      async getConfig({ params }) {
        switch (params.channelId) {
          case process.env.CHANNEL_2_CHANNEL_ID:
            return {
              accessToken: process.env.CHANNEL_2_ACCESS_TOKEN,
              channelSecret: process.env.CHANNEL_2_CHANNEL_SECRET,
            };
          case process.env.CHANNEL_1_CHANNEL_ID:
          default:
            return {
              accessToken: process.env.CHANNEL_1_ACCESS_TOKEN,
              channelSecret: process.env.CHANNEL_1_CHANNEL_SECRET,
            };
        }
      },
    },
  },
};
