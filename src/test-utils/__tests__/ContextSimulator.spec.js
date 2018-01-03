import ContextSimulator from '../ContextSimulator';

describe('#state', () => {
  const simulator = new ContextSimulator({
    platform: 'messenger',
    initialState: { z: 1 },
  });

  it('should work with setState', () => {
    const context = simulator.createContext({
      event: {},
      state: { x: 1 },
    });

    context.setState({ x: 2, y: 3 });

    expect(context.setState).toBeCalledWith({ x: 2, y: 3 });
    expect(context.state).toEqual({ x: 2, y: 3 });
  });

  it('should work with resetState', () => {
    const context = simulator.createContext({
      event: {},
      state: { x: 1 },
    });

    context.resetState();

    expect(context.resetState).toBeCalled();
    expect(context.state).toEqual({ z: 1 });
  });
});

describe('#messenger', () => {
  const simulator = new ContextSimulator({
    platform: 'messenger',
  });

  it('should define mock methods', () => {
    const context = simulator.createContext({
      event: {},
    });

    expect(context.setState).toBeDefined();
    expect(context.resetState).toBeDefined();
    expect(context.typing).toBeDefined();
    expect(context.sendText).toBeDefined();
    expect(context.sendMessage).toBeDefined();
    expect(context.sendAttachment).toBeDefined();
    expect(context.sendImage).toBeDefined();
    expect(context.sendAudio).toBeDefined();
    expect(context.sendVideo).toBeDefined();
    expect(context.sendFile).toBeDefined();
    expect(context.sendQuickReplies).toBeDefined();
    expect(context.sendTemplate).toBeDefined();
    expect(context.sendGenericTemplate).toBeDefined();
    expect(context.sendButtonTemplate).toBeDefined();
    expect(context.sendListTemplate).toBeDefined();
    expect(context.sendOpenGraphTemplate).toBeDefined();
    expect(context.sendMediaTemplate).toBeDefined();
    expect(context.sendReceiptTemplate).toBeDefined();
    expect(context.sendAirlineBoardingPassTemplate).toBeDefined();
    expect(context.sendAirlineCheckinTemplate).toBeDefined();
    expect(context.sendAirlineItineraryTemplate).toBeDefined();
    expect(context.sendAirlineFlightUpdateTemplate).toBeDefined();
    expect(context.typingOn).toBeDefined();
    expect(context.typingOff).toBeDefined();
    expect(context.markSeen).toBeDefined();
    expect(context.passThreadControl).toBeDefined();
    expect(context.passThreadControlToPageInbox).toBeDefined();
    expect(context.takeThreadControl).toBeDefined();
    expect(context.associateLabel).toBeDefined();
    expect(context.dissociateLabel).toBeDefined();
    expect(context.getAssociatedLabels).toBeDefined();
  });

  it('#createTextContext should work', () => {
    const context = simulator.createTextContext('Awesome');

    expect(context.platform).toBe('messenger');

    expect(context.event.isMessage).toBe(true);
    expect(context.event.isText).toBe(true);

    expect(context.event.text).toBe('Awesome');
  });
});

