import compose from 'koa-compose';

type Middleware = (context?: any, next?: Middleware) => {};

const middleware = (m: Array<Middleware>) => compose(m);

export default middleware;
