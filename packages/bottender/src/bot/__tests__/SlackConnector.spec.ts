import { SlackOAuthClient } from 'messaging-api-slack';

import SlackConnector from '../SlackConnector';
import SlackContext from '../../context/SlackContext';
import SlackEvent from '../../context/SlackEvent';

jest.mock('messaging-api-slack');
jest.mock('warning');

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

const ReactionAddedRequest = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    team_id: 'T02R00000',
    api_app_id: 'A6A00000',
    event: {
      type: 'reaction_added',
      user: 'U024BE7LH',
      reaction: 'thumbsup',
      item_user: 'U0G9QF9C6',
      item: {
        type: 'message',
        channel: 'C0G9QF9GZ',
        ts: '1360782400.498405',
      },
      event_ts: '1360782804.083113',
    },
    type: 'event_callback',
    authed_users: ['U6AK00000'],
    event_id: 'Ev6BEYTAK0',
    event_time: 1500435914,
  },
};

const PinAddedRequest = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    team_id: 'T02R00000',
    api_app_id: 'A6A00000',
    event: {
      type: 'pin_added',
      user: 'U024BE7LH',
      channel_id: 'C02ELGNBH',
      item: {},
      event_ts: '1360782804.083113',
    },
    type: 'event_callback',
    authed_users: ['U6AK00000'],
    event_id: 'Ev6BEYTAK0',
    event_time: 1500435914,
  },
};

const interactiveMessageRequest = {
  body: {
    payload:
      '{"type":"interactive_message","actions":[{"name":"game","type":"button","value":"chess"}],"callback_id":"wopr_game","team":{"id":"T056K3CM5","domain":"ricebug"},"channel":{"id":"D7WTL9ECE","name":"directmessage"},"user":{"id":"U056K3CN1","name":"tw0517tw"},"action_ts":"1511153911.446899","message_ts":"1511153905.000093","attachment_id":"1","token":"n8uIomPoBtc7fSnbHbQcmwdy","is_app_unfurl":false,"original_message":{"type":"message","user":"U7W1PH7MY","text":"Would you like to play a game?","bot_id":"B7VUVQTK5","attachments":[{"callback_id":"wopr_game","fallback":"You are unable to choose a game","text":"Choose a game to play","id":1,"color":"3AA3E3","actions":[{"id":"1","name":"game","text":"Chess","type":"button","value":"chess","style":""},{"id":"2","name":"game","text":"Falken\'s Maze","type":"button","value":"maze","style":""},{"id":"3","name":"game","text":"Thermonuclear War","type":"button","value":"war","style":"danger","confirm":{"text":"Wouldn\'t you prefer a good game of chess?","title":"Are you sure?","ok_text":"Yes","dismiss_text":"No"}}]}],"ts":"1511153905.000093"},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T056K3CM5\\/274366307953\\/73rSfbP0LcVPWfAYB3GicEdD","trigger_id":"274927463524.5223114719.95a5b9f6d3b30dc7e07dec6bfa4610e5"}',
  },
};

const RtmMessage = {
  type: 'message',
  channel: 'G7W5WAAAA',
  user: 'U056KAAAA',
  text: 'Awesome!!!',
  ts: '1515405044.000352',
  source_team: 'T056KAAAA',
  team: 'T056KAAAA',
};

function setup({
  verificationToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  skipProfile,
} = {}) {
  const mockSlackOAuthClient = {
    getUserInfo: jest.fn(),
    getConversationInfo: jest.fn(),
    getAllConversationMembers: jest.fn(),
    getAllUserList: jest.fn(),
  };
  SlackOAuthClient.connect = jest.fn();
  SlackOAuthClient.connect.mockReturnValue(mockSlackOAuthClient);
  return {
    connector: new SlackConnector({
      accessToken,
      verificationToken,
      skipProfile,
    }),
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
  it('extract correct channel id', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(request.body);
    expect(channelId).toBe('C6A900000');
  });

  it('extract correct channel id from interactive message request', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(
      interactiveMessageRequest.body
    );
    expect(channelId).toBe('D7WTL9ECE');
  });

  it('extract correct channel id from RTM WebSocket message', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(RtmMessage);
    expect(channelId).toBe('G7W5WAAAA');
  });

  it('extract correct channel id from reaction_added event', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(ReactionAddedRequest.body);
    expect(channelId).toBe('C0G9QF9GZ');
  });

  it('extract correct channel id from pin_added event', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(PinAddedRequest.body);
    expect(channelId).toBe('C02ELGNBH');
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

    mockSlackOAuthClient.getUserInfo.mockResolvedValue(user);
    mockSlackOAuthClient.getConversationInfo.mockResolvedValue(channel);
    mockSlackOAuthClient.getAllConversationMembers.mockResolvedValue(members);
    mockSlackOAuthClient.getAllUserList.mockResolvedValue(members);

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

  it('update session with data needed when receiving interactive message request', async () => {
    const { connector, mockSlackOAuthClient } = setup();

    const user = {
      id: 'U056K3CN1',
    };
    const channel = {
      id: 'D7WTL9ECE',
    };
    const members = [user];
    const session = {};

    mockSlackOAuthClient.getUserInfo.mockResolvedValue(user);
    mockSlackOAuthClient.getConversationInfo.mockResolvedValue(channel);
    mockSlackOAuthClient.getAllConversationMembers.mockResolvedValue(members);
    mockSlackOAuthClient.getAllUserList.mockResolvedValue(members);

    await connector.updateSession(session, interactiveMessageRequest.body);

    expect(mockSlackOAuthClient.getUserInfo).toBeCalledWith('U056K3CN1');
    expect(mockSlackOAuthClient.getConversationInfo).toBeCalledWith(
      'D7WTL9ECE'
    );
    expect(mockSlackOAuthClient.getAllConversationMembers).toBeCalledWith(
      'D7WTL9ECE'
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

  it('update session without calling apis while skipProfile setted true', async () => {
    const { connector, mockSlackOAuthClient } = setup({ skipProfile: true });

    const session = {};

    await connector.updateSession(session, request.body);

    expect(mockSlackOAuthClient.getUserInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getConversationInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllConversationMembers).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllUserList).not.toBeCalled();
    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        id: 'U13A00000',
      },
      channel: {
        _updatedAt: expect.any(String),
        id: 'C6A900000',
      },
    });
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

describe('#verifySignature', () => {
  it('should return true if signature is equal to verification token', () => {
    const { connector } = setup({ verificationToken: 'mytoken' });

    const result = connector.verifySignature('mytoken');

    expect(result).toBe(true);
  });
});

describe('#preprocess', () => {
  it('should return shouldNext: true if request method is get', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'get',
        headers: {},
        query: {},
        rawBody: '',
        body: {},
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: true if signature match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {},
        query: {},
        rawBody: '{"token":"xxxxxxxxxxxxxxxxxxxxxxxxxxx"}',
        body: {
          token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: true if signature match (token is in payload)', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {},
        query: {},
        rawBody:
          '{"payload":"{\\"token\\":\\"xxxxxxxxxxxxxxxxxxxxxxxxxxx\\"}"}',
        body: {
          payload: '{"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxx"}',
        },
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: false and error if signature does not match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {},
        query: {},
        rawBody: '{"token":"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"}',
        body: {
          token: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
        },
      })
    ).toEqual({
      shouldNext: false,
      response: {
        status: 400,
        body: {
          error: {
            message: 'Slack Verification Token Validation Failed!',
            request: {
              body: {
                token: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
              },
            },
          },
        },
      },
    });
  });
});
