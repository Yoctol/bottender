import { SlackOAuthClient } from 'messaging-api-slack';

import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

import SlackEvent, { EventTypes } from './SlackEvent';

type SlackContext = Context<SlackOAuthClient, SlackEvent>;
type SlackAction = Action<SlackOAuthClient, SlackEvent>;
type SlackRoutePredicate = RoutePredicate<SlackOAuthClient, SlackEvent>;

type Route = (
  action: SlackAction
) => {
  predicate: SlackRoutePredicate;
  action: SlackAction;
};

type Slack = Route & {
  message: Route;
  event: (
    eventType: EventTypes,
    action: SlackAction
  ) => {
    predicate: SlackRoutePredicate;
    action: SlackAction;
  };
};

const slack: Slack = (action: SlackAction) => {
  return route(context => context.platform === 'slack', action);
};

function message(action: SlackAction) {
  return route(
    (context: SlackContext) =>
      context.platform === 'slack' && context.event.isMessage,
    action
  );
}

slack.message = message;

function event(eventType: EventTypes, action: SlackAction) {
  return route(
    (context: SlackContext) =>
      context.platform === 'slack' && context.event.rawEvent.type === eventType,
    action
  );
}

slack.event = event;

// TODO: support slack.command

export default slack;
