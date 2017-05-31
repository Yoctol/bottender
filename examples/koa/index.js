const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { MessengerBot, verifyMessengerWebhook } = require('../../src');

const config = {
  verifyToken: '',
  accessToken: '',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

const server = new Koa();
const router = new Router();

router.use(bodyParser());
router.get(
  verifyMessengerWebhook({
    verifyToken: config.verifyToken,
  })
);
router.post(bot.createKoaMiddleware());

server.use(router.routes());

server.listen(5000, () => {
  console.log('server is running...');
});
