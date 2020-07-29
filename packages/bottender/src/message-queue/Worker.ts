import MessageQueue from "./MessageQueue";
import path from 'path';
import merge from 'lodash/merge';
import { pascalcase } from 'messaging-api-common';

import Bot from '../bot/Bot';
import getBottenderConfig from '../shared/getBottenderConfig';
import getSessionStore from '../getSessionStore';
import { Action, BottenderConfig, Plugin } from '../types';

class Worker {
  channelBots: { webhookPath: string; bot: Bot<any, any, any, any> }[] = [];
  messageQueue: MessageQueue

  constructor(messageQueue = new MessageQueue()) {
    this.messageQueue = messageQueue;
  }

  public async prepare(){
    await this.messageQueue.connect();
    const bottenderConfig = getBottenderConfig();

    const { initialState, plugins, channels } = merge(
      bottenderConfig /* , config */
    ) as BottenderConfig;

    const sessionStore = getSessionStore();

    // TODO: refine handler entry, improve error message and hint
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
    const Entry: Action<any, any> = require(path.resolve('index.js'));
    let ErrorEntry: Action<any, any>;

    const channelBots = Object.entries(channels || {})
    .filter(([, { enabled }]) => enabled)
    .map(([channel, { path: webhookPath, ...channelConfig }]) => {
      // eslint-disable-next-line import/no-dynamic-require
      const ChannelBot = require(`../${channel}/${pascalcase(channel)}Bot`)
        .default;
      const channelBot = new ChannelBot({
        ...channelConfig,
        sessionStore,
      }) as Bot<any, any, any, any>;

      function initializeBot(bot: Bot<any, any, any, any>): void {
        if (initialState) {
          bot.setInitialState(initialState);
        }

        if (plugins) {
          plugins.forEach((plugin: Plugin<any>) => {
            bot.use(plugin);
          });
        }

        bot.onEvent(Entry);
        if (ErrorEntry) {
          bot.onError(ErrorEntry);
        }
      }

      initializeBot(channelBot);

      return {
        webhookPath: webhookPath || `/webhooks/${channel}`,
        bot: channelBot,
      };
    });

    this.channelBots = channelBots;
  }

  public async start(){
    console.log("worker.start()")

    await this.prepare();
    this.messageQueue.startWorking(this.doWork);
  }

  private async doWork(message: string): Promise<boolean> {
    console.log(message);
    const {body, httpContext} = JSON.parse(message);
    for (let i = 0; i < this.channelBots.length; i++) {
      const { webhookPath, bot } = this.channelBots[i];
      if (httpContext.path === webhookPath) {
        const requestHandler = bot.createRequestHandler();
        const response = await requestHandler(
          body,
          httpContext
        );
        console.log(response);
      }
    }

    return true;
  }

}

export default Worker;
