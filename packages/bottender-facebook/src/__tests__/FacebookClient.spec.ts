import MockAdapter from 'axios-mock-adapter';

import FacebookClient from '../FacebookClient';

// TODO: remove auto mock from the project
jest.unmock('messaging-api-messenger');

const OBJECT_ID = '123456';
const COMMENT_ID = '123456';
const ACCESS_TOKEN = '1234567890';

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
  describe('#sendComment', () => {
    it('should call comments api', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
      };

      let url;
      let params;
      let data;
      mock.onPost().reply(config => {
        url = config.url;
        params = config.params;
        data = config.data;
        return [200, reply];
      });

      const res = await client.sendComment(OBJECT_ID, 'Hello!');

      expect(url).toEqual(`/${OBJECT_ID}/comments`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(JSON.parse(data)).toEqual({
        message: 'Hello!',
      });
      expect(res).toEqual(reply);
    });

    it('should support object with message', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
      };

      let url;
      let params;
      let data;
      mock.onPost().reply(config => {
        url = config.url;
        params = config.params;
        data = config.data;
        return [200, reply];
      });

      const res = await client.sendComment(OBJECT_ID, { message: 'Hello!' });

      expect(url).toEqual(`/${OBJECT_ID}/comments`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(JSON.parse(data)).toEqual({
        message: 'Hello!',
      });
      expect(res).toEqual(reply);
    });

    it('should support object with attachmentId', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
      };

      let url;
      let params;
      let data;
      mock.onPost().reply(config => {
        url = config.url;
        params = config.params;
        data = config.data;
        return [200, reply];
      });

      const res = await client.sendComment(OBJECT_ID, {
        attachmentId: '<attachment_id>',
      });

      expect(url).toEqual(`/${OBJECT_ID}/comments`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(JSON.parse(data)).toEqual({
        attachment_id: '<attachment_id>',
      });
      expect(res).toEqual(reply);
    });

    it('should support object with attachmentShareUrl', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
      };

      let url;
      let params;
      let data;
      mock.onPost().reply(config => {
        url = config.url;
        params = config.params;
        data = config.data;
        return [200, reply];
      });

      const res = await client.sendComment(OBJECT_ID, {
        attachmentShareUrl: 'https://example.com/img.gif',
      });

      expect(url).toEqual(`/${OBJECT_ID}/comments`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(JSON.parse(data)).toEqual({
        attachment_share_url: 'https://example.com/img.gif',
      });
      expect(res).toEqual(reply);
    });

    it('should support object with attachmentUrl', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
      };

      let url;
      let params;
      let data;
      mock.onPost().reply(config => {
        url = config.url;
        params = config.params;
        data = config.data;
        return [200, reply];
      });

      const res = await client.sendComment(OBJECT_ID, {
        attachmentUrl: 'https://example.com/img.jpg',
      });

      expect(url).toEqual(`/${OBJECT_ID}/comments`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(JSON.parse(data)).toEqual({
        attachment_url: 'https://example.com/img.jpg',
      });
      expect(res).toEqual(reply);
    });
  });

  describe('#sendLike', () => {
    it('should call likes api', async () => {
      const { client, mock } = createMock();

      const reply = { success: true };

      let url;
      let params;
      mock.onPost().reply(config => {
        url = config.url;
        params = config.params;
        return [200, reply];
      });

      const res = await client.sendLike(OBJECT_ID);

      expect(url).toEqual(`/${OBJECT_ID}/likes`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(res).toEqual(reply);
    });
  });

  describe('#getComment', () => {
    it('should call comments api', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
      };

      let url;
      let params;
      mock.onGet().reply(config => {
        url = config.url;
        params = config.params;
        return [200, reply];
      });

      const res = await client.getComment(COMMENT_ID);

      expect(url).toEqual(`/${COMMENT_ID}`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(res).toEqual(reply);
    });

    it('should support other options', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
        canReplyPrivately: true,
      };

      let url;
      let params;
      mock.onGet().reply(config => {
        url = config.url;
        params = config.params;
        return [200, reply];
      });

      const res = await client.getComment(COMMENT_ID, {
        summary: true,
        filter: 'toplevel',
        fields: ['can_reply_privately'],
      });

      expect(url).toEqual(`/${COMMENT_ID}`);
      expect(params).toEqual({
        summary: 'true',
        filter: 'toplevel',
        fields: 'can_reply_privately',
        access_token: ACCESS_TOKEN,
      });
      expect(res).toEqual(reply);
    });
  });

  describe('#getLikes', () => {
    it('should call likes api', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
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
      };

      let url;
      let params;
      mock.onGet().reply(config => {
        url = config.url;
        params = config.params;
        return [200, reply];
      });

      const res = await client.getLikes(OBJECT_ID);

      expect(url).toEqual(`/${OBJECT_ID}/likes`);
      expect(params).toEqual({ access_token: ACCESS_TOKEN });
      expect(res).toEqual({
        data: [
          {
            name: 'Bill the Cat',
            id: '155111347875779',
            createdTime: '2017-06-18T18:21:04+0000',
          },
          {
            name: 'Calvin and Hobbes',
            id: '257573197608192',
            createdTime: '2017-06-18T18:21:02+0000',
          },
          {
            name: "Berkeley Breathed's Bloom County",
            id: '108793262484769',
            createdTime: '2017-06-18T18:20:58+0000',
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
      });
    });

    it('should support other options', async () => {
      const { client, mock } = createMock();

      const reply = {
        id: '1809938745705498_1809941802371859',
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
      };

      let url;
      let params;
      mock.onGet().reply(config => {
        url = config.url;
        params = config.params;
        return [200, reply];
      });

      const res = await client.getLikes(OBJECT_ID, { summary: true });

      expect(url).toEqual(`/${OBJECT_ID}/likes`);
      expect(params).toEqual({
        summary: 'true',
        access_token: ACCESS_TOKEN,
      });
      expect(res).toEqual({
        data: [
          {
            name: 'Bill the Cat',
            id: '155111347875779',
            createdTime: '2017-06-18T18:21:04+0000',
          },
          {
            name: 'Calvin and Hobbes',
            id: '257573197608192',
            createdTime: '2017-06-18T18:21:02+0000',
          },
          {
            name: "Berkeley Breathed's Bloom County",
            id: '108793262484769',
            createdTime: '2017-06-18T18:20:58+0000',
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
          totalCount: 136,
        },
      });
    });
  });
});
