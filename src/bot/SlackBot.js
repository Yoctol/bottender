/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  constructor({
    token,
    sessionStore,
  }: {
    token: string,
    sessionStore: SessionStore,
  }) {
    const connector = new SlackConnector({ token });
    super({ connector, sessionStore });
  }
}
