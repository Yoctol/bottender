import warning from 'warning';
import compose from 'koa-compose';

type Middleware = (context?: any, next?: Middleware) => {};

export default class MiddlewareHandlerBuilder {
  _middleware: Array<Middleware> = [];

  constructor() {
    warning(
      false,
      '`MiddlewareHandlerBuilder` is deprecated. use `middleware` instead.'
    );
  }

  use(middleware: Middleware): MiddlewareHandlerBuilder {
    this._middleware.push(middleware);
    return this;
  }

  build() {
    return compose(this._middleware);
  }
}
