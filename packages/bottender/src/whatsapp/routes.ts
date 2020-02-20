import Context from '../context/Context';
import { Action, Client, Event } from '../types';
import { RoutePredicate, route } from '../router';

type Route = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  predicate: RoutePredicate<C, E>;
  action: Action<C, E>;
};

type Whatsapp = Route & {
  message: Route;
  media: Route;
  received: Route;
  sent: Route;
  delivered: Route;
  read: Route;
};

const whatsapp: Whatsapp = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  return route(context => context.platform === 'whatsapp', action);
};

function message<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'whatsapp' && context.event.isMessage,
    action
  );
}

whatsapp.message = message;

function media<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'whatsapp' && context.event.isMedia,
    action
  );
}

whatsapp.media = media;

function received<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'whatsapp' && context.event.isReceived,
    action
  );
}

whatsapp.received = received;

function sent<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'whatsapp' && context.event.isSent,
    action
  );
}

whatsapp.sent = sent;

function delivered<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'whatsapp' && context.event.isDelivered,
    action
  );
}

whatsapp.delivered = delivered;

function read<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'whatsapp' && context.event.isRead,
    action
  );
}

whatsapp.read = read;

export default whatsapp;
