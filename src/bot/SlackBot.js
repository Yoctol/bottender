/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  constructor({
    accessToken, // FIXME
    sessionStore,
  }: {
    accessToken: string, // FIXME
    sessionStore: SessionStore,
  }) {
    const connector = new SlackConnector({ accessToken });
    super({ connector, sessionStore });
  }
}
