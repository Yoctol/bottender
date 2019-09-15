import EventEmitter from 'events';
import crypto from 'crypto';

import { ViberClient } from 'messaging-api-viber';
import { addedDiff } from 'deep-object-diff';

import ViberContext from '../context/ViberContext';
import ViberEvent, { ViberRawEvent } from '../context/ViberEvent';
import Session from '../session/Session';

import { Connector } from './Connector';

export type ViberRequestBody = ViberRawEvent;

type ConstructorOptions = {
  accessToken?: string,
  client?: ViberClient,
  origin?: string,
};

export default class ViberConnector implements Connector<ViberRequestBody> {
  _accessToken: ?string;

  _client: ViberClient;

  constructor({ accessToken, client, origin }: ConstructorOptions) {
    this._accessToken = accessToken;
    this._client =
      client ||
      ViberClient.connect({
        accessToken,
        origin,
      });
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
        return body.user_id;
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
          id: body.user_id,
        };
        break;
      case 'message':
        user = body.sender;
        break;
      default:
        break;
    }

    if (Object.keys(addedDiff(session.user || {}, user)).length > 0) {
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

  mapRequestToEvents(body: ViberRequestBody): Array<ViberEvent> {
    const rawEvent = this._getRawEventFromRequest(body);
    return [new ViberEvent(rawEvent)];
  }

  createContext(params: {
    event: ViberEvent,
    session?: Session,
    initialState?: Object,
    requestContext?: Object,
    emitter?: EventEmitter,
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
    method: string,
    headers: Object,
    query: Object,
    rawBody: string,
    body: Object,
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
