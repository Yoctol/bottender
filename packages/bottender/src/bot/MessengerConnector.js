/* @flow */

import EventEmitter from 'events';
import crypto from 'crypto';

import isAfter from 'date-fns/isAfter';
import isValid from 'date-fns/isValid';
import shortid from 'shortid';
import warning from 'warning';
import { MessengerBatchQueue } from 'messenger-batch';
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../context/MessengerContext';
import MessengerEvent, {
  type AppRoles,
  type Message,
  type MessengerRawEvent,
  type PassThreadControl,
  type PolicyEnforcement,
  type Postback,
  type Recipient,
  type Sender,
  type TakeThreadControl,
} from '../context/MessengerEvent';
import { type Session } from '../session/Session';

import { type Connector } from './Connector';

type Entry = {
  ['messaging' | 'standby' | 'changes']: Array<{
    sender: Sender,
    recipient: Recipient,
    timestamp: number,
    postback?: Postback,
    message?: Message,
    field?: String,
    value?: Object,
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

type ConstructorOptions = {|
  accessToken?: string,
  appId?: string,
  appSecret?: string,
  client?: MessengerClient,
  mapPageToAccessToken?: (pageId: string) => Promise<string>,
  verifyToken?: ?string,
  batchConfig?: ?Object,
  origin?: string,
  skipAppSecretProof?: ?boolean,
  skipProfile?: ?boolean,
|};

export default class MessengerConnector
  implements Connector<MessengerRequestBody> {
  _client: MessengerClient;

  _appId: string;

  _appSecret: string;

  _skipProfile: boolean;

  _mapPageToAccessToken: ?(pageId: string) => ?Promise<string>;

  _verifyToken: ?string;

  _batchConfig: ?Object;

  _batchQueue: ?Object;

  constructor({
    accessToken,
    appId,
    appSecret,
    client,
    mapPageToAccessToken,
    verifyToken,
    batchConfig,
    origin,
    skipAppSecretProof,
    skipProfile,
  }: ConstructorOptions) {
    this._client =
      client ||
      MessengerClient.connect({
        accessToken: accessToken || '',
        appSecret,
        origin,
        skipAppSecretProof,
      });

    this._appId = appId || '';
    this._appSecret = appSecret || '';

    this._mapPageToAccessToken = mapPageToAccessToken;
    this._verifyToken = verifyToken || shortid.generate();

    // FIXME: maybe set this default value as true
    this._skipProfile = typeof skipProfile === 'boolean' ? skipProfile : false;

    this._batchConfig = batchConfig || null;
    if (this._batchConfig) {
      this._batchQueue = new MessengerBatchQueue(
        this._client,
        this._batchConfig
      );
    }

    if (!this._appSecret) {
      warning(
        false,
        '`appSecret` is not set. Will bypass Messenger signature validation.\nPass in `appSecret` to perform Messenger signature validation.'
      );
    }
  }

  _getRawEventsFromRequest(
    body: MessengerRequestBody
  ): Array<MessengerRawEvent> {
    if (body.entry) {
      const { entry } = ((body: any): EntryRequestBody);

      return entry
        .map(ent => {
          if (ent.messaging) {
            return ((ent.messaging[0]: any): MessengerRawEvent);
          }

          if (ent.standby) {
            return ((ent.standby[0]: any): MessengerRawEvent);
          }

          // for Webhook Test button request and other page events
          if (ent.changes) {
            return ((ent.changes[0]: any): MessengerRawEvent);
          }

          // $FlowExpectedError
          return null;
        })
        .filter(event => event != null);
    }

    return [((body: any): MessengerRawEvent)];
  }

  _getPageIdFromRawEvent(rawEvent: MessengerRawEvent): ?string {
    if (rawEvent.message && rawEvent.message.is_echo && rawEvent.sender) {
      return rawEvent.sender.id;
    }
    if (rawEvent.recipient) {
      return rawEvent.recipient.id;
    }
  }

  _isStandby(body: MessengerRequestBody): boolean {
    if (!body.entry) return false;
    const entry = ((body: any): EntryRequestBody).entry[0];

    return !!entry.standby;
  }

  _profilePicExpired(user: { profile_pic: string }): boolean {
    try {
      // Facebook CDN returns expiration time in the key `ext` in url params like:
      // https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=11111111111111&width=1024&ext=1543379908&hash=xxxxxxxxxxxx
      const ext = new URL(user.profile_pic).searchParams.get('ext');

      const timestamp = +ext * 1000;
      const expireTime = new Date(timestamp);
      return !(isValid(expireTime) && isAfter(expireTime, new Date()));
    } catch (e) {
      return true;
    }
  }

  get platform(): string {
    return 'messenger';
  }

  get client(): MessengerClient {
    return this._client;
  }

  get verifyToken(): ?string {
    return this._verifyToken;
  }

  getUniqueSessionKey(body: MessengerRequestBody): ?string {
    const rawEvent = this._getRawEventsFromRequest(body)[0];
    if (
      rawEvent &&
      rawEvent.message &&
      rawEvent.message.is_echo &&
      rawEvent.recipient
    ) {
      return rawEvent.recipient.id;
    }
    if (rawEvent && rawEvent.sender) {
      return rawEvent.sender.id;
    }
    return null;
  }

  async updateSession(
    session: Session,
    body: MessengerRequestBody
  ): Promise<void> {
    if (!session.user || this._profilePicExpired(session.user)) {
      const senderId = this.getUniqueSessionKey(body);

      const rawEvent = this._getRawEventsFromRequest(body)[0];
      const pageId = this._getPageIdFromRawEvent(rawEvent);
      let customAccessToken;

      if (!pageId) {
        warning(false, 'Could not find pageId from request body.');
      } else {
        session.page = {
          id: pageId,
          _updatedAt: new Date().toISOString(),
        };

        if (this._mapPageToAccessToken != null) {
          const mapPageToAccessToken = this._mapPageToAccessToken;
          customAccessToken = await mapPageToAccessToken(pageId);
        }
      }

      // FIXME: refine user
      if (this._skipProfile) {
        session.user = {
          _updatedAt: new Date().toISOString(),
          id: senderId,
        };
      } else {
        let user = {};
        try {
          user = await this._client.getUserProfile(senderId, {
            access_token: customAccessToken,
          });
        } catch (e) {
          warning(
            false,
            'getUserProfile() failed, `session.user` will only have `id`'
          );
          console.error(e);
        }

        session.user = {
          _updatedAt: new Date().toISOString(),
          ...user,
          id: senderId,
        };
      }
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });

    Object.freeze(session.page);
    Object.defineProperty(session, 'page', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.page,
    });
  }

  mapRequestToEvents(body: MessengerRequestBody): Array<MessengerEvent> {
    const rawEvents = this._getRawEventsFromRequest(body);
    const isStandby = this._isStandby(body);

    return rawEvents.map(
      rawEvent =>
        new MessengerEvent(rawEvent, {
          isStandby,
          pageId: this._getPageIdFromRawEvent(rawEvent),
        })
    );
  }

  async createContext(params: {
    event: MessengerEvent,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
    emitter?: ?EventEmitter,
  }): Promise<MessengerContext> {
    let customAccessToken;
    if (this._mapPageToAccessToken) {
      const { rawEvent } = params.event;

      let pageId = null;

      if (rawEvent.message && rawEvent.message.is_echo && rawEvent.sender) {
        pageId = rawEvent.sender.id;
      } else if (rawEvent.recipient) {
        pageId = rawEvent.recipient.id;
      }

      if (!pageId) {
        warning(false, 'Could not find pageId from request body.');
      } else {
        customAccessToken = await this._mapPageToAccessToken(pageId);
      }
    }
    return new MessengerContext({
      ...params,
      client: this._client,
      customAccessToken,
      batchQueue: this._batchQueue,
      appId: this._appId,
    });
  }

  // https://developers.facebook.com/docs/messenger-platform/webhook#security
  verifySignature(rawBody: string, signature: string): boolean {
    if (typeof signature !== 'string') return false;

    const sha1 = signature.split('sha1=')[1];

    if (!sha1) return false;

    const bufferFromSignature = Buffer.from(sha1, 'hex');

    const hashBufferFromBody = crypto
      .createHmac('sha1', this._appSecret)
      .update(rawBody, 'utf8')
      .digest();

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (bufferFromSignature.length !== hashBufferFromBody.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
  }

  preprocess({
    method,
    headers,
    query,
    rawBody,
  }: {
    method: string,
    headers: Object,
    query: Object,
    rawBody: string,
    body: Object,
  }) {
    if (method.toLowerCase() === 'get') {
      if (
        query['hub.mode'] === 'subscribe' &&
        query['hub.verify_token'] === this.verifyToken
      ) {
        return {
          shouldNext: false,
          response: {
            status: 200,
            body: query['hub.challenge'],
          },
        };
      }

      return {
        shouldNext: false,
        response: {
          status: 403,
          body: 'Forbidden',
        },
      };
    }

    if (method.toLowerCase() !== 'post') {
      return {
        shouldNext: true,
      };
    }

    if (this.verifySignature(rawBody, headers['x-hub-signature'])) {
      return {
        shouldNext: true,
      };
    }

    const error = {
      message: 'Messenger Signature Validation Failed!',
      request: {
        rawBody,
        headers: {
          'x-hub-signature': headers['x-hub-signature'],
        },
      },
    };

    return {
      shouldNext: false,
      response: {
        status: 400,
        body: { error },
      },
    };
  }
}
