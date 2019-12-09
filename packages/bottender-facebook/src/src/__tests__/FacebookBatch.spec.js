import FacebookBatch from '../FacebookBatch';

const COMMENT_ID = '1234567890';
const CUSTOM_ACCESS_TOKEN = 'custom-access-token';

describe('sendPrivateReply', () => {
  it('should create send private reply request', () => {
    expect(FacebookBatch.sendPrivateReply(COMMENT_ID, 'ok')).toEqual({
      method: 'POST',
      relative_url: '1234567890/private_replies',
      body: {
        message: 'ok',
      },
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.sendPrivateReply(COMMENT_ID, 'ok', {
        access_token: CUSTOM_ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'POST',
      relative_url: '1234567890/private_replies',
      body: {
        message: 'ok',
        access_token: CUSTOM_ACCESS_TOKEN,
      },
    });
  });
});

describe('sendComment', () => {
  it('should create send text comment request', () => {
    expect(FacebookBatch.sendComment(COMMENT_ID, 'ok')).toEqual({
      method: 'POST',
      relative_url: '1234567890/comments',
      body: {
        message: 'ok',
      },
    });
  });

  it('should create send attachment_url comment request', () => {
    expect(
      FacebookBatch.sendComment(COMMENT_ID, {
        attachment_url: 'https://www.example.com/img.png',
      })
    ).toEqual({
      method: 'POST',
      relative_url: '1234567890/comments',
      body: {
        attachment_url: 'https://www.example.com/img.png',
      },
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.sendComment(COMMENT_ID, 'ok', {
        access_token: CUSTOM_ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'POST',
      relative_url: '1234567890/comments',
      body: {
        message: 'ok',
        access_token: CUSTOM_ACCESS_TOKEN,
      },
    });
  });
});

describe('sendLike', () => {
  it('should create send like request', () => {
    expect(FacebookBatch.sendLike(COMMENT_ID)).toEqual({
      method: 'POST',
      relative_url: '1234567890/likes',
      body: {},
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.sendLike(COMMENT_ID, {
        access_token: CUSTOM_ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'POST',
      relative_url: '1234567890/likes',
      body: {
        access_token: CUSTOM_ACCESS_TOKEN,
      },
    });
  });
});

describe('getComment', () => {
  it('should create get comment request', () => {
    expect(FacebookBatch.getComment(COMMENT_ID)).toEqual({
      method: 'GET',
      relative_url: '1234567890?',
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.getComment(COMMENT_ID, {
        access_token: CUSTOM_ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'GET',
      relative_url: `1234567890?access_token=${CUSTOM_ACCESS_TOKEN}`,
    });
  });
});

describe('getLikes', () => {
  it('should create get likes request', () => {
    expect(FacebookBatch.getLikes(COMMENT_ID)).toEqual({
      method: 'GET',
      relative_url: '1234567890/likes?',
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.getLikes(COMMENT_ID, {
        access_token: CUSTOM_ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'GET',
      relative_url: `1234567890/likes?access_token=${CUSTOM_ACCESS_TOKEN}`,
    });
  });
});
