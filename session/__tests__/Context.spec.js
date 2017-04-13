import Context from '../Context';
import SessionData from '../SessionData';
import SessionHITL from '../SessionHITL';

function setup({ data = new SessionData(), db = {} } = {}) {
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
