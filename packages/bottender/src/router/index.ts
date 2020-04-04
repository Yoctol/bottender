import Context from '../context/Context';
import line from '../line/routes';
import messenger from '../messenger/routes';
import slack from '../slack/routes';
import telegram from '../telegram/routes';
import viber from '../viber/routes';
import whatsapp from '../whatsapp/routes';
import { Action, Props } from '../types';

type MatchPattern = string | Array<string> | RegExp;

type RoutePattern<C extends Context<any, any>> = '*' | RoutePredicate<C>;

export type RoutePredicate<C extends Context<any, any>> = (
  context: C
) => boolean | Record<string, any> | Promise<boolean | Record<string, any>>;

type Route<C extends Context<any, any>> = {
  predicate: RoutePredicate<C>;
  action: Action<C, any>;
};

function router<C extends Context<any, any>>(routes: Route<C>[]) {
  return async function Router(context: C, props: Props<C> = {}) {
    for (const r of routes) {
      // eslint-disable-next-line no-await-in-loop
      const match = await r.predicate(context);
      if (match) {
        const derivedProps = match && typeof match === 'object' ? match : {};

        return r.action.bind(null, context, {
          ...props,
          ...derivedProps,
        });
      }
    }

    return props.next;
  };
}

function route<C extends Context<any, any>>(
  pattern: RoutePattern<C>,
  action: Action<C, any>
) {
  if (pattern === '*') {
    return {
      predicate: () => true,
      action,
    };
  }

  return {
    predicate: pattern,
    action,
  };
}

function text<C extends Context<any, any>>(
  pattern: MatchPattern,
  action: Action<C, any>
) {
  if (typeof pattern === 'string') {
    if (pattern === '*') {
      return {
        predicate: (context: C) => context.event.isText,
        action,
      };
    }

    return {
      predicate: (context: C) => context.event.text === pattern,
      action,
    };
  }

  if (pattern instanceof RegExp) {
    return {
      predicate: (context: C) => {
        const match = pattern.exec(context.event.text);
        return match
          ? {
              match,
            }
          : false;
      },
      action,
    };
  }

  if (Array.isArray(pattern)) {
    return {
      predicate: (context: C) => pattern.includes(context.event.text),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

function payload<C extends Context<any, any>>(
  pattern: MatchPattern,
  action: Action<C, any>
) {
  if (typeof pattern === 'string') {
    if (pattern === '*') {
      return {
        predicate: (context: C) => context.event.isPayload,
        action,
      };
    }

    return {
      predicate: (context: C) => context.event.payload === pattern,
      action,
    };
  }

  if (pattern instanceof RegExp) {
    return {
      predicate: (context: C) => {
        const match = pattern.exec(context.event.payload);
        return match
          ? {
              match,
            }
          : false;
      },
      action,
    };
  }

  if (Array.isArray(pattern)) {
    return {
      predicate: (context: C) => pattern.includes(context.event.payload),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

function platform<C extends Context<any, any>>(
  pattern: MatchPattern,
  action: Action<C, any>
) {
  if (typeof pattern === 'string') {
    if (pattern === '*') {
      return {
        predicate: () => true,
        action,
      };
    }

    return {
      predicate: (context: C) => context.platform === pattern,
      action,
    };
  }

  if (pattern instanceof RegExp) {
    return {
      predicate: (context: C) => {
        return pattern.exec(context.platform);
      },
      action,
    };
  }

  if (Array.isArray(pattern)) {
    return {
      predicate: (context: C) => pattern.includes(context.platform),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

export default router;

export {
  router,
  route,
  text,
  payload,
  platform,
  line,
  messenger,
  slack,
  telegram,
  viber,
  whatsapp,
};
