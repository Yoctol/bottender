/* eslint-disable no-console */

// Attach only one listener per process
if (!process.env.REJECTION_HANDLED) {
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });

  process.env.REJECTION_HANDLED = true;
}

// https://github.com/kentcdodds/react-testing-library/blob/12c7ed1193577dcb4fe4c084b85735ddbfd2bc9d/src/index.js#L21-L25
// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
global.flushPromises = function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
};
