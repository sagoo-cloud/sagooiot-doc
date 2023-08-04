import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

const ogDescription =
  '基于golang开发的物联网系统, 开源、简单、大数据、多协议、海量数据。'
const ogImage = '/imgs/logo.svg'
const ogTitle = 'SagooIOT'
const ogUrl = 'http://iotdoc.sagoo.cn/'

export default defineConfig({
  title: 'SagooIOT',
  description: '沙果物联网系统是开源免费的物联网一站式系统，多协议支持，Modbus和主流PLC等多种协议，支持数据采集、公式计算、定时控制、自动控制、异常报警、流量监控、Web组态、远程调试等功能，适用于大部分物联网和工业互联网应用场景。',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/imgs/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: 'SagooIOT' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    [
      'script',
      {
        src: '',
        'data-site': '',
        'data-spa': '',
        defer: ''
      }
    ],
    [
      'script', {}, `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?b8d6166a7eddaa8fe0a45f63a1a82066";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
            `
    ]
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/imgs/logo.svg',

    editLink: {
      text: '为此页提供修改建议',
      pattern: 'https://github.com/sagoo-cloud/sagooiot-doc'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sagoo-cloud/sagooiot' }
    ],

    algolia: {
      appId: 'JACUNPDXOT',
      apiKey: '1cfd8dcfb33b11d56d817e64e9300122',
      indexName: 'SagooIOT',
      placeholder: '请输入关键词',
      buttonText: '搜索'
    },

    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
      '/develop/': sidebarDevelop(),
      '/cases/': sidebarCases()

    },

  },

})


function nav() {
  return [
    { text: '使用手册', link: '/guide/what-is-sagooiot', activeMatch: '/guide/' },
    { text: '开发手册', link: '/develop/readme', activeMatch: '/develop/' },
    { text: '项目案例', link: '/cases/introduction', activeMatch: '/cases/' },
    { text: '问题反馈', link: 'https://support.qq.com/product/595720'},
    {
      text: "相关链接",
      items: [
        {
          text: 'Github',
          link: 'https://github.com/orgs/sagoo-cloud'
        },
        {
          text: 'Gitee',
          link: 'https://gitee.com/sagoo-cloud'
        },
        {
          text: 'GoFrame',
          link: 'https://goframe.org'
        },
        {
          text: 'Vue-next-admin',
          link: 'https://gitee.com/lyt-top/vue-next-admin'
        }
      ]
    }
  ]
}

function sidebarGuide() {
  return [
    {
      text: '指南',
      collapsed: false,
      items: [
        { text: '系统介绍', link: '/guide/base/introduce' },
        { text: '页面展示', link: '/guide/base/demopic' },
        { text: '快速开始', link: '/guide/start/quick' },
        { text: '更新记录', link: '/guide/base/history' },

      ]
    },
    {
      text: '系统安装',
      collapsed: false,
      items: [
        { text: '部署说明', link: '/guide/start/deploy' },
        { text: '基础环境安装', link: '/guide/start/install' },
        { text: 'SagooIOT安装', link: '/guide/start/sagooiot-install' },

      ]
    },
    {
      text: '设备接入',
      collapsed: false,
      items: [
        { text: '接入流程', link: '/guide/device_access/flow' },
        { text: '创建产品', link: '/guide/device_access/product' },
        { text: '配置物模型', link: '/guide/device_access/setup_tsl' },
        { text: '创建设备', link: '/guide/device_access/device' },
        { text: '接入设备', link: '/guide/device_access/access' },
        { text: '测试设备接入', link: '/guide/device_access/mqtt' },

      ]
    },
    {
      text: '设备管理',
      collapsed: false,
      items: [
        {
          text: '名词解释',
          link: '/guide/device/start'
        },
        {
          text: '产品管理',
          link: '/guide/device/product'
        },
        {
          text: '设备管理',
          link: '/guide/device/instance'
        },
        {
          text: '物模型说明',
          link: '/guide/device/tsl'
        }
      ]
    },
    {
      text: '网络组件',
      collapsed: false,
      items: [
        {
          text: '通道管理',
          link: '/guide/network/tunnel'
        },
        {
          text: '服务管理',
          link: '/guide/network/server'
        }
      ]
    },
    {
      text: '数据大屏',
      collapsed: false,
      items: [
        {
          text: '功能介绍',
          link: '/guide/screen/pageGuide'
        },
        {
          text: '设置介绍',
          link: '/guide/screen/globalSetting'
        },
        {
          text: '常见问题',
          link: '/guide/screen/faq'
        }
      ]
    },
    {
      text: '视频监控',
      collapsed: false,
      items: [
        {
          text: '简介',
          link: '/guide/media/start'
        },
        {
          text: 'rtmp接入',
          link: '/guide/media/rtmp'
        },
        {
          text: 'GB28181接入',
          link: '/guide/media/gb28181'
        },
        {
          text: '其它',
          link: '/guide/media/other'
        }
      ]
    },
    {
      text: '组态设计',
      collapsed: false,
      items: [
        {
          text: '介绍',
          link: '/guide/configure/start'
        },
        {
          text: '组态图设计',
          link: '/guide/configure/diagram'
        },
        {
          text: '目录管理',
          link: '/guide/configure/folder'
        },
        {
          text: '数据绑定',
          link: '/guide/configure/point'
        }
      ]
    },
    {
      text: '规则引擎',
      collapsed: false,
      items: [
        {
          text: '基础知识',
          link: '/guide/ruleEngine/based'
        },
        {
          text: '规则引擎',
          link: '/guide/ruleEngine/instance'
        },
        {
          text: '接入设备',
          link: '/guide/ruleEngine/access'
        },
        {
          text: '数据转发',
          link: '/guide/ruleEngine/data_forwarding'
        }
      ]
    },
    {
      text: '通知服务',
      collapsed: false,
      items: [
        {
          text: '通知配置',
          link: '/guide/notice/instance'
        },
        {
          text: '模版配置',
          link: '/guide/notice/access'
        }
      ]
    },
    {
      text: '告警中心',
      collapsed: false,
      items: [
        {
          text: '告警说明',
          link: '/guide/alarm/instance'
        },
        {
          text: '告警配置',
          link: '/guide/alarm/config'
        }
      ]
    },
    {
      text: '数据中心',
      collapsed: false,
      items: [
        {
          text: '数据源管理',
          link: '/guide/datahub/source'
        },
        {
          text: '数据建模',
          link: '/guide/datahub/modeling'
        }
      ]
    },
    {
      text: '系统管理',
      collapsed: false,
      items: [
        {
          text: '权限配置',
          link: '/guide/system/authorize_config'
        }

      ]
    },
    {
      text: '周边服务',
      collapsed: false,
      items: [
        {
          text: '指数计算管理',
          link: '/guide/datahub/totalIndex'
        },
        {
          text: '大屏协同工具',
          link: '/guide/extended/lsc'
        },
        {
          text: 'Modbus云网关',
          link: '/guide/extended/modbus'
        },
        {
          text: 'ICE104云网关',
          link: '/guide/extended/ice104'
        },
        {
          text: '本地设备端网关',
          link: '/guide/extended/gw'
        }

      ]
    },

    {
      text: '其它',
      collapsed: false,
      items: [
        {
          text: '相关工具',
          link: '/guide/other/tools'
        },
        {
          text: '定时任务设置',
          link: '/guide/other/cron'
        },
        {
          text: 'yaml格式说法',
          link: '/guide/other/yaml'
        }
      ]
    },
    {
      text: '常见问题',
      collapsed: false,
      items: [
        {
          text: '安装与运行常见问题',
          link: '/guide/faq/install'
        },
        {
          text: '网络组件常见问题',
          link: '/guide/faq/network'
        },
        {
          text: '数据中心常见问题',
          link: '/guide/faq/datahub'
        },
        {
          text: '其它常见问题',
          link: '/guide/faq/other'
        }
      ]
    }
  ]
}

