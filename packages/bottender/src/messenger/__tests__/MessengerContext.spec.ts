import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';
import { mocked } from 'ts-jest/utils';

import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';

jest.mock('messaging-api-messenger');
jest.mock('warning');
jest.mock('delay');

const APP_ID = '1234567890';
const PERSONA_ID = '987654321';

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

const setup = (
  { session = userSession, customAccessToken, rawEvent = defaultRawEvent } = {
    session: userSession,
    customAccessToken: undefined,
    defaultRawEvent,
  }
) => {
  const client = new MessengerClient({
    accessToken: customAccessToken ?? '',
  });
  const args = {
    appId: APP_ID,
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

it('#platform to be `messenger`', () => {
  const { context } = setup();
  expect(context.platform).toBe('messenger');
});

it('get #session works', () => {
  const { context, session } = setup();
  expect(context.session).toBe(session);
});

it('get #event works', () => {
  const { context } = setup();
  expect(context.event).toBeInstanceOf(MessengerEvent);
});

it('get #client works', () => {
  const { context, client } = setup();
  expect(context.client).toBe(client);
});

describe('#getUserProfile', () => {
  it('should call client getUserProfile', async () => {
    const { context, client, session } = setup();

    const user = {
      id: session.user.id,
      name: 'Kevin Durant',
      firstName: 'Kevin',
      lastName: 'Durant',
      profilePic: 'https://example.com/pic.png',
    };

    mocked(client.getUserProfile).mockResolvedValue(user);

    const result = await context.getUserProfile();

    expect(client.getUserProfile).toBeCalledWith(session.user.id, {});
    expect(result).toEqual(user);
  });

  it('should call client with custom fields', async () => {
    const { context, client, session } = setup();

    const user = {
      id: session.user.id,
      name: 'Kevin Durant',
      firstName: 'Kevin',
      lastName: 'Durant',
      profilePic: 'https://example.com/pic.png',
      locale: 'en_US',
      timezone: 8,
      gender: 'male',
    };

    mocked(client.getUserProfile).mockResolvedValue(user);

    const result = await context.getUserProfile({
      fields: [
        'id',
        'name',
        'first_name',
        'last_name',
        'profile_pic',
        'locale',
        'timezone',
        'gender',
      ],
    });

    expect(client.getUserProfile).toBeCalledWith(session.user.id, {
      fields: [
        'id',
        'name',
        'first_name',
        'last_name',
        'profile_pic',
        'locale',
        'timezone',
        'gender',
      ],
    });
    expect(result).toEqual(user);
  });

  it('should call warning and not to send if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.getUserProfile();

    expect(warning).toBeCalledWith(
      false,
      'getUserProfile: should not be called in context without session'
    );
    expect(client.getUserProfile).not.toBeCalled();
  });
});

describe('Persistent Menu', () => {
  describe('#getUserPersistentMenu', () => {
    it('should call client getUserPersistentMenu', async () => {
      const { context, client, session } = setup();

      const persistentMenu = [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'postback',
              title: 'Restart Conversation',
              payload: 'RESTART',
            },
            {
              type: 'web_url',
              title: 'Powered by ALOHA.AI, Yoctol',
              url: 'https://www.yoctol.com/',
            },
          ],
        },
      ];

      client.getUserPersistentMenu.mockResolvedValue(persistentMenu);

      const result = await context.getUserPersistentMenu();

      expect(client.getUserPersistentMenu).toBeCalledWith(session.user.id);
      expect(result).toEqual(persistentMenu);
    });

    it('should call warning and not to send if dont have session', async () => {
      const { context, client } = setup({ session: false });

      await context.getUserPersistentMenu();

      expect(warning).toBeCalledWith(
        false,
        'getUserPersistentMenu: should not be called in context without session'
      );
      expect(client.getUserPersistentMenu).not.toBeCalled();
    });
  });

  describe('#setUserPersistentMenu', () => {
    it('should call client setUserPersistentMenu', async () => {
      const { context, client, session } = setup();

      const persistentMenu = [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'postback',
              title: 'Restart Conversation',
              payload: 'RESTART',
            },
            {
              type: 'web_url',
              title: 'Powered by ALOHA.AI, Yoctol',
              url: 'https://www.yoctol.com/',
            },
          ],
        },
      ];

      const result = await context.setUserPersistentMenu(persistentMenu);

      expect(client.setUserPersistentMenu).toBeCalledWith(
        session.user.id,
        persistentMenu,
        {}
      );

      expect(result).toBeUndefined();
    });

    it('should call warning and not to send if dont have session', async () => {
      const { context, client } = setup({ session: false });

      await context.setUserPersistentMenu();

      expect(warning).toBeCalledWith(
        false,
        'setUserPersistentMenu: should not be called in context without session'
      );
      expect(client.setPersistentMenu).not.toBeCalled();
    });
  });

  describe('#deleteUserPersistentMenu', () => {
    it('should call client deleteUserPersistentMenu', async () => {
      const { context, client, session } = setup();

      const result = await context.deleteUserPersistentMenu();

      expect(client.deleteUserPersistentMenu).toBeCalledWith(session.user.id);

      expect(result).toBeUndefined();
    });

    it('should call warning and not to send if dont have session', async () => {
      const { context, client } = setup({ session: false });

      await context.deleteUserPersistentMenu();

      expect(warning).toBeCalledWith(
        false,
        'deleteUserPersistentMenu: should not be called in context without session'
      );
      expect(client.deleteUserPersistentMenu).not.toBeCalled();
    });
  });
});

