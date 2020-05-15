module.exports = {
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line/:channelId',
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
