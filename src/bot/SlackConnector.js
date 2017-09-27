/*
  eslint-disable class-methods-use-this
  @flow
*/
import { SlackOAuthClient } from 'messaging-api-slack';

import SlackContext from '../context/SlackContext';
import SlackEvent, { type SlackRawEvent } from '../context/SlackEvent';
import type { Session } from '../session/Session';

import type { Connector } from './Connector';

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

type ConstructorOptions = {|
  accessToken?: string,
  client?: SlackOAuthClient,
|};

export default class SlackConnector implements Connector<SlackRequestBody> {
  _client: SlackOAuthClient;

  constructor({ accessToken, client }: ConstructorOptions) {
    this._client = client || SlackOAuthClient.connect(accessToken);
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
    // FIXME: refine user
    session.user = {
      id: senderId,
      _updatedAt: new Date().toISOString(),
      ...sender,
    };

    // TODO: check join or leave events?
    if (
      !session.channel ||
      (session.channel.members &&
        Array.isArray(session.channel.members) &&
        session.channel.members.indexOf(senderId) < 0)
    ) {
      session.channel = await this._client.getChannelInfo(channelId);
      session.channel._updatedAt = new Date().toISOString();
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
        _updatedAt: new Date().toISOString(),
      };
    }

    if (session.user) {
      Object.freeze(session.user);
      Object.defineProperty(session, 'user', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.user,
      });
    }

    if (session.channel) {
      Object.freeze(session.channel);
      Object.defineProperty(session, 'channel', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.channel,
      });
    }

    if (session.team) {
      Object.freeze(session.team);
      Object.defineProperty(session, 'team', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.team,
      });
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
    session: ?Session,
  }): SlackContext {
    return new SlackContext({
      client: this._client,
      event,
      session,
    });
  }
}