describe('#passThreadControl', () => {
  it('should call to pass user thread control to other app', async () => {
    const { context, client, session } = setup();

    await context.passThreadControl(263902037430900, 'metadata');

    expect(client.passThreadControl).toBeCalledWith(
      session.user.id,
      263902037430900,
      'metadata'
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.passThreadControl(263902037430900);

    expect(warning).toBeCalledWith(
      false,
      'passThreadControl: should not be called in context without session'
    );
    expect(client.passThreadControl).not.toBeCalled();
  });
});

describe('#passThreadControlToPageInbox', () => {
  it('should call to pass user thread control to page inbox', async () => {
    const { context, client, session } = setup();

    await context.passThreadControlToPageInbox('metadata');

    expect(client.passThreadControlToPageInbox).toBeCalledWith(
      session.user.id,
      'metadata'
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.passThreadControlToPageInbox();

    expect(warning).toBeCalledWith(
      false,
      'passThreadControlToPageInbox: should not be called in context without session'
    );
    expect(client.passThreadControlToPageInbox).not.toBeCalled();
  });
});

describe('#takeThreadControl', () => {
  it('should call to take user thread control back', async () => {
    const { context, client, session } = setup();

    await context.takeThreadControl('metadata');

    expect(client.takeThreadControl).toBeCalledWith(
      session.user.id,
      'metadata'
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.takeThreadControl();

    expect(warning).toBeCalledWith(
      false,
      'takeThreadControl: should not be called in context without session'
    );
    expect(client.takeThreadControl).not.toBeCalled();
  });
});

describe('#requestThreadControl', () => {
  it('should call to request user thread control', async () => {
    const { context, client, session } = setup();

    await context.requestThreadControl('metadata');

    expect(client.requestThreadControl).toBeCalledWith(
      session.user.id,
      'metadata'
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.requestThreadControl();

    expect(warning).toBeCalledWith(
      false,
      'requestThreadControl: should not be called in context without session'
    );
    expect(client.requestThreadControl).not.toBeCalled();
  });
});

describe('#getThreadOwner', () => {
  it('should call to get thread owner', async () => {
    const { context, client, session } = setup();

    await context.getThreadOwner();

    expect(client.getThreadOwner).toBeCalledWith(session.user.id);
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.getThreadOwner();

    expect(warning).toBeCalledWith(
      false,
      'getThreadOwner: should not be called in context without session'
    );
    expect(client.getThreadOwner).not.toBeCalled();
  });
});

describe('#isThreadOwner', () => {
  it('should return true when bot is not the thread owner', async () => {
    const { context, client } = setup();

    client.getThreadOwner.mockResolvedValue({ appId: APP_ID });

    expect(await context.isThreadOwner()).toBe(true);
  });

  it('should return false when bot is not the thread owner', async () => {
    const { context, client } = setup();

    client.getThreadOwner.mockResolvedValue({ appId: '54367890123' });

    expect(await context.isThreadOwner()).toBe(false);
  });
});

describe('#associateLabel', () => {
  it('should call api to associate label to the user', async () => {
    const { context, client, session } = setup();

    await context.associateLabel(1712444532121303);

    expect(client.associateLabel).toBeCalledWith(
      session.user.id,
      1712444532121303
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.associateLabel(1712444532121303);

    expect(warning).toBeCalledWith(
      false,
      'associateLabel: should not be called in context without session'
    );
    expect(client.associateLabel).not.toBeCalled();
  });
});

describe('#dissociateLabel', () => {
  it('should call api to dissociate label from the user', async () => {
    const { context, client, session } = setup();

    await context.dissociateLabel(1712444532121303);

    expect(client.dissociateLabel).toBeCalledWith(
      session.user.id,
      1712444532121303
    );
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.dissociateLabel(1712444532121303);

    expect(warning).toBeCalledWith(
      false,
      'dissociateLabel: should not be called in context without session'
    );
    expect(client.dissociateLabel).not.toBeCalled();
  });
});

describe('#getAssociatedLabels', () => {
  it('should call api to dissociate label from the user', async () => {
    const { context, client, session } = setup();

    client.getAssociatedLabels.mockReturnValue({
      data: [
        {
          name: 'myLabel',
          id: '1001200005003',
        },
        {
          name: 'myOtherLabel',
          id: '1001200005002',
        },
      ],
      paging: {
        cursors: {
          before:
            'QVFIUmx1WTBpMGpJWXprYzVYaVhabW55dVpycko4U2xURGE5ODNtNFZAPal94a1hTUnNVMUtoMVVoTzlzSDktUkMtQkUzWEFLSXlMS3ZALYUw3TURLelZAPOGVR',
          after:
            'QVFIUmItNkpTbjVzakxFWGRydzdaVUFNNnNPaUl0SmwzVHN5ZAWZAEQ3lZANDAzTXFIM0NHbHdYSkQ5OG1GaEozdjkzRmxpUFhxTDl4ZAlBibnE4LWt1eGlTa3Bn',
        },
      },
    });

    await context.getAssociatedLabels();

    expect(client.getAssociatedLabels).toBeCalledWith(session.user.id);
  });

  it('should call warning if dont have session', async () => {
    const { context, client } = setup({ session: false });

    await context.getAssociatedLabels();

    expect(warning).toBeCalledWith(
      false,
      'getAssociatedLabels: should not be called in context without session'
    );
    expect(client.getAssociatedLabels).not.toBeCalled();
  });
});

describe('persona', () => {
  describe('#uesPersona', () => {
    it('should call API with personaId', async () => {
      const { context, client, session } = setup();

      context.usePersona(PERSONA_ID);
      await context.typingOn();
      await context.typingOff();
      await context.sendText('hi');

      expect(client.typingOn).toBeCalledWith(
        session.user.id,
        expect.objectContaining({
          personaId: PERSONA_ID,
        })
      );
      expect(client.typingOff).toBeCalledWith(
        session.user.id,
        expect.objectContaining({
          personaId: PERSONA_ID,
        })
      );
      expect(client.sendText).toBeCalledWith(
        session.user.id,
        'hi',
        expect.objectContaining({
          personaId: PERSONA_ID,
        })
      );
    });
  });

  describe('personaId', () => {
    it('should call API with personaId', async () => {
      const { context, client, session } = setup();

      await context.typingOn({ personaId: PERSONA_ID });
      await context.typingOff({ personaId: PERSONA_ID });
      await context.sendText('hi', { personaId: PERSONA_ID });

      expect(client.typingOn).toBeCalledWith(
        session.user.id,
        expect.objectContaining({
          personaId: PERSONA_ID,
        })
      );
      expect(client.typingOff).toBeCalledWith(
        session.user.id,
        expect.objectContaining({
          personaId: PERSONA_ID,
        })
      );
      expect(client.sendText).toBeCalledWith(
        session.user.id,
        'hi',
        expect.objectContaining({
          personaId: PERSONA_ID,
        })
      );
    });
  });
});
