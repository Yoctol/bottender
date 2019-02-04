import hasha from 'hasha';

// 1）将 token、timestamp、nonce 三个参数进行字典序排序
// 2）将三个参数字符串拼接成一个字符串进行 sha1 加密
// 3）开发者获得加密后的字符串可与 signature 对比，标识该请求来源于微信
const verifyWechatWebhook = ({ verifyToken }) => (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;

  const input = [verifyToken, timestamp, nonce].sort().join('');

  const hash = hasha(input, { algorithm: 'sha1' });

  if (hash === signature) {
    res.send(echostr);
  } else {
    console.error('Failed validation. Make sure the signature match.');
    res.sendStatus(403);
  }
};

export default verifyWechatWebhook;
