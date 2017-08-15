/* eslint-disable no-console */

// Attach only one listener per process
if (!process.env.REJECTION_HANDLED) {
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });

  process.env.REJECTION_HANDLED = true;
}
