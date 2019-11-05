import { RTMClient } from '@slack/rtm-api';
import { SlackOAuthClient } from 'messaging-api-slack';

import SessionStore from '../session/SessionStore';

import Bot from './Bot';
import SlackConnector, { SlackRequestBody } from './SlackConnector';

import { SlackEvent } from '..';

export default class SlackBot extends Bot<
  SlackRequestBody,
  SlackOAuthClient,
  SlackEvent
> {
  _accessToken: string;

  constructor({
    accessToken,
    sessionStore,
    sync,
    verificationToken,
    origin,
    skipProfile,
  }: {
    accessToken: string;
    sessionStore: SessionStore;
    sync?: boolean;
    verificationToken?: string;
    origin?: string;
    skipProfile?: boolean | null;
  }) {
    const connector = new SlackConnector({
      accessToken,
      verificationToken,
      origin,
      skipProfile,
    });
    super({ connector, sessionStore, sync });
    this._accessToken = accessToken;
  }

  createRtmRuntime(): void {
    const rtm = new RTMClient(this._accessToken);
    const handler = this.createRequestHandler();

    rtm.on('message', handler);
    rtm.start();
  }
}
