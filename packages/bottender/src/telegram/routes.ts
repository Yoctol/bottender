import { Action, AnyContext } from '../types';
import { RoutePredicate, route } from '../router';

import TelegramContext from './TelegramContext';

type Route = <C extends AnyContext>(
  action: Action<TelegramContext, any>
) => {
  predicate: RoutePredicate<C>;
  action: Action<TelegramContext, any>;
};

type Telegram = Route & {
  any: Route;
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
  pollAnswer: Route;
};

const telegram: Telegram = <C extends AnyContext>(
  action: Action<TelegramContext, any>
) => {
  return route((context: C) => context.platform === 'telegram', action);
};

telegram.any = telegram;

function message<C extends AnyContext>(action: Action<TelegramContext, any>) {
  return route(
    (context: C) => context.platform === 'telegram' && context.event.isMessage,
    action
  );
}

telegram.message = message;

function editedMessage<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isEditedMessage,
    action
  );
}

telegram.editedMessage = editedMessage;

function channelPost<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isChannelPost,
    action
  );
}

telegram.channelPost = channelPost;

function editedChannelPost<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isEditedChannelPost,
    action
  );
}

telegram.editedChannelPost = editedChannelPost;

function inlineQuery<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isInlineQuery,
    action
  );
}

telegram.inlineQuery = inlineQuery;

function chosenInlineResult<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isChosenInlineResult,
    action
  );
}

telegram.chosenInlineResult = chosenInlineResult;

function callbackQuery<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isCallbackQuery,
    action
  );
}

telegram.callbackQuery = callbackQuery;

function shippingQuery<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isShippingQuery,
    action
  );
}

telegram.shippingQuery = shippingQuery;

function preCheckoutQuery<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isPreCheckoutQuery,
    action
  );
}

telegram.preCheckoutQuery = preCheckoutQuery;

function poll<C extends AnyContext>(action: Action<TelegramContext, any>) {
  return route(
    (context: C) => context.platform === 'telegram' && context.event.isPoll,
    action
  );
}

telegram.poll = poll;

function pollAnswer<C extends AnyContext>(
  action: Action<TelegramContext, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isPollAnswer,
    action
  );
}

telegram.pollAnswer = pollAnswer;

export default telegram;
