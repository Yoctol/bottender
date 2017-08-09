import { SlackOAuthClient } from 'messaging-api-slack';

import SlackConnector from '../SlackConnector';
import SlackContext from '../../context/SlackContext';

jest.mock('messaging-api-slack');

const token = 'SLACK_TOKEN';

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
  const mockSlackOAuthClient = {
    getUserInfo: jest.fn(),
    getChannelInfo: jest.fn(),
    getAllUserList: jest.fn(),
  };
  SlackOAuthClient.connect = jest.fn();
  SlackOAuthClient.connect.mockReturnValue(mockSlackOAuthClient);
  return {
    connector: new SlackConnector({ token }),
    mockSlackOAuthClient,
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
    const channelId = connector.getUniqueSessionIdFromRequest(request.body);
    expect(channelId).toBe('C6A9RJJ3F');
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockSlackOAuthClient } = setup();

    const user = {
      id: 'U13AGSN1X',
    };
    const channel = {
      id: 'C6A9RJJ3F',
    };
    const members = [user];
    const session = {};

    mockSlackOAuthClient.getUserInfo.mockReturnValue(Promise.resolve(user));
    mockSlackOAuthClient.getChannelInfo.mockReturnValue(
      Promise.resolve(channel)
    );
    mockSlackOAuthClient.getAllUserList.mockReturnValue(
      Promise.resolve(members)
    );

    await connector.updateSession(session, request.body);

    expect(mockSlackOAuthClient.getUserInfo).toBeCalledWith('U13AGSN1X');
    expect(mockSlackOAuthClient.getChannelInfo).toBeCalledWith('C6A9RJJ3F');
    expect(mockSlackOAuthClient.getAllUserList).toBeCalled();
    expect(session).toEqual({ user, channel, team: { members } });
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
