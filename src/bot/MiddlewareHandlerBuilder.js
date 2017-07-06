import compose from 'koa-compose';

type Middleware = (context?: any, next?: Middleware) => {};

export default class MiddlewareHandlerBuilder {
  _middleware: Array<Middleware> = [];

  use(middleware: Middleware): MiddlewareHandlerBuilder {
    this._middleware.push(middleware);
    return this;
  }

  build() {
    return compose(this._middleware);
  }
}
