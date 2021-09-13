import { TelegramTypes as TelegramTypesInternal } from 'messaging-api-telegram';

import { RequestContext } from '../types';

export * from 'messaging-api-telegram/dist/TelegramTypes';
export { TelegramConnectorOptions } from './TelegramConnector';

export type TelegramRawEvent = {
  updateId: number;
  message?: TelegramTypesInternal.Message;
  editedMessage?: TelegramTypesInternal.Message;
  channelPost?: TelegramTypesInternal.Message;
  editedChannelPost?: TelegramTypesInternal.Message;
  inlineQuery?: TelegramTypesInternal.InlineQuery;
  chosenInlineResult?: TelegramTypesInternal.ChosenInlineResult;
  callbackQuery?: TelegramTypesInternal.CallbackQuery;
  shippingQuery?: TelegramTypesInternal.ShippingQuery;
  preCheckoutQuery?: TelegramTypesInternal.PreCheckoutQuery;
  poll?: TelegramTypesInternal.Poll;
  pollAnswer?: TelegramTypesInternal.PollAnswer;
};

export type TelegramRequestBody = TelegramRawEvent;

export type TelegramRequestContext = RequestContext<TelegramRequestBody>;

export type PollingOptions = {
  offset?: number;
  limit?: number;
  timeout?: number;
  allowedUpdates?: string[];
};
