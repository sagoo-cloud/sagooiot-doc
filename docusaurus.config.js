import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SagooIoT',
  tagline: '开源物联网系统',
  deploymentBranch: '旨在提供高性能、低成本、易用的企业级物联网系统。',
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
    {
      // 聊天机器人脚本
      src: "https://share.fastgpt.in/js/iframe.js",
      id: "chatbot-iframe",
      attributes: {
        "data-bot-src": "https://share.fastgpt.in/chat/share?shareId=23i99g2me4sqghuqwh3xrzlr",
        "data-default-open": "true",
        "data-drag": "true",
        "data-open-icon": "data:image/svg+xml;base64,PHN2ZyB0PSIxNjkwNTMyNzg1NjY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQxMzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTEyIDMyQzI0Ny4wNCAzMiAzMiAyMjQgMzIgNDY0QTQxMC4yNCA0MTAuMjQgMCAwIDAgMTcyLjQ4IDc2OEwxNjAgOTY1LjEyYTI1LjI4IDI1LjI4IDAgMCAwIDM5LjA0IDIyLjRsMTY4LTExMkE1MjguNjQgNTI4LjY0IDAgMCAwIDUxMiA4OTZjMjY0Ljk2IDAgNDgwLTE5MiA0ODAtNDMyUzc3Ni45NiAzMiA1MTIgMzJ6IG0yNDQuOCA0MTZsLTM2MS42IDMwMS43NmExMi40OCAxMi40OCAwIDAgMS0xOS44NC0xMi40OGw1OS4yLTIzMy45MmgtMTYwYTEyLjQ4IDEyLjQ4IDAgMCAxLTcuMzYtMjMuMzZsMzYxLjYtMzAxLjc2YTEyLjQ4IDEyLjQ4IDAgMCAxIDE5Ljg0IDEyLjQ4bC01OS4yIDIzMy45MmgxNjBhMTIuNDggMTIuNDggMCAwIDEgOCAyMi4wOHoiIGZpbGw9IiM0ZTgzZmQiIHAtaWQ9IjQxMzMiPjwvcGF0aD48L3N2Zz4=",
        "data-close-icon": "data:image/svg+xml;base64,PHN2ZyB0PSIxNjkwNTM1NDQxNTI2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYzNjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTEyIDEwMjRBNTEyIDUxMiAwIDEgMSA1MTIgMGE1MTIgNTEyIDAgMCAxIDAgMTAyNHpNMzA1Ljk1NjU3MSAzNzAuMzk1NDI5TDQ0Ny40ODggNTEyIDMwNS45NTY1NzEgNjUzLjYwNDU3MWE0NS41NjggNDUuNTY4IDAgMSAwIDY0LjQzODg1OCA2NC40Mzg4NThMNTEyIDU3Ni41MTJsMTQxLjYwNDU3MSAxNDEuNTMxNDI5YTQ1LjU2OCA0NS41NjggMCAwIDAgNjQuNDM4ODU4LTY0LjQzODg1OEw1NzYuNTEyIDUxMmwxNDEuNTMxNDI5LTE0MS42MDQ1NzFhNDUuNTY4IDQ1LjU2OCAwIDEgMC02NC40Mzg4NTgtNjQuNDM4ODU4TDUxMiA0NDcuNDg4IDM3MC4zOTU0MjkgMzA1Ljk1NjU3MWE0NS41NjggNDUuNTY4IDAgMCAwLTY0LjQzODg1OCA2NC40Mzg4NTh6IiBmaWxsPSIjNGU4M2ZkIiBwLWlkPSI2MzY4Ij48L3BhdGg+PC9zdmc+",
        "defer": "true"
      }
    }
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
            href: 'https://support.qq.com/product/595720',
            label: '问题反馈',
            position: 'right',
          },
          {
            href: 'https://github.com/sagoo-cloud/sagooiot',
            label: 'GitHub',
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
                to: '/docs/intro',
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
            title: '友情链接',
            items: [
              {
                label: 'm7s 流媒体服务',
                href: 'https://m7s.live',
              },
              {
                label: 'OpenGW',
                href: 'http://www.opengw.cn',
              },
              {
                label: 'GoView',
                href: 'https://www.mtruning.club',
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
