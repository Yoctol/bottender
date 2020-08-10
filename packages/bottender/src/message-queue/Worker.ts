import getChannelBots from '../shared/getChannelBots';

import MessageQueue from './MessageQueue';

class Worker {
  messageQueue: MessageQueue;

  constructor(messageQueue = new MessageQueue()) {
    this.messageQueue = messageQueue;
  }

  public async prepare() {
    await this.messageQueue.connect();
  }

  public async start() {
    console.log('worker.start()');

    await this.prepare();
    this.messageQueue.startWorking(this.work.bind(this));
  }

  public async work(message: string) {
    const channelBots = getChannelBots();
    console.log('doWork');
    const { requestContext } = JSON.parse(message);
    const body = {
      ...requestContext.query,
      ...requestContext.body,
    };
    for (let i = 0; i < channelBots.length; i++) {
      const { webhookPath, bot } = channelBots[i];
      if (requestContext.path === webhookPath) {
        const requestHandler = bot.createRequestHandler();
        // eslint-disable-next-line no-await-in-loop
        const response = await requestHandler(body, requestContext);
        console.log(response);
        return true;
      }
    }
    return true;
  }
}

export default Worker;
