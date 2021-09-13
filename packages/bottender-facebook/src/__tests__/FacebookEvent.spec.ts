import FacebookEvent from '../FacebookEvent';
import { ChangesEntry, FacebookRawEvent } from '../FacebookTypes';

const statusAdd: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    postId: '137542570280222_139610053406744',
    verb: 'add',
    published: 1,
    createdTime: 1511949030,
    message: 'test',
  },
};

const statusEdited: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    postId: '137542570280222_139560936744456',
    verb: 'edited',
    published: 1,
    createdTime: 1511927135,
    message: '1234',
  },
};

const postRemove: FacebookRawEvent = {
  field: 'feed',
  value: {
    recipientId: '137542570280222',
    from: {
      id: '139560936744123',
    },
    item: 'post',
    postId: '137542570280222_139610053406744',
    verb: 'remove',
    createdTime: 1511949068,
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

const commentEdited: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    commentId: '139560936744456_139597043408045',
    postId: '137542570280222_139560936744456',
    verb: 'edited',
    parentId: '137542570280222_139560936744456',
    createdTime: 1511948891,
    message: 'Great',
  },
};

const commentRemove: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
    },
    parentId: '137542570280222_139560936744456',
    commentId: '139560936744456_139597043408045',
    postId: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'comment',
    createdTime: 1511948944,
  },
};

const pageLikeAdd: FacebookRawEvent = {
  value: {
    item: 'like',
    verb: 'add',
  },
  field: 'feed',
};

const timestamp = 1511948944;

const reactionAdd: FacebookRawEvent = {
  field: 'feed',
  value: {
    reactionType: 'like',
    from: {
      id: '139560936744123',
    },
    parentId: '139560936744456_139597043408045',
    commentId: '139560936744456_139597090074707',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    item: 'reaction',
    createdTime: 1511948636,
  },
};

const reactionEdit: FacebookRawEvent = {
  field: 'feed',
  value: {
    reactionType: 'sad',
    from: {
      id: '139560936744123',
    },
    parentId: '139560936744456_139597043408045',
    commentId: '139560936744456_139597090074707',
    postId: '137542570280222_139560936744456',
    verb: 'edit',
    item: 'reaction',
    createdTime: 1511948713,
  },
};

const reactionRemove: FacebookRawEvent = {
  field: 'feed',
  value: {
    reactionType: 'like',
    from: {
      id: '139560936744123',
    },
    parentId: '139560936744456_139597043408045',
    commentId: '139560936744456_139597090074707',
    postId: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'reaction',
    createdTime: 1511948666,
  },
};

const postReaction: FacebookRawEvent = {
  field: 'feed',
  value: {
    reactionType: 'like',
    from: {
      id: '139560936744123',
    },
    parentId: '137542570280222_139560936744456',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    item: 'reaction',
    createdTime: 1568176139,
  },
};

const pageId = '137542570280111';

const sentByPage: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '137542570280111',
      name: 'Bottender',
    },
    item: 'comment',
    commentId: '139560936755999_140077616693321',
    postId: '137542570280111_139560936755999',
    verb: 'add',
    parentId: '139560936755999_140077593359990',
    createdTime: 1512121727,
    message: 'Public reply!',
  },
};

const videoCommentAdd: FacebookRawEvent = {
  field: 'feed',
  value: {
    from: {
      id: '1440971912666228',
      name: 'Hsuan-Yih Shawn Chu',
    },
    item: 'comment',
    commentId: '139560936755999_140077616693321',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    parentId: '137542570280222_139560936744456',
    createdTime: 1545829217,
    post: {
      type: 'video',
      updatedTime: '2018-12-26T13:00:17+0000',
      promotionStatus: 'inactive',
      permalinkUrl: 'https://www.facebook.com/xxx/posts/1111',
      id: '137542570280222_139560936744456',
      statusType: 'added_video',
      isPublished: true,
    },
    message: '100',
  },
};

