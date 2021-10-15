import { Bot, Connector, OnRequest, SessionStore } from '@bottender/core';
import { JsonObject } from 'type-fest';
import { LineTypes } from '@bottender/line';
import { MessengerTypes } from '@bottender/messenger';
import { SlackTypes } from '@bottender/slack';
import { TelegramTypes } from '@bottender/telegram';
import { ViberTypes } from '@bottender/viber';
import { WhatsappTypes } from '@bottender/whatsapp';

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
        // TODO: extend from @bottender/*
        messenger?: MessengerTypes.MessengerConnectorOptions &
          ChannelCommonConfig;
        line?: LineTypes.LineConnectorOptions & ChannelCommonConfig;
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

export { Event, RequestContext, Action, Props, Client } from '@bottender/core';

export type ChannelBot = {
  webhookPath: string;
  bot: Bot<any, any, any, any>;
};
