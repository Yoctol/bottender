import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from 'messaging-api-slack';
import { TelegramClient } from 'messaging-api-telegram';
import { ViberClient } from 'messaging-api-viber';

import ConsoleEvent, { ConsoleRawEvent } from './context/ConsoleEvent';
import Context from './context/Context';
import LineEvent from './context/LineEvent';
import MessengerEvent from './context/MessengerEvent';
import SlackEvent from './context/SlackEvent';
import TelegramEvent from './context/TelegramEvent';
import ViberEvent from './context/ViberEvent';
import { ConsoleClient } from './context/ConsoleClient';
import { LineRequestBody } from './bot/LineConnector';
import { MessengerRequestBody } from './bot/MessengerConnector';
import { SlackRequestBody } from './bot/SlackConnector';
import { TelegramRequestBody } from './bot/TelegramConnector';
import { ViberRequestBody } from './bot/ViberConnector';

export type Client =
  | ConsoleClient
  | MessengerClient
  | LineClient
  | SlackOAuthClient
  | TelegramClient
  | ViberClient;

export type Event =
  | ConsoleEvent
  | MessengerEvent
  | LineEvent
  | SlackEvent
  | TelegramEvent
  | ViberEvent;

export type Body =
  | ConsoleRawEvent
  | MessengerRequestBody
  | LineRequestBody
  | SlackRequestBody
  | TelegramRequestBody
  | ViberRequestBody;

export type Action<C extends Client, E extends Event> = (
  context: Context<C, E>,
  props?: Props<C, E>
) => void | Action<C, E> | Promise<Action<C, E> | void>;

export type Props<C extends Client, E extends Event> = {
  next?: Action<C, E>;
  error?: Error;
  [key: string]: any;
};

export type Plugin<C extends Client, E extends Event> = (
  context: Context<C, E>
) => void;

export enum Channel {
  Messenger = 'messenger',
  Line = 'line',
  Slack = 'slack',
  Telegram = 'telegram',
  Viber = 'viber',
}

export enum SessionDriver {
  Memory = 'memory',
  File = 'file',
  Redis = 'redis',
  Mongo = 'mongo',
}

export type BottenderConfig = {
  plugins?: any[];
  session?: {
    driver: SessionDriver;
    expiresIn?: number;
    stores: {
      memory: {
        maxSize?: number;
      };
      file: {
        dirname?: string;
      };
      redis: {
        port?: number;
        host?: string;
        password?: string;
        db: number;
      };
      mongo: {
        url: string;
        collectionName?: string;
      };
    };
  };
  initialState?: Record<string, any>;
  channels?: {
    [Channel.Messenger]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      verifyToken: string;
      appId: string;
      appSecret: string;
    };
    [Channel.Line]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      channelSecret: string;
    };
    [Channel.Telegram]: {
      enabled: boolean;
      path: string;
      accessToken: string;
    };
    [Channel.Slack]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      verificationToken: string;
    };
    [Channel.Viber]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      sender: {
        name: string;
      };
    };
  };
};
