import rollbar from 'rollbar';

const ROLLBAR_TOKEN = process.env.ROLLBAR_TOKEN;

const createReporter = () => {
  if (process.env.NODE_ENV === 'production' && ROLLBAR_TOKEN) {
    rollbar.init(ROLLBAR_TOKEN, {
      branch: 'master',
      codeVersion: process.env.CODE_VERSION,
      environment: process.env.NODE_ENV,
    });
    return rollbar;
  }
  return {
    /* eslint-disable no-console */
    reportMessage: console.log,
    reportMessageWithPayloadData: console.log,
    handleError: console.error,
    handleErrorWithPayloadData: console.error,
    /* eslint-enable no-console */

    __FAKE_ROLLBAR__: true,
  };
};

const reporter = createReporter();

export default reporter;
