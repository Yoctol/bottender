/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  constructor({
    webhookURL,
    sessionStore,
  }: {
    webhookURL: string,
    sessionStore: SessionStore,
  }) {
    const connector = new SlackConnector({ webhookURL });
    super({ connector, sessionStore });
  }
}
