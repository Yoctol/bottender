import Rollbar from 'rollbar';

const ROLLBAR_TOKEN = process.env.ROLLBAR_TOKEN;

const createReporter = () => {
  if (process.env.NODE_ENV === 'production' && ROLLBAR_TOKEN) {
    const rollbar = new Rollbar({
      accessToken: ROLLBAR_TOKEN,
      branch: 'master',
      codeVersion: process.env.CODE_VERSION,
      environment: process.env.NODE_ENV,
      handleUncaughtExceptions: true,
      handleUnhandledRejections: true,
    });
    return rollbar;
  }
  return {
    /* eslint-disable no-console */
    debug: console.debug,
    info: console.info,
    message: console.log,
    warning: console.warn,
    error: console.error,
    critical: console.error,
    /* eslint-enable no-console */

    __FAKE_ROLLBAR__: true,
  };
};

const reporter = createReporter();

export default reporter;
