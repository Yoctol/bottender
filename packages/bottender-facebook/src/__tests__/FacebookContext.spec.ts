import FacebookContext from '../FacebookContext';
import FacebookEvent, { FacebookRawEvent } from '../FacebookEvent';

jest.mock('warning');

const userRawEvent: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    commentId: '139560936744456_139620233405726',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    parentId: '139560936744456_139562213411528',
    createdTime: 1511951015,
    message: 'OK',
  },
};

const sentByPageRawEvent: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '137542570280222',
      name: 'page',
    },
    item: 'comment',
    commentId: '139560936744456_139620233405726',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    parentId: '139560936744456_139562213411528',
    createdTime: 1511951015,
    message: 'OK',
  },
};

const postAdd: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '156407155145863',
      name: 'Cinderella Hoover',
    },
    item: 'post',
    postId: '1353269864728879_1611108832278313',
    verb: 'add',
    createdTime: 1520544814,
    isHidden: false,
    message: "It's Thursday and I want to eat cake.",
  },
};

const commentAdd: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    commentId: '139560936744456_139620233405726',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    parentId: '139560936744456_139562213411528',
    createdTime: 1511951015,
    message: 'Good',
  },
};

const setup = ({
  rawEvent = userRawEvent,
  pageId,
}: {
  rawEvent?: FacebookRawEvent;
  pageId?: string;
} = {}) => {
  const client = {
    sendText: jest.fn(),
    sendMessage: jest.fn(),
    sendComment: jest.fn(),
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

describe('#sendText', () => {
  it('should work with posts', async () => {
    const { context, client } = setup({
      rawEvent: postAdd,
    });

    await context.sendText('Private Reply!');

    expect(client.sendText).toBeCalledWith(
      { postId: '1353269864728879_1611108832278313' },
      'Private Reply!'
    );
  });

  it('should work with comments', async () => {
    const { context, client } = setup({
      rawEvent: commentAdd,
    });

    await context.sendText('Private Reply!');

    expect(client.sendText).toBeCalledWith(
      { commentId: '139560936744456_139620233405726' },
      'Private Reply!'
    );
  });
});

describe('#sendMessage', () => {
  it('should work with posts', async () => {
    const { context, client } = setup({
      rawEvent: postAdd,
    });

    await context.sendMessage({
      text: 'Private Reply!',
    });

    expect(client.sendMessage).toBeCalledWith(
      { postId: '1353269864728879_1611108832278313' },
      {
        text: 'Private Reply!',
      }
    );
  });

  it('should work with comments', async () => {
    const { context, client } = setup({
      rawEvent: commentAdd,
    });

    await context.sendMessage({
      text: 'Private Reply!',
    });

    expect(client.sendMessage).toBeCalledWith(
      { commentId: '139560936744456_139620233405726' },
      {
        text: 'Private Reply!',
      }
    );
  });
});

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
          commentId: '139560936744456_139620233405726',
          postId: '137542570280222_139560936744456',
          verb: 'add',
          parentId: '137542570280222_139560936744456',
          createdTime: 1511951015,
          message: 'OK',
        },
      },
    });

    await context.sendComment('Public Reply!');

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139620233405726',
      'Public Reply!'
    );
  });

  it('should call client with parent id, when the incoming comment is not a first layer comment', async () => {
    const { context, client } = setup();

    await context.sendComment('Public Reply!');

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      'Public Reply!'
    );
  });

  it('should work with posts', async () => {
    const { context, client } = setup({
      rawEvent: postAdd,
    });

    await context.sendComment('Public Reply!');

    expect(client.sendComment).toBeCalledWith(
      '1353269864728879_1611108832278313',
      'Public Reply!'
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
      { message: 'Public Reply!' }
    );
  });

  it('should call client with attachmentId', async () => {
    const { context, client } = setup();

    await context.sendComment({ attachmentId: '<attachment_id>' });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { attachmentId: '<attachment_id>' }
    );
  });

  it('should call client with attachmentShareUrl', async () => {
    const { context, client } = setup();

    await context.sendComment({
      attachmentShareUrl: 'https://example.com/img.gif',
    });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { attachmentShareUrl: 'https://example.com/img.gif' }
    );
  });

  it('should call client with attachmentUrl', async () => {
    const { context, client } = setup();

    await context.sendComment({
      attachmentUrl: 'https://example.com/img.jpg',
    });

    expect(client.sendComment).toBeCalledWith(
      '139560936744456_139562213411528',
      { attachmentUrl: 'https://example.com/img.jpg' }
    );
  });
});

describe('#sendLike', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.sendLike();

    expect(client.sendLike).toBeCalledWith('139560936744456_139620233405726');
  });

  it('should work with posts', async () => {
    const { context, client } = setup({
      rawEvent: postAdd,
    });

    await context.sendLike();

    expect(client.sendLike).toBeCalledWith('1353269864728879_1611108832278313');
  });
});

describe('#getComment', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.getComment();

    expect(client.getComment).toBeCalledWith(
      '139560936744456_139620233405726',
      { fields: ['id', 'message', 'created_time'] }
    );
  });

  it('should call client with fields', async () => {
    const { context, client } = setup();

    await context.getComment({ fields: ['message_tags'] });

    expect(client.getComment).toBeCalledWith(
      '139560936744456_139620233405726',
      { fields: ['message_tags'] }
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
      canReplyPrivately: true,
    });

    expect(await context.canReplyPrivately()).toBe(true);
  });

  it('should be false when can_reply_privately: false', async () => {
    const { context, client } = setup();

    client.getComment.mockResolvedValue({
      canReplyPrivately: false,
    });

    expect(await context.canReplyPrivately()).toBe(false);
  });
});

describe('#getLikes', () => {
  it('should call client with comment id', async () => {
    const { context, client } = setup();

    await context.getLikes();

    expect(client.getLikes).toBeCalledWith(
      '139560936744456_139620233405726',
      undefined
    );
  });

  it('should call client with summary: true', async () => {
    const { context, client } = setup();

    await context.getLikes({ summary: true });

    expect(client.getLikes).toBeCalledWith('139560936744456_139620233405726', {
      summary: true,
    });
  });
});
