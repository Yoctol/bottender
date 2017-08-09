/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
  }) {
    const connector = new SlackConnector({ accessToken });
    super({ connector, sessionStore });
  }
}
