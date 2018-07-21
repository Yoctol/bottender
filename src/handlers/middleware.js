import compose from 'koa-compose';

import { type Builder } from './Handler';

type Middleware = (context?: any, next?: Middleware) => {};

const middleware = (m: Array<Middleware | Builder>) =>
  compose(m.map(item => (item.build ? item.build() : item)));

export default middleware;
