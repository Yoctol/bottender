const attachOptions = require('../attachOptions');
const { sendText } = require('../');

it('should create action that will call sendText and tag', async () => {
  const action = attachOptions({ tag: 'ISSUE_RESOLUTION' }, sendText('haha'));
  const context = {
    sendText: jest.fn(() => Promise.resolve()),
  };

  await action(context);

  expect(context.sendText).toBeCalledWith('haha', { tag: 'ISSUE_RESOLUTION' });
});

it('should merge original options', async () => {
  const action = attachOptions(
    { tag: 'ISSUE_RESOLUTION' },
    sendText('haha', {
      quick_replies: [
        {
          content_type: 'text',
          title: 'Red',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
        },
      ],
    })
  );
  const context = {
    sendText: jest.fn(() => Promise.resolve()),
  };

  await action(context);

  expect(context.sendText).toBeCalledWith('haha', {
    quick_replies: [
      {
        content_type: 'text',
        title: 'Red',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
      },
    ],
    tag: 'ISSUE_RESOLUTION',
  });
});

it('should merge multiple attached options', async () => {
  const Action = attachOptions(
    { tag: 'ISSUE_RESOLUTION' },
    attachOptions(
      {
        quick_replies: [
          {
            content_type: 'text',
            title: 'Red',
            payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
          },
        ],
      },
      sendText('haha')
    )
  );
  const context = {
    sendText: jest.fn(() => Promise.resolve()),
  };

  await Action(context);

  expect(context.sendText).toBeCalledWith('haha', {
    quick_replies: [
      {
        content_type: 'text',
        title: 'Red',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
      },
    ],
    tag: 'ISSUE_RESOLUTION',
  });
});

it('should create action that will run in curried attachOptions', async () => {
  const attachIssueResolutionTag = attachOptions({ tag: 'ISSUE_RESOLUTION' });
  const Action = attachIssueResolutionTag(sendText('haha'));

  const context = {
    sendText: jest.fn(),
  };

  await Action(context);

  expect(context.sendText).toBeCalledWith('haha', { tag: 'ISSUE_RESOLUTION' });
});
