import { SlackOAuthClient } from 'messaging-api-slack';
import { mocked } from 'ts-jest/utils';

import SlackConnector from '../SlackConnector';
import SlackContext from '../SlackContext';
import SlackEvent from '../SlackEvent';
import { SlackRequestBody } from '../SlackTypes';

jest.mock('messaging-api-slack');
jest.mock('warning');

const accessToken = 'SLACK_accessTOKEN';
const SLACK_SIGNING_SECRET = '8f742231b10e8888abcd99yyyzzz85a5';

const request: SlackRequestBody = {
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
};

const botRequest: SlackRequestBody = {
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
};

const ReactionAddedRequest: SlackRequestBody = {
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
};

const PinAddedRequest: SlackRequestBody = {
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
};

const interactiveMessageRequest: SlackRequestBody = {
  payload:
    '{"type":"interactive_message","actions":[{"name":"game","type":"button","value":"chess"}],"callback_id":"wopr_game","team":{"id":"T056K3CM5","domain":"ricebug"},"channel":{"id":"D7WTL9ECE","name":"directmessage"},"user":{"id":"U056K3CN1","name":"tw0517tw"},"action_ts":"1511153911.446899","message_ts":"1511153905.000093","attachment_id":"1","token":"xxxxxxxxxxxxxxxxxxxxxxxx","is_app_unfurl":false,"original_message":{"type":"message","user":"U7W1PH7MY","text":"Would you like to play a game?","bot_id":"B7VUVQTK5","attachments":[{"callback_id":"wopr_game","fallback":"You are unable to choose a game","text":"Choose a game to play","id":1,"color":"3AA3E3","actions":[{"id":"1","name":"game","text":"Chess","type":"button","value":"chess","style":""},{"id":"2","name":"game","text":"Falken\'s Maze","type":"button","value":"maze","style":""},{"id":"3","name":"game","text":"Thermonuclear War","type":"button","value":"war","style":"danger","confirm":{"text":"Wouldn\'t you prefer a good game of chess?","title":"Are you sure?","ok_text":"Yes","dismiss_text":"No"}}]}],"ts":"1511153905.000093"},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T056K3CM5\\/274366307953\\/73rSfbP0LcVPWfAYB3GicEdD","trigger_id":"274927463524.5223114719.95a5b9f6d3b30dc7e07dec6bfa4610e5"}',
};

// Home
const appHomeOpenedOnMessagesTabRequest: SlackRequestBody = {
  type: 'app_home_opened',
  user: 'U0HD00000',
  channel: 'DQMT00000',
  tab: 'messages',
  eventTs: '1592278860.498134',
};

