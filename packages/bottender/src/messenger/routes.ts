import Context from '../context/Context';
import { Action, Client, Event } from '../types';
import { RoutePredicate, route } from '../router';

type Route = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  predicate: RoutePredicate<C, E>;
  action: Action<C, E>;
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

const messenger: Messenger = <C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) => {
  return route(context => context.platform === 'messenger', action);
};

function message<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isMessage,
    action
  );
}

messenger.message = message;

function accountLinking<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isAccountLinking,
    action
  );
}

messenger.accountLinking = accountLinking;

function accountLinkingLinked<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' &&
      context.event.isAccountLinking &&
      context.event.accountLinking.status === 'linked',
    action
  );
}

accountLinking.linked = accountLinkingLinked;

function accountLinkingUnlinked<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' &&
      context.event.isAccountLinking &&
      context.event.accountLinking.status === 'unlinked',
    action
  );
}

accountLinking.unlinked = accountLinkingUnlinked;

function checkoutUpdate<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isCheckoutUpdate,
    action
  );
}

messenger.checkoutUpdate = checkoutUpdate;

function delivery<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isDelivery,
    action
  );
}

messenger.delivery = delivery;

function echo<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isEcho,
    action
  );
}

messenger.echo = echo;

function gamePlay<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isGamePlay,
    action
  );
}

messenger.gamePlay = gamePlay;

function passThreadControl<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isPassThreadControl,
    action
  );
}

messenger.passThreadControl = passThreadControl;

function takeThreadControl<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isTakeThreadControl,
    action
  );
}

messenger.takeThreadControl = takeThreadControl;

function requestThreadControl<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isRequestThreadControl,
    action
  );
}

messenger.requestThreadControl = requestThreadControl;

function appRoles<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isAppRoles,
    action
  );
}

messenger.appRoles = appRoles;

function optin<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isOptin,
    action
  );
}

messenger.optin = optin;

function payment<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isPayment,
    action
  );
}

messenger.payment = payment;

function policyEnforcement<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isPolicyEnforcement,
    action
  );
}

messenger.policyEnforcement = policyEnforcement;

function postback<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isPostback,
    action
  );
}

messenger.postback = postback;

function preCheckout<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isPreCheckout,
    action
  );
}

messenger.preCheckout = preCheckout;

function read<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isRead,
    action
  );
}

messenger.read = read;

function referral<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isReferral,
    action
  );
}

messenger.referral = referral;

function standby<C extends Client = any, E extends Event = any>(
  action: Action<C, E>
) {
  return route(
    (context: Context<C, E>) =>
      context.platform === 'messenger' && context.event.isStandby,
    action
  );
}

messenger.standby = standby;

export default messenger;
