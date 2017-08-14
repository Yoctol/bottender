import micro from 'micro';

import verifySlackWebhook from '../verifySlackWebhook';

jest.mock('micro');

const middleware = verifySlackWebhook();

const createContext = body => ({
  request: {
    body,
  },
  response: {},
});

it('should not response the challenge if it is not an url_verification event', async () => {
  const { req, res } = createContext({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
  });
  micro.json.mockReturnValueOnce({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
  });
  await middleware(req, res);
  expect(micro.send).not.toBeCalled();
});

it('should correctly response the challenge if it is an url_verification event', async () => {
  const { req, res } = createContext({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
    type: 'url_verification',
  });
  micro.json.mockReturnValueOnce({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
    type: 'url_verification',
  });
  await middleware(req, res);
  expect(micro.send).toBeCalledWith(
    res,
    200,
    'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d'
  );
});
