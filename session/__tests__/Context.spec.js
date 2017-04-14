import Context from '../Context';
import SessionData from '../SessionData';
import SessionHITL from '../SessionHITL';

function setup(
  {
    data = new SessionData(),
    db = {
      collection: jest.fn(),
    },
  } = {},
) {
  return {
    data,
    db,
    context: new Context({ data, db }),
  };
}

describe('#data', () => {
  it('can be access', () => {
    const { context } = setup();
    expect(context.data).toBeInstanceOf(SessionData);
  });
});

describe('#db', () => {
  it('can be access', () => {
    const { context } = setup();
    expect(context.db).toBeDefined();
  });
});

describe('#hitl', () => {
  it('can be access', () => {
    const { context } = setup();
    expect(context.hitl).toBeInstanceOf(SessionHITL);
  });
});

describe('#logs', () => {
  it('can be access', async () => {
    const { context, db } = setup();
    const collection = {};
    db.collection.mockReturnValue(Promise.resolve(collection));
    expect(await context.logs).toBe(collection);
    expect(db.collection).toBeCalledWith('logs');
  });
});

describe('#users', () => {
  it('can be access', async () => {
    const { context, db } = setup();
    const collection = {};
    db.collection.mockReturnValue(Promise.resolve(collection));
    expect(await context.users).toBe(collection);
    expect(db.collection).toBeCalledWith('users');
  });
});

describe('#sessions', () => {
  it('can be access', async () => {
    const { context, db } = setup();
    const collection = {};
    db.collection.mockReturnValue(Promise.resolve(collection));
    expect(await context.sessions).toBe(collection);
    expect(db.collection).toBeCalledWith('sessions');
  });
});
