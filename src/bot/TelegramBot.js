/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import TelegramConnector from './TelegramConnector';

export default class TelegramBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
    sync,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
  }) {
    const connector = new TelegramConnector({ accessToken });
    super({ connector, sessionStore, sync });
  }

  async createLongPollingRuntime(options) {
    const handler = this.createRequestHandler();

    /* eslint-disable no-await-in-loop */
    while (true) {
      const updates = await this.connector.client.getUpdates(options);
      for (let i = 0; i < updates.length; i++) {
        await handler(updates[i]);
      }
    }
    /* eslint-enable no-await-in-loop */
  }
}
