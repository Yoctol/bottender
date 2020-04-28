import { Action, AnyContext } from '../types';
import { RoutePredicate, route } from '../router';

import SmsContext from './SmsContext';

type Route = <C extends AnyContext>(
  action: Action<SmsContext, any>
) => {
  predicate: RoutePredicate<C>;
  action: Action<SmsContext, any>;
};

type Sms = Route & {
  any: Route;
  message: Route;
  media: Route;
  received: Route;
  sent: Route;
  delivered: Route;
};

const sms: Sms = <C extends AnyContext>(action: Action<SmsContext, any>) => {
  return route((context: C) => context.platform === 'sms', action);
};

sms.any = sms;

function message<C extends AnyContext>(action: Action<SmsContext, any>) {
  return route(
    (context: C) => context.platform === 'sms' && context.event.isMessage,
    action
  );
}

sms.message = message;

function media<C extends AnyContext>(action: Action<SmsContext, any>) {
  return route(
    (context: C) => context.platform === 'sms' && context.event.isMedia,
    action
  );
}

sms.media = media;

function received<C extends AnyContext>(action: Action<SmsContext, any>) {
  return route(
    (context: C) => context.platform === 'sms' && context.event.isReceived,
    action
  );
}

sms.received = received;

function sent<C extends AnyContext>(action: Action<SmsContext, any>) {
  return route(
    (context: C) => context.platform === 'sms' && context.event.isSent,
    action
  );
}

sms.sent = sent;

function delivered<C extends AnyContext>(action: Action<SmsContext, any>) {
  return route(
    (context: C) => context.platform === 'sms' && context.event.isDelivered,
    action
  );
}

sms.delivered = delivered;

export default sms;
