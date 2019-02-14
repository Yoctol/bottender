import { delivery, echoMessage as echo, read } from './MessengerEvent.spec';

jest.mock('delay');
jest.mock('messaging-api-messenger');
jest.mock('warning');

let MessengerClient;
let MessengerContext;
let MessengerEvent;
let warning;

beforeEach(() => {
  /* eslint-disable global-require */
  MessengerClient = require('messaging-api-messenger').MessengerClient;
  MessengerContext = require('../MessengerContext').default;
  MessengerEvent = require('../MessengerEvent').default;
  warning = require('warning');
  /* eslint-enable global-require */
});

const _rawEvent = {
  sender: { id: '1423587017700273' },
  recipient: { id: '404217156637689' },
  timestamp: 1491796363181,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    seq: 348847,
    text: 'There is no royal road to learning.',
  },
};

const userSession = {
  user: {
    id: 'fakeUserId',
  },
};

const setup = (
  { session = userSession, customAccessToken, rawEvent = _rawEvent } = {
    session: userSession,
    customAccessToken: undefined,
    _rawEvent,
  }
) => {
  const client = MessengerClient.connect();
  const args = {
    client,
    event: new MessengerEvent(rawEvent),
    session,
    customAccessToken,
  };
  const context = new MessengerContext(args);
  return {
    context,
    session,
    client,
  };
};

describe('#sendTemplate', () => {
  it('should call client.sendTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendTemplate({
      template_type: 'button',
      text: 'title',
      buttons: [
        {
          type: 'postback',
          title: 'Start Chatting',
          payload: 'USER_DEFINED_PAYLOAD',
        },
      ],
    });

    expect(client.sendTemplate).toBeCalledWith(
      session.user.id,
      {
        template_type: 'button',
        text: 'title',
        buttons: [
          {
            type: 'postback',
            title: 'Start Chatting',
            payload: 'USER_DEFINED_PAYLOAD',
          },
        ],
      },
      {
        messaging_type: 'RESPONSE',
      }
    );
  });
});

describe('#sendGenericTemplate', () => {
  it('should call client.sendGenericTemplate', async () => {
    const { context, client, session } = setup();

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        image_aspect_ratio: ratio,
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('can call with tag', async () => {
    const { context, client, session } = setup();

    const elements = {};

    await context.sendGenericTemplate(elements, { tag: 'ISSUE_RESOLUTION' });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        messaging_type: 'MESSAGE_TAG',
        tag: 'ISSUE_RESOLUTION',
      }
    );
  });

  it('can call with custom messaging_type', async () => {
    const { context, client, session } = setup();

    const elements = {};

    await context.sendGenericTemplate(elements, { messaging_type: 'UPDATE' });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        messaging_type: 'UPDATE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: should not be called in context without session'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { image_aspect_ratio: ratio });

    expect(warning).toBeCalledWith(
      false,
      'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendGenericTemplate).not.toBeCalled();
  });
});