function sidebarDevelop() {
  return [
    {
      text: '程序介绍',
      items: [
        { text: '概要说明', link: '/develop/base/introduce' },
        { text: '开发规范', link: '/develop/base/standard' },
        { text: '开发说明', link: '/develop/base/explain' },
      ]
    },
    {
      text: '编译与部署',
      items: [
        { text: '开发环境', link: '/develop/compile/environment' },
        { text: '源码编译', link: '/develop/compile/build' },
        { text: '服务部署', link: '/develop/compile/deploy' },
        { text: 'Docker编译', link: '/develop/compile/docker' },

      ]
    },
    {
      text: '系统开发',
      items: [
        { text: '权限开发', link: '/develop/system/authorize' },
        { text: '数据中心', link: '/develop/system/datahub' },
      ]
    },
    {
      text: '业务开发',
      items: [
        { text: '开发说明', link: '/develop/business/introduce' },
        { text: '快速开始', link: '/develop/business/start' },
      ]
    },
    {
      text: '协议开发',
      items: [
        { text: 'MQTT协议', link: '/develop/protocol/mqtt' },
        { text: 'Modbus开发', link: '/develop/protocol/modbus' },
      ]
    },
    {
      text: '插件开发',
      items: [
        { text: '插件介绍', link: '/develop/plugin/hashicorp' },
        { text: '开发说明', link: '/develop/plugin/start' },
        { text: '协议插件', link: '/develop/plugin/protocol' },
        { text: '通知插件', link: '/develop/plugin/notice' },
      ]
    },
    {
      text: '代码生成',
      items: [
        { text: '数据库DAO生成', link: '/develop/gencode/dao' },
        { text: '一键生成', link: '/develop/gencode/gen' },
      ]
    },
    {
      text: '前端开发',
      items: [
        { text: '前端介绍', link: '/develop/front/introduce' },
        { text: '增加新页面', link: '/develop/front/addPage' },
        { text: '编译与部署', link: '/develop/front/build' },
      ]
    },
    {
      text: 'OpenAPIs',
      items: [
        { text: 'AKSK鉴权', link: '/develop/openapi/start' },
        { text: 'Access Key', link: '/develop/openapi/safety' },
        { text: '调用示例', link: '/develop/openapi/example' },

      ]
    },
  ]
}

function sidebarCases(){
  return [
    {
      text: '项目案例',
      items: [
        { text: '介绍', link: '/cases/introduction' },
        { text: '电力运维', link: '/cases/power' },
        { text: '智慧园区', link: '/cases/park' },
        { text: '供热运维', link: '/cases/heating' }
      ]
    }
  ]
}
