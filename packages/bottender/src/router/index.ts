import Context from '../context/Context';

type MatchPattern = string | Array<string> | RegExp;

type RoutePattern = '*' | RoutePredicate;

type RoutePredicate = (context: Context) => boolean | Promise<boolean>;

type Action = (
  context: Context,
  props?: Props
) => void | Action | Promise<Action>;

type Route = {
  predicate: RoutePredicate;
  action: Action;
};

type Props = {
  next?: Action;
  [key: string]: any;
};

function router(routes: Route[]) {
  return async function Router(context: Context, { next }: Props = {}) {
    for (const r of routes) {
      // eslint-disable-next-line no-await-in-loop
      if (await r.predicate(context)) {
        return r.action;
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
      predicate: (context: Context) => pattern.test(context.event.text),
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