describe('#sendButtonTemplate', () => {
  it('should call client.sendButtonTemplate', async () => {
    const { context, client, session } = setup();

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(client.sendButtonTemplate).toBeCalledWith(
      session.user.id,
      'yayaya',
      buttons,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: should not be called in context without session'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const buttons = [];

    await context.sendButtonTemplate('yayaya', buttons);

    expect(warning).toBeCalledWith(
      false,
      'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendButtonTemplate).not.toBeCalled();
  });
});

describe('#sendListTemplate', () => {
  it('should call client.sendListTemplate', async () => {
    const { context, client, session } = setup();

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, {
      top_element_style: 'large',
    });

    expect(client.sendListTemplate).toBeCalledWith(
      session.user.id,
      elements,
      buttons,
      {
        top_element_style: 'large',
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: should not be called in context without session'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = [];
    const buttons = [];

    await context.sendListTemplate(elements, buttons, 'large');

    expect(warning).toBeCalledWith(
      false,
      'sendListTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendListTemplate).not.toBeCalled();
  });
});

describe('#sendOpenGraphTemplate', () => {
  it('should call client.sendOpenGraphTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendOpenGraphTemplate([
      {
        media_type: 'image',
        attachment_id: '1854626884821032',
        buttons: [
          {
            type: 'web_url',
            url: 'https://en.wikipedia.org/wiki/Rickrolling',
            title: 'View Website',
          },
        ],
      },
    ]);

    expect(client.sendOpenGraphTemplate).toBeCalledWith(
      session.user.id,
      [
        {
          media_type: 'image',
          attachment_id: '1854626884821032',
          buttons: [
            {
              type: 'web_url',
              url: 'https://en.wikipedia.org/wiki/Rickrolling',
              title: 'View Website',
            },
          ],
        },
      ],
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: should not be called in context without session'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = [];

    await context.sendOpenGraphTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendOpenGraphTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendOpenGraphTemplate).not.toBeCalled();
  });
});

describe('#sendMediaTemplate', () => {
  it('should call client.sendMediaTemplate', async () => {
    const { context, client, session } = setup();

    await context.sendMediaTemplate([
      {
        url: 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb',
        buttons: [
          {
            type: 'web_url',
            url: 'https://en.wikipedia.org/wiki/Rickrolling',
            title: 'View More',
          },
        ],
      },
    ]);

    expect(client.sendMediaTemplate).toBeCalledWith(
      session.user.id,
      [
        {
          url: 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb',
          buttons: [
            {
              type: 'web_url',
              url: 'https://en.wikipedia.org/wiki/Rickrolling',
              title: 'View More',
            },
          ],
        },
      ],
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: should not be called in context without session'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const elements = [];

    await context.sendMediaTemplate(elements);

    expect(warning).toBeCalledWith(
      false,
      'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendMediaTemplate).not.toBeCalled();
  });
});

describe('#sendReceiptTemplate', () => {
  it('should call client.sendReceiptTemplate', async () => {
    const { context, client, session } = setup();

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(client.sendReceiptTemplate).toBeCalledWith(
      session.user.id,
      receipt,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: should not be called in context without session'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const receipt = {};

    await context.sendReceiptTemplate(receipt);

    expect(warning).toBeCalledWith(
      false,
      'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendReceiptTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineBoardingPassTemplate', () => {
  it('should call client.sendAirlineBoardingPassTemplate', async () => {
    const { context, client, session } = setup();

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(client.sendAirlineBoardingPassTemplate).toBeCalledWith(
      session.user.id,
      boardingPass,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: should not be called in context without session'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const boardingPass = {};

    await context.sendAirlineBoardingPassTemplate(boardingPass);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineBoardingPassTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineCheckinTemplate', () => {
  it('should call client.sendAirlineCheckinTemplate', async () => {
    const { context, client, session } = setup();

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(client.sendAirlineCheckinTemplate).toBeCalledWith(
      session.user.id,
      checkin,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: should not be called in context without session'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const checkin = {};

    await context.sendAirlineCheckinTemplate(checkin);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineCheckinTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineItineraryTemplate', () => {
  it('should call client.sendAirlineItineraryTemplate', async () => {
    const { context, client, session } = setup();

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(client.sendAirlineItineraryTemplate).toBeCalledWith(
      session.user.id,
      itinerary,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: should not be called in context without session'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const itinerary = {};

    await context.sendAirlineItineraryTemplate(itinerary);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendAirlineItineraryTemplate).not.toBeCalled();
  });
});

describe('#sendAirlineFlightUpdateTemplate', () => {
  it('should call client.sendAirlineFlightUpdateTemplate', async () => {
    const { context, client, session } = setup();

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(client.sendAirlineFlightUpdateTemplate).toBeCalledWith(
      session.user.id,
      flightUpdate,
      {
        messaging_type: 'RESPONSE',
      }
    );
  });

  it('should mark context as handled', async () => {
    const { context } = setup();

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(context.isHandled).toBe(true);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const flightUpdate = {};

    await context.sendAirlineFlightUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineFlightUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });
});
