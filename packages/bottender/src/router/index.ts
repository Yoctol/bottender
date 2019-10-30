import Context from '../context/Context';
import { Action, Props } from '../types';
import { PlatformContext } from '../context/PlatformContext';

type MatchPattern = string | Array<string> | RegExp;

type RoutePattern = '*' | RoutePredicate;

type RoutePredicate = (
  context: Context | PlatformContext
) => boolean | Record<string, any> | Promise<boolean | Record<string, any>>;

type Route = {
  predicate: RoutePredicate;
  action: Action;
};

function router(routes: Route[]) {
  return async function Router(context: Context, props: Props = {}) {
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
      predicate: (context: Context) => {
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
      predicate: (context: Context) => pattern.includes(context.event.payload),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

function platform(pattern: MatchPattern, action: Action) {
  if (typeof pattern === 'string') {
    if (pattern === '*') {
      return {
        predicate: () => true,
        action,
      };
    }

    return {
      predicate: (context: PlatformContext) => context.platform === pattern,
      action,
    };
  }

  if (pattern instanceof RegExp) {
    return {
      predicate: (context: PlatformContext) => {
        return pattern.exec(context.platform);
      },
      action,
    };
  }

  if (Array.isArray(pattern)) {
    return {
      predicate: (context: PlatformContext) =>
        pattern.includes(context.platform),
      action,
    };
  }

  return {
    predicate: () => false,
    action,
  };
}

export default router;

export { router, route, text, payload, platform };
