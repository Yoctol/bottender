import crypto from 'crypto';
import { EventEmitter } from 'events';

import { JsonObject } from 'type-fest';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';

import TwilioClient from './TwilioClient';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';
import { WhatsappRequestBody, WhatsappRequestContext } from './WhatsappTypes';

type ConnectorOptionsWithoutClient = {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  origin?: string;
};

type ConnectorOptionsWithClient = {
  client: TwilioClient;
  origin?: string;
};

export type WhatsappConnectorOptions =
  | ConnectorOptionsWithoutClient
  | ConnectorOptionsWithClient;

function getExpectedTwilioSignature(
  authToken: string,
  url: string,
  params: Record<string, string> = {}
) {
  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], url);

  return crypto
    .createHmac('sha1', authToken)
    .update(Buffer.from(data, 'utf-8'))
    .digest('base64');
}

export default class WhatsappConnector
  implements Connector<WhatsappRequestBody, TwilioClient>
{
  _client: TwilioClient;

  constructor(options: WhatsappConnectorOptions) {
    if ('client' in options) {
      this._client = options.client;
    } else {
      const { accountSid, authToken, phoneNumber, origin } = options;

      this._client = new TwilioClient({
        accountSid,
        authToken,
        phoneNumber,
        origin,
      });
    }
  }

  get platform(): 'whatsapp' {
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
    initialState?: JsonObject | null;
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
    headers: WhatsappRequestContext['headers'];
    url: string;
    body: WhatsappRequestBody;
  }): boolean {
    if (!headers['x-twilio-signature']) {
      return false;
    }
    const authToken = this._client.authToken;

    const bufferFromActualSignature = Buffer.from(
      headers['x-twilio-signature']
    );

    const bufferFromExpectedSignature = Buffer.from(
      getExpectedTwilioSignature(authToken, url, body)
    );

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (
      bufferFromActualSignature.length !== bufferFromExpectedSignature.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(
      bufferFromActualSignature,
      bufferFromExpectedSignature
    );
  }

  preprocess({ url, headers, rawBody, body }: WhatsappRequestContext) {
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
