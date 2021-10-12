import { IncomingHttpHeaders } from 'http';

import { JsonObject } from 'type-fest';

import Context from './Context';

export type RequestContext<
  B extends JsonObject = JsonObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  H extends Record<string, string | string[] | undefined> = Record<string, any>
> = {
  id?: string;
  method: string;
  path: string;
  query: Record<string, string>;
  headers: IncomingHttpHeaders & H;
  rawBody: string;
  body: B;
  params: Record<string, string>;
  url: string;
};

// TODO(messaging-api-common): extract interface from the clients
export type Client = any;

// TODO: refine Action and Props types
export type Action<
  C extends Context,
  P extends Record<string, any> = {},
  RAP extends Record<string, any> = {}
> = (
  context: C,
  props: Props<C> & P
) => void | Action<C, RAP> | Promise<Action<C, RAP> | void>;

export type Props<C extends Context> = {
  next?: Action<C, any>;
  error?: Error;
};
