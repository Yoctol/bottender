/* @flow */
import { RTMClient } from '@slack/client';

import { type SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector from './SlackConnector';

export default class SlackBot extends Bot {
  _accessToken: string;

  constructor({
    accessToken,
    sessionStore,
    sync,
    verificationToken,
    origin,
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
    verificationToken?: string,
    origin?: string,
  }) {
    const connector = new SlackConnector({
      accessToken,
      verificationToken,
      origin,
    });
    super({ connector, sessionStore, sync });
    this._accessToken = accessToken;
  }

  createRtmRuntime() {
    const rtm = new RTMClient(this._accessToken);
    const handler = this.createRequestHandler();

    rtm.on('message', handler);
    rtm.start();
  }
}
