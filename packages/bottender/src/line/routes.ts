import { LineClient } from 'messaging-api-line';

import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

import { LineEvent } from '..';

type LineContext = Context<LineClient, LineEvent>;
type LineAction = Action<LineClient, LineEvent>;
type LineRoutePredicate = RoutePredicate<LineClient, LineEvent>;

type Route = (
  action: LineAction
) => {
  predicate: LineRoutePredicate;
  action: LineAction;
};

type Line = Route & {
  message: Route;
  follow: Route;
  unfollow: Route;
  join: Route;
  leave: Route;
  memberJoined: Route;
  memberLeft: Route;
  postback: Route;
  beacon: Route & {
    enter: Route;
    banner: Route;
    stay: Route;
  };
  accountLink: Route;
  things: Route & {
    link: Route;
    unlink: Route;
    scenarioResult: Route;
  };
};

const line: Line = (action: LineAction) => {
  return route(context => context.platform === 'line', action);
};

function message(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isMessage,
    action
  );
}

line.message = message;

function follow(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isFollow,
    action
  );
}

line.follow = follow;

function unfollow(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isUnfollow,
    action
  );
}

line.unfollow = unfollow;

function join(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isJoin,
    action
  );
}

line.join = join;

function leave(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isLeave,
    action
  );
}

line.leave = leave;

function memberJoined(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isMemberJoined,
    action
  );
}

line.memberJoined = memberJoined;

function memberLeft(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isMemberLeft,
    action
  );
}

line.memberLeft = memberLeft;

function postback(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isPostback,
    action
  );
}

line.postback = postback;

function beacon(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isBeacon,
    action
  );
}

line.beacon = beacon;

function beaconEnter(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' &&
      context.event.isBeacon &&
      context.event.beacon?.type === 'enter',
    action
  );
}

beacon.enter = beaconEnter;

function beaconBanner(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' &&
      context.event.isBeacon &&
      context.event.beacon?.type === 'banner',
    action
  );
}

beacon.banner = beaconBanner;

function beaconStay(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' &&
      context.event.isBeacon &&
      context.event.beacon?.type === 'stay',
    action
  );
}

beacon.stay = beaconStay;

function accountLink(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isAccountLink,
    action
  );
}

line.accountLink = accountLink;

function things(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' && context.event.isThings,
    action
  );
}

line.things = things;

function thingsLink(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' &&
      context.event.isThings &&
      context.event.things?.type === 'link',
    action
  );
}

things.link = thingsLink;

function thingsUnlink(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' &&
      context.event.isThings &&
      context.event.things?.type === 'unlink',
    action
  );
}

things.unlink = thingsUnlink;

function thingsScenarioResult(action: LineAction) {
  return route(
    (context: LineContext) =>
      context.platform === 'line' &&
      context.event.isThings &&
      context.event.things?.type === 'scenarioResult',
    action
  );
}

things.scenarioResult = thingsScenarioResult;

export default line;
