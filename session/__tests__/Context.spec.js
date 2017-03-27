import Context from '../Context';
import SessionData from '../SessionData';
import SessionHITL from '../SessionHITL';

describe('#data', () => {
  it('can be access', () => {
    const data = new SessionData();
    const context = new Context({ data });
    expect(context.data).toBeInstanceOf(SessionData);
  });
});

describe('#hitl', () => {
  it('can be access', () => {
    const data = new SessionData();
    const context = new Context({ data });
    expect(context.hitl).toBeInstanceOf(SessionHITL);
  });
});
