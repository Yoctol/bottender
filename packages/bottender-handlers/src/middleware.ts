import compose from 'koa-compose';

import { Builder } from './Handler';

type Middleware = (context?: any, next?: Middleware) => {};

const middleware = (m: (Middleware | Builder)[]) =>
  compose(m.map((item) => ('build' in item ? item.build() : item)));

export default middleware;
