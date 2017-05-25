import { payload } from '../constants';

it('export GET_STARTED payload with prefix', () => {
  expect(payload.GET_STARTED).toBe('__ALOHA.AI_GET_STARTED__');
});

it('export STILL_ALIVE payload with prefix', () => {
  expect(payload.STILL_ALIVE).toBe('__ALOHA.AI_STILL_ALIVE__');
});
