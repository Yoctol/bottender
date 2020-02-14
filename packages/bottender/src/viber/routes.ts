import { ViberClient } from 'messaging-api-viber';

import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

import { ViberEvent } from '..';

type ViberContext = Context<ViberClient, ViberEvent>;
type ViberAction = Action<ViberClient, ViberEvent>;
type ViberRoutePredicate = RoutePredicate<ViberClient, ViberEvent>;

type Route = (
  action: ViberAction
) => {
  predicate: ViberRoutePredicate;
  action: ViberAction;
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

const viber: Viber = (action: ViberAction) => {
  return route(context => context.platform === 'viber', action);
};

function message(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.isMessage,
    action
  );
}

viber.message = message;

function subscribed(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.isSubscribed,
    action
  );
}

viber.subscribed = subscribed;

function unsubscribed(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.isUnsubscribed,
    action
  );
}

viber.unsubscribed = unsubscribed;

function conversationStarted(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.isConversationStarted,
    action
  );
}

viber.conversationStarted = conversationStarted;

function delivered(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.delivered !== null,
    action
  );
}

viber.delivered = delivered;

function seen(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.seen !== null,
    action
  );
}

viber.seen = seen;

function failed(action: ViberAction) {
  return route(
    (context: ViberContext) =>
      context.platform === 'viber' && context.event.failed !== null,
    action
  );
}

viber.failed = failed;

export default viber;
