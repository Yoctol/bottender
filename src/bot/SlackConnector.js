/*
  eslint-disable class-methods-use-this
  @flow
*/
import { SlackClient } from 'messaging-api-slack';

import SlackContext from '../context/SlackContext';
import type { SlackRawEvent } from '../context/SlackEvent';

import type { FunctionalHandler } from './Bot';
import type { Connector, SessionWithUser } from './Connector';

// FIXME
export type SlackUser = {
  id: number,
};

// FIXME
export type SlackRequestBody = SlackRawEvent;

export type SlackSession = SessionWithUser<SlackUser>;

export default class SlackConnector
  implements Connector<SlackRequestBody, SlackUser> {
  _client: SlackClient;

  // FIXME
  constructor({ accessToken }: { accessToken: string }) {
    this._client = SlackClient.connect(accessToken);
  }

  // FIXME
  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    return body;
  }

  get platform(): string {
    return 'slack';
  }

  // FIXME
  getSenderIdFromRequest(body: SlackRequestBody): string {
    return `${body.message.from.id}`;
  }

  // FIXME
  async getUserProfile(
    senderId: string,
    body: SlackRequestBody
  ): Promise<SlackUser> {
    return body.message.from;
  }

  async handleRequest({
    body,
    session,
    handler,
  }: {
    body: SlackRequestBody,
    session: SlackSession,
    handler: FunctionalHandler,
  }): Promise<void> {
    const rawEvent = this._getRawEventFromRequest(body);

    const context = new SlackContext({
      client: this._client,
      rawEvent,
      session,
    });

    await handler(context);
  }
}
