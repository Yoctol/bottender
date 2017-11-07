import { SlackOAuthClient } from 'messaging-api-slack';

import SlackConnector from '../SlackConnector';
import SlackEvent from '../../context/SlackEvent';
import SlackContext from '../../context/SlackContext';

jest.mock('messaging-api-slack');

const accessToken = 'SLACK_accessTOKEN';

const request = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    team_id: 'T02R00000',
    api_app_id: 'A6A00000',
    event: {
      type: 'message',
      user: 'U13A00000',
      text: 'hello',
      ts: '1500435914.425136',
      channel: 'C6A900000',
      event_ts: '1500435914.425136',
    },
    type: 'event_callback',
    authed_users: ['U6AK00000'],
    event_id: 'Ev6BEYTAK0',
    event_time: 1500435914,
  },
};

const botRequest = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    team_id: 'T02R00000',
    api_app_id: 'A6A00000',
    event: {
      type: 'message',
      user: 'U13A00000',
      text: 'hello',
      bot_id: 'B6AK00000',
      ts: '1500435914.425136',
      channel: 'C6A900000',
      event_ts: '1500435914.425136',
    },
    type: 'event_callback',
    authed_users: ['U6AK00000'],
    event_id: 'Ev6BEYTAK0',
    event_time: 1500435914,
  },
};

function setup() {
  const mockSlackOAuthClient = {
    getUserInfo: jest.fn(),
    getConversationInfo: jest.fn(),
    getAllConversationMembers: jest.fn(),
    getAllUserList: jest.fn(),
  };
  SlackOAuthClient.connect = jest.fn();
  SlackOAuthClient.connect.mockReturnValue(mockSlackOAuthClient);
  return {
    connector: new SlackConnector({ accessToken }),
    mockSlackOAuthClient,
  };
}

describe('#platform', () => {
  it('should be slack', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('slack');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector, mockSlackOAuthClient } = setup();
    expect(connector.client).toBe(mockSlackOAuthClient);
  });

  it('support custom client', () => {
    const client = {};
    const connector = new SlackConnector({ client });
    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct sender id', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(request.body);
    expect(channelId).toBe('C6A900000');
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockSlackOAuthClient } = setup();

    const user = {
      id: 'U13A00000',
    };
    const channel = {
      id: 'C6A900000',
    };
    const members = [user];
    const session = {};

    mockSlackOAuthClient.getUserInfo.mockReturnValue(Promise.resolve(user));
    mockSlackOAuthClient.getConversationInfo.mockReturnValue(
      Promise.resolve(channel)
    );
    mockSlackOAuthClient.getAllConversationMembers.mockReturnValue(
      Promise.resolve(members)
    );
    mockSlackOAuthClient.getAllUserList.mockReturnValue(
      Promise.resolve(members)
    );

    await connector.updateSession(session, request.body);

    expect(mockSlackOAuthClient.getUserInfo).toBeCalledWith('U13A00000');
    expect(mockSlackOAuthClient.getConversationInfo).toBeCalledWith(
      'C6A900000'
    );
    expect(mockSlackOAuthClient.getAllConversationMembers).toBeCalledWith(
      'C6A900000'
    );
    expect(mockSlackOAuthClient.getAllUserList).toBeCalled();
    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        ...user,
      },
      channel: {
        _updatedAt: expect.any(String),
        members,
        ...channel,
      },
      team: { members, _updatedAt: expect.any(String) },
    });
  });

  it('not update session if it is bot event request', async () => {
    const { connector, mockSlackOAuthClient } = setup();

    const session = {};

    await connector.updateSession(session, botRequest.body);

    expect(mockSlackOAuthClient.getUserInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getConversationInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllConversationMembers).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllUserList).not.toBeCalled();
    expect(session).toEqual({});
  });

  it('not update session if no senderId in body', async () => {
    const { connector, mockSlackOAuthClient } = setup();

    const session = {};
    const body = {
      token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      team_id: 'T02R00000',
      api_app_id: 'A6A00000',
      event: {
        type: 'message',
        user: undefined,
        text: 'hello',
        ts: '1500435914.425136',
        channel: 'C6A900000',
        event_ts: '1500435914.425136',
      },
      type: 'event_callback',
      authed_users: ['U6AK00000'],
      event_id: 'Ev6BEYTAK0',
      event_time: 1500435914,
    };

    await connector.updateSession(session, body);

    expect(mockSlackOAuthClient.getUserInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getConversationInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllConversationMembers).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllUserList).not.toBeCalled();
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to SlackEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(SlackEvent);
  });
});

describe('#createContext', () => {
  it('should create SlackContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(SlackContext);
  });
});
