import { deleteLineMenu } from '../menu';

jest.mock('messaging-api-line');
jest.mock('inquirer');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { LineClient } = require('messaging-api-line');
const inquirer = require('inquirer');

const { print, error } = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig').default;

const setup = (force, token = undefined) => ({
  argv: {
    '--force': force,
    '--token': token,
  },
});

describe('deleteLineMenu', () => {
  beforeEach(() => {
    LineClient.connect.mockReturnValue({
      getRichMenuList: jest.fn(),
      deleteRichMenu: jest.fn().mockResolvedValueOnce(true),
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
    expect(deleteLineMenu).toBeDefined();
  });

  it('--token should work', async () => {
    const ctx = setup(false, '12345');

    await deleteLineMenu(ctx);

    expect(LineClient.connect).toBeCalledWith('12345');
  });

  it('should exit when accessToken is not found in config file and not pass token option', async () => {
    const ctx = setup(false);

    getConfig.mockReturnValueOnce({
      accessToken: undefined,
    });

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should exit when client.getRichMenuList failed', async () => {
    const ctx = setup(false);

    LineClient.connect().getRichMenuList.mockRejectedValueOnce(
      new Error('getRichMenuList failed')
    );

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should exit when failed to find rich menu', async () => {
    const ctx = setup(false);

    LineClient.connect().getRichMenuList.mockResolvedValueOnce(null);

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should delete all online rich menus if using force', async () => {
    const ctx = setup(true);

    LineClient.connect().getRichMenuList.mockResolvedValueOnce([
      {
        richMenuId: '1234567890',
      },
      {
        richMenuId: '0987654321',
      },
    ]);

    await deleteLineMenu(ctx);

    expect(LineClient.connect().deleteRichMenu.mock.calls.length).toBe(2);
    expect(print.mock.calls.length).toBe(1);
  });

  it('should delete all online rich menus if not using force', async () => {
    const ctx = setup(false);

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
    inquirer.prompt.mockResolvedValueOnce({
      deletedRichMenuNames: ['Nice richmenu'],
    });

    await deleteLineMenu(ctx);

    expect(LineClient.connect().deleteRichMenu).toBeCalledWith('1234567890');
    expect(print).toBeCalledWith(
      'Successfully delete undefined in existing LINE rich menu.'
    );
  });

  it('should exit if not selecting any rich menu', async () => {
    const ctx = setup(false);

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
    inquirer.prompt.mockResolvedValueOnce({ deletedRichMenuNames: [] });

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
