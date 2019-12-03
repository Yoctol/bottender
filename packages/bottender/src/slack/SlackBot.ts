import { RTMClient } from '@slack/rtm-api';
import { SlackOAuthClient } from 'messaging-api-slack';

import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import SlackConnector, { SlackRequestBody } from './SlackConnector';
import SlackEvent from './SlackEvent';

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
    skipLegacyProfile,
  }: {
    accessToken: string;
    sessionStore: SessionStore;
    sync?: boolean;
    verificationToken?: string;
    origin?: string;
    skipLegacyProfile?: boolean | null;
  }) {
    const connector = new SlackConnector({
      accessToken,
      verificationToken,
      origin,
      skipLegacyProfile,
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
