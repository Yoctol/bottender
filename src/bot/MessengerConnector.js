/*
  eslint-disable class-methods-use-this
  @flow
*/
import crypto from 'crypto';

import { MessengerClient } from 'messaging-api-messenger';
import warning from 'warning';

import MessengerContext from '../context/MessengerContext';
import MessengerEvent, {
  type MessengerRawEvent,
  type Sender,
  type Recipient,
  type Message,
  type Postback,
  type PolicyEnforcement,
  type AppRoles,
  type PassThreadControl,
  type TakeThreadControl,
} from '../context/MessengerEvent';
import type { Session } from '../session/Session';

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
  _appSecret: string;

  constructor({
    accessToken,
    appSecret,
  }: {
    accessToken: string,
    appSecret: string,
  }) {
    this._client = MessengerClient.connect(accessToken);
    this._appSecret = appSecret;
  }

  _getRawEventsFromRequest(
    body: MessengerRequestBody
  ): Array<MessengerRawEvent> {
    if (body.entry) {
      const entry = ((body: any): EntryRequestBody).entry;

      return entry
        .map(ent => {
          if (ent.messaging) {
            return ((ent.messaging[0]: any): MessengerRawEvent);
          }

          if (ent.standby) {
            return ((ent.standby[0]: any): MessengerRawEvent);
          }
          // $FlowExpectedError
          return null;
        })
        .filter(event => event != null);
    }

    return [((body: any): MessengerRawEvent)];
  }

  _isStandby(body: MessengerRequestBody): boolean {
    if (!body.entry) return false;
    const entry = ((body: any): EntryRequestBody).entry[0];

    return !!entry.standby;
  }

  get platform(): string {
    return 'messenger';
  }

  getUniqueSessionIdFromRequest(body: MessengerRequestBody): ?string {
    const rawEvent = this._getRawEventsFromRequest(body)[0];
    if (rawEvent.message && rawEvent.message.is_echo && rawEvent.recipient) {
      return rawEvent.recipient.id;
    }
    if (rawEvent.sender) {
      return rawEvent.sender.id;
    }
    return null;
  }

  async updateSession(
    session: Session,
    body: MessengerRequestBody
  ): Promise<void> {
    if (!session.user) {
      const senderId = this.getUniqueSessionIdFromRequest(body);
      const user = await this._client.getUserProfile(senderId);

      session.user = {
        id: senderId,
        platform: 'messenger',
        ...user,
      };
    }
  }

  mapRequestToEvents(body: MessengerRequestBody): Array<MessengerEvent> {
    const rawEvents = this._getRawEventsFromRequest(body);
    const isStandby = this._isStandby(body);
    return rawEvents.map(event => new MessengerEvent(event, { isStandby }));
  }

  createContext({
    event,
    session,
  }: {
    event: MessengerEvent,
    session: ?MessengerSession,
  }): MessengerContext {
    return new MessengerContext({
      client: this._client,
      event,
      session,
    });
  }

  // https://developers.facebook.com/docs/messenger-platform/webhook#security
  verifySignature(rawBody: string, signature: string): boolean {
    if (!this._appSecret) {
      warning(
        false,
        'App secret is not set. Cannot perform Messenger signature validation!'
      );
      return true;
    }
    return (
      signature ===
      `sha1=${crypto
        .createHmac('sha1', this._appSecret)
        .update(rawBody, 'utf8')
        .digest('hex')}`
    );
  }
}
