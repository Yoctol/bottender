import Bot from '../bot/Bot';
import getChannelBots from '../shared/getChannelBots';

import MessageQueue from './MessageQueue';

class Worker {
  channelBots: { webhookPath: string; bot: Bot<any, any, any, any> }[] = [];

  messageQueue: MessageQueue;

  constructor(messageQueue = new MessageQueue()) {
    this.messageQueue = messageQueue;
  }

  public async prepare() {
    await this.messageQueue.connect();
    this.channelBots = getChannelBots();
  }

  public async start() {
    console.log('worker.start()');

    await this.prepare();
    this.messageQueue.startWorking(this.work.bind(this));
  }

  public async work(message: string) {
    console.log('doWork');
    console.log(message);
    const { body, httpContext } = JSON.parse(message);
    for (let i = 0; i < this.channelBots.length; i++) {
      const { webhookPath, bot } = this.channelBots[i];
      if (httpContext.path === webhookPath) {
        const requestHandler = bot.createRequestHandler();
        // eslint-disable-next-line no-await-in-loop
        const response = await requestHandler(body, httpContext);
        console.log(response);
        return true;
      }
    }
    return true;
  }
}

export default Worker;
