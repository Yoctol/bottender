import { SlackOAuthClient } from 'messaging-api-slack';

import SlackConnector from '../SlackConnector';
import SlackContext from '../SlackContext';
import SlackEvent from '../SlackEvent';

jest.mock('messaging-api-slack');
jest.mock('warning');

const accessToken = 'SLACK_accessTOKEN';
const SLACK_SIGNING_SECRET = '8f742231b10e8888abcd99yyyzzz85a5';

const request = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    teamId: 'T02R00000',
    apiAppId: 'A6A00000',
    event: {
      type: 'message',
      user: 'U13A00000',
      text: 'hello',
      ts: '1500435914.425136',
      channel: 'C6A900000',
      eventTs: '1500435914.425136',
    },
    type: 'event_callback',
    authedUsers: ['U6AK00000'],
    eventId: 'Ev6BEYTAK0',
    eventTime: 1500435914,
  },
};

const botRequest = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    teamId: 'T02R00000',
    apiAppId: 'A6A00000',
    event: {
      type: 'message',
      user: 'U13A00000',
      text: 'hello',
      botId: 'B6AK00000',
      ts: '1500435914.425136',
      channel: 'C6A900000',
      eventTs: '1500435914.425136',
    },
    type: 'event_callback',
    authedUsers: ['U6AK00000'],
    eventId: 'Ev6BEYTAK0',
    eventTime: 1500435914,
  },
};

const ReactionAddedRequest = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    teamId: 'T02R00000',
    apiAppId: 'A6A00000',
    event: {
      type: 'reaction_added',
      user: 'U024BE7LH',
      reaction: 'thumbsup',
      itemUser: 'U0G9QF9C6',
      item: {
        type: 'message',
        channel: 'C0G9QF9GZ',
        ts: '1360782400.498405',
      },
      eventTs: '1360782804.083113',
    },
    type: 'event_callback',
    authedUsers: ['U6AK00000'],
    eventId: 'Ev6BEYTAK0',
    eventTime: 1500435914,
  },
};

const PinAddedRequest = {
  body: {
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    teamId: 'T02R00000',
    apiAppId: 'A6A00000',
    event: {
      type: 'pin_added',
      user: 'U024BE7LH',
      channelId: 'C02ELGNBH',
      item: {},
      eventTs: '1360782804.083113',
    },
    type: 'event_callback',
    authedUsers: ['U6AK00000'],
    eventId: 'Ev6BEYTAK0',
    eventTime: 1500435914,
  },
};

const interactiveMessageRequest = {
  body: {
    payload:
      '{"type":"interactive_message","actions":[{"name":"game","type":"button","value":"chess"}],"callback_id":"wopr_game","team":{"id":"T056K3CM5","domain":"ricebug"},"channel":{"id":"D7WTL9ECE","name":"directmessage"},"user":{"id":"U056K3CN1","name":"tw0517tw"},"action_ts":"1511153911.446899","message_ts":"1511153905.000093","attachment_id":"1","token":"n8uIomPoBtc7fSnbHbQcmwdy","is_app_unfurl":false,"original_message":{"type":"message","user":"U7W1PH7MY","text":"Would you like to play a game?","bot_id":"B7VUVQTK5","attachments":[{"callback_id":"wopr_game","fallback":"You are unable to choose a game","text":"Choose a game to play","id":1,"color":"3AA3E3","actions":[{"id":"1","name":"game","text":"Chess","type":"button","value":"chess","style":""},{"id":"2","name":"game","text":"Falken\'s Maze","type":"button","value":"maze","style":""},{"id":"3","name":"game","text":"Thermonuclear War","type":"button","value":"war","style":"danger","confirm":{"text":"Wouldn\'t you prefer a good game of chess?","title":"Are you sure?","ok_text":"Yes","dismiss_text":"No"}}]}],"ts":"1511153905.000093"},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T056K3CM5\\/274366307953\\/73rSfbP0LcVPWfAYB3GicEdD","trigger_id":"274927463524.5223114719.95a5b9f6d3b30dc7e07dec6bfa4610e5"}',
  },
};

