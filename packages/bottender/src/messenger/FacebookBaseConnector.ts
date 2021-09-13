import crypto from 'crypto';

import invariant from 'invariant';
import shortid from 'shortid';
import { BatchConfig, FacebookBatchQueue } from 'facebook-batch';
import { JsonObject } from 'type-fest';
import { MessengerClient } from 'messaging-api-messenger';

import { RequestContext } from '../types';

type CommonConnectorOptions = {
  appId: string;
  appSecret: string;
  verifyToken?: string;
  batchConfig?: BatchConfig;
  mapPageToAccessToken?: (pageId: string) => Promise<string>;
};

type ConnectorOptionsWithoutClient = {
  ClientClass: typeof MessengerClient;
  accessToken?: string;
  origin?: string;
  skipAppSecretProof?: boolean;
} & CommonConnectorOptions;

type ConnectorOptionsWithClient<C extends MessengerClient> = {
  client: C;
} & CommonConnectorOptions;

export type FacebookBaseConnectorOptions<C extends MessengerClient> =
  | ConnectorOptionsWithoutClient
  | ConnectorOptionsWithClient<C>;

export default class FacebookBaseConnector<
  RequestBody extends JsonObject,
  Client extends MessengerClient
> {
  _client: Client;

  _appId: string;

  _appSecret: string;

  _origin: string | undefined = undefined;

  _skipAppSecretProof: boolean | undefined = undefined;

  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  _verifyToken: string | null = null;

  _batchConfig: BatchConfig | null = null;

  _batchQueue: FacebookBatchQueue | null = null;

  constructor(options: FacebookBaseConnectorOptions<Client>) {
    const { appId, appSecret, mapPageToAccessToken, verifyToken } = options;

    if ('client' in options) {
      this._client = options.client;

      // In the future, batch would be handled by client itself internally.
      this._batchConfig = null;
    } else {
      const {
        ClientClass,
        accessToken,
        origin,
        skipAppSecretProof,
        batchConfig,
      } = options;

      invariant(
        accessToken || mapPageToAccessToken,
        'Facebook access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );
      invariant(
        appSecret,
        'Facebook app secret is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.'
      );

      const clientConfig = {
        accessToken: accessToken || '',
        appSecret,
        origin,
        skipAppSecretProof,
      };

      this._client = new ClientClass(clientConfig) as Client;

      this._batchConfig = batchConfig || null;
      if (this._batchConfig) {
        this._batchQueue = new FacebookBatchQueue(
          clientConfig,
          this._batchConfig
        );
      }

      this._origin = origin;
      this._skipAppSecretProof = skipAppSecretProof;
    }

    this._appId = appId;
    this._appSecret = appSecret;

    this._mapPageToAccessToken = mapPageToAccessToken || null;
    this._verifyToken = verifyToken || shortid.generate();
  }

  get client(): Client {
    return this._client;
  }

  get verifyToken(): string | null {
    return this._verifyToken;
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
  }: RequestContext<RequestBody, { 'x-hub-signature'?: string }>) {
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

    if (
      headers['x-hub-signature'] &&
      this.verifySignature(rawBody, headers['x-hub-signature'])
    ) {
      return {
        shouldNext: true,
      };
    }

    const error = {
      message: 'Facebook Signature Validation Failed!',
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
