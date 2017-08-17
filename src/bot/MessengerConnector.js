/*
  eslint-disable class-methods-use-this
  @flow
*/
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../context/MessengerContext';
import type {
  MessengerRawEvent,
  Sender,
  Recipient,
  Message,
  Postback,
  PolicyEnforcement,
  AppRoles,
  PassThreadControl,
  TakeThreadControl,
} from '../context/MessengerEvent';
import type { Session } from '../session/Session';

import type { FunctionalHandler } from './Bot';
import type { Connector, SessionWithUser } from './Connector';

type Entry = {
  ['messaging' | 'standby']: Array<{
    sender: Sender,
    recipient: Recipient,
    timestamp: number,
    postback?: Postback,
    message?: Message,
  }>,
};

type EntryRequestBody = {
  type: string,
  entry: Array<Entry>,
};

type PolicyEnforcementRequestBody = {
  recipient: Recipient,
  timestamp: number,
  'policy-enforcement': PolicyEnforcement,
};

type AppRolesRequestBody = {
  recipient: Recipient,
  timestamp: number,
  app_roles: AppRoles,
};

type PassThreadControlRequestBody = {
  sender: Sender,
  recipient: Recipient,
  timestamp: number,
  pass_thread_control: PassThreadControl,
};

type TakeThreadControlRequestBody = {
  sender: Sender,
  recipient: Recipient,
  timestamp: number,
  take_thread_control: TakeThreadControl,
};

type MessengerRequestBody =
  | EntryRequestBody
  | PolicyEnforcementRequestBody
  | AppRolesRequestBody
  | PassThreadControlRequestBody
  | TakeThreadControlRequestBody;

type MessengerUser = {
  id: string,
};

export type MessengerSession = SessionWithUser<MessengerUser>;

export default class MessengerConnector
  implements Connector<MessengerRequestBody, MessengerUser> {
  _client: MessengerClient;

  constructor({ accessToken }: { accessToken: string }) {
    this._client = MessengerClient.connect(accessToken);
  }

  _getRawEventFromRequest(body: MessengerRequestBody): MessengerRawEvent {
    if (body.entry) {
      const entry = ((body: any): EntryRequestBody).entry[0];
      if (entry.messaging) {
        return ((entry.messaging[0]: any): MessengerRawEvent);
      }

      if (entry.standby) {
        return ((entry.standby[0]: any): MessengerRawEvent);
      }
    }

    return ((body: any): MessengerRawEvent);
  }

  get platform(): string {
    return 'messenger';
  }

  getUniqueSessionIdFromRequest(body: MessengerRequestBody): ?string {
    const rawEvent = this._getRawEventFromRequest(body);
    if (rawEvent.message && rawEvent.message.is_echo && rawEvent.recipient) {
      return rawEvent.recipient.id;
    }
    if (rawEvent.sender) {
      return rawEvent.sender.id;
    }
    return null;
  }

  shouldSessionUpdate(session: Session): boolean {
    return !session.user;
  }

  async updateSession(
    session: Session,
    body: MessengerRequestBody
  ): Promise<void> {
    const senderId = this.getUniqueSessionIdFromRequest(body);
    const user = await this._client.getUserProfile(senderId);

    session.user = {
      id: senderId,
      platform: 'messenger',
      ...user,
    };
  }

  async handleRequest({
    body,
    session,
    handler,
  }: {
    body: MessengerRequestBody,
    session: ?MessengerSession,
    handler: FunctionalHandler,
  }): Promise<void> {
    const rawEvent = this._getRawEventFromRequest(body);

    const context = new MessengerContext({
      client: this._client,
      rawEvent,
      session,
    });

    await handler(context);
  }
}
