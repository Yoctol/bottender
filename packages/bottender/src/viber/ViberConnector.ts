import crypto from 'crypto';
import { EventEmitter } from 'events';

import invariant from 'invariant';
import { JsonObject } from 'type-fest';
import { ViberClient } from 'messaging-api-viber';
import { addedDiff } from 'deep-object-diff';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';

import ViberContext from './ViberContext';
import ViberEvent from './ViberEvent';
import {
  Sender,
  ViberRawEvent,
  ViberRequestBody,
  ViberRequestContext,
} from './ViberTypes';

type ConnectorOptionsWithoutClient = {
  accessToken: string;
  sender: Sender;
  origin?: string;
  skipLegacyProfile?: boolean;
};

type ConnectorOptionsWithClient = {
  client: ViberClient;
  skipLegacyProfile?: boolean;
};

export type ViberConnectorOptions =
  | ConnectorOptionsWithoutClient
  | ConnectorOptionsWithClient;

export default class ViberConnector
  implements Connector<ViberRequestBody, ViberClient>
{
  _accessToken: string;

  _client: ViberClient;

  _skipLegacyProfile: boolean;

  constructor(options: ViberConnectorOptions) {
    const { skipLegacyProfile } = options;
    if ('client' in options) {
      this._client = options.client;
      this._accessToken = this._client.accessToken;
    } else {
      const { accessToken, sender, origin } = options;

      invariant(
        options.accessToken,
        'Viber access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );

      this._client = new ViberClient({
        accessToken,
        sender,
        origin,
      });
      this._accessToken = accessToken;
    }

    this._skipLegacyProfile =
      typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
  }

  _getRawEventFromRequest(body: ViberRequestBody): ViberRawEvent {
    return body;
  }

  get platform(): 'viber' {
    return 'viber';
  }

  get client(): ViberClient {
    return this._client;
  }

  getUniqueSessionKey(body: ViberRequestBody): string {
    switch (body.event) {
      case 'subscribed':
      case 'conversation_started':
        return body.user.id;
      case 'unsubscribed':
      case 'delivered':
      case 'seen':
      case 'failed':
        return body.userId;
      case 'message':
        return body.sender.id;
      default:
        return '';
    }
  }

  async updateSession(session: Session, body: ViberRequestBody): Promise<void> {
    let user;

    switch (body.event) {
      case 'subscribed':
      case 'conversation_started':
        user = body.user;
        break;
      case 'unsubscribed':
      case 'delivered':
      case 'seen':
      case 'failed':
        user = {
          id: body.userId,
        };
        break;
      case 'message':
        user = body.sender;
        break;
      default:
        break;
    }

    if (this._skipLegacyProfile) {
      session.user = {
        _updatedAt: new Date().toISOString(),
        id: (user || {}).id,
      };
    } else if (
      Object.keys(addedDiff(session.user || {}, user as any)).length > 0
    ) {
      session.user = {
        ...session.user,
        ...user,
      };
      session.user._updatedAt = new Date().toISOString();
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: ViberRequestBody): ViberEvent[] {
    const rawEvent = this._getRawEventFromRequest(body);
    return [new ViberEvent(rawEvent)];
  }

  createContext(params: {
    event: ViberEvent;
    session: Session | null;
    initialState?: JsonObject | null;
    requestContext?: ViberRequestContext;
    emitter?: EventEmitter | null;
  }): ViberContext {
    return new ViberContext({
      ...params,
      client: this._client,
    });
  }

  verifySignature(rawBody: string, signature: string): boolean {
    const hashBufferFromBody = crypto
      .createHmac('sha256', this._accessToken || '')
      .update(rawBody)
      .digest();

    const bufferFromSignature = Buffer.from(signature, 'hex');

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (bufferFromSignature.length !== hashBufferFromBody.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
  }

  preprocess({ method, headers, rawBody }: ViberRequestContext) {
    if (
      method.toLowerCase() !== 'post' ||
      (headers['x-viber-content-signature'] &&
        this.verifySignature(rawBody, headers['x-viber-content-signature']))
    ) {
      return {
        shouldNext: true,
      };
    }

    const error = {
      message: 'Viber Signature Validation Failed!',
      request: {
        rawBody,
        headers: {
          'x-viber-content-signature': headers['x-viber-content-signature'],
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
