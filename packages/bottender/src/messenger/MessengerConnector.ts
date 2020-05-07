import crypto from 'crypto';
import { EventEmitter } from 'events';
import { URL } from 'url';

import invariant from 'invariant';
import isAfter from 'date-fns/isAfter';
import isValid from 'date-fns/isValid';
import shortid from 'shortid';
import warning from 'warning';
import { MessengerBatchQueue } from 'messenger-batch';
import { MessengerClient } from 'messaging-api-messenger';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import MessengerContext from './MessengerContext';
import MessengerEvent, {
  AppRoles,
  Message,
  MessengerRawEvent,
  PassThreadControl,
  PolicyEnforcement,
  Postback,
  Recipient,
  Sender,
  TakeThreadControl,
} from './MessengerEvent';

type Entry = {
  [key in 'messaging' | 'standby' | 'changes']: {
    sender: Sender;
    recipient: Recipient;
    timestamp: number;
    postback?: Postback;
    message?: Message;
    field?: string;
    value?: Record<string, any>;
  }[];
};

type EntryRequestBody = {
  type: string;
  entry: Entry[];
};

type PolicyEnforcementRequestBody = {
  recipient: Recipient;
  timestamp: number;
  'policy-enforcement': PolicyEnforcement;
};

type AppRolesRequestBody = {
  recipient: Recipient;
  timestamp: number;
  appRoles: AppRoles;
};

type PassThreadControlRequestBody = {
  sender: Sender;
  recipient: Recipient;
  timestamp: number;
  passThreadControl: PassThreadControl;
};

type TakeThreadControlRequestBody = {
  sender: Sender;
  recipient: Recipient;
  timestamp: number;
  takeThreadControl: TakeThreadControl;
};

export type MessengerRequestBody =
  | EntryRequestBody
  | PolicyEnforcementRequestBody
  | AppRolesRequestBody
  | PassThreadControlRequestBody
  | TakeThreadControlRequestBody;

type CommonConstructorOptions = {
  appId: string;
  appSecret: string;
  verifyToken?: string;
  batchConfig?: Record<string, any>;
  skipLegacyProfile?: boolean;
  mapPageToAccessToken?: (pageId: string) => Promise<string>;
};

type ConstructorOptionsWithoutClient = {
  accessToken?: string;
  origin?: string;
  skipAppSecretProof?: boolean;
} & CommonConstructorOptions;

type ConstructorOptionsWithClient = {
  client: MessengerClient;
} & CommonConstructorOptions;

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class MessengerConnector
  implements Connector<MessengerRequestBody, MessengerClient> {
  _client: MessengerClient;

  _appId: string;

  _appSecret: string;

  _skipLegacyProfile: boolean;

  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  _verifyToken: string | null = null;

  _batchConfig: Record<string, any> | null = null;

  _batchQueue: Record<string, any> | null = null;

  constructor(options: ConstructorOptions) {
    const {
      appId,
      appSecret,
      mapPageToAccessToken,
      verifyToken,
      batchConfig,

      skipLegacyProfile,
    } = options;

    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, origin, skipAppSecretProof } = options;

      invariant(
        accessToken || mapPageToAccessToken,
        'Messenger access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );
      invariant(
        appSecret,
        'Messenger app secret is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );

      this._client = MessengerClient.connect({
        accessToken: accessToken || '',
        appSecret,
        origin,
        skipAppSecretProof,
      });
    }

    this._appId = appId;
    this._appSecret = appSecret;

    this._mapPageToAccessToken = mapPageToAccessToken || null;
    this._verifyToken = verifyToken || shortid.generate();

    this._skipLegacyProfile =
      typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;

    this._batchConfig = batchConfig || null;
    if (this._batchConfig) {
      this._batchQueue = new MessengerBatchQueue(
        this._client,
        this._batchConfig
      );
    }
  }

  _getRawEventsFromRequest(body: MessengerRequestBody): MessengerRawEvent[] {
    if ('entry' in body) {
      const { entry } = body as EntryRequestBody;

      return entry
        .map(ent => {
          if (ent.messaging) {
            return ent.messaging[0] as MessengerRawEvent;
          }

          if (ent.standby) {
            return ent.standby[0] as MessengerRawEvent;
          }

          // for Webhook Test button request and other page events
          if (ent.changes) {
            return ent.changes[0] as MessengerRawEvent;
          }

          return null;
        })
        .filter(event => event != null) as MessengerRawEvent[];
    }

    return [body as MessengerRawEvent];
  }

  _getPageIdFromRawEvent(rawEvent: MessengerRawEvent): string | null {
    if (rawEvent.message && rawEvent.message.isEcho && rawEvent.sender) {
      return rawEvent.sender.id;
    }
    if (rawEvent.recipient) {
      return rawEvent.recipient.id;
    }

    return null;
  }

  _isStandby(body: MessengerRequestBody): boolean {
    if (!('entry' in body)) return false;
    const entry = (body as EntryRequestBody).entry[0];

    return !!entry.standby;
  }

  _profilePicExpired(user: { profilePic: string }): boolean {
    try {
      // Facebook CDN returns expiration time in the key `ext` in URL params like:
      // https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=11111111111111&width=1024&ext=1543379908&hash=xxxxxxxxxxxx
      const ext = new URL(user.profilePic).searchParams.get('ext');

      if (!ext) return true;

      const timestamp = +ext * 1000;
      const expireTime = new Date(timestamp);
      return !(isValid(expireTime) && isAfter(expireTime, new Date()));
    } catch (e) {
      return true;
    }
  }

  get platform(): 'messenger' {
    return 'messenger';
  }

  get client(): MessengerClient {
    return this._client;
  }

  get verifyToken(): string | null {
    return this._verifyToken;
  }

  getUniqueSessionKey(
    bodyOrEvent: MessengerRequestBody | MessengerEvent
  ): string | null {
    const rawEvent =
      bodyOrEvent instanceof MessengerEvent
        ? bodyOrEvent.rawEvent
        : this._getRawEventsFromRequest(bodyOrEvent)[0];
    if (
      rawEvent &&
      rawEvent.message &&
      rawEvent.message.isEcho &&
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
    bodyOrEvent: MessengerRequestBody | MessengerEvent
  ): Promise<void> {
    if (!session.user || this._profilePicExpired(session.user)) {
      const senderId = this.getUniqueSessionKey(bodyOrEvent);

      const rawEvent =
        bodyOrEvent instanceof MessengerEvent
          ? bodyOrEvent.rawEvent
          : this._getRawEventsFromRequest(bodyOrEvent)[0];

      // TODO: use this info from event
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
      if (this._skipLegacyProfile) {
        session.user = {
          _updatedAt: new Date().toISOString(),
          id: senderId,
        };
      } else {
        let user = {};
        try {
          user = await this._client.getUserProfile(senderId as any, {
            accessToken: customAccessToken,
          });
        } catch (err) {
          warning(
            false,
            'getUserProfile() failed, `session.user` will only have `id`'
          );
          console.error(err);
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

  mapRequestToEvents(body: MessengerRequestBody): MessengerEvent[] {
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
    event: MessengerEvent;
    session?: Session;
    initialState?: Record<string, any>;
    requestContext?: RequestContext;
    emitter?: EventEmitter;
  }): Promise<MessengerContext> {
    let customAccessToken;
    if (this._mapPageToAccessToken) {
      const { rawEvent } = params.event;

      let pageId = null;

      if (rawEvent.message && rawEvent.message.isEcho && rawEvent.sender) {
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
    method: string;
    headers: Record<string, any>;
    query: Record<string, any>;
    rawBody: string;
    body: Record<string, any>;
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
