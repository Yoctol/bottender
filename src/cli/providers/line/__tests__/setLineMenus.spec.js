import { setLineMenus } from '../menu';

jest.mock('messaging-api-line');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { LineClient } = require('messaging-api-line');

const { print, error, log } = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const setup = (token = undefined) => ({
  argv: {
    t: token,
    token,
  },
});

describe('setLineMenus', () => {
  beforeEach(() => {
    LineClient.connect.mockReturnValue({
      getRichMenuList: jest.fn(),
      deleteRichMenu: jest.fn().mockResolvedValue(true),
      createRichMenu: jest.fn().mockResolvedValue(true),
    });
    process.exit = jest.fn();
    getConfig.mockReturnValue({
      accessToken: '123',
      richMenus: [
        {
          size: {
            width: 2500,
            height: 1686,
          },
          selected: false,
          name: 'Nice richmenu',
          chatBarText: 'Tap here',
          areas: [
            {
              bounds: {
                x: 0,
                y: 0,
                width: 2500,
                height: 1686,
              },
              action: {
                type: 'postback',
                data: 'action=buy&itemid=123',
              },
            },
          ],
        },
      ],
    });
  });

  it('should exist', () => {
    expect(setLineMenus).toBeDefined();
  });

  it('-t, --token should work', async () => {
    const ctx = setup('12345');

    await setLineMenus(ctx);

    expect(LineClient.connect).toBeCalledWith('12345');
  });

  it('should exit when accessToken is not found in config file', async () => {
    const ctx = setup();

    getConfig.mockReturnValueOnce({
      accessToken: undefined,
    });

    await setLineMenus(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should exit when client.getRichMenuList failed', async () => {
    const ctx = setup();

    LineClient.connect().getRichMenuList.mockRejectedValueOnce(
      new Error('getRichMenuList failed')
    );

    await setLineMenus(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should exit when failed to find rich menu', async () => {
    const ctx = setup();

    LineClient.connect().getRichMenuList.mockResolvedValueOnce(null);

    await setLineMenus(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should not call deleteRichMenu when online rich menus and local rich menus are same', async () => {
    const ctx = setup();

    LineClient.connect().getRichMenuList.mockResolvedValueOnce([
      {
        richMenuId: '1234567890',
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      },
    ]);

    await setLineMenus(ctx);

    expect(LineClient.connect().deleteRichMenu).not.toBeCalled();
    expect(print).toBeCalledWith(
      'No change apply, because online rich menu is same as local settings.'
    );
  });

  it('should delete one online rich menus if it has one shouldDeleteRichMenus', async () => {
    const ctx = setup();

    LineClient.connect().getRichMenuList.mockResolvedValueOnce([
      {
        richMenuId: '1234567890',
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      },
      {
        richMenuId: '0987654321',
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Great richmenu',
        chatBarText: 'Click me please',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=sell&itemid=321',
            },
          },
        ],
      },
    ]);

    await setLineMenus(ctx);

    expect(LineClient.connect().deleteRichMenu.mock.calls.length).toBe(1);
    expect(print.mock.calls.length).toBe(1);
    expect(log.mock.calls.length).toBe(1);
  });

  it('should delete two online rich menus and add one local rich menu if it has two shouldDeleteRichMenus and one shouldAddRichMenus', async () => {
    const ctx = setup();

    LineClient.connect().getRichMenuList.mockResolvedValueOnce([
      {
        richMenuId: '1234567890',
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here !!!!!!!!!!!!!!!!',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      },
      {
        richMenuId: '0987654321',
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Great richmenu',
        chatBarText: 'Click me please',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=sell&itemid=321',
            },
          },
        ],
      },
    ]);

    await setLineMenus(ctx);

    expect(LineClient.connect().deleteRichMenu.mock.calls.length).toBe(2);
    expect(LineClient.connect().createRichMenu.mock.calls.length).toBe(1);
    expect(print.mock.calls.length).toBe(1);
    expect(log.mock.calls.length).toBe(1);
  });
});
