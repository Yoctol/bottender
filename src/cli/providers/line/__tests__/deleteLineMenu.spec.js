import { deleteLineMenu } from '../menu';

jest.mock('messaging-api-line');
jest.mock('inquirer');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { LineClient } = require('messaging-api-line');
const inquirer = require('inquirer');

const { print, error } = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const setup = force => ({
  argv: {
    force,
  },
});

describe('deleteLineMenu', () => {
  beforeEach(() => {
    LineClient.connect.mockReturnValue({
      getRichMenuList: jest.fn(),
      deleteRichMenu: jest.fn().mockImplementation(() => Promise.resolve(true)),
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

  it('should exit when accessToken is not found in config file', async () => {
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

    LineClient.connect().getRichMenuList.mockImplementationOnce(() =>
      Promise.reject(new Error('getRichMenuList failed'))
    );

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should exit when failed to find rich menu', async () => {
    const ctx = setup(false);

    LineClient.connect().getRichMenuList.mockImplementationOnce(() =>
      Promise.resolve(null)
    );

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should delete all online rich menus if using force', async () => {
    const ctx = setup(true);

    LineClient.connect().getRichMenuList.mockImplementationOnce(() =>
      Promise.resolve([
        {
          richMenuId: '1234567890',
        },
        {
          richMenuId: '0987654321',
        },
      ])
    );

    await deleteLineMenu(ctx);

    expect(LineClient.connect().deleteRichMenu.mock.calls.length).toBe(2);
    expect(print.mock.calls.length).toBe(1);
  });

  it('should delete all online rich menus if not using force', async () => {
    const ctx = setup(false);

    LineClient.connect().getRichMenuList.mockImplementationOnce(() =>
      Promise.resolve([
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
      ])
    );
    inquirer.prompt.mockImplementationOnce(() =>
      Promise.resolve({ deletedRichMenuNames: ['Nice richmenu'] })
    );

    await deleteLineMenu(ctx);

    expect(LineClient.connect().deleteRichMenu).toBeCalledWith('1234567890');
    expect(print).toBeCalledWith(
      'Successfully delete undefined in existing LINE rich menu.'
    );
  });

  it('should exit if not selecting any rich menu', async () => {
    const ctx = setup(false);

    LineClient.connect().getRichMenuList.mockImplementationOnce(() =>
      Promise.resolve([
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
      ])
    );
    inquirer.prompt.mockImplementationOnce(() =>
      Promise.resolve({ deletedRichMenuNames: [] })
    );

    await deleteLineMenu(ctx);

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