const viewSubmissionRequest = {
  body: {
    type: 'view_submission',
    team: { id: 'T02RUPSBS', domain: 'yoctolinfo' },
    user: {
      id: 'UCL2D708M',
      username: 'darkbtf',
      name: 'darkbtf',
      teamId: 'T02RUPSBS',
    },
    apiAppId: 'A604E7GSJ',
    token: 'zBoHd4fjrvVcVuN9yTmlHMKC',
    triggerId: '873508362498.2878808400.763026ca2acb11b3dfbcb85836d1c3d8',
    view: {
      id: 'VRQQ7JA4T',
      teamId: 'T02RUPSBS',
      type: 'modal',
      blocks: [[Object]],
      privateMetadata: '{"channelId":"C02ELGNBH"}',
      callbackId: '截止',
      state: { values: {} },
      hash: '1577340522.d58ea69f',
      title: { type: 'plain_text', text: '確認截止？', emoji: true },
      clearOnClose: false,
      notifyOnClose: false,
      close: { type: 'plain_text', text: '取消', emoji: true },
      submit: { type: 'plain_text', text: '送出 :boom:', emoji: true },
      previousViewId: null,
      rootViewId: 'VRQQ7JA4T',
      appId: 'A604E7GSJ',
      externalId: '',
      appInstalledTeamId: 'T02RUPSBS',
      botId: 'B618CBATV',
    },
  },
};

const RtmMessage = {
  type: 'message',
  channel: 'G7W5WAAAA',
  user: 'U056KAAAA',
  text: 'Awesome!!!',
  ts: '1515405044.000352',
  sourceTeam: 'T056KAAAA',
  team: 'T056KAAAA',
};

const slashCommandMessage = {
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  teamId: 'T056K0000',
  teamDomain: 'domain',
  channelId: 'G7W5W0000',
  channelName: 'channel_name',
  userId: 'U056K0000',
  userName: 'user_name',
  command: '/command',
  text: 'arguments',
  responseUrl:
    'https://hooks.slack.com/commands/T056K0000/300680000000/xxxxxxxxxxxxxxxxxxxxxxxx',
  triggerId: '300680200000.5223100000.e4f5ce4d607d59005675000000000000',
};

