import FacebookEvent from '../FacebookEvent';

const statusAdd = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    post_id: '137542570280222_139610053406744',
    verb: 'add',
    published: 1,
    created_time: 1511949030,
    message: 'test',
  },
};

const statusEdited = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    post_id: '137542570280222_139560936744456',
    verb: 'edited',
    published: 1,
    created_time: 1511927135,
    message: '1234',
  },
};

const postRemove = {
  field: 'feed',
  value: {
    recipient_id: '137542570280222',
    from: {
      id: '139560936744123',
    },
    item: 'post',
    post_id: '137542570280222_139610053406744',
    verb: 'remove',
    created_time: 1511949068,
  },
};

const commentAdd = {
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
    message: 'Good',
  },
};

const commentEdited = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    comment_id: '139560936744456_139597043408045',
    post_id: '137542570280222_139560936744456',
    verb: 'edited',
    parent_id: '137542570280222_139560936744456',
    created_time: 1511948891,
    message: 'Great',
  },
};

const commentRemove = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
    },
    parent_id: '137542570280222_139560936744456',
    comment_id: '139560936744456_139597043408045',
    post_id: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'comment',
    created_time: 1511948944,
  },
};

const likeAdd = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
      name: 'user',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    item: 'like',
    created_time: 1511948636,
  },
};

const pageLikeAdd = {
  value: {
    item: 'like',
    verb: 'add',
  },
  field: 'feed',
};

const likeRemove = {
  field: 'feed',
  value: {
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'like',
    created_time: 1511948666,
  },
};

const reactionAdd = {
  field: 'feed',
  value: {
    reaction_type: 'like',
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    item: 'reaction',
    created_time: 1511948636,
  },
};

const reactionEdit = {
  field: 'feed',
  value: {
    reaction_type: 'sad',
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'edit',
    item: 'reaction',
    created_time: 1511948713,
  },
};

const reactionRemove = {
  field: 'feed',
  value: {
    reaction_type: 'like',
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'reaction',
    created_time: 1511948666,
  },
};

const textMessage = {
  sender: { id: '1423587017700273' },
  recipient: { id: '404217156637689' },
  timestamp: 1491796363181,
  message: {
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
    seq: 348847,
    text: 'Sharp tools make good work.',
  },
};

const pageId = '137542570280111';

const sentByPage = {
  field: 'feed',
  value: {
    from: {
      id: '137542570280111',
      name: 'Bottender',
    },
    item: 'comment',
    comment_id: '139560936755999_140077616693321',
    post_id: '137542570280111_139560936755999',
    verb: 'add',
    parent_id: '139560936755999_140077593359990',
    created_time: 1512121727,
    message: 'Public reply!',
  },
};

const videoCommentAdd = {
  field: 'feed',
  value: {
    from: {
      id: '1440971912666228',
      name: 'Hsuan-Yih Shawn Chu',
    },
    item: 'comment',
    comment_id: '139560936755999_140077616693321',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    parent_id: '137542570280222_139560936744456',
    created_time: 1545829217,
    post: {
      type: 'video',
      updated_time: '2018-12-26T13:00:17+0000',
      promotion_status: 'inactive',
      permalink_url: 'https://www.facebook.com/xxx/posts/1111',
      id: '137542570280222_139560936744456',
      status_type: 'added_video',
      is_published: true,
    },
    message: '100',
  },
};

