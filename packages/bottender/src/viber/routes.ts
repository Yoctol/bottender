import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

type Route = <C extends Context<any, any>>(
  action: Action<C, any>
) => {
  predicate: RoutePredicate<C>;
  action: Action<C, any>;
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

const viber: Viber = <C extends Context<any, any>>(action: Action<C, any>) => {
  return route(context => context.platform === 'viber', action);
};

function message<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'viber' && context.event.isMessage,
    action
  );
}

viber.message = message;

function subscribed<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'viber' && context.event.isSubscribed,
    action
  );
}

viber.subscribed = subscribed;

function unsubscribed<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) =>
      context.platform === 'viber' && context.event.isUnsubscribed,
    action
  );
}

viber.unsubscribed = unsubscribed;

function conversationStarted<C extends Context<any, any>>(
  action: Action<C, any>
) {
  return route(
    (context: C) =>
      context.platform === 'viber' && context.event.isConversationStarted,
    action
  );
}

viber.conversationStarted = conversationStarted;

function delivered<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'viber' && context.event.delivered,
    action
  );
}

viber.delivered = delivered;

function seen<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'viber' && context.event.seen,
    action
  );
}

viber.seen = seen;

function failed<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'viber' && context.event.failed,
    action
  );
}

viber.failed = failed;

export default viber;
