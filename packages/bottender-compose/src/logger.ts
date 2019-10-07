import { compileTemplate, isValidTemplate } from './utils';

function createLoggerAction(fn, name) {
  return (...args) => {
    const Action = (context, ...otherArgs) =>
      fn(
        ...args.map(arg => {
          if (typeof arg === 'function') {
            return arg(context, ...otherArgs);
          }
          if (typeof arg === 'string' && isValidTemplate(arg)) {
            return compileTemplate(arg)(context);
          }
          return arg;
        })
      );

    const firstArg = args[0];

    const actionName =
      firstArg && typeof firstArg === 'string'
        ? `${name}(${
            firstArg.length > 15 ? `${firstArg.slice(0, 15)}...` : args
          })`
        : name;

    Object.defineProperty(Action, 'name', { value: actionName });

    return Action;
  };
}

function createLogger(adapter) {
  return {
    log: createLoggerAction(adapter.log, 'Log'),
    info: createLoggerAction(adapter.info, 'Info'),
    warn: createLoggerAction(adapter.warn, 'Warn'),
    error: createLoggerAction(adapter.error, 'Error'),
  };
}

const { log, info, warn, error } = createLogger(console);

export { log, info, warn, error, createLogger };
