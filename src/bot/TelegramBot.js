/* @flow */

import omit from 'lodash/omit';

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import TelegramConnector from './TelegramConnector';

type PollingOptions = {
  offset?: number,
  limit?: number,
  timeout?: number,
  allowed_updates?: Array<string>,
};

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

  async createLongPollingRuntime(options: PollingOptions = {}) {
    const handler = this.createRequestHandler();

    let offset = options.offset;

    /* eslint-disable no-await-in-loop */
    while (true) {
      try {
        const params = offset ? options : omit(options, ['offset']);
        const data = await (this.connector: any).client.getUpdates(params);
        const updates = data.result;
        for (let i = 0; i < updates.length; i++) {
          await handler(updates[i]);
        }

        const highestUpdateId = Math.max(
          updates.map(update => update.update_id)
        );
        offset = highestUpdateId + 1;
      } catch (err) {
        console.error(err);
      }
    }
    /* eslint-enable no-await-in-loop */
  }
}
