import jsonfile from 'jsonfile';

import getAttachment from '../getAttachment';

jest.spyOn(jsonfile, 'readFileSync');

beforeEach(() => {
  jsonfile.readFileSync.mockReturnValue({
    messenger: {
      'test.jpg': {
        attachment_id: '1591074914293017',
        pageId: '1134713619902816',
        uploaded_at: 1511499731235,
        checksum:
          '74a5a3dea048513deeaa2c2ea448f45b653c1783101e3a8c9feb5901691c3b8e5603e28501b39e841283eb52dcd2408e370bcd7ddd195f0326ff5ce26fe45bb3',
      },
      'example.png': {
        attachment_id: '1591074914203918',
        pageId: '1134713619902816',
        uploaded_at: 1511499731946,
        checksum:
          'c4cb482b6e7eb1a79f101e3a8c9feb92216392ea448f45b6519f0fb127420f498e055a86b723b86b3436204ea7d30de2d494580b563c947841421f80c6328de',
      },
    },
  });
});

it('should be defined', () => {
  expect(getAttachment).toBeDefined();
});

it('should return object with id', () => {
  const attachment = getAttachment('test.jpg');
  expect(attachment.id).toBe('1591074914293017');
});
