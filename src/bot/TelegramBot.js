/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import TelegramConnector from './TelegramConnector';

export default class TelegramBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
  }) {
    const connector = new TelegramConnector({ accessToken });
    super({ connector, sessionStore });
  }
}
