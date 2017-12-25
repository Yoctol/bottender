import { getLineMenu } from '../menu';

jest.mock('messaging-api-line');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { LineClient } = require('messaging-api-line');

const { print, error } = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

describe('getLineMenu', () => {
  beforeEach(() => {
    LineClient.connect.mockReturnValue({
      getRichMenuList: jest.fn(),
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
    expect(getLineMenu).toBeDefined();
  });

  it('should exit when accessToken is not found in config file', async () => {
    getConfig.mockReturnValueOnce({
      accessToken: undefined,
    });

    await getLineMenu();

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should exit when client.getRichMenuList failed', async () => {
    LineClient.connect().getRichMenuList.mockReturnValueOnce(
      Promise.reject(new Error('getRichMenuList failed'))
    );

    await getLineMenu();

    expect(error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('should print rich menus', async () => {
    LineClient.connect().getRichMenuList.mockReturnValueOnce(
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

    await getLineMenu();

    expect(print.mock.calls.length).toBe(2);
  });

  it('should call error when failed to find rich menu', async () => {
    LineClient.connect().getRichMenuList.mockReturnValueOnce(
      Promise.resolve(null)
    );

    await getLineMenu();

    expect(error.mock.calls.length).toBe(1);
  });
});
