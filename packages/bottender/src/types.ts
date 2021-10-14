import { IncomingHttpHeaders } from 'http';

import { JsonObject } from 'type-fest';
import { SlackTypes } from '@bottender/slack';
import { TelegramTypes } from '@bottender/telegram';
import { ViberTypes } from '@bottender/viber';
import { WhatsappTypes } from '@bottender/whatsapp';

import Bot, { OnRequest } from './bot/Bot';
import Context from './context/Context';
import SessionStore from './session/SessionStore';
import { Connector } from './bot/Connector';
import { LineConnectorOptions } from './line/LineConnector';
import { MessengerConnectorOptions } from './messenger/MessengerConnector';

export type Action<
  C extends Context,
  P extends Record<string, any> = {},
  RAP extends Record<string, any> = {}
> = (
  context: C,
  props: Props<C> & P
) => void | Action<C, RAP> | Promise<Action<C, RAP> | void>;

export type Props<C extends Context> = {
  next?: Action<C, any>;
  error?: Error;
};

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

export interface BottenderConfig {
  session?: SessionConfig;
  initialState?: JsonObject;
  channels?:
    | {
        messenger?: MessengerConnectorOptions & ChannelCommonConfig;
        line?: LineConnectorOptions & ChannelCommonConfig;
        // TODO: extend from @bottender/*
        telegram?: TelegramTypes.TelegramConnectorOptions & ChannelCommonConfig;
        slack?: SlackTypes.SlackConnectorOptions & ChannelCommonConfig;
        viber?: ViberTypes.ViberConnectorOptions & ChannelCommonConfig;
        whatsapp?: WhatsappTypes.WhatsappConnectorOptions & ChannelCommonConfig;
      }
    | {
        [key in Exclude<
          string,
          'messenger' | 'line' | 'telegram' | 'slack' | 'viber' | 'whatsapp'
        >]?: {
          connector: Connector<any, any>;
        } & ChannelCommonConfig;
      };
}

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

export type ChannelBot = {
  webhookPath: string;
  bot: Bot<any, any, any, any>;
};
