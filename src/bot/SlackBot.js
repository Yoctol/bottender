/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
    sync,
    verificationToken,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
    verificationToken?: string,
  }) {
    const connector = new SlackConnector({ accessToken, verificationToken });
    super({ connector, sessionStore, sync });
  }
}
