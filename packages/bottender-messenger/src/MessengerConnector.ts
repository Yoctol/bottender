import { EventEmitter } from 'events';

import warning from 'warning';
import { Connector, Session } from '@bottender/core';
import { JsonObject } from 'type-fest';
import { MessengerClient } from 'messaging-api-messenger';

import FacebookBaseConnector, {
  FacebookBaseConnectorOptions,
} from './FacebookBaseConnector';
import MessengerContext from './MessengerContext';
import MessengerEvent from './MessengerEvent';
import {
  MessengerRawEvent,
  MessengerRequestBody,
  MessengerRequestContext,
} from './MessengerTypes';

export type MessengerConnectorOptions =
  FacebookBaseConnectorOptions<MessengerClient> & {
    mapPageToAccessToken?: (pageId: string) => Promise<string>;
  };

export default class MessengerConnector
  extends FacebookBaseConnector<MessengerRequestBody, MessengerClient>
  implements Connector<MessengerRequestBody, MessengerClient>
{
  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  constructor(options: MessengerConnectorOptions) {
    super({
      ...options,
      ClientClass: MessengerClient,
    });

    const { mapPageToAccessToken } = options;

    this._mapPageToAccessToken = mapPageToAccessToken ?? null;
  }

  _getRawEventsFromRequest(body: MessengerRequestBody): MessengerRawEvent[] {
    if ('entry' in body) {
      return body.entry
        .map((entry) => {
          if ('messaging' in entry) {
            return entry.messaging[0] as MessengerRawEvent;
          }

          if ('standby' in entry) {
            return entry.standby[0] as MessengerRawEvent;
          }

          // for Webhook Test button request and other page events
          return null;
        })
        .filter((event): event is MessengerRawEvent => event != null);
    }

    // FIXME
    return [body as unknown as MessengerRawEvent];
  }

  _getPageIdFromRawEvent(rawEvent: MessengerRawEvent): string | null {
    if ('message' in rawEvent && rawEvent.message.isEcho && rawEvent.sender) {
      return rawEvent.sender.id;
    }
    if (rawEvent.recipient) {
      return rawEvent.recipient.id;
    }

    return null;
  }

  _isStandby(body: MessengerRequestBody): boolean {
    if (!('entry' in body)) return false;

    const entry = body.entry[0];

    return 'standby' in entry;
  }

  get platform(): 'messenger' {
    return 'messenger';
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
      'message' in rawEvent &&
      rawEvent.message.isEcho &&
      rawEvent.recipient
    ) {
      return rawEvent.recipient.id;
    }
    if (rawEvent && 'sender' in rawEvent) {
      return rawEvent.sender.id;
    }
    return null;
  }

  async updateSession(
    session: Session<{ user: { id: string; _updatedAt: string } }>,
    bodyOrEvent: MessengerRequestBody | MessengerEvent
  ): Promise<void> {
    if (!session.user) {
      const senderId = this.getUniqueSessionKey(bodyOrEvent);

      const rawEvent =
        bodyOrEvent instanceof MessengerEvent
          ? bodyOrEvent.rawEvent
          : this._getRawEventsFromRequest(bodyOrEvent)[0];

      // TODO: use this info from event
      const pageId = this._getPageIdFromRawEvent(rawEvent);

      if (!pageId) {
        warning(false, 'Could not find pageId from request body.');
      } else {
        session.page = {
          id: pageId,
          _updatedAt: new Date().toISOString(),
        };
      }

      session.user = {
        _updatedAt: new Date().toISOString(),
        id: senderId as string, // FIXME
      };
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
      (rawEvent) =>
        new MessengerEvent(rawEvent, {
          isStandby,
          pageId: this._getPageIdFromRawEvent(rawEvent),
        })
    );
  }

  async createContext(params: {
    event: MessengerEvent;
    session?: Session<{ user: { id: string; _updatedAt: string } }>;
    initialState?: JsonObject;
    requestContext?: MessengerRequestContext;
    emitter?: EventEmitter;
  }): Promise<MessengerContext> {
    let customAccessToken;
    if (this._mapPageToAccessToken) {
      const { rawEvent } = params.event;

      let pageId = null;

      if ('message' in rawEvent && rawEvent.message.isEcho && rawEvent.sender) {
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

    let client;
    if (customAccessToken) {
      client = new MessengerClient({
        accessToken: customAccessToken,
        appSecret: this._appSecret,
        origin: this._origin,
        skipAppSecretProof: this._skipAppSecretProof,
      });
    } else {
      client = this._client;
    }

    return new MessengerContext({
      ...params,
      client,
      customAccessToken,
      batchQueue: this._batchQueue,
      appId: this._appId,
    });
  }
}
