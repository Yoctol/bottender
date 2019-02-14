import invariant from 'invariant';

let ngrok;

/* eslint-disable global-require, no-empty, import/no-extraneous-dependencies */
try {
  ngrok = require('ngrok');
} catch (err) {}
/* eslint-enable */

const connectNgrok = (port, ngrokHandler) => {
  invariant(
    ngrok,
    'You must install `ngrok` npm package using `npm install ngrok` or `yarn add ngrok` to connect ngrok.'
  );

  if (typeof port === 'number') {
    return ngrok.connect(port, ngrokHandler);
  }
  return ngrok.connect(ngrokHandler);
};

export default connectNgrok;
