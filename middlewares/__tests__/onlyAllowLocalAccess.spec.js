import onlyAllowLocalAccess from '../onlyAllowLocalAccess';

const middleware = onlyAllowLocalAccess();

const createContext = ({ host }) => ({
  request: {
    method: 'GET',
    url: '/private',
    header: {
      host,
      connection: 'keep-alive',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, sdch, br',
      'accept-language': 'en,zh;q=0.8,zh-TW;q=0.6',
      cookie: 'gsScrollPos=0',
    },
  },
  response: {},
});

it('localhost:port should be allowed', () => {
  let ctx;
  let next;

  ctx = createContext({ host: 'localhost:1234' });
  next = jest.fn();
  middleware(ctx, next);
  expect(next).toBeCalled();

  ctx = createContext({ host: 'localhost:8080' });
  next = jest.fn();
  middleware(ctx, next);
  expect(next).toBeCalled();

  ctx = createContext({ host: 'localhost:54321' });
  next = jest.fn();
  middleware(ctx, next);
  expect(next).toBeCalled();
});

it('192.168.x.x:port should be allowed', () => {
  let ctx;
  let next;

  ctx = createContext({ host: '192.168.0.123:1234' });
  next = jest.fn();
  middleware(ctx, next);
  expect(next).toBeCalled();

  ctx = createContext({ host: '192.168.123.0:8080' });
  next = jest.fn();
  middleware(ctx, next);
  expect(next).toBeCalled();
});

it('others should be rejected', () => {
  const ctx = createContext({ host: '120.114.0.123:1234' });
  const next = jest.fn();
  middleware(ctx, next);
  expect(next).not.toBeCalled();

  expect(ctx.response).toEqual({
    status: 403,
    body: 'HTTP 403 Forbidden',
  });
});
