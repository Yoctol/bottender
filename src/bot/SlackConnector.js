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

  constructor({ webhookURL }: { webhookURL: string }) {
    this._client = SlackClient.connect(webhookURL);
  }

  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    return body.event;
  }

  get platform(): string {
    return 'slack';
  }

  getSenderIdFromRequest(body: SlackRequestBody): string {
    return `${body.event.user || 'no_id'}`; // FIXME
  }

  // FIXME
  async getUserProfile(senderId: string): Promise<SlackUser> {
    return { id: senderId };
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

    if (rawEvent.bot_id || rawEvent.subtype === 'bot_message') {
      return; // FIXME
    }

    const context = new SlackContext({
      client: this._client,
      rawEvent,
      session,
    });

    await handler(context);
  }
}
