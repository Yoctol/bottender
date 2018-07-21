/* @flow */
import crypto from 'crypto';

import { SlackOAuthClient } from 'messaging-api-slack';
import warning from 'warning';
import pProps from 'p-props';

import SlackContext from '../context/SlackContext';
import SlackEvent, {
  type EventAPITypes,
  type SlackRawEvent,
  type Message,
  type InteractiveMessageEvent,
} from '../context/SlackEvent';
import { type Session } from '../session/Session';

import { type Connector } from './Connector';

// FIXME
export type SlackUser = {
  id: string,
};

type EventsAPIBody = {
  token: string,
  team_id: string,
  api_app_id: string,
  type: EventAPITypes,
  event: Message,
  authed_users: Array<string>,
  event_id: string,
  event_time: number,
};

export type SlackRequestBody = EventsAPIBody | { payload: string };

type ConstructorOptions = {|
  accessToken?: string,
  client?: SlackOAuthClient,
  verificationToken?: string,
|};

export default class SlackConnector implements Connector<SlackRequestBody> {
  _client: SlackOAuthClient;

  _verificationToken: string;

  constructor({ accessToken, client, verificationToken }: ConstructorOptions) {
    this._client = client || SlackOAuthClient.connect(accessToken);
    this._verificationToken = verificationToken || '';

    if (!this._verificationToken) {
      warning(
        false,
        '`verificationToken` is not set. Will bypass Slack event verification.\nPass in `verificationToken` to perform Slack event verification.'
      );
    }
  }

  _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent {
    if (body.event) {
      return (((body: any): EventsAPIBody).event: Message);
    }
    if (body.payload && typeof body.payload === 'string') {
      return (JSON.parse(body.payload): InteractiveMessageEvent);
    }
    // for RTM WebSocket messages
    return ((body: any): Message);
  }

  _isBotEventRequest(body: SlackRequestBody): boolean {
    const rawEvent = this._getRawEventFromRequest(body);
    return !!(
      rawEvent.bot_id ||
      (rawEvent.subtype && rawEvent.subtype === 'bot_message')
    );
  }

  get platform(): string {
    return 'slack';
  }

  get client(): SlackOAuthClient {
    return this._client;
  }

  getUniqueSessionKey(body: SlackRequestBody): string {
    const rawEvent = this._getRawEventFromRequest(body);

    if (rawEvent.type === 'interactive_message') {
      return rawEvent.channel.id;
    }

    return ((rawEvent: any): Message).channel;
  }

  async updateSession(session: Session, body: SlackRequestBody): Promise<void> {
    if (this._isBotEventRequest(body)) {
      return;
    }

    const rawEvent = this._getRawEventFromRequest(body);
    let userFromBody;
    if (rawEvent.type === 'interactive_message') {
      userFromBody = rawEvent.user.id;
    } else {
      userFromBody = ((rawEvent: any): Message).user;
    }

    if (
      typeof session.user === 'object' &&
      session.user &&
      session.user.id &&
      session.user.id === userFromBody
    ) {
      return;
    }
    const channelId = this.getUniqueSessionKey(body);
    const senderId = userFromBody;

    if (!senderId) {
      return;
    }

    const promises: Object = {
      sender: this._client.getUserInfo(senderId),
    };

    // TODO: check join or leave events?
    if (
      !session.channel ||
      (session.channel.members &&
        Array.isArray(session.channel.members) &&
        session.channel.members.indexOf(senderId) < 0)
    ) {
      promises.channel = this._client.getConversationInfo(channelId);
      promises.channelMembers = this._client.getAllConversationMembers(
        channelId
      );
    }

    // TODO: how to know if user leave team?
    // TODO: team info shared by all channels?
    if (
      !session.team ||
      (session.team.members &&
        Array.isArray(session.team.members) &&
        session.team.members.indexOf(senderId) < 0)
    ) {
      promises.allUsers = this._client.getAllUserList();
    }

    const results = await pProps(promises);

    // FIXME: refine user
    session.user = {
      id: senderId,
      _updatedAt: new Date().toISOString(),
      ...results.sender,
    };
    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });

    if (promises.channel) {
      session.channel = {
        ...results.channel,
        members: results.channelMembers,
        _updatedAt: new Date().toISOString(),
      };

      Object.freeze(session.channel);
      Object.defineProperty(session, 'channel', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: session.channel,
      });
    }

    if (promises.allUsers) {
      session.team = {
        members: results.allUsers,
        _updatedAt: new Date().toISOString(),
      };

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

    if (this._isBotEventRequest(body)) {
      return []; // FIXME
    }

    return [new SlackEvent(rawEvent)];
  }

  createContext(params: {
    event: SlackEvent,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
  }): SlackContext {
    return new SlackContext({
      ...params,
      client: this._client,
    });
  }

  verifySignature(tokenFromBody: string): boolean {
    if (!this._verificationToken) {
      // TODO: deprecate this bypassing
      return true;
    }

    const bufferFromBot = Buffer.from(this._verificationToken);
    const bufferFromBody = Buffer.from(tokenFromBody);

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (bufferFromBot.length !== bufferFromBody.length) {
      return false;
    }

    // wait this PR to be merged
    // https://github.com/facebook/flow/pull/4974
    // $FlowExpectedError
    return crypto.timingSafeEqual(bufferFromBot, bufferFromBody);
  }
}
