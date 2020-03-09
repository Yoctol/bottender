/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const users = require('./data/users');

const siteConfig = {
  title: 'Bottender', // Title for your website.
  tagline: 'A framework for building conversational user interfaces.',
  url: 'https://bottender.js.org', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'bottender',
  organizationName: 'yoctol',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // The CNAME for your website. It will go into a CNAME file when your site is built.
  cname: 'bottender.js.org',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'getting-started', label: 'Docs' },
    { doc: 'api-context', label: 'API' },
    { blog: true, label: 'Blog' },
    { page: 'users', label: 'Users' },
    {
      href: 'https://github.com/Yoctol/bottender/tree/master/examples',
      label: 'Examples',
    },
    { href: 'https://github.com/yoctol/bottender', label: 'GitHub' },
  ],

  /* path to images for header/footer */
  headerIcon: 'img/bottender.svg',
  footerIcon: '',
  favicon: 'img/favicon-192x192.png',

  /* Colors for website */
  colors: {
    primaryColor: '#0A1C30',
    secondaryColor: '#122E4D',
  },

  stylesheets: [
    'https://fonts.googleapis.com/css?family=Montserrat:700|Roboto&display=swap',
  ],

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: '© 2019 - PRESENT YOCTOL.AI ALL RIGHTS RESERVED.',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'atom-one-dark',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-blocks-buttons.js',
    '/js/sw.js',
  ],

  // Google Analytics tracking ID to track page views.
  gaTrackingId: 'UA-70309045-11',

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // URL for editing docs, usage example: editUrl + 'en/doc1.md'.
  editUrl: 'https://github.com/Yoctol/bottender/edit/master/docs/',

  // The users array.
  users,

  // Open Graph and Twitter card images.
  ogImage: 'img/og-image.png',
  twitter: true,
  twitterUsername: 'bottenderjs',
  twitterImage: 'img/og-image.png',

  disableHeaderTitle: false,

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: false,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  // Information for Algolia search integration.
  algolia: {
    apiKey: '3498a488684b0324b9d56808fad17a33',
    indexName: 'bottender',
    algoliaOptions: {
      facetFilters: ['language:LANGUAGE', 'version:VERSION'],
    },
  },

  translationRecruitingLink: 'https://crowdin.com/project/bottender',
};

module.exports = siteConfig;
