import verifySlackWebhook from '../verifySlackWebhook';

const middleware = verifySlackWebhook();

const createReqRes = body => [
  {
    body,
  },
  {
    send: jest.fn(),
  },
];

it('should correctly response the challenge is an url_verification event', () => {
  const [req, res] = createReqRes({
    token: '6fB8oKXh4Rj5VpahroN0m99K',
    challenge: 'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d',
    type: 'url_verification',
  });
  const next = jest.fn();
  middleware(req, res, next);
  expect(res.send).toBeCalledWith(
    'kImeZUaSI0jJLowDasma5WEiffaScgsjnINWDlpapA9fB7uCB36d'
  );
  expect(next).not.toBeCalled();
});

it('should call next when request is not an url_verification event', () => {
  const [req, res] = createReqRes({
    event: {},
    type: 'event_callback',
  });
  const next = jest.fn();
  middleware(req, res, next);
  expect(next).toBeCalled();
});