it('#isFeed', () => {
  expect(new FacebookEvent(statusAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(statusEdited).isFeed).toEqual(true);
  expect(new FacebookEvent(postRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(commentAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(videoCommentAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(commentEdited).isFeed).toEqual(true);
  expect(new FacebookEvent(commentRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(reactionEdit).isFeed).toEqual(true);
  expect(new FacebookEvent(reactionRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(postReaction).isFeed).toEqual(true);
  expect(new FacebookEvent(sentByPage).isFeed).toEqual(true);
});

it('#isStatus', () => {
  expect(new FacebookEvent(statusAdd).isStatus).toEqual(true);
  expect(new FacebookEvent(statusEdited).isStatus).toEqual(true);
  expect(new FacebookEvent(postRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(commentAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(commentEdited).isStatus).toEqual(false);
  expect(new FacebookEvent(commentRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isStatus).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(postReaction).isStatus).toEqual(false);
  expect(new FacebookEvent(sentByPage).isStatus).toEqual(false);
});

it('#isStatusAdd', () => {
  expect(new FacebookEvent(statusAdd).isStatusAdd).toEqual(true);
  expect(new FacebookEvent(statusEdited).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(commentEdited).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(postReaction).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(sentByPage).isStatusAdd).toEqual(false);
});

it('#isStatusEdited', () => {
  expect(new FacebookEvent(statusAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(statusEdited).isStatusEdited).toEqual(true);
  expect(new FacebookEvent(postRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(commentAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(commentEdited).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(commentRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(postReaction).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(sentByPage).isStatusEdited).toEqual(false);
});

it('#status', () => {
  expect(new FacebookEvent(statusAdd).status).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    postId: '137542570280222_139610053406744',
    verb: 'add',
    published: 1,
    createdTime: 1511949030,
    message: 'test',
  });
  expect(new FacebookEvent(statusEdited).status).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    postId: '137542570280222_139560936744456',
    verb: 'edited',
    published: 1,
    createdTime: 1511927135,
    message: '1234',
  });
  expect(new FacebookEvent(postRemove).status).toEqual(null);
  expect(new FacebookEvent(commentAdd).status).toEqual(null);
  expect(new FacebookEvent(commentAdd).status).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).status).toEqual(null);
  expect(new FacebookEvent(commentEdited).status).toEqual(null);
  expect(new FacebookEvent(commentRemove).status).toEqual(null);
  expect(new FacebookEvent(reactionAdd).status).toEqual(null);
  expect(new FacebookEvent(reactionEdit).status).toEqual(null);
  expect(new FacebookEvent(reactionRemove).status).toEqual(null);
  expect(new FacebookEvent(postReaction).status).toEqual(null);
  expect(new FacebookEvent(sentByPage).status).toEqual(null);
});

it('#isPost', () => {
  expect(new FacebookEvent(statusAdd).isPost).toEqual(false);
  expect(new FacebookEvent(statusEdited).isPost).toEqual(false);
  expect(new FacebookEvent(postRemove).isPost).toEqual(true);
  expect(new FacebookEvent(commentAdd).isPost).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isPost).toEqual(false);
  expect(new FacebookEvent(commentEdited).isPost).toEqual(false);
  expect(new FacebookEvent(commentRemove).isPost).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isPost).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isPost).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isPost).toEqual(false);
  expect(new FacebookEvent(postReaction).isPost).toEqual(false);
  expect(new FacebookEvent(sentByPage).isPost).toEqual(false);
});

it('#isPostRemove', () => {
  expect(new FacebookEvent(statusAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isPostRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isPostRemove).toEqual(true);
  expect(new FacebookEvent(commentAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isPostRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isPostRemove).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isPostRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isPostRemove).toEqual(false);
  expect(new FacebookEvent(postReaction).isPostRemove).toEqual(false);
  expect(new FacebookEvent(sentByPage).isPostRemove).toEqual(false);
});

it('#post', () => {
  expect(new FacebookEvent(statusAdd).post).toEqual(null);
  expect(new FacebookEvent(statusEdited).post).toEqual(null);
  expect(new FacebookEvent(postRemove).post).toEqual({
    recipientId: '137542570280222',
    from: {
      id: '139560936744123',
    },
    item: 'post',
    postId: '137542570280222_139610053406744',
    verb: 'remove',
    createdTime: 1511949068,
  });
  expect(new FacebookEvent(commentAdd).post).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).post).toEqual(null);
  expect(new FacebookEvent(commentEdited).post).toEqual(null);
  expect(new FacebookEvent(commentRemove).post).toEqual(null);
  expect(new FacebookEvent(reactionAdd).post).toEqual(null);
  expect(new FacebookEvent(reactionEdit).post).toEqual(null);
  expect(new FacebookEvent(reactionRemove).post).toEqual(null);
  expect(new FacebookEvent(postReaction).post).toEqual(null);
  expect(new FacebookEvent(sentByPage).post).toEqual(null);
});

it('#isComment', () => {
  expect(new FacebookEvent(statusAdd).isComment).toEqual(false);
  expect(new FacebookEvent(statusEdited).isComment).toEqual(false);
  expect(new FacebookEvent(postRemove).isComment).toEqual(false);
  expect(new FacebookEvent(commentAdd).isComment).toEqual(true);
  expect(new FacebookEvent(videoCommentAdd).isComment).toEqual(true);
  expect(new FacebookEvent(commentEdited).isComment).toEqual(true);
  expect(new FacebookEvent(commentRemove).isComment).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isComment).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isComment).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isComment).toEqual(false);
  expect(new FacebookEvent(postReaction).isComment).toEqual(false);
  expect(new FacebookEvent(sentByPage).isComment).toEqual(true);
});

