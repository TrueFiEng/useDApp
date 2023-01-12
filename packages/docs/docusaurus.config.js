// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'useDApp',
  tagline: 'Ethereum 🤝 React',
  url: 'https://usedapp.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'TrueFiEng', // Usually your GitHub org/user name.
  projectName: 'useDApp', // Usually your repo name.

  plugins: [
    './plugins/webpack-plugin.js',
    './plugins/mdx-anchor-scroll.js',
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        indexBlog: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/TrueFiEng/useDApp/tree/master/packages/docs/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/TrueFiEng/useDApp/tree/master/packages/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'useDApp',
        logo: {
          alt: 'Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            href: 'https://usedapp.io/',
            label: 'About'
          },
          {
            href: 'https://github.com/TrueFiEng/useDApp/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'useDApp',
            items: [
              {
                label: 'About',
                to: 'https://usedapp.io/'
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/TrueFiEng/useDApp/',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/cSSmtdq7jr',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Example app',
                to: 'https://example.usedapp.io/',
              },
              
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TrueFiEng. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
