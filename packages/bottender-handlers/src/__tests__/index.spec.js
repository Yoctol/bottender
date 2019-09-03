import * as handlers from '..';

it('export handler builders', () => {
  expect(handlers.middleware).toBeDefined();
  expect(handlers.Handler).toBeDefined();
  expect(handlers.MessengerHandler).toBeDefined();
  expect(handlers.LineHandler).toBeDefined();
  expect(handlers.SlackHandler).toBeDefined();
  expect(handlers.TelegramHandler).toBeDefined();
  expect(handlers.ViberHandler).toBeDefined();
  expect(handlers.ClassifierHandler).toBeDefined();
});
