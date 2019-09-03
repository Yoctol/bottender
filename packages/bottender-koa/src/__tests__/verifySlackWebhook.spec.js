import verifySlackWebhook from '../verifySlackWebhook';

const middleware = verifySlackWebhook();

const createContext = body => ({
  request: {
    body,
  },
  response: {},
});

it('should correctly response the challenge is an url_verification event', () => {
  const ctx = createContext({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
    type: 'url_verification',
  });
  const next = jest.fn();
  middleware(ctx, next);
  expect(ctx.response.body).toBe(
    'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d'
  );
  expect(next).not.toBeCalled();
});

it('should call next when request is not an url_verification event', () => {
  const ctx = createContext({
    event: {},
    type: 'event_callback',
  });
  const next = jest.fn();
  middleware(ctx, next);
  expect(next).toBeCalled();
});
