import { Action, AnyContext } from '../types';
import { RoutePredicate, route } from '../router';

import WhatsappContext from './WhatsappContext';

type Route = <C extends AnyContext>(
  action: Action<WhatsappContext, any>
) => {
  predicate: RoutePredicate<C>;
  action: Action<WhatsappContext, any>;
};

type Whatsapp = Route & {
  any: Route;
  message: Route;
  media: Route;
  received: Route;
  sent: Route;
  delivered: Route;
  read: Route;
};

const whatsapp: Whatsapp = <C extends AnyContext>(
  action: Action<WhatsappContext, any>
) => {
  return route((context: C) => context.platform === 'whatsapp', action);
};

whatsapp.any = whatsapp;

function message<C extends AnyContext>(action: Action<WhatsappContext, any>) {
  return route(
    (context: C) => context.platform === 'whatsapp' && context.event.isMessage,
    action
  );
}

whatsapp.message = message;

function media<C extends AnyContext>(action: Action<WhatsappContext, any>) {
  return route(
    (context: C) => context.platform === 'whatsapp' && context.event.isMedia,
    action
  );
}

whatsapp.media = media;

function received<C extends AnyContext>(action: Action<WhatsappContext, any>) {
  return route(
    (context: C) => context.platform === 'whatsapp' && context.event.isReceived,
    action
  );
}

whatsapp.received = received;

function sent<C extends AnyContext>(action: Action<WhatsappContext, any>) {
  return route(
    (context: C) => context.platform === 'whatsapp' && context.event.isSent,
    action
  );
}

whatsapp.sent = sent;

function delivered<C extends AnyContext>(action: Action<WhatsappContext, any>) {
  return route(
    (context: C) =>
      context.platform === 'whatsapp' && context.event.isDelivered,
    action
  );
}

whatsapp.delivered = delivered;

function read<C extends AnyContext>(action: Action<WhatsappContext, any>) {
  return route(
    (context: C) => context.platform === 'whatsapp' && context.event.isRead,
    action
  );
}

whatsapp.read = read;

export default whatsapp;
