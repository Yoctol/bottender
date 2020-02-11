import Context from '../context/Context';
import { Action, Client, Event } from '../types';
import { RoutePredicate, route } from '../router';

import { EventTypes } from './SlackEvent';

type Route = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  predicate: RoutePredicate<C, E>;
  action: Action<C, E>;
};

type Slack = Route & {
  message: Route;
  event: <C extends Client = any, E extends Event = any>(
    eventType: EventTypes,
    action: Action<C, E>
  ) => {
    predicate: RoutePredicate<C, E>;
    action: Action<C, E>;
  };
  command: <C extends Client = any, E extends Event = any>(
    commandText: string,
    action: Action<C, E>
  ) => {
    predicate: RoutePredicate<C, E>;
    action: Action<C, E>;
  };
};

const slack: Slack = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  return route(context => context.platform === 'slack', action);
};

function message<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'slack' && context.event.isMessage,
    action
  );
}

slack.message = message;

function event<C extends Client = any, E extends Event = any>(
  eventType: EventTypes,
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'slack' && context.event.rawEvent.type === eventType,
    action
  );
}

slack.event = event;

function command<C extends Client = any, E extends Event = any>(
  commandText: string,
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'slack' &&
      context.event.command &&
      context.event.command === commandText,
    action
  );
}

slack.command = command;

export default slack;
