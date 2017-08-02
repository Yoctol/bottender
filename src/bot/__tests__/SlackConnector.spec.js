import { SlackClient } from 'messaging-api-slack';

import SlackConnector from '../SlackConnector';
import SlackContext from '../../context/SlackContext';

jest.mock('messaging-api-slack');

const webhookURL = 'WEBHOOK_URL';

const request = {
  body: {
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    team_id: 'T02RUPSBS',
    api_app_id: 'A6AKK532Q',
    event: {
      type: 'message',
      user: 'U13AGSN1X',
      text: '你好',
      ts: '1500435914.425136',
      channel: 'C6A9RJJ3F',
      event_ts: '1500435914.425136',
    },
    type: 'event_callback',
    authed_users: ['U6AKQGXJ8'],
    event_id: 'Ev6BEYTAK0',
    event_time: 1500435914,
  },
};

function setup() {
  SlackClient.connect = jest.fn();
  return {
    connector: new SlackConnector({ webhookURL }),
  };
}

describe('#platform', () => {
  it('should be slack', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('slack');
  });
});

describe('#getUniqueSessionIdFromRequest', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(request.body);
    expect(senderId).toBe('U13AGSN1X'); // FIXME
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector } = setup();

    const user = {
      id: 'U13AGSN1X',
    };
    const session = {};

    await connector.updateSession(session, request.body);

    expect(session).toEqual({ user });
  });
});

describe('#handleRequest', () => {
  it('call handler with context', async () => {
    const { connector } = setup();
    const session = {};
    let context;
    const handler = _context => {
      context = _context;
    };
    await connector.handleRequest({ body: request.body, session, handler });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(SlackContext);
  });
});
