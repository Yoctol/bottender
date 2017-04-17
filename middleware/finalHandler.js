import reporter from '../shared/reporter';

const finalHandler = () => async (ctx, next) => {
  try {
    await next();
    // Handle 404 upstream.
    const status = ctx.status || 404;
    if (status === 404) ctx.throw(404);
  } catch (error) {
    reporter.handleError(error, ctx.request);
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
};

export default finalHandler;
