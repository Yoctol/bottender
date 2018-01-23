import axios from 'axios';

import getWebhookFromNgrok from '../getWebhookFromNgrok';

jest.mock('axios');

it('be defined', () => {
  expect(getWebhookFromNgrok).toBeDefined();
});

it('call axios.create and return correct url', async () => {
  axios.create.mockReturnValue({
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          tunnels: [
            {
              public_url: 'http://fakeDomain_1.ngrok.io',
            },
            {
              public_url: 'https://fakeDomain_2.ngrok.io',
            },
          ],
        },
      })
    ),
  });

  const webhook = await getWebhookFromNgrok('5555');

  expect(webhook).toBe('https://fakeDomain_2.ngrok.io');
  expect(axios.create).toBeCalledWith({
    baseURL: 'http://localhost:5555',
  });
});
