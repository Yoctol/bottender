import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';

import { delivery, echoMessage as echo, read } from './MessengerEvent.spec';

jest.mock('messaging-api-messenger');
jest.mock('warning');
jest.mock('delay');

const defaultRawEvent = {
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

const ACCESS_TOKEN = 'FAKE_TOKEN';
const APP_SECRET = 'FAKE_SECRET';

const setup = (
  { session = userSession, customAccessToken, rawEvent = defaultRawEvent } = {
    session: userSession,
    customAccessToken: undefined,
    defaultRawEvent,
  }
) => {
  const client = new MessengerClient({
    accessToken: customAccessToken ?? ACCESS_TOKEN,
    appSecret: APP_SECRET,
  });

  const context = new MessengerContext({
    client,
    event: new MessengerEvent(rawEvent),
    session,
    customAccessToken,
  });

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
      templateType: 'button',
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
        templateType: 'button',
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
        messagingType: 'RESPONSE',
      }
    );
  });
});

describe('#sendGenericTemplate', () => {
  it('should call client.sendGenericTemplate', async () => {
    const { context, client, session } = setup();

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { imageAspectRatio: ratio });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        imageAspectRatio: ratio,
        messagingType: 'RESPONSE',
      }
    );
  });

  it('can call with tag', async () => {
    const { context, client, session } = setup();

    const elements = {};

    await context.sendGenericTemplate(elements, {
      tag: 'CONFIRMED_EVENT_UPDATE',
    });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        messagingType: 'MESSAGE_TAG',
        tag: 'CONFIRMED_EVENT_UPDATE',
      }
    );
  });

  it('can call with custom messagingType', async () => {
    const { context, client, session } = setup();

    const elements = {};

    await context.sendGenericTemplate(elements, { messagingType: 'UPDATE' });

    expect(client.sendGenericTemplate).toBeCalledWith(
      session.user.id,
      elements,
      {
        messagingType: 'UPDATE',
      }
    );
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const elements = {};
    const ratio = '';

    await context.sendGenericTemplate(elements, { imageAspectRatio: ratio });

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

    await context.sendGenericTemplate(elements, { imageAspectRatio: ratio });

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

    await context.sendGenericTemplate(elements, { imageAspectRatio: ratio });

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

    await context.sendGenericTemplate(elements, { imageAspectRatio: ratio });

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
        messagingType: 'RESPONSE',
      }
    );
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
        messagingType: 'RESPONSE',
      }
    );
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
        messagingType: 'RESPONSE',
      }
    );
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
        messagingType: 'RESPONSE',
      }
    );
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
        messagingType: 'RESPONSE',
      }
    );
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
        messagingType: 'RESPONSE',
      }
    );
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

describe('#sendAirlineUpdateTemplate', () => {
  it('should call client.sendAirlineUpdateTemplate', async () => {
    const { context, client, session } = setup();

    const flightUpdate = {};

    await context.sendAirlineUpdateTemplate(flightUpdate);

    expect(client.sendAirlineUpdateTemplate).toBeCalledWith(
      session.user.id,
      flightUpdate,
      {
        messagingType: 'RESPONSE',
      }
    );
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const flightUpdate = {};

    await context.sendAirlineUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineUpdateTemplate: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const flightUpdate = {};

    await context.sendAirlineUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const flightUpdate = {};

    await context.sendAirlineUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const flightUpdate = {};

    await context.sendAirlineUpdateTemplate(flightUpdate);

    expect(warning).toBeCalledWith(
      false,
      'sendAirlineUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });
});

describe('#sendOneTimeNotifReqTemplate', () => {
  it('should call client.sendOneTimeNotifReqTemplate', async () => {
    const { context, client, session } = setup();

    const attrs = {
      title: '<TITLE_TEXT>',
      payload: '<USER_DEFINED_PAYLOAD>',
    };

    await context.sendOneTimeNotifReqTemplate(attrs);

    expect(client.sendOneTimeNotifReqTemplate).toBeCalledWith(
      session.user.id,
      attrs,
      {
        messagingType: 'RESPONSE',
      }
    );
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    const attrs = {
      title: '<TITLE_TEXT>',
      payload: '<USER_DEFINED_PAYLOAD>',
    };

    await context.sendOneTimeNotifReqTemplate(attrs);

    expect(warning).toBeCalledWith(
      false,
      'sendOneTimeNotifReqTemplate: should not be called in context without session'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with read event', async () => {
    const { context, client } = setup({ rawEvent: read });

    const attrs = {
      title: '<TITLE_TEXT>',
      payload: '<USER_DEFINED_PAYLOAD>',
    };

    await context.sendOneTimeNotifReqTemplate(attrs);

    expect(warning).toBeCalledWith(
      false,
      'sendOneTimeNotifReqTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with delivery event', async () => {
    const { context, client } = setup({ rawEvent: delivery });

    const attrs = {
      title: '<TITLE_TEXT>',
      payload: '<USER_DEFINED_PAYLOAD>',
    };

    await context.sendOneTimeNotifReqTemplate(attrs);

    expect(warning).toBeCalledWith(
      false,
      'sendOneTimeNotifReqTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });

  it('should call warning and not to send if created with echo event', async () => {
    const { context, client } = setup({ rawEvent: echo });

    const attrs = {
      title: '<TITLE_TEXT>',
      payload: '<USER_DEFINED_PAYLOAD>',
    };

    await context.sendOneTimeNotifReqTemplate(attrs);

    expect(warning).toBeCalledWith(
      false,
      'sendOneTimeNotifReqTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
    );
    expect(client.sendImage).not.toBeCalled();
  });
});
