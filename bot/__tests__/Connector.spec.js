import Connector from '../Connector';

describe('#setHandler & hasHandler', () => {
  it('no handler before set handler', () => {
    const connector = new Connector();
    expect(connector.hasHandler).toEqual(false);
  });

  it('can set handler', () => {
    const connector = new Connector();
    connector.setHandler(() => {});
    expect(connector.hasHandler).toEqual(true);
  });
});

describe('#getSenderIdFromRequest', () => {
  it('should throw unimplemented', () => {
    const connector = new Connector();
    expect(() => connector.getSenderIdFromRequest()).toThrow(/must implement/);
  });
});

describe('#getUserProfile', () => {
  it('should throw unimplemented', () => {
    const connector = new Connector();
    expect(() => connector.getUserProfile()).toThrow(/must implement/);
  });
});

describe('#handleRequest', () => {
  it('should throw unimplemented', () => {
    const connector = new Connector();
    expect(() => connector.handleRequest()).toThrow(/must implement/);
  });
});
