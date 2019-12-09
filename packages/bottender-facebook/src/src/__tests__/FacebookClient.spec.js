import MockAdapter from 'axios-mock-adapter';

import FacebookClient from '../FacebookClient';

const OBJECT_ID = '123456';
const COMMENT_ID = '123456';
const ACCESS_TOKEN = '1234567890';
const ANOTHER_TOKEN = '0987654321';

const createMock = () => {
  const client = new FacebookClient(ACCESS_TOKEN);
  const mock = new MockAdapter(client.axios);
  return { client, mock };
};

describe('#axios', () => {
  it('should return underlying http client', () => {
    const client = new FacebookClient(ACCESS_TOKEN);
    expect(client.axios.get).toBeDefined();
    expect(client.axios.post).toBeDefined();
    expect(client.axios.put).toBeDefined();
    expect(client.axios.delete).toBeDefined();
  });
});

describe('send api', () => {
  describe('#sendPrivateReply', () => {
    it('should call private_replies api', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/private_replies?access_token=${ACCESS_TOKEN}`, {
          message: 'Hello!',
        })
        .reply(200, reply);

      const res = await client.sendPrivateReply(OBJECT_ID, 'Hello!');

      expect(res).toEqual(reply);
    });

    it('support custom token', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/private_replies?access_token=${ANOTHER_TOKEN}`, {
          message: 'Hello!',
        })
        .reply(200, reply);

      const res = await client.sendPrivateReply(OBJECT_ID, 'Hello!', {
        access_token: ANOTHER_TOKEN,
      });

      expect(res).toEqual(reply);
    });
  });

  describe('#sendComment', () => {
    it('should call comments api', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/comments?access_token=${ACCESS_TOKEN}`, {
          message: 'Hello!',
        })
        .reply(200, reply);

      const res = await client.sendComment(OBJECT_ID, 'Hello!');

      expect(res).toEqual(reply);
    });

    it('should support object with message', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/comments?access_token=${ACCESS_TOKEN}`, {
          message: 'Hello!',
        })
        .reply(200, reply);

      const res = await client.sendComment(OBJECT_ID, { message: 'Hello!' });

      expect(res).toEqual(reply);
    });

    it('should support object with attachment_id', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/comments?access_token=${ACCESS_TOKEN}`, {
          attachment_id: '<attachment_id>',
        })
        .reply(200, reply);

      const res = await client.sendComment(OBJECT_ID, {
        attachment_id: '<attachment_id>',
      });

      expect(res).toEqual(reply);
    });

    it('should support object with attachment_share_url', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/comments?access_token=${ACCESS_TOKEN}`, {
          attachment_share_url: 'https://example.com/img.gif',
        })
        .reply(200, reply);

      const res = await client.sendComment(OBJECT_ID, {
        attachment_share_url: 'https://example.com/img.gif',
      });

      expect(res).toEqual(reply);
    });

    it('should support object with attachment_url', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/comments?access_token=${ACCESS_TOKEN}`, {
          attachment_url: 'https://example.com/img.jpg',
        })
        .reply(200, reply);

      const res = await client.sendComment(OBJECT_ID, {
        attachment_url: 'https://example.com/img.jpg',
      });

      expect(res).toEqual(reply);
    });

    it('support custom token', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/comments?access_token=${ANOTHER_TOKEN}`, {
          message: 'Hello!',
        })
        .reply(200, reply);

      const res = await client.sendComment(OBJECT_ID, 'Hello!', {
        access_token: ANOTHER_TOKEN,
      });

      expect(res).toEqual(reply);
    });
  });

  describe('#sendLike', () => {
    it('should call likes api', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/likes?access_token=${ACCESS_TOKEN}`)
        .reply(200, reply);

      const res = await client.sendLike(OBJECT_ID);

      expect(res).toEqual(reply);
    });

    it('support custom token', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onPost(`/${OBJECT_ID}/likes?access_token=${ANOTHER_TOKEN}`)
        .reply(200, reply);

      const res = await client.sendLike(OBJECT_ID, {
        access_token: ANOTHER_TOKEN,
      });

      expect(res).toEqual(reply);
    });
  });

  describe('#getComment', () => {
    it('should call comments api', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onGet(`/${COMMENT_ID}?access_token=${ACCESS_TOKEN}`)
        .reply(200, reply);

      const res = await client.getComment(COMMENT_ID);

      expect(res).toEqual(reply);
    });

    it('support custom token', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onGet(`/${COMMENT_ID}?access_token=${ANOTHER_TOKEN}`)
        .reply(200, reply);

      const res = await client.getComment(COMMENT_ID, {
        access_token: ANOTHER_TOKEN,
      });

      expect(res).toEqual(reply);
    });
  });

  describe('#getLikes', () => {
    it('should call likes api', async () => {
      const { client, mock } = createMock();

      const reply = {
        likes: {
          data: [
            {
              name: 'Bill the Cat',
              id: '155111347875779',
              created_time: '2017-06-18T18:21:04+0000',
            },
            {
              name: 'Calvin and Hobbes',
              id: '257573197608192',
              created_time: '2017-06-18T18:21:02+0000',
            },
            {
              name: "Berkeley Breathed's Bloom County",
              id: '108793262484769',
              created_time: '2017-06-18T18:20:58+0000',
            },
          ],
          paging: {
            cursors: {
              before: 'Nzc0Njg0MTQ3OAZDZD',
              after: 'NTcxODc1ODk2NgZDZD',
            },
            next:
              'https://graph.facebook.com/vX.X/me/likes?access_token=user-access-token&pretty=0&summary=true&limit=25&after=NTcxODc1ODk2NgZDZD',
          },
        },
        id: 'user-id',
      };

      mock
        .onGet(`/${OBJECT_ID}/likes?access_token=${ACCESS_TOKEN}`)
        .reply(200, reply);

      const res = await client.getLikes(OBJECT_ID);

      expect(res).toEqual(reply);
    });

    it('should call likes api with summary: true', async () => {
      const { client, mock } = createMock();

      const reply = {
        likes: {
          data: [
            {
              name: 'Bill the Cat',
              id: '155111347875779',
              created_time: '2017-06-18T18:21:04+0000',
            },
            {
              name: 'Calvin and Hobbes',
              id: '257573197608192',
              created_time: '2017-06-18T18:21:02+0000',
            },
            {
              name: "Berkeley Breathed's Bloom County",
              id: '108793262484769',
              created_time: '2017-06-18T18:20:58+0000',
            },
          ],
          paging: {
            cursors: {
              before: 'Nzc0Njg0MTQ3OAZDZD',
              after: 'NTcxODc1ODk2NgZDZD',
            },
            next:
              'https://graph.facebook.com/vX.X/me/likes?access_token=user-access-token&pretty=0&summary=true&limit=25&after=NTcxODc1ODk2NgZDZD',
          },
          summary: {
            total_count: 136,
          },
        },
        id: 'user-id',
      };

      mock
        .onGet(`/${OBJECT_ID}/likes?summary=true&access_token=${ACCESS_TOKEN}`)
        .reply(200, reply);

      const res = await client.getLikes(OBJECT_ID, { summary: true });

      expect(res).toEqual(reply);
    });

    it('support custom token', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock
        .onGet(`/${OBJECT_ID}/likes?access_token=${ANOTHER_TOKEN}`)
        .reply(200, reply);

      const res = await client.getLikes(OBJECT_ID, {
        access_token: ANOTHER_TOKEN,
      });

      expect(res).toEqual(reply);
    });
  });
});
