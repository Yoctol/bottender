import { IncomingHttpHeaders } from 'http';

import { JsonObject } from 'type-fest';
import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from 'messaging-api-slack';
import { TelegramClient } from 'messaging-api-telegram';
import { ViberClient } from 'messaging-api-viber';

import ConsoleEvent, { ConsoleRawEvent } from './console/ConsoleEvent';
import Context from './context/Context';
import LineEvent from './line/LineEvent';
import MessengerEvent from './messenger/MessengerEvent';
import SessionStore from './session/SessionStore';
import SlackEvent from './slack/SlackEvent';
import TelegramEvent from './telegram/TelegramEvent';
import TwilioClient from './whatsapp/TwilioClient';
import ViberEvent from './viber/ViberEvent';
import WhatsappEvent from './whatsapp/WhatsappEvent';
import { ConsoleClient } from './console/ConsoleClient';
import { LineConnectorOptions, LineRequestBody } from './line/LineConnector';
import {
  MessengerConnectorOptions,
  MessengerRequestBody,
} from './messenger/MessengerConnector';
import {
  SlackConnectorOptions,
  SlackRequestBody,
} from './slack/SlackConnector';
import {
  TelegramConnectorOptions,
  TelegramRequestBody,
} from './telegram/TelegramConnector';
import {
  ViberConnectorOptions,
  ViberRequestBody,
} from './viber/ViberConnector';
import {
  WhatsappConnectorOptions,
  WhatsappRequestBody,
} from './whatsapp/WhatsappConnector';

export type Client =
  | ConsoleClient
  | MessengerClient
  | LineClient
  | SlackOAuthClient
  | TelegramClient
  | ViberClient
  | TwilioClient;

export type Event =
  | ConsoleEvent
  | MessengerEvent
  | LineEvent
  | SlackEvent
  | TelegramEvent
  | ViberEvent
  | WhatsappEvent;

export type Body =
  | ConsoleRawEvent
  | MessengerRequestBody
  | LineRequestBody
  | SlackRequestBody
  | TelegramRequestBody
  | ViberRequestBody
  | WhatsappRequestBody;

export type AnyContext = Context<any, any>;

export type Action<
  C extends AnyContext,
  P extends Record<string, any> = {},
  RAP extends Record<string, any> = {}
> = (
  context: C,
  props: Props<C> & P
) => void | Action<C, RAP> | Promise<Action<C, RAP> | void>;

export type Props<C extends AnyContext> = {
  next?: Action<C, any>;
  error?: Error;
};

export type Plugin<C extends AnyContext> = (context: C) => void;

export enum Channel {
  Messenger = 'messenger',
  Line = 'line',
  Slack = 'slack',
  Telegram = 'telegram',
  Viber = 'viber',
  Whatsapp = 'whatsapp',
}

export enum SessionDriver {
  Memory = 'memory',
  File = 'file',
  Redis = 'redis',
  Mongo = 'mongo',
}

export type SessionConfig = {
  driver: string;
  expiresIn?: number;
  stores:
    | {
        memory?: {
          maxSize?: number;
        };
        file?: {
          dirname?: string;
        };
        redis?: {
          port?: number;
          host?: string;
          password?: string;
          db?: number;
        };
        mongo?: {
          url?: string;
          collectionName?: string;
        };
      }
    | {
        [P in Exclude<string, SessionDriver>]: SessionStore;
      };
};

type ChannelCommonConfig = {
  enabled: boolean;
  path?: string;
  sync?: boolean;
};

export type BottenderConfig = {
  plugins?: Plugin<any>[];
  session?: SessionConfig;
  initialState?: Record<string, any>;
  channels?: {
    [Channel.Messenger]: MessengerConnectorOptions & ChannelCommonConfig;
    [Channel.Line]: LineConnectorOptions & ChannelCommonConfig;
    [Channel.Telegram]: TelegramConnectorOptions & ChannelCommonConfig;
    [Channel.Slack]: SlackConnectorOptions & ChannelCommonConfig;
    [Channel.Viber]: ViberConnectorOptions & ChannelCommonConfig;
    [Channel.Whatsapp]: WhatsappConnectorOptions & ChannelCommonConfig;
  };
};

export type RequestContext<
  B extends JsonObject = JsonObject,
  H extends Record<string, string | string[] | undefined> = {}
> = {
  method: string;
  path: string;
  query: Record<string, string>;
  headers: IncomingHttpHeaders & H;
  rawBody: string;
  body: B;
  params: Record<string, string>;
  url: string;
};
