import { TelegramClient } from 'messaging-api-telegram';

import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

import { TelegramEvent } from '..';

type TelegramContext = Context<TelegramClient, TelegramEvent>;
type TelegramAction = Action<TelegramClient, TelegramEvent>;
type TelegramRoutePredicate = RoutePredicate<TelegramClient, TelegramEvent>;

type Route = (
  action: TelegramAction
) => {
  predicate: TelegramRoutePredicate;
  action: TelegramAction;
};

type Telegram = Route & {
  message: Route;
  editedMessage: Route;
  channelPost: Route;
  editedChannelPost: Route;
  inlineQuery: Route;
  chosenInlineResult: Route;
  callbackQuery: Route;
  shippingQuery: Route;
  preCheckoutQuery: Route;
  poll: Route;
};

const telegram: Telegram = (action: TelegramAction) => {
  return route(context => context.platform === 'telegram', action);
};

function message(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isMessage,
    action
  );
}

telegram.message = message;

function editedMessage(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isEditedMessage,
    action
  );
}

telegram.editedMessage = editedMessage;

function channelPost(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isChannelPost,
    action
  );
}

telegram.channelPost = channelPost;

function editedChannelPost(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isEditedChannelPost,
    action
  );
}

telegram.editedChannelPost = editedChannelPost;

function inlineQuery(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isInlineQuery,
    action
  );
}

telegram.inlineQuery = inlineQuery;

function chosenInlineResult(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isChosenInlineResult,
    action
  );
}

telegram.chosenInlineResult = chosenInlineResult;

function callbackQuery(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isCallbackQuery,
    action
  );
}

telegram.callbackQuery = callbackQuery;

function shippingQuery(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isShippingQuery,
    action
  );
}

telegram.shippingQuery = shippingQuery;

function preCheckoutQuery(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isPreCheckoutQuery,
    action
  );
}

telegram.preCheckoutQuery = preCheckoutQuery;

function poll(action: TelegramAction) {
  return route(
    (context: TelegramContext) =>
      context.platform === 'telegram' && context.event.isPoll,
    action
  );
}

telegram.poll = poll;

export default telegram;