const appHomeOpenedOnHomeTabRequest: SlackRequestBody = {
  type: 'app_home_opened',
  user: 'U0HD00000',
  channel: 'DQMT00000',
  tab: 'home',
  view: {
    id: 'V0151K00000',
    teamId: 'T0HD00000',
    type: 'home',
    blocks: [
      {
        type: 'actions',
        blockId: 'Rm7lr',
        elements: [
          {
            type: 'button',
            actionId: 'zrZ',
            text: {
              type: 'plain_text',
              text: 'value',
              emoji: true,
            },
            value: 'value',
          },
        ],
      },
    ],
    privateMetadata: '',
    callbackId: '',
    state: { values: {} },
    hash: '1592278862.48a704aa',
    title: { type: 'plain_text', text: 'View Title', emoji: true },
    clearOnClose: false,
    notifyOnClose: false,
    close: null,
    submit: null,
    previousViewId: null,
    rootViewId: 'V0151K00000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  eventTs: '1592278910.074390',
};

const blockActionsOnHomeTabRequest: SlackRequestBody = {
  type: 'block_actions',
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  container: { type: 'view', viewId: 'V0151K00000' },
  triggerId: '1192207164308.17443231012.b30e1f98a3ac48b9171d3b859a0124a5',
  team: { id: 'T0HD00000', domain: 'domain' },
  view: {
    id: 'V0151K00000',
    teamId: 'T0HD00000',
    type: 'home',
    blocks: [
      {
        type: 'actions',
        blockId: 'Rm7lr',
        elements: [
          {
            type: 'button',
            actionId: 'zrZ',
            text: {
              type: 'plain_text',
              text: 'value',
              emoji: true,
            },
            value: 'value',
          },
        ],
      },
    ],
    privateMetadata: '{}',
    callbackId: '',
    state: { values: {} },
    hash: '1592278912.3f2f9db2',
    title: { type: 'plain_text', text: 'View Title', emoji: true },
    clearOnClose: false,
    notifyOnClose: false,
    close: null,
    submit: null,
    previousViewId: null,
    rootViewId: 'V0151K00000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  actions: [
    {
      actionId: 'zrZ',
      blockId: 'Rm7lr',
      text: {
        type: 'plain_text',
        text: 'value',
        emoji: true,
      },
      value: 'value',
      type: 'button',
      actionTs: '1592279552.931549',
    },
  ],
};

// Home Modal
const blockActionsOnHomeModalRequest: SlackRequestBody = {
  type: 'block_actions',
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  container: {
    type: 'view',
    viewId: 'V015LD00000',
  },
  triggerId: '1215686778640.17443231012.3a6962eea96e7dac6d2f1a907af6211e',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  view: {
    id: 'V015LD00000',
    teamId: 'T0HD00000',
    type: 'modal',
    blocks: [
      {
        type: 'context',
        blockId: '2C4D9',
        elements: [
          {
            type: 'plain_text',
            text: 'text',
            emoji: true,
          },
        ],
      },
      {
        type: 'actions',
        blockId: 'DyE',
        elements: [
          {
            type: 'button',
            actionId: 'xQkxX',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
    privateMetadata: '{}',
    callbackId: '',
    state: {
      values: {},
    },
    hash: '1592476707.898fb949',
    title: {
      type: 'plain_text',
      text: 'title',
      emoji: true,
    },
    clearOnClose: false,
    notifyOnClose: false,
    close: {
      type: 'plain_text',
      text: 'close',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'submit',
      emoji: true,
    },
    previousViewId: null,
    rootViewId: 'V015LD00000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  actions: [
    {
      actionId: 'xQkxX',
      blockId: 'DyE',
      text: {
        type: 'plain_text',
        text: 'button text',
        emoji: true,
      },
      value: 'button value',
      type: 'button',
      actionTs: '1592476752.557160',
    },
  ],
};

const viewSubmissionOnHomeModalRequest = {
  type: 'view_submission',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  triggerId: '1204566923633.17443231012.da8c753637a7f27e40991411664d77a2',
  view: {
    id: 'V015N200000',
    teamId: 'T0HD00000',
    type: 'modal',
    blocks: [
      {
        type: 'context',
        blockId: 'Umz',
        elements: [
          {
            type: 'plain_text',
            text: 'text',
            emoji: true,
          },
        ],
      },
      {
        type: 'actions',
        blockId: 'Sk7k8',
        elements: [
          {
            type: 'button',
            actionId: '0L7ew',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
    privateMetadata: '{}',
    callbackId: '',
    state: {
      values: {},
    },
    hash: '1592477178.60ca56c9',
    title: {
      type: 'plain_text',
      text: 'title',
      emoji: true,
    },
    clearOnClose: false,
    notifyOnClose: false,
    close: {
      type: 'plain_text',
      text: 'close',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'submit',
      emoji: true,
    },
    previousViewId: null,
    rootViewId: 'V015N200000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  responseUrls: [],
};

const viewCloseOnHomeModalRequest = {
  type: 'view_closed',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  view: {
    id: 'V0157600000',
    teamId: 'T0HD00000',
    type: 'modal',
    blocks: [
      {
        type: 'context',
        blockId: 'WC8',
        elements: [
          {
            type: 'plain_text',
            text: 'text',
            emoji: true,
          },
        ],
      },
      {
        type: 'actions',
        blockId: 'ZbPy',
        elements: [
          {
            type: 'button',
            actionId: 'muR',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
    privateMetadata: '{}',
    callbackId: '',
    state: {
      values: {},
    },
    hash: '1592480265.1283b0b7',
    title: {
      type: 'plain_text',
      text: 'title',
      emoji: true,
    },
    clearOnClose: false,
    notifyOnClose: true,
    close: {
      type: 'plain_text',
      text: 'close',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'submit',
      emoji: true,
    },
    previousViewId: null,
    rootViewId: 'V0157600000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  isCleared: true,
};

// Channel
const blockActionsOnChannelRequest: SlackRequestBody = {
  type: 'block_actions',
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  container: {
    type: 'message',
    messageTs: '1592454263.013800',
    channelId: 'DQMT00000',
    isEphemeral: false,
  },
  triggerId: '1215785565232.17443231012.2e89dfa2540e010b618894ff8d2de08f',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  channel: {
    id: 'DQMT00000',
    name: 'directmessage',
  },
  message: {
    botId: 'BQMT00000',
    type: 'message',
    text: "This content can't be displayed.",
    user: 'UQKL00000',
    ts: '1592454263.013800',
    team: 'T0HD00000',
    blocks: [
      {
        type: 'actions',
        blockId: 'nxyEU',
        elements: [
          {
            type: 'button',
            actionId: 'bdj',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
  },
  responseUrl:
    'https://hooks.slack.com/actions/T0HD00000/1190570555349/zCOfyY2sBayE3Amaj1GgXUtW',
  actions: [
    {
      actionId: 'bdj',
      blockId: 'nxyEU',
      text: {
        type: 'plain_text',
        text: 'button text',
        emoji: true,
      },
      value: 'button value',
      type: 'button',
      actionTs: '1592480315.455021',
    },
  ],
};

// Channel Modal
const blockActionsOnChannelModalRequest: SlackRequestBody = {
  type: 'block_actions',
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  container: {
    type: 'view',
    viewId: 'V016BP00000',
  },
  triggerId: '1204575603665.17443231012.ccdd4f2d4b840eb48c451235f6b0a84c',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  view: {
    id: 'V016BP00000',
    teamId: 'T0HD00000',
    type: 'modal',
    blocks: [
      {
        type: 'context',
        blockId: 'ikxi3',
        elements: [
          {
            type: 'plain_text',
            text: 'button text',
            emoji: true,
          },
        ],
      },
      {
        type: 'actions',
        blockId: 'HWc',
        elements: [
          {
            type: 'button',
            actionId: 'c3pJ',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
    privateMetadata: '{"channelId":"DQMT00000"}',
    callbackId: '',
    state: {
      values: {},
    },
    hash: '1592480318.25f7311a',
    title: {
      type: 'plain_text',
      text: 'title',
      emoji: true,
    },
    clearOnClose: false,
    notifyOnClose: true,
    close: {
      type: 'plain_text',
      text: 'close',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'submit',
      emoji: true,
    },
    previousViewId: null,
    rootViewId: 'V016BP00000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  actions: [
    {
      actionId: 'c3pJ',
      blockId: 'HWc',
      text: {
        type: 'plain_text',
        text: 'button text',
        emoji: true,
      },
      value: 'button value',
      type: 'button',
      actionTs: '1592480408.122391',
    },
  ],
};

const viewSubmissionOnChannelModalRequest: SlackRequestBody = {
  type: 'view_submission',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  triggerId: '1215789028880.17443231012.f9236c7807d6bdace1e7809e346b8e6c',
  view: {
    id: 'V016BP00000',
    teamId: 'T0HD00000',
    type: 'modal',
    blocks: [
      {
        type: 'context',
        blockId: 'ikxi3',
        elements: [
          {
            type: 'plain_text',
            text: 'text',
            emoji: true,
          },
        ],
      },
      {
        type: 'actions',
        blockId: 'HWc',
        elements: [
          {
            type: 'button',
            actionId: 'c3pJ',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
    privateMetadata: '{"channelId":"DQMT00000"}',
    callbackId: '',
    state: {
      values: {},
    },
    hash: '1592480318.25f7311a',
    title: {
      type: 'plain_text',
      text: 'title',
      emoji: true,
    },
    clearOnClose: false,
    notifyOnClose: true,
    close: {
      type: 'plain_text',
      text: 'close',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'submit',
      emoji: true,
    },
    previousViewId: null,
    rootViewId: 'V016BP00000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  responseUrls: [],
};

const viewCloseOnChannelModalRequest: SlackRequestBody = {
  type: 'view_closed',
  team: {
    id: 'T0HD00000',
    domain: 'domain',
  },
  user: {
    id: 'U0HD00000',
    username: 'username',
    name: 'name',
    teamId: 'T0HD00000',
  },
  apiAppId: 'AQ8600000',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  view: {
    id: 'V015LG00000',
    teamId: 'T0HD00000',
    type: 'modal',
    blocks: [
      {
        type: 'context',
        blockId: 'AQaXQ',
        elements: [
          {
            type: 'plain_text',
            text: 'button text',
            emoji: true,
          },
        ],
      },
      {
        type: 'actions',
        blockId: 'QUo',
        elements: [
          {
            type: 'button',
            actionId: 'E2G9D',
            text: {
              type: 'plain_text',
              text: 'button text',
              emoji: true,
            },
            value: 'button value',
          },
        ],
      },
    ],
    privateMetadata: '{"channelId":"DQMT00000"}',
    callbackId: '',
    state: {
      values: {},
    },
    hash: '1592480467.1addf637',
    title: {
      type: 'plain_text',
      text: 'title',
      emoji: true,
    },
    clearOnClose: false,
    notifyOnClose: true,
    close: {
      type: 'plain_text',
      text: 'close',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'submit',
      emoji: true,
    },
    previousViewId: null,
    rootViewId: 'V015LG00000',
    appId: 'AQ8600000',
    externalId: '',
    appInstalledTeamId: 'T0HD00000',
    botId: 'BQMT00000',
  },
  isCleared: false,
};

const RtmMessage: SlackRequestBody = {
  type: 'message',
  channel: 'G7W5WAAAA',
  user: 'U056KAAAA',
  text: 'Awesome!!!',
  ts: '1515405044.000352',
  sourceTeam: 'T056KAAAA',
  team: 'T056KAAAA',
};

const slashCommandMessage: SlackRequestBody = {
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
  const connector = new SlackConnector({
    accessToken,
    signingSecret,
    verificationToken,
    skipLegacyProfile,
    includeBotMessages,
  });

  const client = mocked(SlackOAuthClient).mock.instances[0];

  return {
    connector,
    client,
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
    const { connector, client } = setup();
    expect(connector.client).toBe(client);
  });

  it('support custom client', () => {
    const client = new SlackOAuthClient({
      accessToken,
    });

    const connector = new SlackConnector({ client });

    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('extract correct session key', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(request);

    expect(sessionKey).toBe('C6A900000');
  });

  it('extract correct session key from interactive message request', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(interactiveMessageRequest);

    expect(sessionKey).toBe('D7WTL9ECE');
  });

  it('extract correct session key from RTM WebSocket message', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(RtmMessage);

    expect(sessionKey).toBe('G7W5WAAAA');
  });

  it('extract correct session key from reaction_added event', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(ReactionAddedRequest);

    expect(sessionKey).toBe('C0G9QF9GZ');
  });

  it('extract correct session key from pin_added event', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(PinAddedRequest);

    expect(sessionKey).toBe('C02ELGNBH');
  });

  it('extract correct session key from slash command', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(slashCommandMessage);

    expect(sessionKey).toBe('G7W5W0000');
  });

  // home tab
  it('extract correct session key from appHomeOpenedOnMessagesTabRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      appHomeOpenedOnMessagesTabRequest
    );

    expect(sessionKey).toBe('DQMT00000');
  });

  it('extract correct session key from appHomeOpenedOnHomeTabRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      appHomeOpenedOnHomeTabRequest
    );

    expect(sessionKey).toBe('DQMT00000');
  });

  it('extract correct session key from blockActionsOnHomeTabRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      blockActionsOnHomeTabRequest
    );

    expect(sessionKey).toBe('U0HD00000');
  });

  // home modal
  it('extract correct session key from blockActionsOnHomeModalRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      blockActionsOnHomeModalRequest
    );

    expect(sessionKey).toBe('U0HD00000');
  });

  it('extract correct session key from viewSubmissionOnHomeModalRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      viewSubmissionOnHomeModalRequest
    );

    expect(sessionKey).toBe('U0HD00000');
  });

  it('extract correct session key from viewCloseOnHomeModalRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      viewCloseOnHomeModalRequest
    );

    expect(sessionKey).toBe('U0HD00000');
  });

  // channel
  it('extract correct session key from blockActionsOnChannelRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      blockActionsOnChannelRequest
    );

    expect(sessionKey).toBe('DQMT00000');
  });

  // channel modal
  it('extract correct session key from blockActionsOnChannelModalRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      blockActionsOnChannelModalRequest
    );

    expect(sessionKey).toBe('DQMT00000');
  });

  it('extract correct session key from viewSubmissionOnChannelModalRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      viewSubmissionOnChannelModalRequest
    );

    expect(sessionKey).toBe('DQMT00000');
  });

  it('extract correct session key from viewCloseOnChannelModalRequest', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(
      viewCloseOnChannelModalRequest
    );

    expect(sessionKey).toBe('DQMT00000');
  });
});

describe('#updateSession', () => {
  it('update session with data needed', async () => {
    const { connector, client } = setup({
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

    mocked(client.getUserInfo).mockResolvedValue(user);
    mocked(client.getConversationInfo).mockResolvedValue(channel);
    mocked(client.getAllConversationMembers).mockResolvedValue(members);
    mocked(client.getAllUserList).mockResolvedValue(members);

    await connector.updateSession(session, request);

    expect(client.getUserInfo).toBeCalledWith('U13A00000');
    expect(client.getConversationInfo).toBeCalledWith('C6A900000');
    expect(client.getAllConversationMembers).toBeCalledWith('C6A900000');
    expect(client.getAllUserList).toBeCalled();
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
    const { connector, client } = setup({
      skipLegacyProfile: false,
    });

    const session = {};

    await connector.updateSession(session, botRequest);

    expect(client.getUserInfo).not.toBeCalled();
    expect(client.getConversationInfo).not.toBeCalled();
    expect(client.getAllConversationMembers).not.toBeCalled();
    expect(client.getAllUserList).not.toBeCalled();
    expect(session).toEqual({});
  });

  it('not update session if no senderId in body', async () => {
    const { connector, client } = setup({
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

    expect(client.getUserInfo).not.toBeCalled();
    expect(client.getConversationInfo).not.toBeCalled();
    expect(client.getAllConversationMembers).not.toBeCalled();
    expect(client.getAllUserList).not.toBeCalled();
  });

  it('update session with data needed when receiving interactive message request', async () => {
    const { connector, client } = setup({
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

    mocked(client.getUserInfo).mockResolvedValue(user);
    mocked(client.getConversationInfo).mockResolvedValue(channel);
    mocked(client.getAllConversationMembers).mockResolvedValue(members);
    mocked(client.getAllUserList).mockResolvedValue(members);

    await connector.updateSession(session, interactiveMessageRequest);

    expect(client.getUserInfo).toBeCalledWith('U056K3CN1');
    expect(client.getConversationInfo).toBeCalledWith('D7WTL9ECE');
    expect(client.getAllConversationMembers).toBeCalledWith('D7WTL9ECE');
    expect(client.getAllUserList).toBeCalled();
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
    const { connector, client } = setup();

    const session = {};

    await connector.updateSession(session, request);

    expect(client.getUserInfo).not.toBeCalled();
    expect(client.getConversationInfo).not.toBeCalled();
    expect(client.getAllConversationMembers).not.toBeCalled();
    expect(client.getAllUserList).not.toBeCalled();
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
    const events = connector.mapRequestToEvents(request);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(SlackEvent);
  });

  it('should not include bot message by default', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(botRequest);

    expect(events).toHaveLength(0);
  });

  it('should include bot message when includeBotMessages is true', () => {
    const { connector } = setup({
      includeBotMessages: true,
    });
    const events = connector.mapRequestToEvents(botRequest);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(SlackEvent);
  });

  it('should include callbackId when request is a interactiveMessageRequest', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(interactiveMessageRequest);

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
