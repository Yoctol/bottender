import pascalCase from 'pascal-case';

import { alwaysFalse, alwaysTrue, and, not, or } from './logic';
import { compileTemplate, isValidTemplate } from './utils';
import { createLogger, error, info, log, warn } from './logger';
import * as methods from './methods';
import * as predicates from './predicates';

const allMethods = [
  ...methods.common,
  ...methods.messenger,
  ...methods.line,
  ...methods.slack,
  ...methods.telegram,
  ...methods.viber,
  ...methods.fb,
];

allMethods.forEach(({ method, length, allowOptions }) => {
  if (!exports[method]) {
    exports[method] = (...args) => {
      const fn = (context, ...otherArgs) => {
        const options = args[length - 1];

        if (fn._options) {
          // eslint-disable-next-line no-param-reassign
          args[length - 1] = {
            ...options,
            ...fn._options, // provided by attachOption
          };
        }

        return context[method](
          ...args.map(arg => {
            if (typeof arg === 'function') {
              return arg(context, ...otherArgs);
            }
            if (typeof arg === 'string' && isValidTemplate(arg)) {
              return compileTemplate(arg)(context, ...otherArgs);
            }
            return arg;
          })
        );
      };

      fn.argsLength = length;
      fn.allowOptions = allowOptions;

      const firstArg = args[0];

      const name =
        firstArg && typeof firstArg === 'string'
          ? `${pascalCase(method)}(${
              firstArg.length > 15 ? `${firstArg.slice(0, 15)}...` : args
            })`
          : pascalCase(method);

      Object.defineProperty(fn, 'name', { value: name });

      return fn;
    };
  }
});

export { default as _ } from './_';
export { default as branch } from './branch';
export { default as condition } from './condition';
export { default as match } from './match';
export { default as parallel } from './parallel';
export { default as platform } from './platform';
export { default as random } from './random';
export { default as series } from './series';
export { default as weight } from './weight';
export { default as noop } from './noop';
export { default as repeat } from './repeat';
export { default as delay } from './delay';
export { default as setDisplayName } from './setDisplayName';
export { default as attachOptions } from './attachOptions';

/* Predicate */
export { isTextMatch, isPayloadMatch, hasStateEqual } from './predicates';

export {
  /* Logic */
  not,
  and,
  or,
  alwaysTrue,
  alwaysFalse,
  /* Logger */
  log,
  info,
  warn,
  error,
  createLogger,
};

const allPredicates = [
  ...predicates.messenger,
  ...predicates.line,
  ...predicates.slack,
  ...predicates.telegram,
  ...predicates.viber,
  ...predicates.fb,
];

allPredicates.forEach(predicate => {
  if (!exports[predicate]) {
    exports[predicate] = () => context => context.event[predicate];
  }
});