it('#isCommentAdd', () => {
  expect(new FacebookEvent(statusAdd).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(statusEdited).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isCommentAdd).toEqual(true);
  expect(new FacebookEvent(videoCommentAdd).isCommentAdd).toEqual(true);
  expect(new FacebookEvent(commentEdited).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(postReaction).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(sentByPage).isCommentAdd).toEqual(true);
});

it('#isCommentEdited', () => {
  expect(new FacebookEvent(statusAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(statusEdited).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(postRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(commentAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(commentEdited).isCommentEdited).toEqual(true);
  expect(new FacebookEvent(commentRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(postReaction).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(sentByPage).isCommentEdited).toEqual(false);
});

it('#isCommentRemove', () => {
  expect(new FacebookEvent(statusAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(commentAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isCommentRemove).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(postReaction).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(sentByPage).isCommentRemove).toEqual(false);
});

it('#isFirstLayerComment', () => {
  expect(new FacebookEvent(statusAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(statusEdited).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(postRemove).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(commentAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isFirstLayerComment).toEqual(true);
  expect(new FacebookEvent(commentEdited).isFirstLayerComment).toEqual(true);
  expect(new FacebookEvent(commentRemove).isFirstLayerComment).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(postReaction).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(sentByPage).isFirstLayerComment).toEqual(false);
});

it('#comment', () => {
  expect(new FacebookEvent(statusAdd).comment).toEqual(null);
  expect(new FacebookEvent(statusEdited).comment).toEqual(null);
  expect(new FacebookEvent(postRemove).comment).toEqual(null);
  expect(new FacebookEvent(commentAdd).comment).toEqual({
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
  });
  expect(new FacebookEvent(videoCommentAdd).comment).toEqual({
    commentId: '139560936755999_140077616693321',
    createdTime: 1545829217,
    from: {
      id: '1440971912666228',
      name: 'Hsuan-Yih Shawn Chu',
    },
    item: 'comment',
    message: '100',
    parentId: '137542570280222_139560936744456',
    post: {
      id: '137542570280222_139560936744456',
      isPublished: true,
      permalinkUrl: 'https://www.facebook.com/xxx/posts/1111',
      promotionStatus: 'inactive',
      statusType: 'added_video',
      type: 'video',
      updatedTime: '2018-12-26T13:00:17+0000',
    },
    postId: '137542570280222_139560936744456',
    verb: 'add',
  });
  expect(new FacebookEvent(commentEdited).comment).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    commentId: '139560936744456_139597043408045',
    postId: '137542570280222_139560936744456',
    verb: 'edited',
    parentId: '137542570280222_139560936744456',
    createdTime: 1511948891,
    message: 'Great',
  });
  expect(new FacebookEvent(commentRemove).comment).toEqual({
    from: {
      id: '139560936744123',
    },
    parentId: '137542570280222_139560936744456',
    commentId: '139560936744456_139597043408045',
    postId: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'comment',
    createdTime: 1511948944,
  });
  expect(new FacebookEvent(reactionAdd).comment).toEqual(null);
  expect(new FacebookEvent(reactionEdit).comment).toEqual(null);
  expect(new FacebookEvent(reactionRemove).comment).toEqual(null);
  expect(new FacebookEvent(postReaction).comment).toEqual(null);
  expect(new FacebookEvent(sentByPage).comment).toEqual({
    from: {
      id: '137542570280111',
      name: 'Bottender',
    },
    item: 'comment',
    commentId: '139560936755999_140077616693321',
    postId: '137542570280111_139560936755999',
    verb: 'add',
    parentId: '139560936755999_140077593359990',
    createdTime: 1512121727,
    message: 'Public reply!',
  });
});

it('#isReaction', () => {
  expect(new FacebookEvent(statusAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReaction).toEqual(false);
  expect(new FacebookEvent(postRemove).isReaction).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReaction).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReaction).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReaction).toEqual(true);
  expect(new FacebookEvent(reactionEdit).isReaction).toEqual(true);
  expect(new FacebookEvent(reactionRemove).isReaction).toEqual(true);
  expect(new FacebookEvent(postReaction).isReaction).toEqual(true);
  expect(new FacebookEvent(sentByPage).isReaction).toEqual(false);
});

it('#isReactionAdd', () => {
  expect(new FacebookEvent(statusAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReactionAdd).toEqual(true);
  expect(new FacebookEvent(reactionEdit).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(postReaction).isReactionAdd).toEqual(true);
  expect(new FacebookEvent(sentByPage).isReactionAdd).toEqual(false);
});

it('#isReactionEdit', () => {
  expect(new FacebookEvent(statusAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(postRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isReactionEdit).toEqual(true);
  expect(new FacebookEvent(reactionRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(postReaction).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(sentByPage).isReactionEdit).toEqual(false);
});

it('#isReactionRemove', () => {
  expect(new FacebookEvent(statusAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isReactionRemove).toEqual(true);
  expect(new FacebookEvent(postReaction).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(sentByPage).isReactionRemove).toEqual(false);
});

it('#isPostReaction', () => {
  expect(new FacebookEvent(statusAdd).isPostReaction).toEqual(false);
  expect(new FacebookEvent(statusEdited).isPostReaction).toEqual(false);
  expect(new FacebookEvent(postRemove).isPostReaction).toEqual(false);
  expect(new FacebookEvent(commentAdd).isPostReaction).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isPostReaction).toEqual(false);
  expect(new FacebookEvent(commentEdited).isPostReaction).toEqual(false);
  expect(new FacebookEvent(commentRemove).isPostReaction).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isPostReaction).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isPostReaction).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isPostReaction).toEqual(false);
  expect(new FacebookEvent(postReaction).isPostReaction).toEqual(true);
  expect(new FacebookEvent(sentByPage).isPostReaction).toEqual(false);
});

it('#reaction', () => {
  expect(new FacebookEvent(statusAdd).reaction).toEqual(null);
  expect(new FacebookEvent(statusEdited).reaction).toEqual(null);
  expect(new FacebookEvent(postRemove).reaction).toEqual(null);
  expect(new FacebookEvent(commentAdd).reaction).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).reaction).toEqual(null);
  expect(new FacebookEvent(commentEdited).reaction).toEqual(null);
  expect(new FacebookEvent(commentRemove).reaction).toEqual(null);
  expect(new FacebookEvent(reactionAdd).reaction).toEqual({
    reactionType: 'like',
    from: {
      id: '139560936744123',
    },
    parentId: '139560936744456_139597043408045',
    commentId: '139560936744456_139597090074707',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    item: 'reaction',
    createdTime: 1511948636,
  });
  expect(new FacebookEvent(reactionEdit).reaction).toEqual({
    reactionType: 'sad',
    from: {
      id: '139560936744123',
    },
    parentId: '139560936744456_139597043408045',
    commentId: '139560936744456_139597090074707',
    postId: '137542570280222_139560936744456',
    verb: 'edit',
    item: 'reaction',
    createdTime: 1511948713,
  });
  expect(new FacebookEvent(reactionRemove).reaction).toEqual({
    reactionType: 'like',
    from: {
      id: '139560936744123',
    },
    parentId: '139560936744456_139597043408045',
    commentId: '139560936744456_139597090074707',
    postId: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'reaction',
    createdTime: 1511948666,
  });
  expect(new FacebookEvent(postReaction).reaction).toEqual({
    reactionType: 'like',
    from: {
      id: '139560936744123',
    },
    parentId: '137542570280222_139560936744456',
    postId: '137542570280222_139560936744456',
    verb: 'add',
    item: 'reaction',
    createdTime: 1568176139,
  });
  expect(new FacebookEvent(sentByPage).reaction).toEqual(null);
});

it('#pageId', () => {
  expect(new FacebookEvent(statusAdd, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(statusEdited, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(postRemove, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(commentAdd, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(videoCommentAdd, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(commentEdited, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(commentRemove, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(reactionAdd, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(reactionEdit, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(reactionRemove, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(postReaction, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(sentByPage, { pageId }).pageId).toEqual(
    '137542570280111'
  );
});

it('#isSentByPage', () => {
  expect(new FacebookEvent(statusAdd, { pageId }).isSentByPage).toEqual(false);
  expect(new FacebookEvent(statusEdited, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(postRemove, { pageId }).isSentByPage).toEqual(false);
  expect(new FacebookEvent(commentAdd, { pageId }).isSentByPage).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(commentEdited, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(commentRemove, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(reactionAdd, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(reactionEdit, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(reactionRemove, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(postReaction, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(sentByPage, { pageId }).isSentByPage).toEqual(true);
});

it('#isPageLike', () => {
  expect(new FacebookEvent(statusAdd, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(statusEdited, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(postRemove, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(commentAdd, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd, { pageId }).isPageLike).toEqual(
    false
  );
  expect(new FacebookEvent(commentEdited, { pageId }).isPageLike).toEqual(
    false
  );
  expect(new FacebookEvent(commentRemove, { pageId }).isPageLike).toEqual(
    false
  );
  expect(new FacebookEvent(reactionAdd, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(reactionEdit, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(reactionRemove, { pageId }).isPageLike).toEqual(
    false
  );
  expect(new FacebookEvent(postReaction, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(sentByPage, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd, { pageId }).isPageLike).toEqual(true);
});

it('#timestamp', () => {
  expect(new FacebookEvent(statusAdd).timestamp).toEqual(1511949030);
  expect(new FacebookEvent(statusEdited).timestamp).toEqual(1511927135);
  expect(new FacebookEvent(postRemove).timestamp).toEqual(1511949068);
  expect(new FacebookEvent(commentAdd).timestamp).toEqual(1511951015);
  expect(new FacebookEvent(videoCommentAdd).timestamp).toEqual(1545829217);
  expect(new FacebookEvent(commentEdited).timestamp).toEqual(1511948891);
  expect(new FacebookEvent(commentRemove).timestamp).toEqual(1511948944);
  expect(new FacebookEvent(reactionAdd).timestamp).toEqual(1511948636);
  expect(new FacebookEvent(reactionEdit).timestamp).toEqual(1511948713);
  expect(new FacebookEvent(reactionRemove).timestamp).toEqual(1511948666);
  expect(new FacebookEvent(sentByPage).timestamp).toEqual(1512121727);
  expect(new FacebookEvent(pageLikeAdd, { timestamp }).timestamp).toEqual(
    1511948944
  );
});