it('#isFeed', () => {
  expect(new FacebookEvent(textMessage).isFeed).toEqual(false);
  expect(new FacebookEvent(statusAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(statusEdited).isFeed).toEqual(true);
  expect(new FacebookEvent(postRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(commentAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(videoCommentAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(commentEdited).isFeed).toEqual(true);
  expect(new FacebookEvent(commentRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(likeAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(pageLikeAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(likeRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isFeed).toEqual(true);
  expect(new FacebookEvent(reactionEdit).isFeed).toEqual(true);
  expect(new FacebookEvent(reactionRemove).isFeed).toEqual(true);
  expect(new FacebookEvent(sentByPage).isFeed).toEqual(true);
});

it('#isStatus', () => {
  expect(new FacebookEvent(textMessage).isStatus).toEqual(false);
  expect(new FacebookEvent(statusAdd).isStatus).toEqual(true);
  expect(new FacebookEvent(statusEdited).isStatus).toEqual(true);
  expect(new FacebookEvent(postRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(commentAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(commentEdited).isStatus).toEqual(false);
  expect(new FacebookEvent(commentRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(likeAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(likeRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isStatus).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isStatus).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isStatus).toEqual(false);
  expect(new FacebookEvent(sentByPage).isStatus).toEqual(false);
});

it('#isStatusAdd', () => {
  expect(new FacebookEvent(textMessage).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(statusAdd).isStatusAdd).toEqual(true);
  expect(new FacebookEvent(statusEdited).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(commentEdited).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(likeAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(likeRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isStatusAdd).toEqual(false);
  expect(new FacebookEvent(sentByPage).isStatusAdd).toEqual(false);
});

it('#isStatusEdited', () => {
  expect(new FacebookEvent(textMessage).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(statusAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(statusEdited).isStatusEdited).toEqual(true);
  expect(new FacebookEvent(postRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(commentAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(commentEdited).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(commentRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(likeAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(likeRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isStatusEdited).toEqual(false);
  expect(new FacebookEvent(sentByPage).isStatusEdited).toEqual(false);
});

it('#status', () => {
  expect(new FacebookEvent(textMessage).status).toEqual(null);
  expect(new FacebookEvent(statusAdd).status).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    post_id: '137542570280222_139610053406744',
    verb: 'add',
    published: 1,
    created_time: 1511949030,
    message: 'test',
  });
  expect(new FacebookEvent(statusEdited).status).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'status',
    post_id: '137542570280222_139560936744456',
    verb: 'edited',
    published: 1,
    created_time: 1511927135,
    message: '1234',
  });
  expect(new FacebookEvent(postRemove).status).toEqual(null);
  expect(new FacebookEvent(commentAdd).status).toEqual(null);
  expect(new FacebookEvent(commentAdd).status).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).status).toEqual(null);
  expect(new FacebookEvent(commentEdited).status).toEqual(null);
  expect(new FacebookEvent(commentRemove).status).toEqual(null);
  expect(new FacebookEvent(likeAdd).status).toEqual(null);
  expect(new FacebookEvent(pageLikeAdd).status).toEqual(null);
  expect(new FacebookEvent(likeRemove).status).toEqual(null);
  expect(new FacebookEvent(reactionAdd).status).toEqual(null);
  expect(new FacebookEvent(reactionEdit).status).toEqual(null);
  expect(new FacebookEvent(reactionRemove).status).toEqual(null);
  expect(new FacebookEvent(sentByPage).status).toEqual(null);
});

it('#isPost', () => {
  expect(new FacebookEvent(textMessage).isPost).toEqual(false);
  expect(new FacebookEvent(statusAdd).isPost).toEqual(false);
  expect(new FacebookEvent(statusEdited).isPost).toEqual(false);
  expect(new FacebookEvent(postRemove).isPost).toEqual(true);
  expect(new FacebookEvent(commentAdd).isPost).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isPost).toEqual(false);
  expect(new FacebookEvent(commentEdited).isPost).toEqual(false);
  expect(new FacebookEvent(commentRemove).isPost).toEqual(false);
  expect(new FacebookEvent(likeAdd).isPost).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isPost).toEqual(false);
  expect(new FacebookEvent(likeRemove).isPost).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isPost).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isPost).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isPost).toEqual(false);
  expect(new FacebookEvent(sentByPage).isPost).toEqual(false);
});

it('#isPostRemove', () => {
  expect(new FacebookEvent(textMessage).isPostRemove).toEqual(false);
  expect(new FacebookEvent(statusAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isPostRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isPostRemove).toEqual(true);
  expect(new FacebookEvent(commentAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isPostRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isPostRemove).toEqual(false);
  expect(new FacebookEvent(likeAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(likeRemove).isPostRemove).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isPostRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isPostRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isPostRemove).toEqual(false);
  expect(new FacebookEvent(sentByPage).isPostRemove).toEqual(false);
});

it('#post', () => {
  expect(new FacebookEvent(textMessage).post).toEqual(null);
  expect(new FacebookEvent(statusAdd).post).toEqual(null);
  expect(new FacebookEvent(statusEdited).post).toEqual(null);
  expect(new FacebookEvent(postRemove).post).toEqual({
    recipient_id: '137542570280222',
    from: {
      id: '139560936744123',
    },
    item: 'post',
    post_id: '137542570280222_139610053406744',
    verb: 'remove',
    created_time: 1511949068,
  });
  expect(new FacebookEvent(commentAdd).post).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).post).toEqual(null);
  expect(new FacebookEvent(commentEdited).post).toEqual(null);
  expect(new FacebookEvent(commentRemove).post).toEqual(null);
  expect(new FacebookEvent(likeAdd).post).toEqual(null);
  expect(new FacebookEvent(pageLikeAdd).post).toEqual(null);
  expect(new FacebookEvent(likeRemove).post).toEqual(null);
  expect(new FacebookEvent(reactionAdd).post).toEqual(null);
  expect(new FacebookEvent(reactionEdit).post).toEqual(null);
  expect(new FacebookEvent(reactionRemove).post).toEqual(null);
  expect(new FacebookEvent(sentByPage).post).toEqual(null);
});

it('#isComment', () => {
  expect(new FacebookEvent(textMessage).isComment).toEqual(false);
  expect(new FacebookEvent(statusAdd).isComment).toEqual(false);
  expect(new FacebookEvent(statusEdited).isComment).toEqual(false);
  expect(new FacebookEvent(postRemove).isComment).toEqual(false);
  expect(new FacebookEvent(commentAdd).isComment).toEqual(true);
  expect(new FacebookEvent(videoCommentAdd).isComment).toEqual(true);
  expect(new FacebookEvent(commentEdited).isComment).toEqual(true);
  expect(new FacebookEvent(commentRemove).isComment).toEqual(true);
  expect(new FacebookEvent(likeAdd).isComment).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isComment).toEqual(false);
  expect(new FacebookEvent(likeRemove).isComment).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isComment).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isComment).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isComment).toEqual(false);
  expect(new FacebookEvent(sentByPage).isComment).toEqual(true);
});

it('#isCommentAdd', () => {
  expect(new FacebookEvent(textMessage).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(statusAdd).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(statusEdited).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isCommentAdd).toEqual(true);
  expect(new FacebookEvent(videoCommentAdd).isCommentAdd).toEqual(true);
  expect(new FacebookEvent(commentEdited).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(likeAdd).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(likeRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isCommentAdd).toEqual(false);
  expect(new FacebookEvent(sentByPage).isCommentAdd).toEqual(true);
});

it('#isCommentEdited', () => {
  expect(new FacebookEvent(textMessage).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(statusAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(statusEdited).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(postRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(commentAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(commentEdited).isCommentEdited).toEqual(true);
  expect(new FacebookEvent(commentRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(likeAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(likeRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isCommentEdited).toEqual(false);
  expect(new FacebookEvent(sentByPage).isCommentEdited).toEqual(false);
});

it('#isCommentRemove', () => {
  expect(new FacebookEvent(textMessage).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(statusAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(commentAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isCommentRemove).toEqual(true);
  expect(new FacebookEvent(likeAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(likeRemove).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isCommentRemove).toEqual(false);
  expect(new FacebookEvent(sentByPage).isCommentRemove).toEqual(false);
});

it('#isFirstLayerComment', () => {
  expect(new FacebookEvent(textMessage).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(statusAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(statusEdited).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(postRemove).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(commentAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isFirstLayerComment).toEqual(true);
  expect(new FacebookEvent(commentEdited).isFirstLayerComment).toEqual(true);
  expect(new FacebookEvent(commentRemove).isFirstLayerComment).toEqual(true);
  expect(new FacebookEvent(likeAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(likeRemove).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isFirstLayerComment).toEqual(false);
  expect(new FacebookEvent(sentByPage).isFirstLayerComment).toEqual(false);
});

it('#comment', () => {
  expect(new FacebookEvent(textMessage).comment).toEqual(null);
  expect(new FacebookEvent(statusAdd).comment).toEqual(null);
  expect(new FacebookEvent(statusEdited).comment).toEqual(null);
  expect(new FacebookEvent(postRemove).comment).toEqual(null);
  expect(new FacebookEvent(commentAdd).comment).toEqual({
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
    message: 'Good',
  });
  expect(new FacebookEvent(videoCommentAdd).comment).toEqual({
    comment_id: '139560936755999_140077616693321',
    created_time: 1545829217,
    from: {
      id: '1440971912666228',
      name: 'Hsuan-Yih Shawn Chu',
    },
    item: 'comment',
    message: '100',
    parent_id: '137542570280222_139560936744456',
    post: {
      id: '137542570280222_139560936744456',
      is_published: true,
      permalink_url: 'https://www.facebook.com/xxx/posts/1111',
      promotion_status: 'inactive',
      status_type: 'added_video',
      type: 'video',
      updated_time: '2018-12-26T13:00:17+0000',
    },
    post_id: '137542570280222_139560936744456',
    verb: 'add',
  });
  expect(new FacebookEvent(commentEdited).comment).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    item: 'comment',
    comment_id: '139560936744456_139597043408045',
    post_id: '137542570280222_139560936744456',
    verb: 'edited',
    parent_id: '137542570280222_139560936744456',
    created_time: 1511948891,
    message: 'Great',
  });
  expect(new FacebookEvent(commentRemove).comment).toEqual({
    from: {
      id: '139560936744123',
    },
    parent_id: '137542570280222_139560936744456',
    comment_id: '139560936744456_139597043408045',
    post_id: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'comment',
    created_time: 1511948944,
  });
  expect(new FacebookEvent(likeAdd).comment).toEqual(null);
  expect(new FacebookEvent(pageLikeAdd).comment).toEqual(null);
  expect(new FacebookEvent(likeRemove).comment).toEqual(null);
  expect(new FacebookEvent(reactionAdd).comment).toEqual(null);
  expect(new FacebookEvent(reactionEdit).comment).toEqual(null);
  expect(new FacebookEvent(reactionRemove).comment).toEqual(null);
  expect(new FacebookEvent(sentByPage).comment).toEqual({
    from: {
      id: '137542570280111',
      name: 'Bottender',
    },
    item: 'comment',
    comment_id: '139560936755999_140077616693321',
    post_id: '137542570280111_139560936755999',
    verb: 'add',
    parent_id: '139560936755999_140077593359990',
    created_time: 1512121727,
    message: 'Public reply!',
  });
});

it('#isLike', () => {
  expect(new FacebookEvent(textMessage).isLike).toEqual(false);
  expect(new FacebookEvent(statusAdd).isLike).toEqual(false);
  expect(new FacebookEvent(statusEdited).isLike).toEqual(false);
  expect(new FacebookEvent(postRemove).isLike).toEqual(false);
  expect(new FacebookEvent(commentAdd).isLike).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isLike).toEqual(false);
  expect(new FacebookEvent(commentEdited).isLike).toEqual(false);
  expect(new FacebookEvent(commentRemove).isLike).toEqual(false);
  expect(new FacebookEvent(likeAdd).isLike).toEqual(true);
  expect(new FacebookEvent(pageLikeAdd).isLike).toEqual(true);
  expect(new FacebookEvent(likeRemove).isLike).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isLike).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isLike).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isLike).toEqual(false);
  expect(new FacebookEvent(sentByPage).isLike).toEqual(false);
});

it('#isLikeAdd', () => {
  expect(new FacebookEvent(textMessage).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(statusAdd).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(statusEdited).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(commentEdited).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(likeAdd).isLikeAdd).toEqual(true);
  expect(new FacebookEvent(pageLikeAdd).isLikeAdd).toEqual(true);
  expect(new FacebookEvent(likeRemove).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isLikeAdd).toEqual(false);
  expect(new FacebookEvent(sentByPage).isLikeAdd).toEqual(false);
});

it('#isLikeRemove', () => {
  expect(new FacebookEvent(textMessage).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(statusAdd).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(commentAdd).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(likeAdd).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(likeRemove).isLikeRemove).toEqual(true);
  expect(new FacebookEvent(reactionAdd).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isLikeRemove).toEqual(false);
  expect(new FacebookEvent(sentByPage).isLikeRemove).toEqual(false);
});

it('#like', () => {
  expect(new FacebookEvent(textMessage).like).toEqual(null);
  expect(new FacebookEvent(statusAdd).like).toEqual(null);
  expect(new FacebookEvent(statusEdited).like).toEqual(null);
  expect(new FacebookEvent(postRemove).like).toEqual(null);
  expect(new FacebookEvent(commentAdd).like).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).like).toEqual(null);
  expect(new FacebookEvent(commentEdited).like).toEqual(null);
  expect(new FacebookEvent(commentRemove).like).toEqual(null);
  expect(new FacebookEvent(likeAdd).like).toEqual({
    from: {
      id: '139560936744123',
      name: 'user',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    item: 'like',
    created_time: 1511948636,
  });
  expect(new FacebookEvent(pageLikeAdd).like).toEqual({
    item: 'like',
    verb: 'add',
  });
  expect(new FacebookEvent(likeRemove).like).toEqual({
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'like',
    created_time: 1511948666,
  });
  expect(new FacebookEvent(reactionAdd).like).toEqual(null);
  expect(new FacebookEvent(reactionEdit).like).toEqual(null);
  expect(new FacebookEvent(reactionRemove).like).toEqual(null);
  expect(new FacebookEvent(sentByPage).like).toEqual(null);
});

it('#isReaction', () => {
  expect(new FacebookEvent(textMessage).isReaction).toEqual(false);
  expect(new FacebookEvent(statusAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReaction).toEqual(false);
  expect(new FacebookEvent(postRemove).isReaction).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReaction).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReaction).toEqual(false);
  expect(new FacebookEvent(likeAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isReaction).toEqual(false);
  expect(new FacebookEvent(likeRemove).isReaction).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReaction).toEqual(true);
  expect(new FacebookEvent(reactionEdit).isReaction).toEqual(true);
  expect(new FacebookEvent(reactionRemove).isReaction).toEqual(true);
  expect(new FacebookEvent(sentByPage).isReaction).toEqual(false);
});

it('#isReactionAdd', () => {
  expect(new FacebookEvent(textMessage).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(statusAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(postRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(likeAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(likeRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReactionAdd).toEqual(true);
  expect(new FacebookEvent(reactionEdit).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isReactionAdd).toEqual(false);
  expect(new FacebookEvent(sentByPage).isReactionAdd).toEqual(false);
});

it('#isReactionEdit', () => {
  expect(new FacebookEvent(textMessage).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(statusAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(postRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(likeAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(likeRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isReactionEdit).toEqual(true);
  expect(new FacebookEvent(reactionRemove).isReactionEdit).toEqual(false);
  expect(new FacebookEvent(sentByPage).isReactionEdit).toEqual(false);
});

it('#isReactionRemove', () => {
  expect(new FacebookEvent(textMessage).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(statusAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(statusEdited).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(postRemove).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(commentAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(videoCommentAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(commentEdited).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(commentRemove).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(likeAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(likeRemove).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(reactionAdd).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(reactionEdit).isReactionRemove).toEqual(false);
  expect(new FacebookEvent(reactionRemove).isReactionRemove).toEqual(true);
  expect(new FacebookEvent(sentByPage).isReactionRemove).toEqual(false);
});

it('#reaction', () => {
  expect(new FacebookEvent(textMessage).reaction).toEqual(null);
  expect(new FacebookEvent(statusAdd).reaction).toEqual(null);
  expect(new FacebookEvent(statusEdited).reaction).toEqual(null);
  expect(new FacebookEvent(postRemove).reaction).toEqual(null);
  expect(new FacebookEvent(commentAdd).reaction).toEqual(null);
  expect(new FacebookEvent(videoCommentAdd).reaction).toEqual(null);
  expect(new FacebookEvent(commentEdited).reaction).toEqual(null);
  expect(new FacebookEvent(commentRemove).reaction).toEqual(null);
  expect(new FacebookEvent(likeAdd).reaction).toEqual(null);
  expect(new FacebookEvent(pageLikeAdd).reaction).toEqual(null);
  expect(new FacebookEvent(likeRemove).reaction).toEqual(null);
  expect(new FacebookEvent(reactionAdd).reaction).toEqual({
    reaction_type: 'like',
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'add',
    item: 'reaction',
    created_time: 1511948636,
  });
  expect(new FacebookEvent(reactionEdit).reaction).toEqual({
    reaction_type: 'sad',
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'edit',
    item: 'reaction',
    created_time: 1511948713,
  });
  expect(new FacebookEvent(reactionRemove).reaction).toEqual({
    reaction_type: 'like',
    from: {
      id: '139560936744123',
    },
    parent_id: '139560936744456_139597043408045',
    comment_id: '139560936744456_139597090074707',
    post_id: '137542570280222_139560936744456',
    verb: 'remove',
    item: 'reaction',
    created_time: 1511948666,
  });
  expect(new FacebookEvent(sentByPage).reaction).toEqual(null);
});

it('#pageId', () => {
  expect(new FacebookEvent(textMessage, { pageId }).pageId).toEqual(
    '137542570280111'
  );
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
  expect(new FacebookEvent(likeAdd, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(pageLikeAdd, { pageId }).pageId).toEqual(
    '137542570280111'
  );
  expect(new FacebookEvent(likeRemove, { pageId }).pageId).toEqual(
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
  expect(new FacebookEvent(sentByPage, { pageId }).pageId).toEqual(
    '137542570280111'
  );
});

it('#isSentByPage', () => {
  expect(new FacebookEvent(textMessage, { pageId }).isSentByPage).toEqual(
    false
  );
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
  expect(new FacebookEvent(likeAdd, { pageId }).isSentByPage).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(likeRemove, { pageId }).isSentByPage).toEqual(false);
  expect(new FacebookEvent(reactionAdd, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(reactionEdit, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(reactionRemove, { pageId }).isSentByPage).toEqual(
    false
  );
  expect(new FacebookEvent(sentByPage, { pageId }).isSentByPage).toEqual(true);
});

it('#isPageLike', () => {
  expect(new FacebookEvent(textMessage, { pageId }).isPageLike).toEqual(false);
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
  expect(new FacebookEvent(likeAdd, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(pageLikeAdd, { pageId }).isPageLike).toEqual(true);
  expect(new FacebookEvent(likeRemove, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(reactionAdd, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(reactionEdit, { pageId }).isPageLike).toEqual(false);
  expect(new FacebookEvent(reactionRemove, { pageId }).isPageLike).toEqual(
    false
  );
  expect(new FacebookEvent(sentByPage, { pageId }).isPageLike).toEqual(false);
});
