import axios from 'axios';
import get from 'lodash/get';

export default async function(ngrokPort) {
  const localClient = axios.create({
    baseURL: `http://localhost:${ngrokPort}`,
  });

  const res = await localClient.get('/api/tunnels');
  return get(res, 'data.tunnels[1].public_url'); // tunnels[1] return `https` protocol
}
