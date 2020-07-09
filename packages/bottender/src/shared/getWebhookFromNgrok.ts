import axios from 'axios';

type Tunnel = {
  name: string;
  uri: string;
  public_url: string;
  proto: string;
  config: {
    addr: string;
    inspect: boolean;
  };
  metrics: {
    conns: {
      count: number;
      gauge: number;
      rate1: number;
      rate5: number;
      rate15: number;
      p50: number;
      p90: number;
      p95: number;
      p99: number;
    };
    http: {
      count: number;
      rate1: number;
      rate5: number;
      rate15: number;
      p50: number;
      p90: number;
      p95: number;
      p99: number;
    };
  };
};

export default async function getWebhookFromNgrok(
  ngrokPort = '4040'
): Promise<string | never> {
  // ngork API reference: https://ngrok.com/docs#client-api
  const ngrokAxios = axios.create({
    baseURL: `http://localhost:${ngrokPort}`,
  });

  const { data } = await ngrokAxios.get<{
    tunnels: Tunnel[];
  }>('/api/tunnels');

  if (!data) {
    throw new Error('Failed to get tunnels from ngrok');
  }

  const httpsTunnel = data.tunnels.find((tunnel) => tunnel.proto === 'https');

  if (!httpsTunnel) {
    throw new Error('Can not find a https tunnel');
  }

  return httpsTunnel.public_url;
}
