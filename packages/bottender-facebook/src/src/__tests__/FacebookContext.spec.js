import FacebookContext from '../FacebookContext';
import FacebookEvent from '../FacebookEvent';

jest.mock('warning');

const userRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    comment_id: '139560936744456_139620233405726',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    parent_id: '139560936744456_139562213411528',
    created_time: 1511951015,
    message: 'OK',
  },
};

const sentByPageRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '137542570280222',
      name: 'page',
    },
    item: 'comment',
    comment_id: '139560936744456_139620233405726',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    parent_id: '139560936744456_139562213411528',
    created_time: 1511951015,
    message: 'OK',
  },
};

const setup = ({ rawEvent, pageId } = { rawEvent: userRawEvent }) => {
  const client = {
    sendComment: jest.fn(),
    sendPrivateReply: jest.fn(),
    sendLike: jest.fn(),
    getComment: jest.fn(),
    getLikes: jest.fn(),
  };

  const context = new FacebookContext({
    client,
    event: new FacebookEvent(rawEvent, { pageId }),
  });
  return {
    client,
    context,
  };
};

describe('#sendComment', () => {
  it('should call client with comment id, when incoming comment is a first layer comment', async () => {
    const { context, client } = setup({
      rawEvent: {
        field: 'feed',
        value: {
          from: {
            id: '139560936744123',
            name: 'user',
          },
          item: 'comment',
          comment_id: '139560936744456_139620233405726',
          post_id: '137542570280222_139560936744456',
          verb: 'add',
          parent_id: '137542570280222_139560936744456',
          created_time: 1511951015,
          message: 'OK',
        },
      },
    });

    await context.sendComment('Public Reply!');

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139620233405726',
      'Public Reply!',
      { access_token: undefined }
    );
  });

  it('should call client with parent id, when the incoming comment is not a first layer comment', async () => {
    const { context, client } = setup();

    await context.sendComment('Public Reply!');

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      'Public Reply!',
      { access_token: undefined }
    );
  });

  it('should not reply to page itself', async () => {
    const { context, client } = setup({
      rawEvent: sentByPageRawEvent,
      pageId: '137542570280222',
    });

    await context.sendComment('Public Reply!');

    expect(client.sendComment).not.toBeCalled();
  });

  it('should call client with message', async () => {
    const { context, client } = setup();

    await context.sendComment({ message: 'Public Reply!' });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { message: 'Public Reply!' },
      { access_token: undefined }
    );
  });

  it('should call client with attachment_id', async () => {
    const { context, client } = setup();

    await context.sendComment({ attachment_id: '<attachment_id>' });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { attachment_id: '<attachment_id>' },
      { access_token: undefined }
    );
  });

  it('should call client with attachment_share_url', async () => {
    const { context, client } = setup();

    await context.sendComment({
      attachment_share_url: 'https://example.com/img.gif',
    });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { attachment_share_url: 'https://example.com/img.gif' },
      { access_token: undefined }
    );
  });

  it('should call client with attachment_url', async () => {
    const { context, client } = setup();

    await context.sendComment({
      attachment_url: 'https://example.com/img.jpg',
    });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { attachment_url: 'https://example.com/img.jpg' },
      { access_token: undefined }
    );
  });
});

describe('#sendPrivateReply', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.sendPrivateReply('OK!');

    expect(client.sendPrivateReply).toBeCalledWith(
      '139560936744456_139620233405726',
      'OK!',
      {
        access_token: undefined,
      }
    );
  });

  it('should not reply to page itself', async () => {
    const { context, client } = setup({
      rawEvent: sentByPageRawEvent,
      pageId: '137542570280222',
    });

    await context.sendPrivateReply('OK!');

    expect(client.sendPrivateReply).not.toBeCalled();
  });
});

describe('#sendLike', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.sendLike();

    expect(client.sendLike).toBeCalledWith('139560936744456_139620233405726', {
      access_token: undefined,
    });
  });
});

describe('#getComment', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.getComment();

    expect(client.getComment).toBeCalledWith(
      '139560936744456_139620233405726',
      { access_token: undefined }
    );
  });

  it('should call client with fields', async () => {
    const { context, client } = setup();

    await context.getComment({ fields: ['message_tags'] });

    expect(client.getComment).toBeCalledWith(
      '139560936744456_139620233405726',
      { fields: ['message_tags'], access_token: undefined }
    );
  });
});

describe('#canReplyPrivately', () => {
  it('should be false when is not commet', async () => {
    const { context, client } = setup();

    client.getComment.mockResolvedValue(null);

    expect(await context.canReplyPrivately()).toBe(false);

    expect(client.getComment).toBeCalledWith(
      '139560936744456_139620233405726',
      {
        fields: ['can_reply_privately'],
      }
    );
  });

  it('should be true when can_reply_privately: true', async () => {
    const { context, client } = setup();

    client.getComment.mockResolvedValue({
      can_reply_privately: true,
    });

    expect(await context.canReplyPrivately()).toBe(true);
  });

  it('should be false when can_reply_privately: false', async () => {
    const { context, client } = setup();

    client.getComment.mockResolvedValue({
      can_reply_privately: false,
    });

    expect(await context.canReplyPrivately()).toBe(false);
  });
});

describe('#getLikes', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.getLikes();

    expect(client.getLikes).toBeCalledWith('139560936744456_139620233405726', {
      access_token: undefined,
    });
  });

  it('should call client with summary: true', async () => {
    const { context, client } = setup();

    await context.getLikes({ summary: true });

    expect(client.getLikes).toBeCalledWith('139560936744456_139620233405726', {
      summary: true,
      access_token: undefined,
    });
  });
});
