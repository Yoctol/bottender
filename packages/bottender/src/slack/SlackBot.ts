import { RTMClient } from '@slack/rtm-api';
import { SlackOAuthClient } from 'messaging-api-slack';

import Bot, { OnRequest } from '../bot/Bot';
import SessionStore from '../session/SessionStore';

import SlackConnector, { SlackRequestBody } from './SlackConnector';
import SlackContext from './SlackContext';
import SlackEvent from './SlackEvent';

export default class SlackBot extends Bot<
  SlackRequestBody,
  SlackOAuthClient,
  SlackEvent,
  SlackContext
> {
  _accessToken: string;

  constructor({
    accessToken,
    sessionStore,
    sync,
    verificationToken,
    signingSecret,
    origin,
    skipLegacyProfile,
    includeBotMessages,
    onRequest,
  }: {
    accessToken: string;
    sessionStore?: SessionStore;
    sync?: boolean;
    verificationToken?: string;
    signingSecret?: string;
    origin?: string;
    skipLegacyProfile?: boolean;
    includeBotMessages?: boolean;
    onRequest?: OnRequest;
  }) {
    const connector = new SlackConnector({
      accessToken,
      verificationToken,
      signingSecret,
      origin,
      skipLegacyProfile,
      includeBotMessages,
    });
    super({ connector, sessionStore, sync, onRequest });
    this._accessToken = accessToken;
  }

  createRtmRuntime(): void {
    const rtm = new RTMClient(this._accessToken);
    const handler = this.createRequestHandler();

    rtm.on('message', handler);
    rtm.start();
  }
}
