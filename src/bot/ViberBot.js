/* @flow */

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import ViberConnector from './ViberConnector';

export default class ViberBot extends Bot {
  constructor({
    accessToken,
    sessionStore,
    sync,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
  }) {
    const connector = new ViberConnector({ accessToken });
    super({ connector, sessionStore, sync });
  }
}
