import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SagooIoT沙果物联网系统',
  tagline: '企业级开源物联网平台系统',
  deploymentBranch: '旨在提供高性能、低成本、易用的企业级物联网系统',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://iotdoc.sagoo.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sagoo', // Usually your GitHub org/user name.
  projectName: 'xinjiayu', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  themes: ['@docusaurus/theme-mermaid'],
  // In order for Mermaid code blocks in Markdown to work,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en'],
  // },
  scripts: [
    {
      src: 'https://hm.baidu.com/hm.js?b8d6166a7eddaa8fe0a45f63a1a82066',
      async: true
    },
    // {
    //     async: true,
    //     defer: true,
    //     src:"http://127.0.0.1:8080/api/application/embed?protocol=http&host=127.0.0.1:8080&token=1266627a551bb5ac",
    // }
],
presets: [
  [
    'classic',
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://gitee.com/sagoo-cloud/sagooiot-doc/',
          path: 'docs',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://gitee.com/sagoo-cloud/sagooiot-doc/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
            'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'develop',
        path: 'develop',
        routeBasePath: 'develop',
        sidebarPath: './sidebarsDevelop.js',
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cases',
        path: 'cases',
        routeBasePath: 'cases',
        sidebarPath: './sidebarsCases.js',
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'join',
        path: 'join',
        routeBasePath: 'join',
        sidebarPath: './sidebarsJoin.js',
        // ... other options
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'keywords', content: 'iot,sagoo,物联网,golang,开源,简单,大数据,多协议,海量数据'},
        {name: 'description', content: '沙果物联网系统是开源免费的物联网一站式系统，多协议支持，Modbus和主流PLC等多种协议，支持数据采集、公式计算、定时控制、自动控制、异常报警、流量监控、Web组态、远程调试等功能，适用于大部分物联网和工业互联网应用场景。'},
      ],
      algolia: {
        // The application ID provided by Algolia
        appId: 'JACUNPDXOT',
        position: 'left',

        // Public API key: it is safe to commit it
        apiKey: '1cfd8dcfb33b11d56d817e64e9300122',

        indexName: 'SagooIOT',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
      navbar: {
        title: 'SagooIoT',
        logo: {
          alt: 'sagooiot',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'right',
            label: '用户手册',
          },
          {
            to: '/develop/intro',
            label: '开发手册',
            position: 'right',
            activeBaseRegex: `/develop/`,
          },
          {
            to: '/cases/introduction',
            label: '项目案例',
            position: 'right',
            activeBaseRegex: `/cases/`,
          },
          {to: '/blog', label: '博客', position: 'right'},
          {
            to: '/join/intro',
            label: '加入我们',
            position: 'right',
            activeBaseRegex: `/join/`,
          },
          {
            href: 'https://support.qq.com/product/595720',
            label: '问题反馈',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '用户手册',
                to: '/docs/base/introduce',
              },
              {
                label: '开发手册',
                to: '/develop/intro',
              },
              {
                label: '项目案例',
                to: '/cases/introduction',
              },
            ],
          },
          {
            title: '常用技术',
            items: [
              {
                label: 'GoFrame',
                href: 'https://goframe.org/display/gf',
              },
              {
                label: 'Vue-Next-Admin',
                href: 'https://gitee.com/lyt-top/vue-next-admin',
              },
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/sagoo-cloud/sagooiot',
              },
              {
                label: 'Gitee',
                href: 'https://gitee.com/sagoo-cloud',
              },
            ],
          },
          {
            title: '联系我们',
            items: [
              {
                label: '客服电话：400 115 1569',
                href: '#',
              },
              {
                label: 'QQ群：686637608',
                href: '#',
              },
              {
                label: '微信公众号：sagoocn',
                href: '#',
              },
            ],
          },
        ],
        logo: {
          alt: 'Sagoo Logo',
          src: '/img/sagoo-logo.png',
          href: 'https://sagoo.cn',
        },
        copyright: `Copyright © ${new Date().getFullYear()} Sagoo Cloud Technology Co., Ltd
. Built with Docusaurus. <br/><a href="http://beian.miit.gov.cn/" target="_blank" >辽ICP备20007259号-1</a> `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
