import logMessage from '../logMessage';

const db = {
  insert: jest.fn().mockReturnThis(),
  into: jest.fn(),
};

const middleware = logMessage({ db });

const msg = {
  message: {
    mid: 'mid.1486464322190:cb04e5a654',
    seq: 339979,
    text: '測試了',
  },
};

const createContext = () => ({
  request: {
    body: {
      entry: [
        {
          messaging: [msg],
        },
      ],
    },
  },
});

it('should be defined', () => {
  expect(logMessage).toBeDefined();
});

it('should call db.insert', async () => {
  const ctx = createContext();
  const next = jest.fn();

  await middleware(ctx, next);

  expect(db.insert).toBeCalledWith({
    text: JSON.stringify(msg),
    alien_id: null,
  });
});
