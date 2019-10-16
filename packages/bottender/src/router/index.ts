import Context from '../context/Context';
import { Action, Props } from '../types';

type MatchPattern = string | Array<string> | RegExp;

type RoutePattern = '*' | RoutePredicate;

type RoutePredicate = (
  context: Context
) => boolean | Record<string, any> | Promise<boolean | Record<string, any>>;

type Route = {
  predicate: RoutePredicate;
  action: Action;
};

function router(routes: Route[]) {
  return async function Router(context: Context, { next }: Props = {}) {
    for (const r of routes) {
      // eslint-disable-next-line no-await-in-loop
      const match = await r.predicate(context);
      if (match) {
        return r.action.bind(null, context, { next, match });
      }
    }

    return next;
  };
}

function route(pattern: RoutePattern, action: Action) {
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

function text(pattern: MatchPattern, action: Action) {
  if (typeof pattern === 'string') {
    if (pattern === '*') {
      return {
        predicate: (context: Context) => context.event.isText,
        action,
      };
    }

    return {
      predicate: (context: Context) => context.event.text === pattern,
      action,
    };
  }

  if (pattern instanceof RegExp) {
    return {
      predicate: (context: Context) => {
        return pattern.exec(context.event.text);
      },
      action,
    };
  }

  if (Array.isArray(pattern)) {
    return {
      predicate: (context: Context) => pattern.includes(context.event.text),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

function payload(pattern: MatchPattern, action: Action) {
  if (typeof pattern === 'string') {
    if (pattern === '*') {
      return {
        predicate: (context: Context) => context.event.isPayload,
        action,
      };
    }

    return {
      predicate: (context: Context) => context.event.payload === pattern,
      action,
    };
  }

  if (pattern instanceof RegExp) {
    return {
      predicate: (context: Context) => pattern.test(context.event.payload),
      action,
    };
  }

  if (Array.isArray(pattern)) {
    return {
      predicate: (context: Context) => pattern.includes(context.event.payload),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

export default router;

export { router, route, text, payload };
