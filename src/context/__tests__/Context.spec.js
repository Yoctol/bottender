import Context from '../Context';
import Session from '../../session/Session';

function setup({ session = new Session() } = {}) {
  return {
    session,
    context: new Context({ session }),
  };
}

describe('#session', () => {
  it('can be access', () => {
    const { context } = setup();
    expect(context.session).toBeInstanceOf(Session);
  });
});