describe('#line', () => {
  const simulator = new ContextSimulator({
    platform: 'line',
  });

  it('should define mock methods', () => {
    const context = simulator.createContext({
      event: {},
    });

    expect(context.setState).toBeDefined();
    expect(context.resetState).toBeDefined();
    expect(context.typing).toBeDefined();
    expect(context.sendText).toBeDefined();
    expect(context.reply).toBeDefined();
    expect(context.replyText).toBeDefined();
    expect(context.replyImage).toBeDefined();
    expect(context.replyVideo).toBeDefined();
    expect(context.replyAudio).toBeDefined();
    expect(context.replyLocation).toBeDefined();
    expect(context.replySticker).toBeDefined();
    expect(context.replyImagemap).toBeDefined();
    expect(context.replyButtonTemplate).toBeDefined();
    expect(context.replyConfirmTemplate).toBeDefined();
    expect(context.replyCarouselTemplate).toBeDefined();
    expect(context.replyImageCarouselTemplate).toBeDefined();
    expect(context.push).toBeDefined();
    expect(context.pushText).toBeDefined();
    expect(context.pushImage).toBeDefined();
    expect(context.pushVideo).toBeDefined();
    expect(context.pushAudio).toBeDefined();
    expect(context.pushLocation).toBeDefined();
    expect(context.pushSticker).toBeDefined();
    expect(context.pushImagemap).toBeDefined();
    expect(context.pushButtonTemplate).toBeDefined();
    expect(context.pushConfirmTemplate).toBeDefined();
    expect(context.pushCarouselTemplate).toBeDefined();
    expect(context.pushImageCarouselTemplate).toBeDefined();
    expect(context.sendText).toBeDefined();
    expect(context.sendImage).toBeDefined();
    expect(context.sendVideo).toBeDefined();
    expect(context.sendAudio).toBeDefined();
    expect(context.sendLocation).toBeDefined();
    expect(context.sendSticker).toBeDefined();
    expect(context.sendImagemap).toBeDefined();
    expect(context.sendButtonTemplate).toBeDefined();
    expect(context.sendConfirmTemplate).toBeDefined();
    expect(context.sendCarouselTemplate).toBeDefined();
    expect(context.sendImageCarouselTemplate).toBeDefined();
    expect(context.leave).toBeDefined();
    expect(context.getLinkedRichMenu).toBeDefined();
    expect(context.linkRichMenu).toBeDefined();
    expect(context.unlinkRichMenu).toBeDefined();
  });

  it('#createTextContext should work', () => {
    const context = simulator.createTextContext('Awesome');

    expect(context.platform).toBe('line');

    expect(context.event.isMessage).toBe(true);
    expect(context.event.isText).toBe(true);

    expect(context.event.text).toBe('Awesome');
  });
});

describe('#slack', () => {
  const simulator = new ContextSimulator({
    platform: 'slack',
  });

  it('should define mock methods', () => {
    const context = simulator.createContext({
      event: {},
    });

    expect(context.setState).toBeDefined();
    expect(context.resetState).toBeDefined();
    expect(context.typing).toBeDefined();
    expect(context.sendText).toBeDefined();
    expect(context.postMessage).toBeDefined();
  });

  it('#createTextContext should work', () => {
    const context = simulator.createTextContext('Awesome');

    expect(context.platform).toBe('slack');

    expect(context.event.isMessage).toBe(true);
    expect(context.event.isText).toBe(true);

    expect(context.event.text).toBe('Awesome');
  });
});

describe('#telegram', () => {
  const simulator = new ContextSimulator({
    platform: 'telegram',
  });

  it('should define mock methods', () => {
    const context = simulator.createContext({
      event: {},
    });

    expect(context.setState).toBeDefined();
    expect(context.resetState).toBeDefined();
    expect(context.typing).toBeDefined();
    expect(context.sendText).toBeDefined();
    expect(context.sendMessage).toBeDefined();
    expect(context.sendPhoto).toBeDefined();
    expect(context.sendAudio).toBeDefined();
    expect(context.sendDocument).toBeDefined();
    expect(context.sendSticker).toBeDefined();
    expect(context.sendVideo).toBeDefined();
    expect(context.sendVoice).toBeDefined();
    expect(context.sendVideoNote).toBeDefined();
    expect(context.sendMediaGroup).toBeDefined();
    expect(context.sendLocation).toBeDefined();
    expect(context.sendVenue).toBeDefined();
    expect(context.sendContact).toBeDefined();
    expect(context.sendChatAction).toBeDefined();
    expect(context.sendInvoice).toBeDefined();
    expect(context.sendGame).toBeDefined();
    expect(context.setGameScore).toBeDefined();
    expect(context.getGameHighScores).toBeDefined();
  });

  it('#createTextContext should work', () => {
    const context = simulator.createTextContext('Awesome');

    expect(context.platform).toBe('telegram');

    expect(context.event.isMessage).toBe(true);
    expect(context.event.isText).toBe(true);

    expect(context.event.text).toBe('Awesome');
  });
});
