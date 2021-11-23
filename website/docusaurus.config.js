// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
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
  customFields:
    /** @type {import('./CustomFields.d.ts').CustomField} */
    ({
      gaGtag: true,
      disableHeaderTitle: false,
      translationRecruitingLink: 'https://crowdin.com/project/bottender',
    }),
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/Yoctol/bottender/edit/master/website/docs/',
          path: 'docs',
          sidebarPath: 'sidebars.json',
        },
        blog: {
          path: 'blog',
        },
        theme: {
          customCss: [require.resolve('./src/css/customTheme.css')],
        },
      }),
    ],
  ],
  plugins: [],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
    }),
};

module.exports = config;
