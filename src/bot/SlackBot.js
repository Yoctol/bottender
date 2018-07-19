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
  }: {
    accessToken: string,
    sessionStore: SessionStore,
    sync?: boolean,
    verificationToken?: string,
  }) {
    const connector = new SlackConnector({ accessToken, verificationToken });
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
