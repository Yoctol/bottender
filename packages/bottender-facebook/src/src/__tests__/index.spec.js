import {
  FacebookClient,
  FacebookConnector,
  FacebookContext,
  FacebookEvent,
} from '..';

it('should export public api', () => {
  expect(FacebookClient).toBeDefined();
  expect(FacebookConnector).toBeDefined();
  expect(FacebookContext).toBeDefined();
  expect(FacebookEvent).toBeDefined();
});
