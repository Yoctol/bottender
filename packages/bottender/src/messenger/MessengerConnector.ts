import { EventEmitter } from 'events';
import { URL } from 'url';

import isAfter from 'date-fns/isAfter';
import isValid from 'date-fns/isValid';
import warning from 'warning';
import { JsonObject } from 'type-fest';
import { MessengerClient } from 'messaging-api-messenger';

import Session from '../session/Session';
import { Connector } from '../bot/Connector';

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

export type MessengerConnectorOptions = FacebookBaseConnectorOptions<
  MessengerClient
> & {
  skipLegacyProfile?: boolean;
  mapPageToAccessToken?: (pageId: string) => Promise<string>;
};

export default class MessengerConnector
  extends FacebookBaseConnector<MessengerRequestBody, MessengerClient>
  implements Connector<MessengerRequestBody, MessengerClient> {
  _skipLegacyProfile: boolean;

  _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null = null;

  constructor(options: MessengerConnectorOptions) {
    super({
      ...options,
      ClientClass: MessengerClient,
    });

    const { mapPageToAccessToken, skipLegacyProfile } = options;

    this._mapPageToAccessToken = mapPageToAccessToken || null;

    this._skipLegacyProfile =
      typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
  }

  _getRawEventsFromRequest(body: MessengerRequestBody): MessengerRawEvent[] {
    if ('entry' in body) {
      return body.entry
        .map(entry => {
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

    return [body as MessengerRawEvent];
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
    return new MessengerContext({
      ...params,
      client: this._client,
      customAccessToken,
      batchQueue: this._batchQueue,
      appId: this._appId,
    });
  }
}
