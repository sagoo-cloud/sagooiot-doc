const LATEST_VERSION_LABEL = 'professional';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'SagooIoT沙果物联网系统',
  tagline: '企业级开源物联网平台系统',
  deploymentBranch: '旨在提供高性能、低成本、易用的企业级物联网系统',
  favicon: '/img/favicon.ico',
  url: 'https://iotdoc.sagoo.cn',
  baseUrl: '/',
  trailingSlash: false,
  organizationName: 'sagoo',
  projectName: 'xinjiayu',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
  // 多语言配置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },
  // https://www.docusaurus.cn/blog/releases/3.6#docusaurus-faster
  future: {
    experimental_faster: true,
  },
  presets: [
    [
      'classic',
      {
        // Will be passed to @docusaurus/plugin-content-docs (false to disable)
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          lastVersion: 'current',
          // https://docusaurus.io/docs/versioning
          versions: {
            current: {
              label: LATEST_VERSION_LABEL,
            },
          },
          // 编辑当前页面的配置
          editUrl: 'https://github.com/sagoo-cloud/sagooiot-doc/main',
          // 显示更新时间和作者
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        // Will be passed to @docusaurus/plugin-content-blog (false to disable)
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/sagoo-cloud/sagooiot-doc/main',
        },
        // Will be passed to @docusaurus/plugin-content-pages (false to disable)
        // pages: {},
        // Will be passed to @docusaurus/theme-classic.
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    [
      'ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      } satisfies IdealImageOptions,
    ],
  ],
  themeConfig: {
    metadata: [
      {name: 'keywords', content: 'iot,sagoo,物联网,golang,开源,简单,大数据,多协议,海量数据'},
      {name: 'description', content: '沙果物联网系统是开源免费的物联网一站式系统，多协议支持，Modbus和主流PLC等多种协议，支持数据采集、公式计算、定时控制、自动控制、异常报警、流量监控、Web组态、远程调试等功能，适用于大部分物联网和工业互联网应用场景。'},
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
      },
    },
    navbar: {
      title: 'SagooIoT',
      logo: {
        alt: 'SagooIoT',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
        },
        {
          to: '/docs/base/introduce',
          sidebarId: 'mainSidebar',
          position: 'right',
          label: '用户手册',
          items: [
            {
              label: '系统指南',
              to: '/docs/base/introduce',
            },
            {
              label: '安装部署',
              to: '/docs/install/deploy',
            },
            {
              label: '物联管理',
              to: '/docs/iot/device/instance',
            },
            {
              label: '规则引擎',
              to: '/docs/iot/ruleEngine/instance',
            },
            {
              label: '数据大屏',
              to: '/docs/screen/pageGuide',
            },
            {
              label: '视频监控',
              to: '/docs/media/start',
            },
            {
              label: '组态管理',
              to: '/docs/iot/configure/start',
            },
            {
              label: '设备接入',
              to: '/docs/access',
            }
          ],
        },
        {
          to: '/develop/base',
          label: '开发手册',
          position: 'right',
          sidebarId: 'developSidebar',
          items: [
            {
              label: '程序介绍',
              to: '/develop/base/introduce',
            },
            {
              label: '编译与部署',
              to: '/develop/compile/environment',
            },
            {
              label: '消息协议',
              to:'/develop/protocol/mqtt'
            },
            {
              label: '插件开发',
              to:'/develop/plugin/start'
            },
            {
              label: '前端开发',
              to:'/develop/front/introduce'
            },
            {
              label: 'OpenAPIs',
              to:'/develop/openapi/intro'
            }
          ]
        },
        {
          to: '/cases/introduction',
          label: '项目案例',
          position: 'right',
          sidebarId: 'casesSidebar',
        },
        {to: '/blog', label: '博客', position: 'right'},
        {
          to: '/join/intro',
          label: '加入我们',
          position: 'right',
          sidebarId: `joinSidebar`,
        },
        {
          href: 'https://support.qq.com/product/595720',
          label: '问题反馈',
          position: 'right',
        },
      ],
    },
    // toc目录层级显示设置
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
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
    // 代码块配置
    prism: {
      theme: prismThemes.okaidia,
      darkTheme: prismThemes.dracula,
      defaultLanguage: 'go',
      additionalLanguages: ['bash', 'javascript', 'toml', 'ini'], // 添加语言
      // 默认支持的语言 https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L23
      // 默认支持的语言 "markup","jsx","tsx","swift","kotlin","objectivec","js-extras","reason","rust","graphql","yaml","go","cpp","markdown","python","json"
    },
    // 搜索配置
    algolia: {
      // The application ID provided by Algolia
      appId: 'JACUNPDXOT',

      // Public API key: it is safe to commit it
      apiKey: '1cfd8dcfb33b11d56d817e64e9300122',

      indexName: 'SagooIOT',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: 'https://hm.baidu.com/hm.js?b8d6166a7eddaa8fe0a45f63a1a82066',
      async: true,
    },
  ],
};

export default config;
