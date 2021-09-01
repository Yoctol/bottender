import { EventEmitter } from 'events';

import { validateRequest, validateRequestWithBody } from 'twilio';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import TwilioClient from './TwilioClient';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';

export type WhatsappRequestBody = any;

type ConstructorOptionsWithoutClient = {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  origin?: string;
};

type ConstructorOptionsWithClient = {
  client: TwilioClient;
  origin?: string;
};

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

export default class WhatsappConnector
  implements Connector<WhatsappRequestBody, TwilioClient> {
  _client: TwilioClient;

  constructor(options: ConstructorOptions) {
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accountSid, authToken, phoneNumber, origin } = options;

      this._client = TwilioClient.connect({
        accountSid,
        authToken,
        phoneNumber,
        origin,
      });
    }
  }

  get platform(): string {
    return 'whatsapp';
  }

  get client(): TwilioClient {
    return this._client;
  }

  getUniqueSessionKey(body: WhatsappRequestBody): string {
    return body.smsStatus === 'received' ? body.from : body.to;
  }

  async updateSession(
    session: Session,
    body: WhatsappRequestBody
  ): Promise<void> {
    const userId = body.smsStatus === 'received' ? body.from : body.to;

    session.user = {
      _updatedAt: new Date().toISOString(),
      id: userId,
    };

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: WhatsappRequestBody): WhatsappEvent[] {
    return [new WhatsappEvent(body)];
  }

  createContext(params: {
    event: WhatsappEvent;
    session: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
  }): WhatsappContext {
    return new WhatsappContext({
      ...params,
      client: this._client,
    });
  }

  verifySignature({
    body,
    url,
    headers,
  }: {
    headers: Record<string, any>;
    url: string;
    body: Record<string, any>;
  }): boolean {
    const authToken = this._client.authToken;

    if (url.indexOf('bodySHA256') > 0) {
      return validateRequestWithBody(
        authToken,
        headers['x-twilio-signature'],
        url,
        body || {}
      );
    }

    return validateRequest(
      authToken,
      headers['x-twilio-signature'],
      url,
      body || {}
    );
  }

  preprocess({
    url,
    headers,
    rawBody,
    body,
  }: {
    method: string;
    url: string;
    headers: Record<string, any>;
    query: Record<string, any>;
    rawBody: string;
    body: Record<string, any>;
  }) {
    if (this.verifySignature({ body, url, headers })) {
      return {
        shouldNext: true,
      };
    }

    const error = {
      message: 'WhatsApp Signature Validation Failed!',
      request: {
        rawBody,
        headers: {
          'x-twilio-signature': headers['x-twilio-signature'],
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
