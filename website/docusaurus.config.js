module.exports = {
  title: 'Bottender',
  tagline: 'A framework for building conversational user interfaces.',
  url: 'https://bottender.js.org',
  baseUrl: '/',
  organizationName: 'yoctol',
  projectName: 'bottender',
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-blocks-buttons.js',
    '/js/sw.js',
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Montserrat:700|Roboto&display=swap',
    '/css/custom.css',
    '/css/code-blocks-buttons.css',
  ],
  favicon: 'img/favicon-192x192.png',
  customFields: {
    gaGtag: true,
    users: [
      {
        caption: 'Creator',
        image: '/img/users/creator.svg',
        infoLink: 'https://yoctol.ai/creator/',
        pinned: true,
      },
      {
        caption: 'Seeker',
        image: '/img/users/seeker.svg',
        infoLink: 'https://yoctol.ai/seeker/',
        pinned: true,
      },
      {
        caption: 'Yoctol.AI',
        image: '/img/users/yoctol.ai.svg',
        infoLink: 'https://yoctol.ai/',
        pinned: true,
      },
      {
        caption: 'Leader of Lunch',
        image: '/img/users/lol.png',
        infoLink: 'https://github.com/Yoctol/leader-of-lunch',
        pinned: true,
      },
      {
        caption: 'Agricola Score Calculator',
        image: '/img/users/agricolaScore.png',
        infoLink:
          'https://medium.com/@EtrexKuo/line-bot-%E8%BE%B2%E5%AE%B6%E6%A8%82%E8%A8%88%E7%AE%97%E6%A9%9F-c0450b5aca3f',
        pinned: true,
      },
      {
        caption: 'Taiwan ABL Games',
        image: '/img/users/abl.png',
        infoLink: 'https://github.com/louis70109/Taiwan-ABL-games',
        pinned: true,
      },
      {
        caption: 'Todo Bot',
        image: '/img/users/todoBot.jpg',
        infoLink: 'https://github.com/HcwXd/messenger-todo-bot',
        pinned: true,
      },
      {
        caption: '正在直播 LINE BOT',
        image:
          'https://obs.line-scdn.net/0hDQKKdJiUG352MjMGKo1kKVdvEBxFUAV1VFRTHFE1QktbB1lGSQBRTFdgTEwLBQ98SldcGT0yTRtbClkhQhFVS1dhQ0cOCw/f256x256',
        infoLink:
          'https://www.notion.so/hilezi/d7ac6acf3ee94029a245be3df3c9f5fe',
        pinned: true,
      },
    ],
    disableHeaderTitle: false,
    translationRecruitingLink: 'https://crowdin.com/project/bottender',
  },
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/Yoctol/bottender/edit/master/docs/',
          path: '../docs',
          sidebarPath: '../website/sidebars.json',
        },
        blog: {
          path: 'blog',
        },
        theme: {
          customCss: [require.resolve('./src/css/customTheme.css')],
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'Bottender',
      items: [
        {
          to: 'docs/',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/api-context',
          label: 'API',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/users',
          label: 'Users',
          position: 'left',
        },
        {
          href: 'https://github.com/Yoctol/bottender/tree/master/examples',
          label: 'Examples',
          position: 'left',
        },
        {
          href: 'https://github.com/yoctol/bottender',
          label: 'GitHub',
          position: 'left',
        },
        {
          label: 'Version',
          to: 'docs',
          position: 'right',
          items: [
            {
              label: '1.5',
              to: 'docs/',
              activeBaseRegex:
                'docs/(?!0.15.17|1.0.5|1.1.0|1.2.0|1.3.0|1.3.1|1.4|1.5|next)',
            },
            {
              label: '1.4',
              to: 'docs/1.4/',
            },
            {
              label: '1.3.1',
              to: 'docs/1.3.1/',
            },
            {
              label: '1.3.0',
              to: 'docs/1.3.0/',
            },
            {
              label: '1.2.0',
              to: 'docs/1.2.0/',
            },
            {
              label: '1.1.0',
              to: 'docs/1.1.0/',
            },
            {
              label: '1.0.5',
              to: 'docs/1.0.5/',
            },
            {
              label: '0.15.17',
              to: 'docs/0.15.17/',
            },
            {
              label: 'Main/Unreleased',
              to: 'docs/next/',
              activeBaseRegex: 'docs/next/(?!support|team|resources)',
            },
          ],
        },
      ],
    },
    image: 'img/og-image.png',
    footer: {
      logo: {
        src: 'img/bottender.svg',
      },
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              to: 'https://twitter.com/bottenderjs',
            },
          ],
        },
      ],
      copyright: '© 2019 - PRESENT YOCTOL.AI ALL RIGHTS RESERVED.',
    },
    algolia: {
      apiKey: '3498a488684b0324b9d56808fad17a33',
      indexName: 'bottender',
      algoliaOptions: {
        facetFilters: ['language:LANGUAGE', 'version:VERSION'],
      },
    },
    gtag: {
      trackingID: 'UA-70309045-11',
    },
  },
};
