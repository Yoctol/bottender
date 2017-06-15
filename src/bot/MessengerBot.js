/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import MessengerConnector from './MessengerConnector';

export default class MessengerBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
  }) {
    const connector = new MessengerConnector({ accessToken });
    super({ connector, sessionStore });
  }
}
