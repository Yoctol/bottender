import { TelegramClient } from 'messaging-api-telegram';

import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import TelegramConnector, { TelegramRequestBody } from './TelegramConnector';
import TelegramEvent from './TelegramEvent';

type PollingOptions = {
  offset?: number;
  limit?: number;
  timeout?: number;
  allowed_updates?: string[];
};

export default class TelegramBot extends Bot<
  TelegramRequestBody,
  TelegramClient,
  TelegramEvent
> {
  _offset: number | null;

  _shouldGetUpdates: boolean;

  constructor({
    accessToken,
    sessionStore,
    sync,
    origin,
  }: {
    accessToken: string;
    sessionStore: SessionStore;
    sync?: boolean;
    origin?: string;
  }) {
    const connector = new TelegramConnector({ accessToken, origin });
    super({ connector, sessionStore, sync });

    this._offset = null;
    this._shouldGetUpdates = false;
  }

  get offset(): number | null {
    return this._offset;
  }

  async createLongPollingRuntime(options: PollingOptions = {}): Promise<void> {
    this._shouldGetUpdates = true;
    this._offset = options.offset || null;

    const handler = this.createRequestHandler();

    /* eslint-disable no-await-in-loop */
    while (this._shouldGetUpdates) {
      try {
        const params = this._offset
          ? {
              ...options,
              offset: this._offset,
            }
          : options;
        const updates = await (this.connector as any).client.getUpdates(params);

        if (updates.length > 0) {
          for (let i = 0; i < updates.length; i++) {
            await handler(updates[i]);
          }

          const highestUpdateId = Math.max(
            ...updates.map((update: any) => update.update_id)
          );

          this._offset = highestUpdateId + 1;
        }
      } catch (err) {
        console.error(err);
      }
    }
    /* eslint-enable no-await-in-loop */
  }

  stop() {
    this._shouldGetUpdates = false;
  }
}
