import Context from '../Context';
import SessionData from '../SessionData';
import SessionHITL from '../SessionHITL';

function setup({ data = new SessionData() } = {}) {
  return {
    data,
    context: new Context({ data }),
  };
}

describe('#data', () => {
  it('can be access', () => {
    const { context } = setup();
    expect(context.data).toBeInstanceOf(SessionData);
  });
});

describe('#hitl', () => {
  it('can be access', () => {
    const { context } = setup();
    expect(context.hitl).toBeInstanceOf(SessionHITL);
  });
});
