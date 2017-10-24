import ContextSimulator from '../ContextSimulator';

describe('#messenger', () => {
  const simulator = new ContextSimulator({
    platform: 'messenger',
  });

  it('#createTextContext should work', () => {
    const context = simulator.createTextContext('Awesome');

    expect(context.event.isMessage).toBe(true);
    expect(context.event.isText).toBe(true);

    expect(context.event.message.text).toBe('Awesome');

    expect(context.sendText).toBeDefined();
  });
});
