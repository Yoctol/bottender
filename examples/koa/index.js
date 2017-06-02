require('babel-register');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { MessengerBot } = require('../../src');
const { verifyMessengerWebhook } = require('../../src/koa');

const config = {
  verifyToken: '1qaz2wsx',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.handle(context => {
  context.sendText('Hello World');
});

const server = new Koa();
const router = new Router();

router.use(bodyParser());
router.get(
  '/',
  verifyMessengerWebhook({
    verifyToken: config.verifyToken,
  })
);
router.post('/', bot.createKoaMiddleware());

server.use(router.routes());

server.listen(5000, () => {
  console.log('server is running...');
});
