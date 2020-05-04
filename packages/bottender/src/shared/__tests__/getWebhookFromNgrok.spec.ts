import axios from 'axios';

import getWebhookFromNgrok from '../getWebhookFromNgrok';

jest.mock('axios');

const res = {
  data: {
    tunnels: [
      {
        name: 'command_line',
        uri: '/api/tunnels/command_line',
        public_url: 'https://d95211d2.ngrok.io',
        proto: 'https',
        config: {
          addr: 'localhost:80',
          inspect: true,
        },
        metrics: {
          conns: {
            count: 0,
            gauge: 0,
            rate1: 0,
            rate5: 0,
            rate15: 0,
            p50: 0,
            p90: 0,
            p95: 0,
            p99: 0,
          },
          http: {
            count: 0,
            rate1: 0,
            rate5: 0,
            rate15: 0,
            p50: 0,
            p90: 0,
            p95: 0,
            p99: 0,
          },
        },
      },
      {
        name: 'command_line',
        uri: '/api/tunnels/command_line',
        public_url: 'http://d95211d2.ngrok.io',
        proto: 'http',
        config: {
          addr: 'localhost:80',
          inspect: true,
        },
        metrics: {
          conns: {
            count: 0,
            gauge: 0,
            rate1: 0,
            rate5: 0,
            rate15: 0,
            p50: 0,
            p90: 0,
            p95: 0,
            p99: 0,
          },
          http: {
            count: 0,
            rate1: 0,
            rate5: 0,
            rate15: 0,
            p50: 0,
            p90: 0,
            p95: 0,
            p99: 0,
          },
        },
      },
    ],
  },
};

it('be defined', () => {
  expect(getWebhookFromNgrok).toBeDefined();
});

it('create axios with 4040 port and return the correct URL', async () => {
  const axiosInstance = {
    get: jest.fn().mockResolvedValue(res),
  };

  axios.create.mockReturnValue(axiosInstance);

  const webhook = await getWebhookFromNgrok();

  expect(webhook).toBe('https://d95211d2.ngrok.io');

  expect(axios.create).toBeCalledWith({
    baseURL: 'http://localhost:4040',
  });
});

it('create axios with specified port and return correct URL', async () => {
  const axiosInstance = {
    get: jest.fn().mockResolvedValue(res),
  };

  axios.create.mockReturnValue(axiosInstance);

  const webhook = await getWebhookFromNgrok('5555');

  expect(webhook).toBe('https://d95211d2.ngrok.io');

  expect(axios.create).toBeCalledWith({
    baseURL: 'http://localhost:5555',
  });
});
