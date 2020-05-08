module.exports = {
  channels: {
    sms: {
      enabled: true,
      path: '/webhooks/sms',
      accountSid: process.env.SMS_ACCOUNT_SID,
      authToken: process.env.SMS_AUTH_TOKEN,
      phoneNumber: process.env.SMS_PHONE_NUMBER,
    },
  },
};
