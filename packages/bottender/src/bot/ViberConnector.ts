import EventEmitter from 'events';
import crypto from 'crypto';

import { ViberClient, ViberTypes } from 'messaging-api-viber';
import { addedDiff } from 'deep-object-diff';

import Session from '../session/Session';
import ViberContext from '../context/ViberContext';
import ViberEvent, { ViberRawEvent } from '../context/ViberEvent';
import { RequestContext } from '../types';

import { Connector } from './Connector';

export type ViberRequestBody = ViberRawEvent;

type ConstructorOptionsWithoutClient = {
  accessToken: string;
  sender: ViberTypes.Sender;
  origin?: string;
};

type ConstructorOptionsWithClient = {
  client: ViberClient;
};

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class ViberConnector
  implements Connector<ViberRequestBody, ViberClient> {
  _accessToken: string;

  _client: ViberClient;

  constructor(options: ConstructorOptions) {
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accessToken, sender, origin } = options;

      this._client = ViberClient.connect(
        {
          accessToken,
          sender,
          origin,
        },
        sender
      );
    }

    this._accessToken = this._client.accessToken;
  }

  _getRawEventFromRequest(body: ViberRequestBody): ViberRawEvent {
    return body;
  }

  get platform(): string {
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

    if (Object.keys(addedDiff(session.user || {}, user as any)).length > 0) {
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
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
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

  preprocess({
    method,
    headers,
    rawBody,
  }: {
    method: string;
    headers: Record<string, any>;
    query: Record<string, any>;
    rawBody: string;
    body: Record<string, any>;
  }) {
    if (
      method.toLowerCase() !== 'post' ||
      this.verifySignature(rawBody, headers['x-viber-content-signature'])
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
