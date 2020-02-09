import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from 'messaging-api-slack';
import { TelegramClient } from 'messaging-api-telegram';
import { ViberClient } from 'messaging-api-viber';

import ConsoleEvent, { ConsoleRawEvent } from './console/ConsoleEvent';
import Context from './context/Context';
import LineEvent from './line/LineEvent';
import MessengerEvent from './messenger/MessengerEvent';
import SlackEvent from './slack/SlackEvent';
import TelegramEvent from './telegram/TelegramEvent';
import ViberEvent from './viber/ViberEvent';
import { ConsoleClient } from './console/ConsoleClient';
import { LineRequestBody } from './line/LineConnector';
import { MessengerRequestBody } from './messenger/MessengerConnector';
import { SlackRequestBody } from './slack/SlackConnector';
import { TelegramRequestBody } from './telegram/TelegramConnector';
import { ViberRequestBody } from './viber/ViberConnector';

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

export type SessionConfig = {
  driver: SessionDriver;
  expiresIn?: number;
  stores: {
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
  };
};

export type BottenderConfig = {
  plugins?: any[];
  session?: SessionConfig;
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
      verificationToken?: string;
      signingSecret?: string;
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

export type RequestContext = {
  method: string;
  path: string;
  query: Record<string, string>;
  headers: Record<string, string>;
};
