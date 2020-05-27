import { IncomingHttpHeaders } from 'http';

import { JsonObject } from 'type-fest';

import Context from './context/Context';
import SessionStore from './session/SessionStore';
import { Connector } from './bot/Connector';
import { LineConnectorOptions } from './line/LineConnector';
import { MessengerConnectorOptions } from './messenger/MessengerConnector';
import { OnRequest } from './bot/Bot';
import { SlackConnectorOptions } from './slack/SlackConnector';
import { TelegramConnectorOptions } from './telegram/TelegramConnector';
import { ViberConnectorOptions } from './viber/ViberConnector';
import { WhatsappConnectorOptions } from './whatsapp/WhatsappConnector';

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
        [P in Exclude<string, SessionDriver>]?: SessionStore;
      };
};

type ChannelCommonConfig = {
  enabled: boolean;
  path?: string;
  sync?: boolean;
  onRequest?: OnRequest;
};

export type BottenderConfig = {
  plugins?: Plugin<any>[];
  session?: SessionConfig;
  initialState?: Record<string, any>;
  channels?:
    | {
        messenger?: MessengerConnectorOptions & ChannelCommonConfig;
        line?: LineConnectorOptions & ChannelCommonConfig;
        telegram?: TelegramConnectorOptions & ChannelCommonConfig;
        slack?: SlackConnectorOptions & ChannelCommonConfig;
        viber?: ViberConnectorOptions & ChannelCommonConfig;
        whatsapp?: WhatsappConnectorOptions & ChannelCommonConfig;
      }
    | {
        [key in Exclude<
          string,
          'messenger' | 'line' | 'telegram' | 'slack' | 'viber' | 'whatsapp'
        >]?: {
          connector: Connector<any, any>;
        } & ChannelCommonConfig;
      };
};

export type RequestContext<
  B extends JsonObject = JsonObject,
  H extends Record<string, string | string[] | undefined> = {}
> = {
  id?: string;
  method: string;
  path: string;
  query: Record<string, string>;
  headers: IncomingHttpHeaders & H;
  rawBody: string;
  body: B;
  params: Record<string, string>;
  url: string;
};

export type Client = object;

export { Event } from './context/Event';
