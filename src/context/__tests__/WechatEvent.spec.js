import WechatEvent from '../WechatEvent';

const textMessage = {
  tousername: ['gh_29d2d7084492'],
  fromusername: ['oLt9j58X9wLaU0caBfY38Tu_AXR8'],
  createtime: ['1547399295'],
  msgtype: ['text'],
  content: ['你好'],
  msgid: ['6646029366319039068'],
};

const imageMessage = {
  tousername: ['gh_29d2d7084492'],
  fromusername: ['oLt9j58X9wLaU0caBfY38Tu_AXR8'],
  createtime: ['1547436685'],
  msgtype: ['image'],
  picurl: [
    'http://mmbiz.qpic.cn/mmbiz_jpg/uxcEX01JbicLTFwJ2WNNGrKpZQYWUkMeGdLNn3ib0s4Zbd6w7xbdSLClYVocYYb4IQDLgnT3fvv6ZCJFpoY30Xug/0',
  ],
  msgid: ['6646189955146236510'],
  mediaid: ['WpiMoqMPY_n4YmDEQWXkZLcnkcqVk3FfzctIMY5CQUnqp9_rDkWeYs7mmaioSLL5'],
};

const locationMessage = {
  tousername: ['gh_29d2d7084492'],
  fromusername: ['oLt9j58X9wLaU0caBfY38Tu_AXR8'],
  createtime: ['1547437159'],
  msgtype: ['location'],
  location_x: ['25.034454'],
  location_y: ['121.526857'],
  scale: ['15'],
  label: [''],
  msgid: ['6646191990960734815'],
};

it('#rawEvent', () => {
  expect(new WechatEvent(textMessage).rawEvent).toEqual(textMessage);
});

it('#isMessage', () => {
  expect(new WechatEvent(textMessage).isMessage).toEqual(true);
  expect(new WechatEvent(imageMessage).isMessage).toEqual(true);
});

it('#isText', () => {
  expect(new WechatEvent(textMessage).isText).toEqual(true);
  expect(new WechatEvent(imageMessage).isText).toEqual(false);
});

it('#isImage', () => {
  expect(new WechatEvent(textMessage).isImage).toEqual(false);
  expect(new WechatEvent(imageMessage).isImage).toEqual(true);
});

it('#isVoice', () => {
  expect(new WechatEvent(textMessage).isVoice).toEqual(false);
  expect(new WechatEvent(imageMessage).isVoice).toEqual(false);
});

it('#isVideo', () => {
  expect(new WechatEvent(textMessage).isVideo).toEqual(false);
  expect(new WechatEvent(imageMessage).isVideo).toEqual(false);
});

it('#isShortVideo', () => {
  expect(new WechatEvent(textMessage).isShortVideo).toEqual(false);
  expect(new WechatEvent(imageMessage).isShortVideo).toEqual(false);
});

it('#isLocation', () => {
  expect(new WechatEvent(textMessage).isLocation).toEqual(false);
  expect(new WechatEvent(imageMessage).isLocation).toEqual(false);
});

it('#isLink', () => {
  expect(new WechatEvent(textMessage).isLink).toEqual(false);
  expect(new WechatEvent(imageMessage).isLink).toEqual(false);
});
