import crypto from 'crypto';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { ContextOptions } from '../context/Context';

import SmsContext from './SmsContext';
import SmsEvent from './SmsEvent';
import TwilioClient from './TwilioClient';

export type SmsRequestBody = any;

type ConstructorOptionsWithoutClient = {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  origin?: string;
  includeStatusCallback?: boolean;
};

type ConstructorOptionsWithClient = {
  client: TwilioClient;
  origin?: string;
  includeStatusCallback?: boolean;
};

type ConstructorOptions =
  | ConstructorOptionsWithoutClient
  | ConstructorOptionsWithClient;

function getExpectedTwilioSignature(
  authToken: string,
  url: string,
  params: Record<string, any> = {}
) {
  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], url);

  return crypto
    .createHmac('sha1', authToken)
    .update(Buffer.from(data, 'utf-8'))
    .digest('base64');
}

export default class SmsConnector
  implements Connector<SmsRequestBody, TwilioClient> {
  _client: TwilioClient;

  _includeStatusCallback: boolean;

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

    this._includeStatusCallback = options.includeStatusCallback ?? false;
  }

  get platform(): 'sms' {
    return 'sms';
  }

  get client(): TwilioClient {
    return this._client;
  }

  getUniqueSessionKey(body: SmsRequestBody): string {
    return body.smsStatus === 'received' ? body.from : body.to;
  }

  async updateSession(session: Session, body: SmsRequestBody): Promise<void> {
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

  mapRequestToEvents(body: SmsRequestBody): SmsEvent[] {
    return [new SmsEvent(body)];
  }

  createContext(
    params: Omit<ContextOptions<TwilioClient, SmsEvent>, 'client'>
  ): SmsContext {
    return new SmsContext({
      ...params,
      client: this._client,
      includeStatusCallback: this._includeStatusCallback,
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
      message: 'SMS Signature Validation Failed!',
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
