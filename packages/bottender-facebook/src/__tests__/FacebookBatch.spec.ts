import FacebookBatch from '../FacebookBatch';

const COMMENT_ID = '1234567890';
const ACCESS_TOKEN = 'custom-access-token';

describe('sendComment', () => {
  it('should create send text comment request', () => {
    expect(FacebookBatch.sendComment(COMMENT_ID, 'ok')).toEqual({
      method: 'POST',
      relativeUrl: '1234567890/comments',
      body: {
        message: 'ok',
      },
    });
  });

  it('should create send attachmentUrl comment request', () => {
    expect(
      FacebookBatch.sendComment(COMMENT_ID, {
        attachmentUrl: 'https://www.example.com/img.png',
      })
    ).toEqual({
      method: 'POST',
      relativeUrl: '1234567890/comments',
      body: {
        attachmentUrl: 'https://www.example.com/img.png',
      },
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.sendComment(COMMENT_ID, 'ok', {
        accessToken: ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'POST',
      relativeUrl: '1234567890/comments',
      body: {
        message: 'ok',
        accessToken: ACCESS_TOKEN,
      },
    });
  });
});

describe('sendLike', () => {
  it('should create send like request', () => {
    expect(FacebookBatch.sendLike(COMMENT_ID)).toEqual({
      method: 'POST',
      relativeUrl: '1234567890/likes',
      body: {},
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.sendLike(COMMENT_ID, {
        accessToken: ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'POST',
      relativeUrl: '1234567890/likes',
      body: {
        accessToken: ACCESS_TOKEN,
      },
    });
  });
});

describe('getComment', () => {
  it('should create get comment request', () => {
    expect(FacebookBatch.getComment(COMMENT_ID)).toEqual({
      method: 'GET',
      relativeUrl: '1234567890?',
    });
  });

  it('should support other options', () => {
    expect(
      FacebookBatch.getComment(COMMENT_ID, {
        summary: true,
        filter: 'toplevel',
        fields: ['can_reply_privately'],
      })
    ).toEqual({
      method: 'GET',
      relativeUrl:
        '1234567890?summary=true&filter=toplevel&fields=can_reply_privately',
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.getComment(COMMENT_ID, {
        accessToken: ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'GET',
      relativeUrl: `1234567890?access_token=${ACCESS_TOKEN}`,
    });
  });
});

describe('getLikes', () => {
  it('should create get likes request', () => {
    expect(FacebookBatch.getLikes(COMMENT_ID)).toEqual({
      method: 'GET',
      relativeUrl: '1234567890/likes?',
    });
  });

  it('should support other options', () => {
    expect(FacebookBatch.getLikes(COMMENT_ID, { summary: true })).toEqual({
      method: 'GET',
      relativeUrl: '1234567890/likes?summary=true',
    });
  });

  it('should support custom access token', () => {
    expect(
      FacebookBatch.getLikes(COMMENT_ID, {
        accessToken: ACCESS_TOKEN,
      })
    ).toEqual({
      method: 'GET',
      relativeUrl: `1234567890/likes?access_token=${ACCESS_TOKEN}`,
    });
  });
});
