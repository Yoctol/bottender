import verifySlackWebhook from '../verifySlackWebhook';

const middleware = verifySlackWebhook();

const createContext = params => ({
  request: {
    params,
  },
  response: {
    end: jest.fn(),
  },
});

it('should correctly response the challenge is an url_verification event', () => {
  const { request, response } = createContext({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
    type: 'url_verification',
  });
  const next = jest.fn();
  middleware(request, response, next);
  expect(response.end).toBeCalledWith(
    'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d'
  );
  expect(next).toBeCalled();
});

it('should only call next when request is not an url_verification event', () => {
  const { request, response } = createContext({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
    type: '',
  });
  const next = jest.fn();
  middleware(request, response, next);
  expect(response.end).not.toBeCalled();
  expect(next).toBeCalled();
});
