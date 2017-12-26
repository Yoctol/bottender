const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const { getAttachment } = require('bottender/utils');

const config = require('./bottender.config').messenger;

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

bot.onEvent(async context => {
  if (context.event.text === 'video') {
    const attachment = getAttachment('video.mp4');
    await context.sendVideo({ attachment_id: attachment.id });
  } else {
    const attachment = getAttachment('bottender.png');
    await context.sendImage({ attachment_id: attachment.id });
  }
});

const server = createServer(bot, { verifyToken: config.verifyToken });

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
