import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

import { EventTypes } from './SlackEvent';

type Route = <C extends Context<any, any>>(
  action: Action<C, any>
) => {
  predicate: RoutePredicate<C>;
  action: Action<C, any>;
};

type Slack = Route & {
  any: Route;
  message: Route;
  event: <C extends Context<any, any>>(
    eventType: EventTypes,
    action: Action<C, any>
  ) => {
    predicate: RoutePredicate<C>;
    action: Action<C, any>;
  };
  command: <C extends Context<any, any>>(
    commandText: string,
    action: Action<C, any>
  ) => {
    predicate: RoutePredicate<C>;
    action: Action<C, any>;
  };
};

const slack: Slack = <C extends Context<any, any>>(action: Action<C, any>) => {
  return route((context: C) => context.platform === 'slack', action);
};

slack.any = slack;

function message<C extends Context<any, any>>(action: Action<C, any>) {
  return route(
    (context: C) => context.platform === 'slack' && context.event.isMessage,
    action
  );
}

slack.message = message;

function event<C extends Context<any, any>>(
  eventType: EventTypes,
  action: Action<C, any>
) {
  return route(
    (context: C) =>
      context.platform === 'slack' && context.event.rawEvent.type === eventType,
    action
  );
}

slack.event = event;

function command<C extends Context<any, any>>(
  commandText: string,
  action: Action<C, any>
) {
  return route(
    (context: C) =>
      context.platform === 'slack' &&
      context.event.command &&
      context.event.command === commandText,
    action
  );
}

slack.command = command;

export default slack;
