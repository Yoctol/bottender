/*
  eslint-disable class-methods-use-this
  @flow
*/
import { SlackOAuthClient } from 'messaging-api-slack';

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
  _client: SlackOAuthClient;

  constructor({ token }: { token: string }) {
    this._client = SlackOAuthClient.connect(token);
  }

  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    return body.event;
  }

  get platform(): string {
    return 'slack';
  }

  getUniqueSessionIdFromRequest(body: SlackRequestBody): string {
    if (body.event.channel && typeof body.event.channel === 'string') {
      return body.event.channel;
    }
    return 'U000000000'; // FIXME
  }

  shouldSessionUpdate(session: Session, body: SlackRequestBody): boolean {
    // FIXME: don't update channel or team part so often
    if (typeof session.user === 'object' && session.user && session.user.id) {
      return session.user.id !== body.event.user;
    }
    return false;
  }

  // FIXME
  async updateSession(session: Session, body: SlackRequestBody): Promise<void> {
    const channelId = this.getUniqueSessionIdFromRequest(body);
    const senderId = body.event.user;

    const sender = await this._client.getUserInfo(senderId);
    const channel = await this._client.getChannelInfo(channelId);
    const allUsers = await this._client.getAllUserList();

    session.user = sender;
    session.channel = channel;
    // TODO: check if team exists
    session.team = {
      members: allUsers,
    };
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
