import Session from '../Session';

it('should have records in the session when construct with data', () => {
  const data = { a: 1, b: 2 };
  const session = new Session(data);

  expect(session.toJSON()).toEqual(data);
  expect(session.inspect()).toEqual(data);
  expect(session.length).toBe(2);
  expect(session.populated).toBe(true);
});

it('should have empty session when construct without data', () => {
  const session = new Session();

  expect(session.toJSON()).toEqual({});
  expect(session.inspect()).toEqual({});
  expect(session.length).toBe(0);
  expect(session.populated).toBe(false);
});

it('can attach another key to session', () => {
  const session = new Session();

  session.a = 1;

  expect(session.toJSON()).toEqual({ a: 1 });
  expect(session.inspect()).toEqual({ a: 1 });
  expect(session.length).toBe(1);
  expect(session.populated).toBe(true);
});

it('can attach remove key form session', () => {
  const session = new Session({ a: 1, b: 2 });

  delete session.b;

  expect(session.toJSON()).toEqual({ a: 1 });
  expect(session.inspect()).toEqual({ a: 1 });
  expect(session.length).toBe(1);
  expect(session.populated).toBe(true);
});

// FIXME
xit('should support session method as key', () => {
  const session = new Session({ a: 1, b: 2 });

  session.toJSON = 1;

  expect(session.toJSON()).toEqual({ a: 1 });
  expect(session.inspect()).toEqual({ a: 1 });
  expect(session.length).toBe(1);
  expect(session.populated).toBe(true);
});

it('should support object method as key', () => {
  const session = new Session();

  session.toString = 1;

  expect(session.toJSON()).toEqual({ toString: 1 });
  expect(session.inspect()).toEqual({ toString: 1 });
  expect(session.length).toBe(1);
  expect(session.populated).toBe(true);
});
