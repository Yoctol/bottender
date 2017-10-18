import Context from '../Context';

function setup(
  { client = {}, event = {}, session = {}, initialState = {} } = {}
) {
  const context = new Context({
    client,
    event,
    session,
    initialState,
  });
  return {
    context,
  };
}

describe('state', () => {
  describe('#state', () => {
    it('should be empty when no initialState provided', () => {
      const { context } = setup();

      expect(context.state).toEqual({});
    });

    it('should support initialState', () => {
      const initialState = { a: 1 };

      const { context } = setup({ initialState });

      expect(context.state).toEqual(initialState);
    });

    it('should not do initialize when state exists', () => {
      const state = { a: 1 };

      const { context } = setup({ session: { _state: state } });

      expect(context.state).toEqual(state);
    });
  });

  describe('#setState', () => {
    it('should do shallow merge to state', () => {
      const state = { a: 1, b: 2 };

      const { context } = setup({ session: { _state: state } });

      context.setState({ a: 3 });

      expect(context.state).toEqual({ a: 3, b: 2 });
    });
  });

  describe('#resetState', () => {
    it('should reset to empty when no initialState provided', () => {
      const state = { a: 1 };

      const { context } = setup({ session: { _state: state } });

      context.resetState();

      expect(context.state).toEqual({});
    });

    it('should reset to initialState when initialState provided', () => {
      const state = { a: 2 };
      const initialState = { a: 1 };

      const { context } = setup({ session: { _state: state }, initialState });

      context.resetState();

      expect(context.state).toEqual(initialState);
    });
  });
});
