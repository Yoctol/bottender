import Handler from '../Handler';
import middleware from '../middleware';

it('should let middleware to be called', () => {
  const m1 = jest.fn();

  const handler = middleware([m1]);

  const context = {};
  handler(context);

  expect(m1).toBeCalled();
});

it('should let middleware to be called with context and next middleware', () => {
  const m1 = jest.fn((context, next) => next());
  const m2 = jest.fn();

  const handler = middleware([m1, m2]);

  const context = {};
  handler(context);

  expect(m1.mock.calls[0][0]).toBe(context);
  expect(m2.mock.calls[0][0]).toBe(context);
});

it('should work with 5 middleware', () => {
  const m1 = jest.fn((context, next) => next());
  const m2 = jest.fn((context, next) => next());
  const m3 = jest.fn((context, next) => next());
  const m4 = jest.fn((context, next) => next());
  const m5 = jest.fn((context, next) => next());

  const handler = middleware([m1, m2, m3, m4, m5]);

  const context = {};
  handler(context);

  expect(m1.mock.calls[0][0]).toBe(context);
  expect(m2.mock.calls[0][0]).toBe(context);
  expect(m3.mock.calls[0][0]).toBe(context);
  expect(m4.mock.calls[0][0]).toBe(context);
  expect(m5.mock.calls[0][0]).toBe(context);
});

it('should work with async middleware', async () => {
  const m1 = jest.fn((context, next) => Promise.resolve().then(next));
  const m2 = jest.fn();

  const handler = middleware([m1, m2]);

  const context = {};
  await handler(context);

  expect(m1.mock.calls[0][0]).toBe(context);
  expect(m2.mock.calls[0][0]).toBe(context);
});

it('should work with handler instance', async () => {
  const m1 = jest.fn((context, next) => Promise.resolve().then(next));
  const cb = jest.fn();
  const m2 = new Handler().onEvent(cb);

  const handler = middleware([m1, m2]);

  const context = {};
  await handler(context);

  expect(m1.mock.calls[0][0]).toBe(context);
  expect(cb).toBeCalledWith(context);
});
