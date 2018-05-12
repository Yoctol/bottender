import axios from 'axios';
import get from 'lodash/get';

export default async function getWebhookFromNgrok(ngrokPort) {
  const ngrokAxios = axios.create({
    baseURL: `http://localhost:${ngrokPort}`,
  });

  const res = await ngrokAxios.get('/api/tunnels');
  return get(res, 'data.tunnels[1].public_url'); // tunnels[1] return `https` protocol
}
