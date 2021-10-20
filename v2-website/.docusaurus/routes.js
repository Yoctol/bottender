
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog','d30'),
    exact: true
  },
  {
    path: '/blog/2017/10/31/bottender',
    component: ComponentCreator('/blog/2017/10/31/bottender','d51'),
    exact: true
  },
  {
    path: '/blog/2018/08/03/bottender-0_15',
    component: ComponentCreator('/blog/2018/08/03/bottender-0_15','1ab'),
    exact: true
  },
  {
    path: '/blog/2019/12/05/bottender-1',
    component: ComponentCreator('/blog/2019/12/05/bottender-1','3ec'),
    exact: true
  },
  {
    path: '/blog/2019/12/27/bottender-1_1',
    component: ComponentCreator('/blog/2019/12/27/bottender-1_1','e71'),
    exact: true
  },
  {
    path: '/blog/2020/01/22/bottender-1_2',
    component: ComponentCreator('/blog/2020/01/22/bottender-1_2','0bf'),
    exact: true
  },
  {
    path: '/blog/2020/03/06/bottender-1_3',
    component: ComponentCreator('/blog/2020/03/06/bottender-1_3','15b'),
    exact: true
  },
  {
    path: '/blog/2020/04/08/line-domain-name-change',
    component: ComponentCreator('/blog/2020/04/08/line-domain-name-change','0b5'),
    exact: true
  },
  {
    path: '/blog/2020/04/17/bottender-1_4',
    component: ComponentCreator('/blog/2020/04/17/bottender-1_4','083'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search','376'),
    exact: true
  },
  {
    path: '/docs/0.15.17',
    component: ComponentCreator('/docs/0.15.17','eeb'),
    routes: [
      {
        path: '/docs/0.15.17/advanced-guides-custom-server',
        component: ComponentCreator('/docs/0.15.17/advanced-guides-custom-server','908'),
        exact: true
      },
      {
        path: '/docs/0.15.17/advanced-guides-deployment',
        component: ComponentCreator('/docs/0.15.17/advanced-guides-deployment','b2e'),
        exact: true
      },
      {
        path: '/docs/0.15.17/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/0.15.17/advanced-guides-multi-channel','1e9'),
        exact: true
      },
      {
        path: '/docs/0.15.17/advanced-guides-nlu',
        component: ComponentCreator('/docs/0.15.17/advanced-guides-nlu','f64'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-console-context',
        component: ComponentCreator('/docs/0.15.17/api-console-context','8a6'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-console-event',
        component: ComponentCreator('/docs/0.15.17/api-console-event','244'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-console-event',
        component: ComponentCreator('/docs/0.15.17/api-console-event','558'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-consolecontext',
        component: ComponentCreator('/docs/0.15.17/api-consolecontext','e68'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-context',
        component: ComponentCreator('/docs/0.15.17/api-context','785'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-context',
        component: ComponentCreator('/docs/0.15.17/api-context','2c9'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-event',
        component: ComponentCreator('/docs/0.15.17/api-event','da4'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-event',
        component: ComponentCreator('/docs/0.15.17/api-event','745'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-handler',
        component: ComponentCreator('/docs/0.15.17/api-handler','43c'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-line-client',
        component: ComponentCreator('/docs/0.15.17/api-line-client','4f5'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-line-context',
        component: ComponentCreator('/docs/0.15.17/api-line-context','3e0'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-line-event',
        component: ComponentCreator('/docs/0.15.17/api-line-event','bb3'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-linecontext',
        component: ComponentCreator('/docs/0.15.17/api-linecontext','ac5'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-lineevent',
        component: ComponentCreator('/docs/0.15.17/api-lineevent','9ee'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-messenger-client',
        component: ComponentCreator('/docs/0.15.17/api-messenger-client','4ed'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-messenger-context',
        component: ComponentCreator('/docs/0.15.17/api-messenger-context','588'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-messenger-event',
        component: ComponentCreator('/docs/0.15.17/api-messenger-event','f9e'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-messengercontext',
        component: ComponentCreator('/docs/0.15.17/api-messengercontext','c7c'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-messengerevent',
        component: ComponentCreator('/docs/0.15.17/api-messengerevent','2e7'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-slack-client',
        component: ComponentCreator('/docs/0.15.17/api-slack-client','0ea'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-slack-context',
        component: ComponentCreator('/docs/0.15.17/api-slack-context','63b'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-slack-event',
        component: ComponentCreator('/docs/0.15.17/api-slack-event','385'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-slackcontext',
        component: ComponentCreator('/docs/0.15.17/api-slackcontext','e34'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-slackevent',
        component: ComponentCreator('/docs/0.15.17/api-slackevent','f6d'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-telegram-client',
        component: ComponentCreator('/docs/0.15.17/api-telegram-client','d3f'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-telegram-context',
        component: ComponentCreator('/docs/0.15.17/api-telegram-context','073'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-telegram-event',
        component: ComponentCreator('/docs/0.15.17/api-telegram-event','211'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-telegramcontext',
        component: ComponentCreator('/docs/0.15.17/api-telegramcontext','d2f'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-telegramevent',
        component: ComponentCreator('/docs/0.15.17/api-telegramevent','673'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-viber-client',
        component: ComponentCreator('/docs/0.15.17/api-viber-client','c57'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-viber-context',
        component: ComponentCreator('/docs/0.15.17/api-viber-context','2f5'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-viber-event',
        component: ComponentCreator('/docs/0.15.17/api-viber-event','fdc'),
        exact: true,
        'sidebar': "version-0.15.17/api"
      },
      {
        path: '/docs/0.15.17/api-vibercontext',
        component: ComponentCreator('/docs/0.15.17/api-vibercontext','c54'),
        exact: true
      },
      {
        path: '/docs/0.15.17/api-viberevent',
        component: ComponentCreator('/docs/0.15.17/api-viberevent','3c4'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-errors',
        component: ComponentCreator('/docs/0.15.17/channel-line-errors','459'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-flex',
        component: ComponentCreator('/docs/0.15.17/channel-line-flex','f07'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-handling-events',
        component: ComponentCreator('/docs/0.15.17/channel-line-handling-events','2ea'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-liff',
        component: ComponentCreator('/docs/0.15.17/channel-line-liff','41f'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/0.15.17/channel-line-migrating-from-sdk','7ba'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-notify',
        component: ComponentCreator('/docs/0.15.17/channel-line-notify','4fc'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-rich-menu',
        component: ComponentCreator('/docs/0.15.17/channel-line-rich-menu','cf1'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-routing',
        component: ComponentCreator('/docs/0.15.17/channel-line-routing','d11'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-sending-messages',
        component: ComponentCreator('/docs/0.15.17/channel-line-sending-messages','0e7'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-line-setup',
        component: ComponentCreator('/docs/0.15.17/channel-line-setup','585'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-handling-events',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-handling-events','b60'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-handover-protocol','c97'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-multi-page',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-multi-page','366'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-persona',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-persona','36f'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-profile',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-profile','f06'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-routing',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-routing','388'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-sending-messages','a98'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-messenger-setup',
        component: ComponentCreator('/docs/0.15.17/channel-messenger-setup','4fc'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-slack-block-kit',
        component: ComponentCreator('/docs/0.15.17/channel-slack-block-kit','840'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-slack-handling-events',
        component: ComponentCreator('/docs/0.15.17/channel-slack-handling-events','83a'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-slack-routing',
        component: ComponentCreator('/docs/0.15.17/channel-slack-routing','e0b'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-slack-sending-messages',
        component: ComponentCreator('/docs/0.15.17/channel-slack-sending-messages','1b7'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-slack-setup',
        component: ComponentCreator('/docs/0.15.17/channel-slack-setup','ffa'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-slack-slash-command',
        component: ComponentCreator('/docs/0.15.17/channel-slack-slash-command','491'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-telegram-handling-events',
        component: ComponentCreator('/docs/0.15.17/channel-telegram-handling-events','064'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-telegram-routing',
        component: ComponentCreator('/docs/0.15.17/channel-telegram-routing','851'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/0.15.17/channel-telegram-sending-messages','b4a'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-telegram-setup',
        component: ComponentCreator('/docs/0.15.17/channel-telegram-setup','7ff'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-viber-handling-events',
        component: ComponentCreator('/docs/0.15.17/channel-viber-handling-events','663'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-viber-routing',
        component: ComponentCreator('/docs/0.15.17/channel-viber-routing','8e1'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-viber-sending-messages',
        component: ComponentCreator('/docs/0.15.17/channel-viber-sending-messages','421'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-viber-setup',
        component: ComponentCreator('/docs/0.15.17/channel-viber-setup','939'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/0.15.17/channel-whatsapp-handling-events','417'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-whatsapp-routing',
        component: ComponentCreator('/docs/0.15.17/channel-whatsapp-routing','73f'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/0.15.17/channel-whatsapp-sending-messages','0ac'),
        exact: true
      },
      {
        path: '/docs/0.15.17/channel-whatsapp-setup',
        component: ComponentCreator('/docs/0.15.17/channel-whatsapp-setup','eb1'),
        exact: true
      },
      {
        path: '/docs/0.15.17/commands',
        component: ComponentCreator('/docs/0.15.17/commands','d2f'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/console',
        component: ComponentCreator('/docs/0.15.17/console','063'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/custom-connector',
        component: ComponentCreator('/docs/0.15.17/custom-connector','7c4'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/deployment',
        component: ComponentCreator('/docs/0.15.17/deployment','9c7'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/error-handling',
        component: ComponentCreator('/docs/0.15.17/error-handling','952'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/getting-started',
        component: ComponentCreator('/docs/0.15.17/getting-started','cc3'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/getting-started',
        component: ComponentCreator('/docs/0.15.17/getting-started','004'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/intents',
        component: ComponentCreator('/docs/0.15.17/intents','2e8'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/line',
        component: ComponentCreator('/docs/0.15.17/line','cc5'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/messenger',
        component: ComponentCreator('/docs/0.15.17/messenger','123'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/middleware',
        component: ComponentCreator('/docs/0.15.17/middleware','60a'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/migrating-v1',
        component: ComponentCreator('/docs/0.15.17/migrating-v1','1b2'),
        exact: true
      },
      {
        path: '/docs/0.15.17/server',
        component: ComponentCreator('/docs/0.15.17/server','91a'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/session',
        component: ComponentCreator('/docs/0.15.17/session','db9'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/slack',
        component: ComponentCreator('/docs/0.15.17/slack','b4c'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/state',
        component: ComponentCreator('/docs/0.15.17/state','e3b'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/telegram',
        component: ComponentCreator('/docs/0.15.17/telegram','625'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/testing',
        component: ComponentCreator('/docs/0.15.17/testing','7fe'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/the-basics-actions',
        component: ComponentCreator('/docs/0.15.17/the-basics-actions','65c'),
        exact: true
      },
      {
        path: '/docs/0.15.17/the-basics-chain',
        component: ComponentCreator('/docs/0.15.17/the-basics-chain','7be'),
        exact: true
      },
      {
        path: '/docs/0.15.17/the-basics-console-mode',
        component: ComponentCreator('/docs/0.15.17/the-basics-console-mode','87c'),
        exact: true
      },
      {
        path: '/docs/0.15.17/the-basics-context-event',
        component: ComponentCreator('/docs/0.15.17/the-basics-context-event','cf5'),
        exact: true
      },
      {
        path: '/docs/0.15.17/the-basics-errors',
        component: ComponentCreator('/docs/0.15.17/the-basics-errors','b65'),
        exact: true
      },
      {
        path: '/docs/0.15.17/the-basics-routing',
        component: ComponentCreator('/docs/0.15.17/the-basics-routing','e23'),
        exact: true
      },
      {
        path: '/docs/0.15.17/the-basics-session',
        component: ComponentCreator('/docs/0.15.17/the-basics-session','416'),
        exact: true
      },
      {
        path: '/docs/0.15.17/troubleshooting',
        component: ComponentCreator('/docs/0.15.17/troubleshooting','2e9'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      },
      {
        path: '/docs/0.15.17/viber',
        component: ComponentCreator('/docs/0.15.17/viber','35a'),
        exact: true,
        'sidebar': "version-0.15.17/docs"
      }
    ]
  },
  {
    path: '/docs/1.0.5',
    component: ComponentCreator('/docs/1.0.5','2ec'),
    routes: [
      {
        path: '/docs/1.0.5/advanced-guides-custom-server',
        component: ComponentCreator('/docs/1.0.5/advanced-guides-custom-server','f7f'),
        exact: true
      },
      {
        path: '/docs/1.0.5/advanced-guides-deployment',
        component: ComponentCreator('/docs/1.0.5/advanced-guides-deployment','a48'),
        exact: true
      },
      {
        path: '/docs/1.0.5/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.0.5/advanced-guides-multi-channel','2eb'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.0.5/advanced-guides-multi-channel','e58'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/advanced-guides-nlu',
        component: ComponentCreator('/docs/1.0.5/advanced-guides-nlu','599'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/api-console-context',
        component: ComponentCreator('/docs/1.0.5/api-console-context','8de'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-console-event',
        component: ComponentCreator('/docs/1.0.5/api-console-event','4f1'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-console-event',
        component: ComponentCreator('/docs/1.0.5/api-console-event','ea4'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-consolecontext',
        component: ComponentCreator('/docs/1.0.5/api-consolecontext','93f'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-context',
        component: ComponentCreator('/docs/1.0.5/api-context','d64'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-context',
        component: ComponentCreator('/docs/1.0.5/api-context','d5b'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-event',
        component: ComponentCreator('/docs/1.0.5/api-event','248'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-event',
        component: ComponentCreator('/docs/1.0.5/api-event','19e'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-handler',
        component: ComponentCreator('/docs/1.0.5/api-handler','6f6'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-line-client',
        component: ComponentCreator('/docs/1.0.5/api-line-client','96f'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-line-context',
        component: ComponentCreator('/docs/1.0.5/api-line-context','1b6'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-line-event',
        component: ComponentCreator('/docs/1.0.5/api-line-event','fac'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-linecontext',
        component: ComponentCreator('/docs/1.0.5/api-linecontext','ae5'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-lineevent',
        component: ComponentCreator('/docs/1.0.5/api-lineevent','b1c'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-messenger-client',
        component: ComponentCreator('/docs/1.0.5/api-messenger-client','b76'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-messenger-context',
        component: ComponentCreator('/docs/1.0.5/api-messenger-context','ee5'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-messenger-event',
        component: ComponentCreator('/docs/1.0.5/api-messenger-event','f9f'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-messengercontext',
        component: ComponentCreator('/docs/1.0.5/api-messengercontext','747'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-messengerevent',
        component: ComponentCreator('/docs/1.0.5/api-messengerevent','b59'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-slack-client',
        component: ComponentCreator('/docs/1.0.5/api-slack-client','449'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-slack-context',
        component: ComponentCreator('/docs/1.0.5/api-slack-context','852'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-slack-event',
        component: ComponentCreator('/docs/1.0.5/api-slack-event','5b5'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-slackcontext',
        component: ComponentCreator('/docs/1.0.5/api-slackcontext','063'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-slackevent',
        component: ComponentCreator('/docs/1.0.5/api-slackevent','8a2'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-telegram-client',
        component: ComponentCreator('/docs/1.0.5/api-telegram-client','591'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-telegram-context',
        component: ComponentCreator('/docs/1.0.5/api-telegram-context','a43'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-telegram-event',
        component: ComponentCreator('/docs/1.0.5/api-telegram-event','a9c'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-telegramcontext',
        component: ComponentCreator('/docs/1.0.5/api-telegramcontext','89a'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-telegramevent',
        component: ComponentCreator('/docs/1.0.5/api-telegramevent','945'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-viber-client',
        component: ComponentCreator('/docs/1.0.5/api-viber-client','95d'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-viber-context',
        component: ComponentCreator('/docs/1.0.5/api-viber-context','79d'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-viber-event',
        component: ComponentCreator('/docs/1.0.5/api-viber-event','40e'),
        exact: true,
        'sidebar': "version-1.0.5/api"
      },
      {
        path: '/docs/1.0.5/api-vibercontext',
        component: ComponentCreator('/docs/1.0.5/api-vibercontext','815'),
        exact: true
      },
      {
        path: '/docs/1.0.5/api-viberevent',
        component: ComponentCreator('/docs/1.0.5/api-viberevent','045'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-line-errors',
        component: ComponentCreator('/docs/1.0.5/channel-line-errors','567'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-line-flex',
        component: ComponentCreator('/docs/1.0.5/channel-line-flex','312'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-line-handling-events',
        component: ComponentCreator('/docs/1.0.5/channel-line-handling-events','e82'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-line-liff',
        component: ComponentCreator('/docs/1.0.5/channel-line-liff','54b'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/1.0.5/channel-line-migrating-from-sdk','e41'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-line-notify',
        component: ComponentCreator('/docs/1.0.5/channel-line-notify','60e'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-line-rich-menu',
        component: ComponentCreator('/docs/1.0.5/channel-line-rich-menu','13f'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-line-routing',
        component: ComponentCreator('/docs/1.0.5/channel-line-routing','56b'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-line-sending-messages',
        component: ComponentCreator('/docs/1.0.5/channel-line-sending-messages','151'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-line-setup',
        component: ComponentCreator('/docs/1.0.5/channel-line-setup','14e'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-messenger-handling-events',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-handling-events','44c'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-handover-protocol','7cb'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-messenger-multi-page',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-multi-page','164'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-messenger-persona',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-persona','9ca'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-messenger-profile',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-profile','c0c'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-messenger-routing',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-routing','2ae'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-sending-messages','43e'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-messenger-setup',
        component: ComponentCreator('/docs/1.0.5/channel-messenger-setup','95f'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-slack-block-kit',
        component: ComponentCreator('/docs/1.0.5/channel-slack-block-kit','e42'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-slack-handling-events',
        component: ComponentCreator('/docs/1.0.5/channel-slack-handling-events','66e'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-slack-routing',
        component: ComponentCreator('/docs/1.0.5/channel-slack-routing','a94'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-slack-sending-messages',
        component: ComponentCreator('/docs/1.0.5/channel-slack-sending-messages','9dd'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-slack-setup',
        component: ComponentCreator('/docs/1.0.5/channel-slack-setup','1de'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-slack-slash-command',
        component: ComponentCreator('/docs/1.0.5/channel-slack-slash-command','874'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-telegram-handling-events',
        component: ComponentCreator('/docs/1.0.5/channel-telegram-handling-events','c40'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-telegram-routing',
        component: ComponentCreator('/docs/1.0.5/channel-telegram-routing','e97'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/1.0.5/channel-telegram-sending-messages','482'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-telegram-setup',
        component: ComponentCreator('/docs/1.0.5/channel-telegram-setup','b2b'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-viber-handling-events',
        component: ComponentCreator('/docs/1.0.5/channel-viber-handling-events','8e8'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-viber-routing',
        component: ComponentCreator('/docs/1.0.5/channel-viber-routing','7af'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-viber-sending-messages',
        component: ComponentCreator('/docs/1.0.5/channel-viber-sending-messages','3b2'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-viber-setup',
        component: ComponentCreator('/docs/1.0.5/channel-viber-setup','34f'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/1.0.5/channel-whatsapp-handling-events','afe'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-whatsapp-routing',
        component: ComponentCreator('/docs/1.0.5/channel-whatsapp-routing','cea'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/1.0.5/channel-whatsapp-sending-messages','04a'),
        exact: true
      },
      {
        path: '/docs/1.0.5/channel-whatsapp-setup',
        component: ComponentCreator('/docs/1.0.5/channel-whatsapp-setup','c4b'),
        exact: true
      },
      {
        path: '/docs/1.0.5/commands',
        component: ComponentCreator('/docs/1.0.5/commands','33b'),
        exact: true
      },
      {
        path: '/docs/1.0.5/console',
        component: ComponentCreator('/docs/1.0.5/console','140'),
        exact: true
      },
      {
        path: '/docs/1.0.5/custom-connector',
        component: ComponentCreator('/docs/1.0.5/custom-connector','d13'),
        exact: true
      },
      {
        path: '/docs/1.0.5/deployment',
        component: ComponentCreator('/docs/1.0.5/deployment','377'),
        exact: true
      },
      {
        path: '/docs/1.0.5/error-handling',
        component: ComponentCreator('/docs/1.0.5/error-handling','8cf'),
        exact: true
      },
      {
        path: '/docs/1.0.5/getting-started',
        component: ComponentCreator('/docs/1.0.5/getting-started','f6a'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/getting-started',
        component: ComponentCreator('/docs/1.0.5/getting-started','513'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/intents',
        component: ComponentCreator('/docs/1.0.5/intents','5cb'),
        exact: true
      },
      {
        path: '/docs/1.0.5/line',
        component: ComponentCreator('/docs/1.0.5/line','bb7'),
        exact: true
      },
      {
        path: '/docs/1.0.5/messenger',
        component: ComponentCreator('/docs/1.0.5/messenger','b5c'),
        exact: true
      },
      {
        path: '/docs/1.0.5/middleware',
        component: ComponentCreator('/docs/1.0.5/middleware','a3e'),
        exact: true
      },
      {
        path: '/docs/1.0.5/migrating-v1',
        component: ComponentCreator('/docs/1.0.5/migrating-v1','b0f'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/server',
        component: ComponentCreator('/docs/1.0.5/server','256'),
        exact: true
      },
      {
        path: '/docs/1.0.5/session',
        component: ComponentCreator('/docs/1.0.5/session','abe'),
        exact: true
      },
      {
        path: '/docs/1.0.5/slack',
        component: ComponentCreator('/docs/1.0.5/slack','332'),
        exact: true
      },
      {
        path: '/docs/1.0.5/state',
        component: ComponentCreator('/docs/1.0.5/state','a0b'),
        exact: true
      },
      {
        path: '/docs/1.0.5/telegram',
        component: ComponentCreator('/docs/1.0.5/telegram','99b'),
        exact: true
      },
      {
        path: '/docs/1.0.5/testing',
        component: ComponentCreator('/docs/1.0.5/testing','b17'),
        exact: true
      },
      {
        path: '/docs/1.0.5/the-basics-actions',
        component: ComponentCreator('/docs/1.0.5/the-basics-actions','ff6'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/the-basics-chain',
        component: ComponentCreator('/docs/1.0.5/the-basics-chain','927'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/the-basics-console-mode',
        component: ComponentCreator('/docs/1.0.5/the-basics-console-mode','9aa'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/the-basics-context-event',
        component: ComponentCreator('/docs/1.0.5/the-basics-context-event','755'),
        exact: true
      },
      {
        path: '/docs/1.0.5/the-basics-errors',
        component: ComponentCreator('/docs/1.0.5/the-basics-errors','542'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/the-basics-routing',
        component: ComponentCreator('/docs/1.0.5/the-basics-routing','216'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/the-basics-session',
        component: ComponentCreator('/docs/1.0.5/the-basics-session','637'),
        exact: true,
        'sidebar': "version-1.0.5/docs"
      },
      {
        path: '/docs/1.0.5/troubleshooting',
        component: ComponentCreator('/docs/1.0.5/troubleshooting','2e7'),
        exact: true
      },
      {
        path: '/docs/1.0.5/viber',
        component: ComponentCreator('/docs/1.0.5/viber','dd8'),
        exact: true
      }
    ]
  },
  {
    path: '/docs/1.1.0',
    component: ComponentCreator('/docs/1.1.0','cc5'),
    routes: [
      {
        path: '/docs/1.1.0/advanced-guides-custom-server',
        component: ComponentCreator('/docs/1.1.0/advanced-guides-custom-server','8f9'),
        exact: true
      },
      {
        path: '/docs/1.1.0/advanced-guides-deployment',
        component: ComponentCreator('/docs/1.1.0/advanced-guides-deployment','be7'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.1.0/advanced-guides-multi-channel','548'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.1.0/advanced-guides-multi-channel','307'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/advanced-guides-nlu',
        component: ComponentCreator('/docs/1.1.0/advanced-guides-nlu','6b6'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/api-console-context',
        component: ComponentCreator('/docs/1.1.0/api-console-context','780'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-console-event',
        component: ComponentCreator('/docs/1.1.0/api-console-event','126'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-console-event',
        component: ComponentCreator('/docs/1.1.0/api-console-event','09c'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-consolecontext',
        component: ComponentCreator('/docs/1.1.0/api-consolecontext','35e'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-context',
        component: ComponentCreator('/docs/1.1.0/api-context','9c6'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-context',
        component: ComponentCreator('/docs/1.1.0/api-context','1b5'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-event',
        component: ComponentCreator('/docs/1.1.0/api-event','2d6'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-event',
        component: ComponentCreator('/docs/1.1.0/api-event','c14'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-handler',
        component: ComponentCreator('/docs/1.1.0/api-handler','5e1'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-line-client',
        component: ComponentCreator('/docs/1.1.0/api-line-client','a19'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-line-context',
        component: ComponentCreator('/docs/1.1.0/api-line-context','29b'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-line-event',
        component: ComponentCreator('/docs/1.1.0/api-line-event','90b'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-linecontext',
        component: ComponentCreator('/docs/1.1.0/api-linecontext','6e9'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-lineevent',
        component: ComponentCreator('/docs/1.1.0/api-lineevent','d43'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-messenger-client',
        component: ComponentCreator('/docs/1.1.0/api-messenger-client','21a'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-messenger-context',
        component: ComponentCreator('/docs/1.1.0/api-messenger-context','62f'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-messenger-event',
        component: ComponentCreator('/docs/1.1.0/api-messenger-event','5ed'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-messengercontext',
        component: ComponentCreator('/docs/1.1.0/api-messengercontext','23a'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-messengerevent',
        component: ComponentCreator('/docs/1.1.0/api-messengerevent','ad0'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-slack-client',
        component: ComponentCreator('/docs/1.1.0/api-slack-client','d99'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-slack-context',
        component: ComponentCreator('/docs/1.1.0/api-slack-context','6b7'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-slack-event',
        component: ComponentCreator('/docs/1.1.0/api-slack-event','d2a'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-slackcontext',
        component: ComponentCreator('/docs/1.1.0/api-slackcontext','c68'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-slackevent',
        component: ComponentCreator('/docs/1.1.0/api-slackevent','0aa'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-telegram-client',
        component: ComponentCreator('/docs/1.1.0/api-telegram-client','244'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-telegram-context',
        component: ComponentCreator('/docs/1.1.0/api-telegram-context','575'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-telegram-event',
        component: ComponentCreator('/docs/1.1.0/api-telegram-event','f03'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-telegramcontext',
        component: ComponentCreator('/docs/1.1.0/api-telegramcontext','261'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-telegramevent',
        component: ComponentCreator('/docs/1.1.0/api-telegramevent','0d0'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-viber-client',
        component: ComponentCreator('/docs/1.1.0/api-viber-client','e16'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-viber-context',
        component: ComponentCreator('/docs/1.1.0/api-viber-context','d68'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-viber-event',
        component: ComponentCreator('/docs/1.1.0/api-viber-event','3e3'),
        exact: true,
        'sidebar': "version-1.1.0/api"
      },
      {
        path: '/docs/1.1.0/api-vibercontext',
        component: ComponentCreator('/docs/1.1.0/api-vibercontext','44c'),
        exact: true
      },
      {
        path: '/docs/1.1.0/api-viberevent',
        component: ComponentCreator('/docs/1.1.0/api-viberevent','667'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-line-errors',
        component: ComponentCreator('/docs/1.1.0/channel-line-errors','a19'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-flex',
        component: ComponentCreator('/docs/1.1.0/channel-line-flex','a84'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-handling-events',
        component: ComponentCreator('/docs/1.1.0/channel-line-handling-events','8c3'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-liff',
        component: ComponentCreator('/docs/1.1.0/channel-line-liff','593'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/1.1.0/channel-line-migrating-from-sdk','115'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-notify',
        component: ComponentCreator('/docs/1.1.0/channel-line-notify','b9e'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-line-rich-menu',
        component: ComponentCreator('/docs/1.1.0/channel-line-rich-menu','631'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-routing',
        component: ComponentCreator('/docs/1.1.0/channel-line-routing','5ef'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-sending-messages',
        component: ComponentCreator('/docs/1.1.0/channel-line-sending-messages','4e6'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-line-setup',
        component: ComponentCreator('/docs/1.1.0/channel-line-setup','579'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-handling-events',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-handling-events','eca'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-handover-protocol','b65'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-multi-page',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-multi-page','e84'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-persona',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-persona','027'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-profile',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-profile','0b7'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-routing',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-routing','9c9'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-sending-messages','16f'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-messenger-setup',
        component: ComponentCreator('/docs/1.1.0/channel-messenger-setup','62e'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-slack-block-kit',
        component: ComponentCreator('/docs/1.1.0/channel-slack-block-kit','738'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-slack-handling-events',
        component: ComponentCreator('/docs/1.1.0/channel-slack-handling-events','efc'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-slack-routing',
        component: ComponentCreator('/docs/1.1.0/channel-slack-routing','499'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-slack-sending-messages',
        component: ComponentCreator('/docs/1.1.0/channel-slack-sending-messages','b68'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-slack-setup',
        component: ComponentCreator('/docs/1.1.0/channel-slack-setup','f2c'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-slack-slash-command',
        component: ComponentCreator('/docs/1.1.0/channel-slack-slash-command','c5e'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-telegram-handling-events',
        component: ComponentCreator('/docs/1.1.0/channel-telegram-handling-events','624'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-telegram-routing',
        component: ComponentCreator('/docs/1.1.0/channel-telegram-routing','815'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/1.1.0/channel-telegram-sending-messages','480'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-telegram-setup',
        component: ComponentCreator('/docs/1.1.0/channel-telegram-setup','430'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-viber-handling-events',
        component: ComponentCreator('/docs/1.1.0/channel-viber-handling-events','a29'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-viber-routing',
        component: ComponentCreator('/docs/1.1.0/channel-viber-routing','115'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-viber-sending-messages',
        component: ComponentCreator('/docs/1.1.0/channel-viber-sending-messages','172'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-viber-setup',
        component: ComponentCreator('/docs/1.1.0/channel-viber-setup','dd5'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/1.1.0/channel-whatsapp-handling-events','60f'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-whatsapp-routing',
        component: ComponentCreator('/docs/1.1.0/channel-whatsapp-routing','4ab'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/1.1.0/channel-whatsapp-sending-messages','218'),
        exact: true
      },
      {
        path: '/docs/1.1.0/channel-whatsapp-setup',
        component: ComponentCreator('/docs/1.1.0/channel-whatsapp-setup','01f'),
        exact: true
      },
      {
        path: '/docs/1.1.0/commands',
        component: ComponentCreator('/docs/1.1.0/commands','9e0'),
        exact: true
      },
      {
        path: '/docs/1.1.0/console',
        component: ComponentCreator('/docs/1.1.0/console','496'),
        exact: true
      },
      {
        path: '/docs/1.1.0/custom-connector',
        component: ComponentCreator('/docs/1.1.0/custom-connector','d73'),
        exact: true
      },
      {
        path: '/docs/1.1.0/deployment',
        component: ComponentCreator('/docs/1.1.0/deployment','6ea'),
        exact: true
      },
      {
        path: '/docs/1.1.0/error-handling',
        component: ComponentCreator('/docs/1.1.0/error-handling','f8d'),
        exact: true
      },
      {
        path: '/docs/1.1.0/getting-started',
        component: ComponentCreator('/docs/1.1.0/getting-started','e77'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/getting-started',
        component: ComponentCreator('/docs/1.1.0/getting-started','127'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/intents',
        component: ComponentCreator('/docs/1.1.0/intents','303'),
        exact: true
      },
      {
        path: '/docs/1.1.0/line',
        component: ComponentCreator('/docs/1.1.0/line','164'),
        exact: true
      },
      {
        path: '/docs/1.1.0/messenger',
        component: ComponentCreator('/docs/1.1.0/messenger','6d5'),
        exact: true
      },
      {
        path: '/docs/1.1.0/middleware',
        component: ComponentCreator('/docs/1.1.0/middleware','1b9'),
        exact: true
      },
      {
        path: '/docs/1.1.0/migrating-v1',
        component: ComponentCreator('/docs/1.1.0/migrating-v1','8f0'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/server',
        component: ComponentCreator('/docs/1.1.0/server','3f0'),
        exact: true
      },
      {
        path: '/docs/1.1.0/session',
        component: ComponentCreator('/docs/1.1.0/session','a0b'),
        exact: true
      },
      {
        path: '/docs/1.1.0/slack',
        component: ComponentCreator('/docs/1.1.0/slack','6a2'),
        exact: true
      },
      {
        path: '/docs/1.1.0/state',
        component: ComponentCreator('/docs/1.1.0/state','b73'),
        exact: true
      },
      {
        path: '/docs/1.1.0/telegram',
        component: ComponentCreator('/docs/1.1.0/telegram','add'),
        exact: true
      },
      {
        path: '/docs/1.1.0/testing',
        component: ComponentCreator('/docs/1.1.0/testing','860'),
        exact: true
      },
      {
        path: '/docs/1.1.0/the-basics-actions',
        component: ComponentCreator('/docs/1.1.0/the-basics-actions','385'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/the-basics-chain',
        component: ComponentCreator('/docs/1.1.0/the-basics-chain','1f4'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/the-basics-console-mode',
        component: ComponentCreator('/docs/1.1.0/the-basics-console-mode','6bb'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/the-basics-context-event',
        component: ComponentCreator('/docs/1.1.0/the-basics-context-event','a10'),
        exact: true
      },
      {
        path: '/docs/1.1.0/the-basics-errors',
        component: ComponentCreator('/docs/1.1.0/the-basics-errors','4e1'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/the-basics-routing',
        component: ComponentCreator('/docs/1.1.0/the-basics-routing','5cf'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/the-basics-session',
        component: ComponentCreator('/docs/1.1.0/the-basics-session','04e'),
        exact: true,
        'sidebar': "version-1.1.0/docs"
      },
      {
        path: '/docs/1.1.0/troubleshooting',
        component: ComponentCreator('/docs/1.1.0/troubleshooting','0cc'),
        exact: true
      },
      {
        path: '/docs/1.1.0/viber',
        component: ComponentCreator('/docs/1.1.0/viber','088'),
        exact: true
      }
    ]
  },
  {
    path: '/docs/1.2.0',
    component: ComponentCreator('/docs/1.2.0','f60'),
    routes: [
      {
        path: '/docs/1.2.0/advanced-guides-custom-server',
        component: ComponentCreator('/docs/1.2.0/advanced-guides-custom-server','f3b'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/advanced-guides-deployment',
        component: ComponentCreator('/docs/1.2.0/advanced-guides-deployment','d3f'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.2.0/advanced-guides-multi-channel','620'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.2.0/advanced-guides-multi-channel','306'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/advanced-guides-nlu',
        component: ComponentCreator('/docs/1.2.0/advanced-guides-nlu','71f'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/api-console-context',
        component: ComponentCreator('/docs/1.2.0/api-console-context','92e'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-console-event',
        component: ComponentCreator('/docs/1.2.0/api-console-event','df3'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-console-event',
        component: ComponentCreator('/docs/1.2.0/api-console-event','d04'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-consolecontext',
        component: ComponentCreator('/docs/1.2.0/api-consolecontext','d16'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-context',
        component: ComponentCreator('/docs/1.2.0/api-context','2ee'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-context',
        component: ComponentCreator('/docs/1.2.0/api-context','a76'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-event',
        component: ComponentCreator('/docs/1.2.0/api-event','7da'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-event',
        component: ComponentCreator('/docs/1.2.0/api-event','2f0'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-handler',
        component: ComponentCreator('/docs/1.2.0/api-handler','ac0'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-line-client',
        component: ComponentCreator('/docs/1.2.0/api-line-client','242'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-line-context',
        component: ComponentCreator('/docs/1.2.0/api-line-context','b56'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-line-event',
        component: ComponentCreator('/docs/1.2.0/api-line-event','f19'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-linecontext',
        component: ComponentCreator('/docs/1.2.0/api-linecontext','dce'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-lineevent',
        component: ComponentCreator('/docs/1.2.0/api-lineevent','ca3'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-messenger-client',
        component: ComponentCreator('/docs/1.2.0/api-messenger-client','8e7'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-messenger-context',
        component: ComponentCreator('/docs/1.2.0/api-messenger-context','900'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-messenger-event',
        component: ComponentCreator('/docs/1.2.0/api-messenger-event','ec7'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-messengercontext',
        component: ComponentCreator('/docs/1.2.0/api-messengercontext','ba5'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-messengerevent',
        component: ComponentCreator('/docs/1.2.0/api-messengerevent','8fc'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-slack-client',
        component: ComponentCreator('/docs/1.2.0/api-slack-client','e96'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-slack-context',
        component: ComponentCreator('/docs/1.2.0/api-slack-context','33a'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-slack-event',
        component: ComponentCreator('/docs/1.2.0/api-slack-event','2e3'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-slackcontext',
        component: ComponentCreator('/docs/1.2.0/api-slackcontext','a45'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-slackevent',
        component: ComponentCreator('/docs/1.2.0/api-slackevent','d2b'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-telegram-client',
        component: ComponentCreator('/docs/1.2.0/api-telegram-client','b1d'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-telegram-context',
        component: ComponentCreator('/docs/1.2.0/api-telegram-context','397'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-telegram-event',
        component: ComponentCreator('/docs/1.2.0/api-telegram-event','ac9'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-telegramcontext',
        component: ComponentCreator('/docs/1.2.0/api-telegramcontext','c85'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-telegramevent',
        component: ComponentCreator('/docs/1.2.0/api-telegramevent','17c'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-viber-client',
        component: ComponentCreator('/docs/1.2.0/api-viber-client','66c'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-viber-context',
        component: ComponentCreator('/docs/1.2.0/api-viber-context','262'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-viber-event',
        component: ComponentCreator('/docs/1.2.0/api-viber-event','34c'),
        exact: true,
        'sidebar': "version-1.2.0/api"
      },
      {
        path: '/docs/1.2.0/api-vibercontext',
        component: ComponentCreator('/docs/1.2.0/api-vibercontext','ff7'),
        exact: true
      },
      {
        path: '/docs/1.2.0/api-viberevent',
        component: ComponentCreator('/docs/1.2.0/api-viberevent','0a8'),
        exact: true
      },
      {
        path: '/docs/1.2.0/channel-line-errors',
        component: ComponentCreator('/docs/1.2.0/channel-line-errors','aec'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-flex',
        component: ComponentCreator('/docs/1.2.0/channel-line-flex','ca1'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-handling-events',
        component: ComponentCreator('/docs/1.2.0/channel-line-handling-events','b77'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-liff',
        component: ComponentCreator('/docs/1.2.0/channel-line-liff','e83'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/1.2.0/channel-line-migrating-from-sdk','dcb'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-notify',
        component: ComponentCreator('/docs/1.2.0/channel-line-notify','577'),
        exact: true
      },
      {
        path: '/docs/1.2.0/channel-line-rich-menu',
        component: ComponentCreator('/docs/1.2.0/channel-line-rich-menu','f0f'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-routing',
        component: ComponentCreator('/docs/1.2.0/channel-line-routing','a58'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-sending-messages',
        component: ComponentCreator('/docs/1.2.0/channel-line-sending-messages','6c3'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-line-setup',
        component: ComponentCreator('/docs/1.2.0/channel-line-setup','471'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-handling-events',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-handling-events','605'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-handover-protocol','079'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-multi-page',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-multi-page','4b9'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-persona',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-persona','6ac'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-profile',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-profile','dda'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-routing',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-routing','ae3'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-sending-messages','716'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-messenger-setup',
        component: ComponentCreator('/docs/1.2.0/channel-messenger-setup','107'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-slack-block-kit',
        component: ComponentCreator('/docs/1.2.0/channel-slack-block-kit','d64'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-slack-handling-events',
        component: ComponentCreator('/docs/1.2.0/channel-slack-handling-events','fb4'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-slack-routing',
        component: ComponentCreator('/docs/1.2.0/channel-slack-routing','735'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-slack-sending-messages',
        component: ComponentCreator('/docs/1.2.0/channel-slack-sending-messages','671'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-slack-setup',
        component: ComponentCreator('/docs/1.2.0/channel-slack-setup','863'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-slack-slash-command',
        component: ComponentCreator('/docs/1.2.0/channel-slack-slash-command','f01'),
        exact: true
      },
      {
        path: '/docs/1.2.0/channel-telegram-handling-events',
        component: ComponentCreator('/docs/1.2.0/channel-telegram-handling-events','a70'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-telegram-routing',
        component: ComponentCreator('/docs/1.2.0/channel-telegram-routing','b7e'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/1.2.0/channel-telegram-sending-messages','46f'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-telegram-setup',
        component: ComponentCreator('/docs/1.2.0/channel-telegram-setup','db6'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-viber-handling-events',
        component: ComponentCreator('/docs/1.2.0/channel-viber-handling-events','2f7'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-viber-routing',
        component: ComponentCreator('/docs/1.2.0/channel-viber-routing','a1d'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-viber-sending-messages',
        component: ComponentCreator('/docs/1.2.0/channel-viber-sending-messages','24e'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-viber-setup',
        component: ComponentCreator('/docs/1.2.0/channel-viber-setup','9da'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/1.2.0/channel-whatsapp-handling-events','d92'),
        exact: true
      },
      {
        path: '/docs/1.2.0/channel-whatsapp-routing',
        component: ComponentCreator('/docs/1.2.0/channel-whatsapp-routing','00f'),
        exact: true
      },
      {
        path: '/docs/1.2.0/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/1.2.0/channel-whatsapp-sending-messages','9ca'),
        exact: true
      },
      {
        path: '/docs/1.2.0/channel-whatsapp-setup',
        component: ComponentCreator('/docs/1.2.0/channel-whatsapp-setup','b0f'),
        exact: true
      },
      {
        path: '/docs/1.2.0/commands',
        component: ComponentCreator('/docs/1.2.0/commands','1c2'),
        exact: true
      },
      {
        path: '/docs/1.2.0/console',
        component: ComponentCreator('/docs/1.2.0/console','832'),
        exact: true
      },
      {
        path: '/docs/1.2.0/custom-connector',
        component: ComponentCreator('/docs/1.2.0/custom-connector','765'),
        exact: true
      },
      {
        path: '/docs/1.2.0/deployment',
        component: ComponentCreator('/docs/1.2.0/deployment','ac5'),
        exact: true
      },
      {
        path: '/docs/1.2.0/error-handling',
        component: ComponentCreator('/docs/1.2.0/error-handling','c45'),
        exact: true
      },
      {
        path: '/docs/1.2.0/getting-started',
        component: ComponentCreator('/docs/1.2.0/getting-started','30f'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/getting-started',
        component: ComponentCreator('/docs/1.2.0/getting-started','b90'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/intents',
        component: ComponentCreator('/docs/1.2.0/intents','876'),
        exact: true
      },
      {
        path: '/docs/1.2.0/line',
        component: ComponentCreator('/docs/1.2.0/line','83d'),
        exact: true
      },
      {
        path: '/docs/1.2.0/messenger',
        component: ComponentCreator('/docs/1.2.0/messenger','7e5'),
        exact: true
      },
      {
        path: '/docs/1.2.0/middleware',
        component: ComponentCreator('/docs/1.2.0/middleware','c1e'),
        exact: true
      },
      {
        path: '/docs/1.2.0/migrating-v1',
        component: ComponentCreator('/docs/1.2.0/migrating-v1','779'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/server',
        component: ComponentCreator('/docs/1.2.0/server','83f'),
        exact: true
      },
      {
        path: '/docs/1.2.0/session',
        component: ComponentCreator('/docs/1.2.0/session','a62'),
        exact: true
      },
      {
        path: '/docs/1.2.0/slack',
        component: ComponentCreator('/docs/1.2.0/slack','e6a'),
        exact: true
      },
      {
        path: '/docs/1.2.0/state',
        component: ComponentCreator('/docs/1.2.0/state','fcc'),
        exact: true
      },
      {
        path: '/docs/1.2.0/telegram',
        component: ComponentCreator('/docs/1.2.0/telegram','cd5'),
        exact: true
      },
      {
        path: '/docs/1.2.0/testing',
        component: ComponentCreator('/docs/1.2.0/testing','461'),
        exact: true
      },
      {
        path: '/docs/1.2.0/the-basics-actions',
        component: ComponentCreator('/docs/1.2.0/the-basics-actions','6cd'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/the-basics-chain',
        component: ComponentCreator('/docs/1.2.0/the-basics-chain','444'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/the-basics-console-mode',
        component: ComponentCreator('/docs/1.2.0/the-basics-console-mode','9bf'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/the-basics-context-event',
        component: ComponentCreator('/docs/1.2.0/the-basics-context-event','22d'),
        exact: true
      },
      {
        path: '/docs/1.2.0/the-basics-errors',
        component: ComponentCreator('/docs/1.2.0/the-basics-errors','7ad'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/the-basics-routing',
        component: ComponentCreator('/docs/1.2.0/the-basics-routing','ca6'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/the-basics-session',
        component: ComponentCreator('/docs/1.2.0/the-basics-session','775'),
        exact: true,
        'sidebar': "version-1.2.0/docs"
      },
      {
        path: '/docs/1.2.0/troubleshooting',
        component: ComponentCreator('/docs/1.2.0/troubleshooting','bc7'),
        exact: true
      },
      {
        path: '/docs/1.2.0/viber',
        component: ComponentCreator('/docs/1.2.0/viber','7a4'),
        exact: true
      }
    ]
  },
  {
    path: '/docs/1.3.0',
    component: ComponentCreator('/docs/1.3.0','537'),
    routes: [
      {
        path: '/docs/1.3.0/advanced-guides-custom-server',
        component: ComponentCreator('/docs/1.3.0/advanced-guides-custom-server','471'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/advanced-guides-deployment',
        component: ComponentCreator('/docs/1.3.0/advanced-guides-deployment','0dd'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.3.0/advanced-guides-multi-channel','367'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.3.0/advanced-guides-multi-channel','063'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/advanced-guides-nlu',
        component: ComponentCreator('/docs/1.3.0/advanced-guides-nlu','6fa'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/api-console-context',
        component: ComponentCreator('/docs/1.3.0/api-console-context','583'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-console-event',
        component: ComponentCreator('/docs/1.3.0/api-console-event','48c'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-console-event',
        component: ComponentCreator('/docs/1.3.0/api-console-event','746'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-consolecontext',
        component: ComponentCreator('/docs/1.3.0/api-consolecontext','1d3'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-context',
        component: ComponentCreator('/docs/1.3.0/api-context','f77'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-context',
        component: ComponentCreator('/docs/1.3.0/api-context','faf'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-event',
        component: ComponentCreator('/docs/1.3.0/api-event','6f8'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-event',
        component: ComponentCreator('/docs/1.3.0/api-event','f58'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-handler',
        component: ComponentCreator('/docs/1.3.0/api-handler','ab6'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-line-client',
        component: ComponentCreator('/docs/1.3.0/api-line-client','41b'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-line-context',
        component: ComponentCreator('/docs/1.3.0/api-line-context','060'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-line-event',
        component: ComponentCreator('/docs/1.3.0/api-line-event','569'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-linecontext',
        component: ComponentCreator('/docs/1.3.0/api-linecontext','a0d'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-lineevent',
        component: ComponentCreator('/docs/1.3.0/api-lineevent','bbd'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-messenger-client',
        component: ComponentCreator('/docs/1.3.0/api-messenger-client','919'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-messenger-context',
        component: ComponentCreator('/docs/1.3.0/api-messenger-context','f6d'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-messenger-event',
        component: ComponentCreator('/docs/1.3.0/api-messenger-event','051'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-messengercontext',
        component: ComponentCreator('/docs/1.3.0/api-messengercontext','bd9'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-messengerevent',
        component: ComponentCreator('/docs/1.3.0/api-messengerevent','74c'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-slack-client',
        component: ComponentCreator('/docs/1.3.0/api-slack-client','818'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-slack-context',
        component: ComponentCreator('/docs/1.3.0/api-slack-context','ae3'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-slack-event',
        component: ComponentCreator('/docs/1.3.0/api-slack-event','2f5'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-slackcontext',
        component: ComponentCreator('/docs/1.3.0/api-slackcontext','7f1'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-slackevent',
        component: ComponentCreator('/docs/1.3.0/api-slackevent','c02'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-telegram-client',
        component: ComponentCreator('/docs/1.3.0/api-telegram-client','2b0'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-telegram-context',
        component: ComponentCreator('/docs/1.3.0/api-telegram-context','4b9'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-telegram-event',
        component: ComponentCreator('/docs/1.3.0/api-telegram-event','50c'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-telegramcontext',
        component: ComponentCreator('/docs/1.3.0/api-telegramcontext','bb3'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-telegramevent',
        component: ComponentCreator('/docs/1.3.0/api-telegramevent','28f'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-viber-client',
        component: ComponentCreator('/docs/1.3.0/api-viber-client','876'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-viber-context',
        component: ComponentCreator('/docs/1.3.0/api-viber-context','c9b'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-viber-event',
        component: ComponentCreator('/docs/1.3.0/api-viber-event','d89'),
        exact: true,
        'sidebar': "version-1.3.0/api"
      },
      {
        path: '/docs/1.3.0/api-vibercontext',
        component: ComponentCreator('/docs/1.3.0/api-vibercontext','863'),
        exact: true
      },
      {
        path: '/docs/1.3.0/api-viberevent',
        component: ComponentCreator('/docs/1.3.0/api-viberevent','82d'),
        exact: true
      },
      {
        path: '/docs/1.3.0/channel-line-errors',
        component: ComponentCreator('/docs/1.3.0/channel-line-errors','29d'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-flex',
        component: ComponentCreator('/docs/1.3.0/channel-line-flex','266'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-handling-events',
        component: ComponentCreator('/docs/1.3.0/channel-line-handling-events','287'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-liff',
        component: ComponentCreator('/docs/1.3.0/channel-line-liff','465'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/1.3.0/channel-line-migrating-from-sdk','e68'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-notify',
        component: ComponentCreator('/docs/1.3.0/channel-line-notify','815'),
        exact: true
      },
      {
        path: '/docs/1.3.0/channel-line-rich-menu',
        component: ComponentCreator('/docs/1.3.0/channel-line-rich-menu','031'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-routing',
        component: ComponentCreator('/docs/1.3.0/channel-line-routing','9e2'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-sending-messages',
        component: ComponentCreator('/docs/1.3.0/channel-line-sending-messages','80f'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-line-setup',
        component: ComponentCreator('/docs/1.3.0/channel-line-setup','4b2'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-handling-events',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-handling-events','f38'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-handover-protocol','888'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-multi-page',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-multi-page','c98'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-persona',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-persona','e32'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-profile',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-profile','900'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-routing',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-routing','939'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-sending-messages','b7f'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-messenger-setup',
        component: ComponentCreator('/docs/1.3.0/channel-messenger-setup','7fb'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-slack-block-kit',
        component: ComponentCreator('/docs/1.3.0/channel-slack-block-kit','9d7'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-slack-handling-events',
        component: ComponentCreator('/docs/1.3.0/channel-slack-handling-events','3f1'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-slack-routing',
        component: ComponentCreator('/docs/1.3.0/channel-slack-routing','8f7'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-slack-sending-messages',
        component: ComponentCreator('/docs/1.3.0/channel-slack-sending-messages','b76'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-slack-setup',
        component: ComponentCreator('/docs/1.3.0/channel-slack-setup','563'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-slack-slash-command',
        component: ComponentCreator('/docs/1.3.0/channel-slack-slash-command','1cf'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-telegram-handling-events',
        component: ComponentCreator('/docs/1.3.0/channel-telegram-handling-events','bde'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-telegram-routing',
        component: ComponentCreator('/docs/1.3.0/channel-telegram-routing','52f'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/1.3.0/channel-telegram-sending-messages','94c'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-telegram-setup',
        component: ComponentCreator('/docs/1.3.0/channel-telegram-setup','f1d'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-viber-handling-events',
        component: ComponentCreator('/docs/1.3.0/channel-viber-handling-events','c29'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-viber-routing',
        component: ComponentCreator('/docs/1.3.0/channel-viber-routing','621'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-viber-sending-messages',
        component: ComponentCreator('/docs/1.3.0/channel-viber-sending-messages','239'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-viber-setup',
        component: ComponentCreator('/docs/1.3.0/channel-viber-setup','dd6'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/1.3.0/channel-whatsapp-handling-events','2d0'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-whatsapp-routing',
        component: ComponentCreator('/docs/1.3.0/channel-whatsapp-routing','246'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/1.3.0/channel-whatsapp-sending-messages','3a9'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/channel-whatsapp-setup',
        component: ComponentCreator('/docs/1.3.0/channel-whatsapp-setup','e00'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/commands',
        component: ComponentCreator('/docs/1.3.0/commands','bc7'),
        exact: true
      },
      {
        path: '/docs/1.3.0/console',
        component: ComponentCreator('/docs/1.3.0/console','25e'),
        exact: true
      },
      {
        path: '/docs/1.3.0/custom-connector',
        component: ComponentCreator('/docs/1.3.0/custom-connector','436'),
        exact: true
      },
      {
        path: '/docs/1.3.0/deployment',
        component: ComponentCreator('/docs/1.3.0/deployment','900'),
        exact: true
      },
      {
        path: '/docs/1.3.0/error-handling',
        component: ComponentCreator('/docs/1.3.0/error-handling','f65'),
        exact: true
      },
      {
        path: '/docs/1.3.0/getting-started',
        component: ComponentCreator('/docs/1.3.0/getting-started','a3f'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/getting-started',
        component: ComponentCreator('/docs/1.3.0/getting-started','c73'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/intents',
        component: ComponentCreator('/docs/1.3.0/intents','171'),
        exact: true
      },
      {
        path: '/docs/1.3.0/line',
        component: ComponentCreator('/docs/1.3.0/line','db0'),
        exact: true
      },
      {
        path: '/docs/1.3.0/messenger',
        component: ComponentCreator('/docs/1.3.0/messenger','875'),
        exact: true
      },
      {
        path: '/docs/1.3.0/middleware',
        component: ComponentCreator('/docs/1.3.0/middleware','54d'),
        exact: true
      },
      {
        path: '/docs/1.3.0/migrating-v1',
        component: ComponentCreator('/docs/1.3.0/migrating-v1','051'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/server',
        component: ComponentCreator('/docs/1.3.0/server','f96'),
        exact: true
      },
      {
        path: '/docs/1.3.0/session',
        component: ComponentCreator('/docs/1.3.0/session','af2'),
        exact: true
      },
      {
        path: '/docs/1.3.0/slack',
        component: ComponentCreator('/docs/1.3.0/slack','0ef'),
        exact: true
      },
      {
        path: '/docs/1.3.0/state',
        component: ComponentCreator('/docs/1.3.0/state','b02'),
        exact: true
      },
      {
        path: '/docs/1.3.0/telegram',
        component: ComponentCreator('/docs/1.3.0/telegram','580'),
        exact: true
      },
      {
        path: '/docs/1.3.0/testing',
        component: ComponentCreator('/docs/1.3.0/testing','133'),
        exact: true
      },
      {
        path: '/docs/1.3.0/the-basics-actions',
        component: ComponentCreator('/docs/1.3.0/the-basics-actions','ae4'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/the-basics-chain',
        component: ComponentCreator('/docs/1.3.0/the-basics-chain','c1d'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/the-basics-console-mode',
        component: ComponentCreator('/docs/1.3.0/the-basics-console-mode','bca'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/the-basics-context-event',
        component: ComponentCreator('/docs/1.3.0/the-basics-context-event','fbd'),
        exact: true
      },
      {
        path: '/docs/1.3.0/the-basics-errors',
        component: ComponentCreator('/docs/1.3.0/the-basics-errors','5fc'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/the-basics-routing',
        component: ComponentCreator('/docs/1.3.0/the-basics-routing','2da'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/the-basics-session',
        component: ComponentCreator('/docs/1.3.0/the-basics-session','15f'),
        exact: true,
        'sidebar': "version-1.3.0/docs"
      },
      {
        path: '/docs/1.3.0/troubleshooting',
        component: ComponentCreator('/docs/1.3.0/troubleshooting','c1b'),
        exact: true
      },
      {
        path: '/docs/1.3.0/viber',
        component: ComponentCreator('/docs/1.3.0/viber','a1c'),
        exact: true
      }
    ]
  },
  {
    path: '/docs/1.3.1',
    component: ComponentCreator('/docs/1.3.1','f7d'),
    routes: [
      {
        path: '/docs/1.3.1/advanced-guides-custom-server',
        component: ComponentCreator('/docs/1.3.1/advanced-guides-custom-server','891'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/advanced-guides-deployment',
        component: ComponentCreator('/docs/1.3.1/advanced-guides-deployment','a1f'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.3.1/advanced-guides-multi-channel','c1f'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.3.1/advanced-guides-multi-channel','3c5'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/advanced-guides-nlu',
        component: ComponentCreator('/docs/1.3.1/advanced-guides-nlu','599'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/api-console-context',
        component: ComponentCreator('/docs/1.3.1/api-console-context','aa4'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-console-event',
        component: ComponentCreator('/docs/1.3.1/api-console-event','da3'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-console-event',
        component: ComponentCreator('/docs/1.3.1/api-console-event','50e'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-consolecontext',
        component: ComponentCreator('/docs/1.3.1/api-consolecontext','951'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-context',
        component: ComponentCreator('/docs/1.3.1/api-context','a78'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-context',
        component: ComponentCreator('/docs/1.3.1/api-context','a45'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-event',
        component: ComponentCreator('/docs/1.3.1/api-event','0d3'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-event',
        component: ComponentCreator('/docs/1.3.1/api-event','3c9'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-handler',
        component: ComponentCreator('/docs/1.3.1/api-handler','59e'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-line-client',
        component: ComponentCreator('/docs/1.3.1/api-line-client','a2f'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-line-context',
        component: ComponentCreator('/docs/1.3.1/api-line-context','252'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-line-event',
        component: ComponentCreator('/docs/1.3.1/api-line-event','d30'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-linecontext',
        component: ComponentCreator('/docs/1.3.1/api-linecontext','768'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-lineevent',
        component: ComponentCreator('/docs/1.3.1/api-lineevent','15e'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-messenger-client',
        component: ComponentCreator('/docs/1.3.1/api-messenger-client','882'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-messenger-context',
        component: ComponentCreator('/docs/1.3.1/api-messenger-context','b8d'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-messenger-event',
        component: ComponentCreator('/docs/1.3.1/api-messenger-event','0f1'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-messengercontext',
        component: ComponentCreator('/docs/1.3.1/api-messengercontext','9e2'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-messengerevent',
        component: ComponentCreator('/docs/1.3.1/api-messengerevent','731'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-slack-client',
        component: ComponentCreator('/docs/1.3.1/api-slack-client','88b'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-slack-context',
        component: ComponentCreator('/docs/1.3.1/api-slack-context','768'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-slack-event',
        component: ComponentCreator('/docs/1.3.1/api-slack-event','61e'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-slackcontext',
        component: ComponentCreator('/docs/1.3.1/api-slackcontext','4e0'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-slackevent',
        component: ComponentCreator('/docs/1.3.1/api-slackevent','bfd'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-telegram-client',
        component: ComponentCreator('/docs/1.3.1/api-telegram-client','a0e'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-telegram-context',
        component: ComponentCreator('/docs/1.3.1/api-telegram-context','c6e'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-telegram-event',
        component: ComponentCreator('/docs/1.3.1/api-telegram-event','6fa'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-telegramcontext',
        component: ComponentCreator('/docs/1.3.1/api-telegramcontext','a5e'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-telegramevent',
        component: ComponentCreator('/docs/1.3.1/api-telegramevent','f63'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-viber-client',
        component: ComponentCreator('/docs/1.3.1/api-viber-client','301'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-viber-context',
        component: ComponentCreator('/docs/1.3.1/api-viber-context','84a'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-viber-event',
        component: ComponentCreator('/docs/1.3.1/api-viber-event','2c6'),
        exact: true,
        'sidebar': "version-1.3.1/api"
      },
      {
        path: '/docs/1.3.1/api-vibercontext',
        component: ComponentCreator('/docs/1.3.1/api-vibercontext','463'),
        exact: true
      },
      {
        path: '/docs/1.3.1/api-viberevent',
        component: ComponentCreator('/docs/1.3.1/api-viberevent','cc2'),
        exact: true
      },
      {
        path: '/docs/1.3.1/channel-line-errors',
        component: ComponentCreator('/docs/1.3.1/channel-line-errors','e1f'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-flex',
        component: ComponentCreator('/docs/1.3.1/channel-line-flex','687'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-handling-events',
        component: ComponentCreator('/docs/1.3.1/channel-line-handling-events','716'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-liff',
        component: ComponentCreator('/docs/1.3.1/channel-line-liff','1ae'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/1.3.1/channel-line-migrating-from-sdk','7e7'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-notify',
        component: ComponentCreator('/docs/1.3.1/channel-line-notify','103'),
        exact: true
      },
      {
        path: '/docs/1.3.1/channel-line-rich-menu',
        component: ComponentCreator('/docs/1.3.1/channel-line-rich-menu','081'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-routing',
        component: ComponentCreator('/docs/1.3.1/channel-line-routing','50f'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-sending-messages',
        component: ComponentCreator('/docs/1.3.1/channel-line-sending-messages','15e'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-line-setup',
        component: ComponentCreator('/docs/1.3.1/channel-line-setup','da0'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-handling-events',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-handling-events','edc'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-handover-protocol','52f'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-multi-page',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-multi-page','ab6'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-persona',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-persona','7a0'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-profile',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-profile','e94'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-routing',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-routing','9c8'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-sending-messages','e7b'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-messenger-setup',
        component: ComponentCreator('/docs/1.3.1/channel-messenger-setup','dc1'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-slack-block-kit',
        component: ComponentCreator('/docs/1.3.1/channel-slack-block-kit','8f6'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-slack-handling-events',
        component: ComponentCreator('/docs/1.3.1/channel-slack-handling-events','936'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-slack-routing',
        component: ComponentCreator('/docs/1.3.1/channel-slack-routing','b24'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-slack-sending-messages',
        component: ComponentCreator('/docs/1.3.1/channel-slack-sending-messages','fca'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-slack-setup',
        component: ComponentCreator('/docs/1.3.1/channel-slack-setup','87b'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-slack-slash-command',
        component: ComponentCreator('/docs/1.3.1/channel-slack-slash-command','79c'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-telegram-handling-events',
        component: ComponentCreator('/docs/1.3.1/channel-telegram-handling-events','721'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-telegram-routing',
        component: ComponentCreator('/docs/1.3.1/channel-telegram-routing','f64'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/1.3.1/channel-telegram-sending-messages','b9c'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-telegram-setup',
        component: ComponentCreator('/docs/1.3.1/channel-telegram-setup','304'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-viber-handling-events',
        component: ComponentCreator('/docs/1.3.1/channel-viber-handling-events','8d1'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-viber-routing',
        component: ComponentCreator('/docs/1.3.1/channel-viber-routing','c16'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-viber-sending-messages',
        component: ComponentCreator('/docs/1.3.1/channel-viber-sending-messages','8eb'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-viber-setup',
        component: ComponentCreator('/docs/1.3.1/channel-viber-setup','e8d'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/1.3.1/channel-whatsapp-handling-events','16e'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-whatsapp-routing',
        component: ComponentCreator('/docs/1.3.1/channel-whatsapp-routing','897'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/1.3.1/channel-whatsapp-sending-messages','227'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/channel-whatsapp-setup',
        component: ComponentCreator('/docs/1.3.1/channel-whatsapp-setup','f05'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/commands',
        component: ComponentCreator('/docs/1.3.1/commands','a3c'),
        exact: true
      },
      {
        path: '/docs/1.3.1/console',
        component: ComponentCreator('/docs/1.3.1/console','584'),
        exact: true
      },
      {
        path: '/docs/1.3.1/custom-connector',
        component: ComponentCreator('/docs/1.3.1/custom-connector','4d9'),
        exact: true
      },
      {
        path: '/docs/1.3.1/deployment',
        component: ComponentCreator('/docs/1.3.1/deployment','b76'),
        exact: true
      },
      {
        path: '/docs/1.3.1/error-handling',
        component: ComponentCreator('/docs/1.3.1/error-handling','240'),
        exact: true
      },
      {
        path: '/docs/1.3.1/getting-started',
        component: ComponentCreator('/docs/1.3.1/getting-started','ae4'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/getting-started',
        component: ComponentCreator('/docs/1.3.1/getting-started','7b7'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/intents',
        component: ComponentCreator('/docs/1.3.1/intents','4f0'),
        exact: true
      },
      {
        path: '/docs/1.3.1/line',
        component: ComponentCreator('/docs/1.3.1/line','ddb'),
        exact: true
      },
      {
        path: '/docs/1.3.1/messenger',
        component: ComponentCreator('/docs/1.3.1/messenger','c47'),
        exact: true
      },
      {
        path: '/docs/1.3.1/middleware',
        component: ComponentCreator('/docs/1.3.1/middleware','22c'),
        exact: true
      },
      {
        path: '/docs/1.3.1/migrating-v1',
        component: ComponentCreator('/docs/1.3.1/migrating-v1','1f5'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/server',
        component: ComponentCreator('/docs/1.3.1/server','d3d'),
        exact: true
      },
      {
        path: '/docs/1.3.1/session',
        component: ComponentCreator('/docs/1.3.1/session','143'),
        exact: true
      },
      {
        path: '/docs/1.3.1/slack',
        component: ComponentCreator('/docs/1.3.1/slack','e50'),
        exact: true
      },
      {
        path: '/docs/1.3.1/state',
        component: ComponentCreator('/docs/1.3.1/state','174'),
        exact: true
      },
      {
        path: '/docs/1.3.1/telegram',
        component: ComponentCreator('/docs/1.3.1/telegram','6d4'),
        exact: true
      },
      {
        path: '/docs/1.3.1/testing',
        component: ComponentCreator('/docs/1.3.1/testing','9e5'),
        exact: true
      },
      {
        path: '/docs/1.3.1/the-basics-actions',
        component: ComponentCreator('/docs/1.3.1/the-basics-actions','626'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/the-basics-chain',
        component: ComponentCreator('/docs/1.3.1/the-basics-chain','9ac'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/the-basics-console-mode',
        component: ComponentCreator('/docs/1.3.1/the-basics-console-mode','5b5'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/the-basics-context-event',
        component: ComponentCreator('/docs/1.3.1/the-basics-context-event','fdc'),
        exact: true
      },
      {
        path: '/docs/1.3.1/the-basics-errors',
        component: ComponentCreator('/docs/1.3.1/the-basics-errors','5fc'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/the-basics-routing',
        component: ComponentCreator('/docs/1.3.1/the-basics-routing','0ad'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/the-basics-session',
        component: ComponentCreator('/docs/1.3.1/the-basics-session','c77'),
        exact: true,
        'sidebar': "version-1.3.1/docs"
      },
      {
        path: '/docs/1.3.1/troubleshooting',
        component: ComponentCreator('/docs/1.3.1/troubleshooting','196'),
        exact: true
      },
      {
        path: '/docs/1.3.1/viber',
        component: ComponentCreator('/docs/1.3.1/viber','b64'),
        exact: true
      }
    ]
  },
  {
    path: '/docs/1.4',
    component: ComponentCreator('/docs/1.4','a88'),
    routes: [
      {
        path: '/docs/1.4/advanced-guides-custom-server',
        component: ComponentCreator('/docs/1.4/advanced-guides-custom-server','c38'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/advanced-guides-deployment',
        component: ComponentCreator('/docs/1.4/advanced-guides-deployment','6bb'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.4/advanced-guides-multi-channel','a05'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/1.4/advanced-guides-multi-channel','1ce'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/advanced-guides-nlu',
        component: ComponentCreator('/docs/1.4/advanced-guides-nlu','8b3'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/api-console-context',
        component: ComponentCreator('/docs/1.4/api-console-context','e42'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-console-event',
        component: ComponentCreator('/docs/1.4/api-console-event','f0a'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-console-event',
        component: ComponentCreator('/docs/1.4/api-console-event','e0c'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-consolecontext',
        component: ComponentCreator('/docs/1.4/api-consolecontext','ec8'),
        exact: true
      },
      {
        path: '/docs/1.4/api-context',
        component: ComponentCreator('/docs/1.4/api-context','205'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-context',
        component: ComponentCreator('/docs/1.4/api-context','034'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-event',
        component: ComponentCreator('/docs/1.4/api-event','a17'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-event',
        component: ComponentCreator('/docs/1.4/api-event','e4f'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-handler',
        component: ComponentCreator('/docs/1.4/api-handler','001'),
        exact: true
      },
      {
        path: '/docs/1.4/api-line-client',
        component: ComponentCreator('/docs/1.4/api-line-client','30f'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-line-context',
        component: ComponentCreator('/docs/1.4/api-line-context','755'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-line-event',
        component: ComponentCreator('/docs/1.4/api-line-event','305'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-linecontext',
        component: ComponentCreator('/docs/1.4/api-linecontext','642'),
        exact: true
      },
      {
        path: '/docs/1.4/api-lineevent',
        component: ComponentCreator('/docs/1.4/api-lineevent','ac5'),
        exact: true
      },
      {
        path: '/docs/1.4/api-messenger-client',
        component: ComponentCreator('/docs/1.4/api-messenger-client','77c'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-messenger-context',
        component: ComponentCreator('/docs/1.4/api-messenger-context','926'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-messenger-event',
        component: ComponentCreator('/docs/1.4/api-messenger-event','d11'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-messengercontext',
        component: ComponentCreator('/docs/1.4/api-messengercontext','e68'),
        exact: true
      },
      {
        path: '/docs/1.4/api-messengerevent',
        component: ComponentCreator('/docs/1.4/api-messengerevent','b70'),
        exact: true
      },
      {
        path: '/docs/1.4/api-slack-client',
        component: ComponentCreator('/docs/1.4/api-slack-client','991'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-slack-context',
        component: ComponentCreator('/docs/1.4/api-slack-context','19b'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-slack-event',
        component: ComponentCreator('/docs/1.4/api-slack-event','506'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-slackcontext',
        component: ComponentCreator('/docs/1.4/api-slackcontext','a4f'),
        exact: true
      },
      {
        path: '/docs/1.4/api-slackevent',
        component: ComponentCreator('/docs/1.4/api-slackevent','fdb'),
        exact: true
      },
      {
        path: '/docs/1.4/api-telegram-client',
        component: ComponentCreator('/docs/1.4/api-telegram-client','f22'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-telegram-context',
        component: ComponentCreator('/docs/1.4/api-telegram-context','6f8'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-telegram-event',
        component: ComponentCreator('/docs/1.4/api-telegram-event','b88'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-telegramcontext',
        component: ComponentCreator('/docs/1.4/api-telegramcontext','0bc'),
        exact: true
      },
      {
        path: '/docs/1.4/api-telegramevent',
        component: ComponentCreator('/docs/1.4/api-telegramevent','884'),
        exact: true
      },
      {
        path: '/docs/1.4/api-viber-client',
        component: ComponentCreator('/docs/1.4/api-viber-client','de7'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-viber-context',
        component: ComponentCreator('/docs/1.4/api-viber-context','1c3'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-viber-event',
        component: ComponentCreator('/docs/1.4/api-viber-event','fcb'),
        exact: true,
        'sidebar': "version-1.4/api"
      },
      {
        path: '/docs/1.4/api-vibercontext',
        component: ComponentCreator('/docs/1.4/api-vibercontext','e2d'),
        exact: true
      },
      {
        path: '/docs/1.4/api-viberevent',
        component: ComponentCreator('/docs/1.4/api-viberevent','d50'),
        exact: true
      },
      {
        path: '/docs/1.4/channel-line-errors',
        component: ComponentCreator('/docs/1.4/channel-line-errors','4a4'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-flex',
        component: ComponentCreator('/docs/1.4/channel-line-flex','016'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-handling-events',
        component: ComponentCreator('/docs/1.4/channel-line-handling-events','174'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-liff',
        component: ComponentCreator('/docs/1.4/channel-line-liff','bc2'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/1.4/channel-line-migrating-from-sdk','874'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-notify',
        component: ComponentCreator('/docs/1.4/channel-line-notify','f94'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-rich-menu',
        component: ComponentCreator('/docs/1.4/channel-line-rich-menu','de3'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-routing',
        component: ComponentCreator('/docs/1.4/channel-line-routing','e51'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-sending-messages',
        component: ComponentCreator('/docs/1.4/channel-line-sending-messages','ef0'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-line-setup',
        component: ComponentCreator('/docs/1.4/channel-line-setup','bf2'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-handling-events',
        component: ComponentCreator('/docs/1.4/channel-messenger-handling-events','64d'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/1.4/channel-messenger-handover-protocol','a29'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-multi-page',
        component: ComponentCreator('/docs/1.4/channel-messenger-multi-page','057'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-persona',
        component: ComponentCreator('/docs/1.4/channel-messenger-persona','a8d'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-profile',
        component: ComponentCreator('/docs/1.4/channel-messenger-profile','9c5'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-routing',
        component: ComponentCreator('/docs/1.4/channel-messenger-routing','bd7'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/1.4/channel-messenger-sending-messages','95b'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-messenger-setup',
        component: ComponentCreator('/docs/1.4/channel-messenger-setup','5e4'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-slack-block-kit',
        component: ComponentCreator('/docs/1.4/channel-slack-block-kit','e24'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-slack-handling-events',
        component: ComponentCreator('/docs/1.4/channel-slack-handling-events','0dd'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-slack-routing',
        component: ComponentCreator('/docs/1.4/channel-slack-routing','abc'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-slack-sending-messages',
        component: ComponentCreator('/docs/1.4/channel-slack-sending-messages','94e'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-slack-setup',
        component: ComponentCreator('/docs/1.4/channel-slack-setup','5cd'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-slack-slash-command',
        component: ComponentCreator('/docs/1.4/channel-slack-slash-command','17c'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-telegram-handling-events',
        component: ComponentCreator('/docs/1.4/channel-telegram-handling-events','257'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-telegram-routing',
        component: ComponentCreator('/docs/1.4/channel-telegram-routing','e6a'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/1.4/channel-telegram-sending-messages','aa8'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-telegram-setup',
        component: ComponentCreator('/docs/1.4/channel-telegram-setup','f44'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-viber-handling-events',
        component: ComponentCreator('/docs/1.4/channel-viber-handling-events','cdc'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-viber-routing',
        component: ComponentCreator('/docs/1.4/channel-viber-routing','472'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-viber-sending-messages',
        component: ComponentCreator('/docs/1.4/channel-viber-sending-messages','86f'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-viber-setup',
        component: ComponentCreator('/docs/1.4/channel-viber-setup','1b2'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/1.4/channel-whatsapp-handling-events','385'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-whatsapp-routing',
        component: ComponentCreator('/docs/1.4/channel-whatsapp-routing','5a4'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/1.4/channel-whatsapp-sending-messages','819'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/channel-whatsapp-setup',
        component: ComponentCreator('/docs/1.4/channel-whatsapp-setup','2d7'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/commands',
        component: ComponentCreator('/docs/1.4/commands','e8b'),
        exact: true
      },
      {
        path: '/docs/1.4/console',
        component: ComponentCreator('/docs/1.4/console','06d'),
        exact: true
      },
      {
        path: '/docs/1.4/custom-connector',
        component: ComponentCreator('/docs/1.4/custom-connector','053'),
        exact: true
      },
      {
        path: '/docs/1.4/deployment',
        component: ComponentCreator('/docs/1.4/deployment','b2d'),
        exact: true
      },
      {
        path: '/docs/1.4/error-handling',
        component: ComponentCreator('/docs/1.4/error-handling','c77'),
        exact: true
      },
      {
        path: '/docs/1.4/getting-started',
        component: ComponentCreator('/docs/1.4/getting-started','d61'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/getting-started',
        component: ComponentCreator('/docs/1.4/getting-started','b2e'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/intents',
        component: ComponentCreator('/docs/1.4/intents','3e9'),
        exact: true
      },
      {
        path: '/docs/1.4/line',
        component: ComponentCreator('/docs/1.4/line','ab7'),
        exact: true
      },
      {
        path: '/docs/1.4/messenger',
        component: ComponentCreator('/docs/1.4/messenger','9a8'),
        exact: true
      },
      {
        path: '/docs/1.4/middleware',
        component: ComponentCreator('/docs/1.4/middleware','172'),
        exact: true
      },
      {
        path: '/docs/1.4/migrating-v1',
        component: ComponentCreator('/docs/1.4/migrating-v1','430'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/server',
        component: ComponentCreator('/docs/1.4/server','cdc'),
        exact: true
      },
      {
        path: '/docs/1.4/session',
        component: ComponentCreator('/docs/1.4/session','b68'),
        exact: true
      },
      {
        path: '/docs/1.4/slack',
        component: ComponentCreator('/docs/1.4/slack','202'),
        exact: true
      },
      {
        path: '/docs/1.4/state',
        component: ComponentCreator('/docs/1.4/state','9d5'),
        exact: true
      },
      {
        path: '/docs/1.4/telegram',
        component: ComponentCreator('/docs/1.4/telegram','730'),
        exact: true
      },
      {
        path: '/docs/1.4/testing',
        component: ComponentCreator('/docs/1.4/testing','e70'),
        exact: true
      },
      {
        path: '/docs/1.4/the-basics-actions',
        component: ComponentCreator('/docs/1.4/the-basics-actions','8f3'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/the-basics-chain',
        component: ComponentCreator('/docs/1.4/the-basics-chain','087'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/the-basics-console-mode',
        component: ComponentCreator('/docs/1.4/the-basics-console-mode','c75'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/the-basics-context-event',
        component: ComponentCreator('/docs/1.4/the-basics-context-event','328'),
        exact: true
      },
      {
        path: '/docs/1.4/the-basics-errors',
        component: ComponentCreator('/docs/1.4/the-basics-errors','e75'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/the-basics-routing',
        component: ComponentCreator('/docs/1.4/the-basics-routing','1ea'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/the-basics-session',
        component: ComponentCreator('/docs/1.4/the-basics-session','85c'),
        exact: true,
        'sidebar': "version-1.4/docs"
      },
      {
        path: '/docs/1.4/troubleshooting',
        component: ComponentCreator('/docs/1.4/troubleshooting','48f'),
        exact: true
      },
      {
        path: '/docs/1.4/viber',
        component: ComponentCreator('/docs/1.4/viber','deb'),
        exact: true
      }
    ]
  },
  {
    path: '/docs/next',
    component: ComponentCreator('/docs/next','074'),
    routes: [
      {
        path: '/docs/next/',
        component: ComponentCreator('/docs/next/','2eb'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/advanced-guides-custom-server',
        component: ComponentCreator('/docs/next/advanced-guides-custom-server','c5d'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/advanced-guides-deployment',
        component: ComponentCreator('/docs/next/advanced-guides-deployment','04d'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/next/advanced-guides-multi-channel','cc8'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/advanced-guides-nlu',
        component: ComponentCreator('/docs/next/advanced-guides-nlu','ecc'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/api-console-context',
        component: ComponentCreator('/docs/next/api-console-context','fcd'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-console-event',
        component: ComponentCreator('/docs/next/api-console-event','cc6'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-context',
        component: ComponentCreator('/docs/next/api-context','876'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-event',
        component: ComponentCreator('/docs/next/api-event','9d6'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-line-client',
        component: ComponentCreator('/docs/next/api-line-client','54a'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-line-context',
        component: ComponentCreator('/docs/next/api-line-context','0d8'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-line-event',
        component: ComponentCreator('/docs/next/api-line-event','bdc'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-messenger-client',
        component: ComponentCreator('/docs/next/api-messenger-client','d9b'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-messenger-context',
        component: ComponentCreator('/docs/next/api-messenger-context','4ac'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-messenger-event',
        component: ComponentCreator('/docs/next/api-messenger-event','517'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-slack-client',
        component: ComponentCreator('/docs/next/api-slack-client','3e8'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-slack-context',
        component: ComponentCreator('/docs/next/api-slack-context','fc1'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-slack-event',
        component: ComponentCreator('/docs/next/api-slack-event','ffa'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-telegram-client',
        component: ComponentCreator('/docs/next/api-telegram-client','b2d'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-telegram-context',
        component: ComponentCreator('/docs/next/api-telegram-context','086'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-telegram-event',
        component: ComponentCreator('/docs/next/api-telegram-event','d15'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-viber-client',
        component: ComponentCreator('/docs/next/api-viber-client','094'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-viber-context',
        component: ComponentCreator('/docs/next/api-viber-context','5da'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/api-viber-event',
        component: ComponentCreator('/docs/next/api-viber-event','6c0'),
        exact: true,
        'sidebar': "api"
      },
      {
        path: '/docs/next/channel-line-errors',
        component: ComponentCreator('/docs/next/channel-line-errors','9db'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-flex',
        component: ComponentCreator('/docs/next/channel-line-flex','402'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-handling-events',
        component: ComponentCreator('/docs/next/channel-line-handling-events','a7f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-liff',
        component: ComponentCreator('/docs/next/channel-line-liff','2bb'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/next/channel-line-migrating-from-sdk','305'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-notify',
        component: ComponentCreator('/docs/next/channel-line-notify','d6f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-rich-menu',
        component: ComponentCreator('/docs/next/channel-line-rich-menu','5d3'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-routing',
        component: ComponentCreator('/docs/next/channel-line-routing','915'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-sending-messages',
        component: ComponentCreator('/docs/next/channel-line-sending-messages','fdd'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-line-setup',
        component: ComponentCreator('/docs/next/channel-line-setup','989'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-handling-events',
        component: ComponentCreator('/docs/next/channel-messenger-handling-events','1d7'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/next/channel-messenger-handover-protocol','883'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-multi-page',
        component: ComponentCreator('/docs/next/channel-messenger-multi-page','424'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-persona',
        component: ComponentCreator('/docs/next/channel-messenger-persona','bfd'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-profile',
        component: ComponentCreator('/docs/next/channel-messenger-profile','d34'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-routing',
        component: ComponentCreator('/docs/next/channel-messenger-routing','672'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/next/channel-messenger-sending-messages','09b'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-messenger-setup',
        component: ComponentCreator('/docs/next/channel-messenger-setup','900'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-slack-block-kit',
        component: ComponentCreator('/docs/next/channel-slack-block-kit','af9'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-slack-handling-events',
        component: ComponentCreator('/docs/next/channel-slack-handling-events','acf'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-slack-routing',
        component: ComponentCreator('/docs/next/channel-slack-routing','9be'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-slack-sending-messages',
        component: ComponentCreator('/docs/next/channel-slack-sending-messages','2c1'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-slack-setup',
        component: ComponentCreator('/docs/next/channel-slack-setup','66f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-slack-slash-command',
        component: ComponentCreator('/docs/next/channel-slack-slash-command','e7f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-telegram-handling-events',
        component: ComponentCreator('/docs/next/channel-telegram-handling-events','da7'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-telegram-routing',
        component: ComponentCreator('/docs/next/channel-telegram-routing','dd4'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/next/channel-telegram-sending-messages','22c'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-telegram-setup',
        component: ComponentCreator('/docs/next/channel-telegram-setup','734'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-viber-handling-events',
        component: ComponentCreator('/docs/next/channel-viber-handling-events','00c'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-viber-routing',
        component: ComponentCreator('/docs/next/channel-viber-routing','42e'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-viber-sending-messages',
        component: ComponentCreator('/docs/next/channel-viber-sending-messages','cf3'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-viber-setup',
        component: ComponentCreator('/docs/next/channel-viber-setup','a76'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/next/channel-whatsapp-handling-events','8ac'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-whatsapp-routing',
        component: ComponentCreator('/docs/next/channel-whatsapp-routing','af8'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/next/channel-whatsapp-sending-messages','910'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/channel-whatsapp-setup',
        component: ComponentCreator('/docs/next/channel-whatsapp-setup','4fb'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/migrating-v1',
        component: ComponentCreator('/docs/next/migrating-v1','77d'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/the-basics-actions',
        component: ComponentCreator('/docs/next/the-basics-actions','199'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/the-basics-chain',
        component: ComponentCreator('/docs/next/the-basics-chain','0fa'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/the-basics-console-mode',
        component: ComponentCreator('/docs/next/the-basics-console-mode','c86'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/the-basics-context-event',
        component: ComponentCreator('/docs/next/the-basics-context-event','116'),
        exact: true
      },
      {
        path: '/docs/next/the-basics-errors',
        component: ComponentCreator('/docs/next/the-basics-errors','0ad'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/the-basics-routing',
        component: ComponentCreator('/docs/next/the-basics-routing','c77'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/next/the-basics-session',
        component: ComponentCreator('/docs/next/the-basics-session','5ba'),
        exact: true,
        'sidebar': "docs"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','0c2'),
    routes: [
      {
        path: '/docs/advanced-guides-custom-server',
        component: ComponentCreator('/docs/advanced-guides-custom-server','b6f'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/advanced-guides-deployment',
        component: ComponentCreator('/docs/advanced-guides-deployment','b63'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/advanced-guides-multi-channel','940'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/advanced-guides-multi-channel',
        component: ComponentCreator('/docs/advanced-guides-multi-channel','017'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/advanced-guides-nlu',
        component: ComponentCreator('/docs/advanced-guides-nlu','d38'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/api-console-context',
        component: ComponentCreator('/docs/api-console-context','2b9'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-console-event',
        component: ComponentCreator('/docs/api-console-event','9b8'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-console-event',
        component: ComponentCreator('/docs/api-console-event','be4'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-consolecontext',
        component: ComponentCreator('/docs/api-consolecontext','b77'),
        exact: true
      },
      {
        path: '/docs/api-context',
        component: ComponentCreator('/docs/api-context','f63'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-context',
        component: ComponentCreator('/docs/api-context','58e'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-event',
        component: ComponentCreator('/docs/api-event','afd'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-event',
        component: ComponentCreator('/docs/api-event','f63'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-handler',
        component: ComponentCreator('/docs/api-handler','29d'),
        exact: true
      },
      {
        path: '/docs/api-line-client',
        component: ComponentCreator('/docs/api-line-client','0b7'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-line-context',
        component: ComponentCreator('/docs/api-line-context','0fa'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-line-event',
        component: ComponentCreator('/docs/api-line-event','c54'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-linecontext',
        component: ComponentCreator('/docs/api-linecontext','e41'),
        exact: true
      },
      {
        path: '/docs/api-lineevent',
        component: ComponentCreator('/docs/api-lineevent','cd8'),
        exact: true
      },
      {
        path: '/docs/api-messenger-client',
        component: ComponentCreator('/docs/api-messenger-client','5e5'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-messenger-context',
        component: ComponentCreator('/docs/api-messenger-context','04d'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-messenger-event',
        component: ComponentCreator('/docs/api-messenger-event','53e'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-messengercontext',
        component: ComponentCreator('/docs/api-messengercontext','677'),
        exact: true
      },
      {
        path: '/docs/api-messengerevent',
        component: ComponentCreator('/docs/api-messengerevent','e69'),
        exact: true
      },
      {
        path: '/docs/api-slack-client',
        component: ComponentCreator('/docs/api-slack-client','dc1'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-slack-context',
        component: ComponentCreator('/docs/api-slack-context','39a'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-slack-event',
        component: ComponentCreator('/docs/api-slack-event','e9f'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-slackcontext',
        component: ComponentCreator('/docs/api-slackcontext','08d'),
        exact: true
      },
      {
        path: '/docs/api-slackevent',
        component: ComponentCreator('/docs/api-slackevent','f0f'),
        exact: true
      },
      {
        path: '/docs/api-telegram-client',
        component: ComponentCreator('/docs/api-telegram-client','2c4'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-telegram-context',
        component: ComponentCreator('/docs/api-telegram-context','c38'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-telegram-event',
        component: ComponentCreator('/docs/api-telegram-event','993'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-telegramcontext',
        component: ComponentCreator('/docs/api-telegramcontext','f38'),
        exact: true
      },
      {
        path: '/docs/api-telegramevent',
        component: ComponentCreator('/docs/api-telegramevent','a38'),
        exact: true
      },
      {
        path: '/docs/api-viber-client',
        component: ComponentCreator('/docs/api-viber-client','e97'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-viber-context',
        component: ComponentCreator('/docs/api-viber-context','332'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-viber-event',
        component: ComponentCreator('/docs/api-viber-event','3af'),
        exact: true,
        'sidebar': "version-1.5/api"
      },
      {
        path: '/docs/api-vibercontext',
        component: ComponentCreator('/docs/api-vibercontext','f6c'),
        exact: true
      },
      {
        path: '/docs/api-viberevent',
        component: ComponentCreator('/docs/api-viberevent','3b5'),
        exact: true
      },
      {
        path: '/docs/channel-line-errors',
        component: ComponentCreator('/docs/channel-line-errors','582'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-flex',
        component: ComponentCreator('/docs/channel-line-flex','4b8'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-handling-events',
        component: ComponentCreator('/docs/channel-line-handling-events','32a'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-liff',
        component: ComponentCreator('/docs/channel-line-liff','ea4'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-migrating-from-sdk',
        component: ComponentCreator('/docs/channel-line-migrating-from-sdk','8af'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-notify',
        component: ComponentCreator('/docs/channel-line-notify','b2e'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-rich-menu',
        component: ComponentCreator('/docs/channel-line-rich-menu','afa'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-routing',
        component: ComponentCreator('/docs/channel-line-routing','a67'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-sending-messages',
        component: ComponentCreator('/docs/channel-line-sending-messages','f3e'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-line-setup',
        component: ComponentCreator('/docs/channel-line-setup','eee'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-handling-events',
        component: ComponentCreator('/docs/channel-messenger-handling-events','893'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-handover-protocol',
        component: ComponentCreator('/docs/channel-messenger-handover-protocol','f9f'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-multi-page',
        component: ComponentCreator('/docs/channel-messenger-multi-page','cfb'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-persona',
        component: ComponentCreator('/docs/channel-messenger-persona','723'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-profile',
        component: ComponentCreator('/docs/channel-messenger-profile','e23'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-routing',
        component: ComponentCreator('/docs/channel-messenger-routing','216'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-sending-messages',
        component: ComponentCreator('/docs/channel-messenger-sending-messages','5e3'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-messenger-setup',
        component: ComponentCreator('/docs/channel-messenger-setup','fdb'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-slack-block-kit',
        component: ComponentCreator('/docs/channel-slack-block-kit','14b'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-slack-handling-events',
        component: ComponentCreator('/docs/channel-slack-handling-events','9f3'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-slack-routing',
        component: ComponentCreator('/docs/channel-slack-routing','4ee'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-slack-sending-messages',
        component: ComponentCreator('/docs/channel-slack-sending-messages','322'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-slack-setup',
        component: ComponentCreator('/docs/channel-slack-setup','4e8'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-slack-slash-command',
        component: ComponentCreator('/docs/channel-slack-slash-command','ec5'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-telegram-handling-events',
        component: ComponentCreator('/docs/channel-telegram-handling-events','e0e'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-telegram-routing',
        component: ComponentCreator('/docs/channel-telegram-routing','d97'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-telegram-sending-messages',
        component: ComponentCreator('/docs/channel-telegram-sending-messages','7e3'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-telegram-setup',
        component: ComponentCreator('/docs/channel-telegram-setup','3aa'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-viber-handling-events',
        component: ComponentCreator('/docs/channel-viber-handling-events','3b9'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-viber-routing',
        component: ComponentCreator('/docs/channel-viber-routing','f51'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-viber-sending-messages',
        component: ComponentCreator('/docs/channel-viber-sending-messages','f9b'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-viber-setup',
        component: ComponentCreator('/docs/channel-viber-setup','b6c'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-whatsapp-handling-events',
        component: ComponentCreator('/docs/channel-whatsapp-handling-events','ec0'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-whatsapp-routing',
        component: ComponentCreator('/docs/channel-whatsapp-routing','7ce'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-whatsapp-sending-messages',
        component: ComponentCreator('/docs/channel-whatsapp-sending-messages','f82'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/channel-whatsapp-setup',
        component: ComponentCreator('/docs/channel-whatsapp-setup','4fe'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/commands',
        component: ComponentCreator('/docs/commands','168'),
        exact: true
      },
      {
        path: '/docs/console',
        component: ComponentCreator('/docs/console','3a3'),
        exact: true
      },
      {
        path: '/docs/custom-connector',
        component: ComponentCreator('/docs/custom-connector','373'),
        exact: true
      },
      {
        path: '/docs/deployment',
        component: ComponentCreator('/docs/deployment','c98'),
        exact: true
      },
      {
        path: '/docs/error-handling',
        component: ComponentCreator('/docs/error-handling','a2e'),
        exact: true
      },
      {
        path: '/docs/getting-started',
        component: ComponentCreator('/docs/getting-started','97b'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/getting-started',
        component: ComponentCreator('/docs/getting-started','774'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/intents',
        component: ComponentCreator('/docs/intents','a36'),
        exact: true
      },
      {
        path: '/docs/line',
        component: ComponentCreator('/docs/line','62d'),
        exact: true
      },
      {
        path: '/docs/messenger',
        component: ComponentCreator('/docs/messenger','b93'),
        exact: true
      },
      {
        path: '/docs/middleware',
        component: ComponentCreator('/docs/middleware','291'),
        exact: true
      },
      {
        path: '/docs/migrating-v1',
        component: ComponentCreator('/docs/migrating-v1','780'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/server',
        component: ComponentCreator('/docs/server','864'),
        exact: true
      },
      {
        path: '/docs/session',
        component: ComponentCreator('/docs/session','95b'),
        exact: true
      },
      {
        path: '/docs/slack',
        component: ComponentCreator('/docs/slack','70b'),
        exact: true
      },
      {
        path: '/docs/state',
        component: ComponentCreator('/docs/state','91d'),
        exact: true
      },
      {
        path: '/docs/telegram',
        component: ComponentCreator('/docs/telegram','ff7'),
        exact: true
      },
      {
        path: '/docs/testing',
        component: ComponentCreator('/docs/testing','a6d'),
        exact: true
      },
      {
        path: '/docs/the-basics-actions',
        component: ComponentCreator('/docs/the-basics-actions','d21'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/the-basics-chain',
        component: ComponentCreator('/docs/the-basics-chain','bcc'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/the-basics-console-mode',
        component: ComponentCreator('/docs/the-basics-console-mode','785'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/the-basics-context-event',
        component: ComponentCreator('/docs/the-basics-context-event','4ab'),
        exact: true
      },
      {
        path: '/docs/the-basics-errors',
        component: ComponentCreator('/docs/the-basics-errors','519'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/the-basics-routing',
        component: ComponentCreator('/docs/the-basics-routing','8f6'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/the-basics-session',
        component: ComponentCreator('/docs/the-basics-session','94d'),
        exact: true,
        'sidebar': "version-1.5/docs"
      },
      {
        path: '/docs/troubleshooting',
        component: ComponentCreator('/docs/troubleshooting','9c0'),
        exact: true
      },
      {
        path: '/docs/viber',
        component: ComponentCreator('/docs/viber','9c0'),
        exact: true
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
