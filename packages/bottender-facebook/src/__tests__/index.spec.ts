import {
  FacebookBatch,
  FacebookClient,
  FacebookConnector,
  FacebookContext,
  FacebookEvent,
} from '..';

it('should export public api', () => {
  expect(FacebookBatch).toBeDefined();
  expect(FacebookClient).toBeDefined();
  expect(FacebookConnector).toBeDefined();
  expect(FacebookContext).toBeDefined();
  expect(FacebookEvent).toBeDefined();
});
