module.exports = {
  channels: {
    whatsapp: {
      enabled: true,
      path: '/webhooks/whatsapp',
      accountSid: process.env.ACCOUNT_SID,
      authToken: process.env.AUTH_TOKEN,
      phoneNumber: process.env.PHONE_NUMBER,
    },
  },
};
