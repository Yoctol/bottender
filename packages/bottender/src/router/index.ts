import Context from '../context/Context';
import { Action, Props } from '../types';

type MatchPattern = string | Array<string> | RegExp;

type RoutePattern = '*' | RoutePredicate;

type RoutePredicate = (
  context: Context
) =>
  | boolean
  | string[]
  | Record<string, string>
  | Promise<boolean | string[] | Record<string, string>>;

type Route = {
  predicate: RoutePredicate;
  action: Action;
};

function router(routes: Route[]) {
  return async function Router(context: Context, { next }: Props = {}) {
    for (const r of routes) {
      // eslint-disable-next-line no-await-in-loop
      const params = await r.predicate(context);
      if (params) {
        return r.action.bind(null, context, { next, params });
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
        const result = pattern.exec(context.event.text);
        // mismatch
        if (result == null) {
          return false;
        }
        // return named group object
        if (result.groups) {
          return result.groups;
        }
        // return group
        return result.slice(1);
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
