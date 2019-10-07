const platform = require('../platform');
const { sendText } = require('../');

it('should have correct name', () => {
  const Messenger = sendText('messenger');
  const Line = sendText('line');

  const Platform = platform({
    messenger: Messenger,
    line: Line,
  });

  expect(Platform.name).toEqual(
    `Platform(messenger: SendText(messenger), line: SendText(line))`
  );
});

it('should create action that will call sendText with messenger when messenger', async () => {
  const Messenger = sendText('messenger');
  const Line = sendText('line');

  const Platform = platform({
    messenger: Messenger,
    line: Line,
  });

  const context = {
    platform: 'messenger',
    sendText: jest.fn(),
  };

  const Action = await Platform(context);

  expect(Action).toEqual(Messenger);
});

it('should create action that will call sendText with others when telegram', async () => {
  const Messenger = sendText('messenger');
  const Line = sendText('line');
  const Others = sendText('other');

  const Platform = platform({
    messenger: Messenger,
    line: Line,
    others: Others,
  });

  const context = {
    platform: 'telegram',
    sendText: jest.fn(),
  };

  const Action = await Platform(context);

  expect(Action).toEqual(Others);
});

describe('should pass extra args to underlying action', () => {
  xit('on platform', () => {
    const messenger = jest.fn();
    const line = jest.fn();

    const action = platform({
      messenger,
      line,
    });

    const context = {
      platform: 'messenger',
      sendText: jest.fn(),
    };

    const extraArg = {};

    action(context, extraArg);

    expect(messenger).toBeCalledWith(context, extraArg);
  });

  xit('on others', () => {
    const messenger = jest.fn();
    const line = jest.fn();
    const others = jest.fn();

    const action = platform({
      messenger,
      line,
      others,
    });

    const context = {
      platform: 'telegram',
      sendText: jest.fn(),
    };

    const extraArg = {};

    action(context, extraArg);

    expect(others).toBeCalledWith(context, extraArg);
  });
});
