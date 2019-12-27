import Context from '../context/Context';
import { Action, Client, Event } from '../types';
import { RoutePredicate, route } from '../router';

type Route = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  predicate: RoutePredicate<C, E>;
  action: Action<C, E>;
};

type Viber = Route & {
  message: Route;
  subscribed: Route;
  unsubscribed: Route;
  conversationStarted: Route;
  delivered: Route;
  seen: Route;
  failed: Route;
};

const viber: Viber = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  return route(context => context.platform === 'viber', action);
};

function message<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.isMessage,
    action
  );
}

viber.message = message;

function subscribed<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.isSubscribed,
    action
  );
}

viber.subscribed = subscribed;

function unsubscribed<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.isUnsubscribed,
    action
  );
}

viber.unsubscribed = unsubscribed;

function conversationStarted<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.isConversationStarted,
    action
  );
}

viber.conversationStarted = conversationStarted;

function delivered<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.delivered,
    action
  );
}

viber.delivered = delivered;

function seen<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.seen,
    action
  );
}

viber.seen = seen;

function failed<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'viber' && context.event.failed,
    action
  );
}

viber.failed = failed;

export default viber;
