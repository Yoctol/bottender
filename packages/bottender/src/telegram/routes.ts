import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

type Route = <C extends Context<any, any>>(
  action: Action<C, any>
) => {
  predicate: RoutePredicate<C>;
  action: Action<C, any>;
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
};

const telegram: Telegram = <C extends Context<any, any>>(
  action: Action<C, any>
) => {
  return route(context => context.platform === 'telegram', action);
};

telegram.any = telegram;

function message<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'telegram' && context.event.isMessage,
    action
  );
}

telegram.message = message;

function editedMessage<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isEditedMessage,
    action
  );
}

telegram.editedMessage = editedMessage;

function channelPost<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isChannelPost,
    action
  );
}

telegram.channelPost = channelPost;

function editedChannelPost<C extends Context<any, any>>(
  action: Action<C, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isEditedChannelPost,
    action
  );
}

telegram.editedChannelPost = editedChannelPost;

function inlineQuery<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isInlineQuery,
    action
  );
}

telegram.inlineQuery = inlineQuery;

function chosenInlineResult<C extends Context<any, any>>(
  action: Action<C, any>
) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isChosenInlineResult,
    action
  );
}

telegram.chosenInlineResult = chosenInlineResult;

function callbackQuery<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isCallbackQuery,
    action
  );
}

telegram.callbackQuery = callbackQuery;

function shippingQuery<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isShippingQuery,
    action
  );
}

telegram.shippingQuery = shippingQuery;

function preCheckoutQuery<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'telegram' && context.event.isPreCheckoutQuery,
    action
  );
}

telegram.preCheckoutQuery = preCheckoutQuery;

function poll<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'telegram' && context.event.isPoll,
    action
  );
}

telegram.poll = poll;

export default telegram;
