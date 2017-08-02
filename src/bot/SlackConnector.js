/*
  eslint-disable class-methods-use-this
  @flow
*/
import { SlackClient } from 'messaging-api-slack';

import SlackContext from '../context/SlackContext';
import type { SlackRawEvent } from '../context/SlackEvent';
import type { Session } from '../session/Session';

import type { FunctionalHandler } from './Bot';
import type { Connector, SessionWithUser } from './Connector';

// FIXME
export type SlackUser = {
  id: string,
};

export type SlackRequestBody = {
  token: string,
  team_id: string,
  api_app_id: string,
  type: string,
  event: SlackRawEvent,
  authed_users: Array<string>,
  event_id: string,
  event_time: number,
};

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

  getUniqueSessionIdFromRequest(body: SlackRequestBody): string {
    if (body.event.user && typeof body.event.user === 'string') {
      return body.event.user;
    }
    return 'U000000000'; // FIXME
  }

  shouldSessionUpdate(session: Session): boolean {
    return !session.user;
  }

  // FIXME
  async updateSession(session: Session, body: SlackRequestBody): Promise<void> {
    const senderId = this.getUniqueSessionIdFromRequest(body);

    session.user = { id: senderId };
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