function setup({
  signingSecret = null,
  verificationToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  skipLegacyProfile,
  includeBotMessages,
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
      signingSecret,
      verificationToken,
      skipLegacyProfile,
      includeBotMessages,
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

  it('extract correct channel id from slash command', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(slashCommandMessage);
    expect(channelId).toBe('G7W5W0000');
  });

  it('extract correct channel id from slash command', () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(slashCommandMessage);
    expect(channelId).toBe('G7W5W0000');
  });

  it("extract correct channel id from view event's private_metadata", () => {
    const { connector } = setup();
    const channelId = connector.getUniqueSessionKey(viewSubmissionRequest.body);
    expect(channelId).toBe('C02ELGNBH');
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, mockSlackOAuthClient } = setup({
      skipLegacyProfile: false,
    });

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
    const { connector, mockSlackOAuthClient } = setup({
      skipLegacyProfile: false,
    });

    const session = {};

    await connector.updateSession(session, botRequest.body);

    expect(mockSlackOAuthClient.getUserInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getConversationInfo).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllConversationMembers).not.toBeCalled();
    expect(mockSlackOAuthClient.getAllUserList).not.toBeCalled();
    expect(session).toEqual({});
  });

  it('not update session if no senderId in body', async () => {
    const { connector, mockSlackOAuthClient } = setup({
      skipLegacyProfile: false,
    });

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
    const { connector, mockSlackOAuthClient } = setup({
      skipLegacyProfile: false,
    });

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

  it('update session without calling apis while skipLegacyProfile set true', async () => {
    const { connector, mockSlackOAuthClient } = setup();

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

  it('should not include bot message by default', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(botRequest.body);

    expect(events).toHaveLength(0);
  });

  it('should include bot message when includeBotMessages is true', () => {
    const { connector } = setup({
      includeBotMessages: true,
    });
    const events = connector.mapRequestToEvents(botRequest.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(SlackEvent);
  });

  it('should include callbackId when request is a interactiveMessageRequest', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(interactiveMessageRequest.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(SlackEvent);
    expect(events[0].callbackId).toBe('wopr_game');
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

describe('#verifySignatureBySigningSecret', () => {
  it('should return true if signature is equal to verification token', () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1531420618050);

    const { connector } = setup({
      signingSecret: SLACK_SIGNING_SECRET,
    });

    const result = connector.verifySignatureBySigningSecret({
      rawBody:
        'token=xyzz0WbapA4vBCDEFasx0q6G&team_id=T1DC2JH3J&team_domain=testteamnow&channel_id=G8PSS9T3V&channel_name=foobar&user_id=U2CERLKJA&user_name=roadrunner&command=%2Fwebhook-collect&text=&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT1DC2JH3J%2F397700885554%2F96rGlfmibIGlgcZRskXaIFfN&trigger_id=398738663015.47445629121.803a0bc887a14d10d2c447fce8b6703c',
      timestamp: 1531420618,
      signature:
        'v0=a2114d57b48eac39b9ad189dd8316235a7b4a8d21a10bd27519666489c69b503',
    });

    expect(result).toBe(true);
    Date.now = _now;
  });

  it('should return false if given timestamp is 5 more minutes away from now', () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1601420618050);

    const { connector } = setup({
      signingSecret: SLACK_SIGNING_SECRET,
    });

    const result = connector.verifySignatureBySigningSecret({
      rawBody:
        'token=xyzz0WbapA4vBCDEFasx0q6G&team_id=T1DC2JH3J&team_domain=testteamnow&channel_id=G8PSS9T3V&channel_name=foobar&user_id=U2CERLKJA&user_name=roadrunner&command=%2Fwebhook-collect&text=&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT1DC2JH3J%2F397700885554%2F96rGlfmibIGlgcZRskXaIFfN&trigger_id=398738663015.47445629121.803a0bc887a14d10d2c447fce8b6703c',
      timestamp: 1531420618,
      signature:
        'v0=a2114d57b48eac39b9ad189dd8316235a7b4a8d21a10bd27519666489c69b503',
    });

    expect(result).toBe(false);
    Date.now = _now;
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
    const { connector } = setup({ signingSecret: SLACK_SIGNING_SECRET });

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
    const _now = Date.now;
    Date.now = jest.fn(() => 1531420618050);
    const { connector } = setup({ signingSecret: SLACK_SIGNING_SECRET });

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-slack-request-timestamp': 1531420618,
          'x-slack-signature':
            'v0=d3407c7ed1bcfc33483f6c0162e34eb5c44122ee9d2f31570390f5117715e25b',
        },
        query: {},
        rawBody: '{"token":"xxxxxxxxxxxxxxxxxxxxxxxxxxx"}',
        body: {
          token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      })
    ).toEqual({
      shouldNext: true,
    });
    Date.now = _now;
  });

  it('should return shouldNext: true if signature match (token is in payload)', () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1531420618050);
    const { connector } = setup({ signingSecret: SLACK_SIGNING_SECRET });

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-slack-request-timestamp': 1531420618,
          'x-slack-signature':
            'v0=1ab07950dd7ab795a742e4c147691238156da491ec999b1d8c5fb4710ee3d94c',
        },
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
    Date.now = _now;
  });

  it('should return shouldNext: false and error if signature does not match', () => {
    const _now = Date.now;
    Date.now = jest.fn(() => 1531420618050);
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        headers: {
          'x-slack-request-timestamp': 1531420618,
          'x-slack-signature':
            'v0=walawalawalawalawalawalawalawalawalawalawalawalawalawalawalawala',
        },
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
    Date.now = _now;
  });
});
