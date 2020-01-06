import Context from '../context/Context';
import { Action, Client, Event } from '../types';
import { RoutePredicate, route } from '../router';

type Route = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  predicate: RoutePredicate<C, E>;
  action: Action<C, E>;
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

const telegram: Telegram = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  return route(context => context.platform === 'telegram', action);
};

function message<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isMessage,
    action
  );
}

telegram.message = message;

function editedMessage<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isEditedMessage,
    action
  );
}

telegram.editedMessage = editedMessage;

function channelPost<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isChannelPost,
    action
  );
}

telegram.channelPost = channelPost;

function editedChannelPost<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isEditedChannelPost,
    action
  );
}

telegram.editedChannelPost = editedChannelPost;

function inlineQuery<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isInlineQuery,
    action
  );
}

telegram.inlineQuery = inlineQuery;

function chosenInlineResult<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isChosenInlineResult,
    action
  );
}

telegram.chosenInlineResult = chosenInlineResult;

function callbackQuery<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isCallbackQuery,
    action
  );
}

telegram.callbackQuery = callbackQuery;

function shippingQuery<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isShippingQuery,
    action
  );
}

telegram.shippingQuery = shippingQuery;

function preCheckoutQuery<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isPreCheckoutQuery,
    action
  );
}

telegram.preCheckoutQuery = preCheckoutQuery;

function poll<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'telegram' && context.event.isPoll,
    action
  );
}

telegram.poll = poll;

export default telegram;
