import { MessengerClient } from 'messaging-api-messenger';

import Context from '../context/Context';
import { Action } from '../types';
import { RoutePredicate, route } from '../router';

import { MessengerEvent } from '..';

type MessengerContext = Context<MessengerClient, MessengerEvent>;
type MessengerAction = Action<MessengerClient, MessengerEvent>;
type MessengerRoutePredicate = RoutePredicate<MessengerClient, MessengerEvent>;
type Route = (
  action: MessengerAction
) => {
  predicate: MessengerRoutePredicate;
  action: MessengerAction;
};

type Messenger = Route & {
  message: Route;
  accountLinking: Route & {
    linked: Route;
    unlinked: Route;
  };
  checkoutUpdate: Route;
  delivery: Route;
  echo: Route;
  gamePlay: Route;
  passThreadControl: Route;
  takeThreadControl: Route;
  requestThreadControl: Route;
  appRoles: Route;
  optin: Route;
  payment: Route;
  policyEnforcement: Route;
  postback: Route;
  preCheckout: Route;
  read: Route;
  referral: Route;
  standby: Route;
};

const messenger: Messenger = (action: MessengerAction) => {
  return route(context => context.platform === 'messenger', action);
};

function message(action: MessengerAction) {
  return route(
    (context: Context<MessengerClient, MessengerEvent>) =>
      context.platform === 'messenger' && context.event.isMessage,
    action
  );
}

messenger.message = message;

function accountLinking(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isAccountLinking,
    action
  );
}

messenger.accountLinking = accountLinking;

function accountLinkingLinked(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' &&
      context.event.isAccountLinking &&
      // eslint-disable-next-line no-restricted-globals
      context.event.accountLinking?.status === 'linked',
    action
  );
}

accountLinking.linked = accountLinkingLinked;

function accountLinkingUnlinked(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' &&
      context.event.isAccountLinking &&
      // eslint-disable-next-line no-restricted-globals
      context.event.accountLinking?.status === 'unlinked',
    action
  );
}

accountLinking.unlinked = accountLinkingUnlinked;

function checkoutUpdate(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isCheckoutUpdate,
    action
  );
}

messenger.checkoutUpdate = checkoutUpdate;

function delivery(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isDelivery,
    action
  );
}

messenger.delivery = delivery;

function echo(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isEcho,
    action
  );
}

messenger.echo = echo;

function gamePlay(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isGamePlay,
    action
  );
}

messenger.gamePlay = gamePlay;

function passThreadControl(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isPassThreadControl,
    action
  );
}

messenger.passThreadControl = passThreadControl;

function takeThreadControl(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isTakeThreadControl,
    action
  );
}

messenger.takeThreadControl = takeThreadControl;

function requestThreadControl(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isRequestThreadControl,
    action
  );
}

messenger.requestThreadControl = requestThreadControl;

function appRoles(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isAppRoles,
    action
  );
}

messenger.appRoles = appRoles;

function optin(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isOptin,
    action
  );
}

messenger.optin = optin;

function payment(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isPayment,
    action
  );
}

messenger.payment = payment;

function policyEnforcement(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isPolicyEnforcement,
    action
  );
}

messenger.policyEnforcement = policyEnforcement;

function postback(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isPostback,
    action
  );
}

messenger.postback = postback;

function preCheckout(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isPreCheckout,
    action
  );
}

messenger.preCheckout = preCheckout;

function read(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isRead,
    action
  );
}

messenger.read = read;

function referral(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isReferral,
    action
  );
}

messenger.referral = referral;

function standby(action: MessengerAction) {
  return route(
    (context: MessengerContext) =>
      context.platform === 'messenger' && context.event.isStandby,
    action
  );
}

messenger.standby = standby;

export default messenger;
