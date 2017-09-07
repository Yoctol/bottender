/*
  eslint-disable class-methods-use-this
  @flow
*/
import { SlackOAuthClient } from 'messaging-api-slack';

import SlackContext from '../context/SlackContext';
import SlackEvent, { type SlackRawEvent } from '../context/SlackEvent';
import type { Session } from '../session/Session';

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

  constructor({ accessToken: token }: {| accessToken: string |}) {
    this._client = SlackOAuthClient.connect(token);
  }

  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    return body.event;
  }

  get platform(): string {
    return 'slack';
  }

  get client(): SlackOAuthClient {
    return this._client;
  }

  getUniqueSessionIdFromRequest(body: SlackRequestBody): string {
    if (body.event.channel && typeof body.event.channel === 'string') {
      return body.event.channel;
    }
    return 'U000000000'; // FIXME
  }

  async updateSession(session: Session, body: SlackRequestBody): Promise<void> {
    if (
      typeof session.user === 'object' &&
      session.user &&
      session.user.id &&
      session.user.id === body.event.user
    ) {
      return;
    }
    const channelId = this.getUniqueSessionIdFromRequest(body);
    const senderId = body.event.user;
    const sender = await this._client.getUserInfo(senderId);
    session.user = {
      id: senderId,
      platform: 'slack',
      ...sender,
    };

    // TODO: check join or leave events?
    if (
      !session.channel ||
      (session.channel.members &&
        Array.isArray(session.channel.members) &&
        session.channel.members.indexOf(senderId) < 0)
    ) {
      const channel = await this._client.getChannelInfo(channelId);
      session.channel = channel;
    }

    // TODO: how to know if user leave team?
    // TODO: team info shared by all channels?
    if (
      !session.team ||
      (session.team.members &&
        Array.isArray(session.team.members) &&
        session.team.members.indexOf(senderId) < 0)
    ) {
      const allUsers = await this._client.getAllUserList();
      session.team = {
        members: allUsers,
      };
    }
  }

  mapRequestToEvents(body: SlackRequestBody): Array<SlackEvent> {
    const rawEvent = this._getRawEventFromRequest(body);

    if (rawEvent.bot_id || rawEvent.subtype === 'bot_message') {
      return []; // FIXME
    }

    return [new SlackEvent(rawEvent)];
  }

  createContext({
    event,
    session,
  }: {
    event: SlackEvent,
    session: ?SlackSession,
  }): SlackContext {
    return new SlackContext({
      client: this._client,
      event,
      session,
    });
  }
}
