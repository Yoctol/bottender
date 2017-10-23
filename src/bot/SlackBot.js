/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
    sync,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
  }) {
    const connector = new SlackConnector({ accessToken });
    super({ connector, sessionStore, sync });
  }
}
