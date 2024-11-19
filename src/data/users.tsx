
import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'adminui'
  | 'frontui'
  | 'library'
  | 'micro'
  | 'cloudnative'
  | 'i18n'


const Users: User[] = [
  {
    title: 'GFast',
    description: '基于GoFrame 2.x+Vue3+Element Plus+MySQL、PostgreSQL等技术的管理系统，拥有后台基础管理模块，吸取数千用户建议的代码生成工具，全部自主研发，功能完整可控的插件，自定义表单及符合国人审批习惯的流程设计让您拥有众多零代码能力。',
    preview: require('./showcase/gfast.png'),
    website: 'https://www.g-fast.cn/',
    source: 'https://github.com/tiger1103/gfast',
    tags: ['opensource','favorite','adminui','product'],
  },
  {
    title: 'Letga',
    description: '基于 GoFrame 和 AntDesign 的中后台管理系统。Letga 集成了通用的中后台基础功能组件，是一款规范化、易扩展、体验佳的企业级开源系统。',
    preview: require('./showcase/letga.png'),
    website: 'https://github.com/lgcgo/letga-server',
    source: 'https://github.com/lgcgo/letga-server',
    tags: ['opensource','adminui'],
  },
  {
    title: 'DMicro',
    description: 'DMicro是一个高效、可扩展且简单易用的微服务框架。包含drpc,dserver等组件。',
    preview: require('./showcase/dmicro.png'),
    website: 'https://dmicro.vprix.com/#/',
    source: 'https://github.com/osgochina/dmicro',
    tags: ['opensource','micro'],
  },
  {
    title: 'Jupiter',
    description: 'Jupiter is a governance-oriented microservice framework, which is being used for years at Douyu.',
    preview: require('./showcase/jupiter.png'),
    website: 'https://jupiter.douyu.com/',
    source: 'https://github.com/douyu/jupiter',
    tags: ['opensource','micro'],
  },
  {
    title: 'HotGo',
    description: 'HotGo是一个基于 Vue 和 GoFrame 2.0 开发的全栈前后端分离的开发基础平台和移动应用平台，集成jwt鉴权，动态路由，动态菜单，casbin鉴权，消息队列，定时任务等功能，提供多种常用场景文件，让您把更多时间专注在业务开发上。 ',
    preview: require('./showcase/hotgo.png'),
    website: 'https://hotgo.facms.cn/admin',
    source: 'https://github.com/bufanyun/hotgo',
    tags: ['opensource','favorite','adminui','product'],
  },
  {
    title: 'Bifrost',
    description: 'Bifrost ---- 面向生产环境的 MySQL,MariaDB,kafka 同步到Redis,MongoDB,ClickHouse,StarRocks,Doris,Kafka等服务的异构中间件。',
    preview: require('./showcase/bifrost.png'),
    website: 'https://www.xbifrost.com/',
    source: 'https://github.com/brokercap/Bifrost',
    tags: ['opensource'],
  },
  {
    title: 'DNSLog-GO',
    description: 'DNSLog-GO 是一款golang编写的监控 DNS 解析记录的工具，自带Web界面。',
    preview: require('./showcase/dnslog-go.png'),
    website: 'https://github.com/lanyi1998/DNSlog-GO',
    source: 'https://github.com/lanyi1998/DNSlog-GO',
    tags: ['opensource','frontui'],
  },
  {
    title: 'Nemo',
    description: 'Nemo是用来进行自动化信息收集的一个简单平台，通过集成常用的信息收集工具和技术，实现对内网及互联网资产信息的自动收集，提高隐患排查和渗透测试的工作效率。',
    preview: require('./showcase/nemo.png'),
    website: 'https://github.com/hanc00l/nemo_go',
    source: 'https://github.com/hanc00l/nemo_go',
    tags: ['opensource','adminui'],
  },
  {
    title: 'OpenSCRM',
    description: 'OpenSCRM是一套基于Go和React的高质量企业微信私域流量管理系统 。遵守Apache2.0协议，全网唯一免费商用。企业微信、私域流量、SCRM。',
    preview: require('./showcase/openscrm.png'),
    website: 'https://github.com/openscrm/api-server',
    source: 'https://github.com/openscrm/api-server',
    tags: ['opensource','adminui'],
  },
  {
    title: 'Magma',
    description: 'Platform for building access networks and modular network services.',
    preview: require('./showcase/magma.png'),
    website: 'https://magmacore.org/',
    source: 'https://github.com/magma/magma',
    tags: ['opensource','adminui'],
  },
  {
    title: 'EventMesh',
    description: 'EventMesh is a new generation serverless event middleware for building distributed event-driven applications.',
    preview: require('./showcase/eventmesh.png'),
    website: 'https://eventmesh.apache.org/',
    source: 'https://github.com/apache/eventmesh',
    tags: ['opensource','cloudnative'],
  },
  {
    title: 'Hybridnet',
    description: 'Make underlay and overlay network can coexist, communicate, even be transformed purposefully.',
    preview: require('./showcase/hybridnet.png'),
    website: 'https://github.com/alibaba/hybridnet',
    source: 'https://github.com/alibaba/hybridnet',
    tags: ['opensource','cloudnative'],
  },
  {
    title: 'EasyGoAdmin',
    description: '基于Golang、GoFrame、Vue、ElementUI、MySQL等技术栈开发平台框架，拥有完善的(RBAC)权限架构和基础核心管理模块，可以一键CRUD生成整个模块的全部代码，本框架为一站式系统框架开发平台，可以帮助开发者提升开发效率、降低研发成本...',
    preview: require('./showcase/easy-go-admin.png'),
    website: 'https://www.easygoadmin.vip/',
    source: 'https://gitee.com/easygoadmin/EasyGoAdmin_GoFrame_EleVue',
    tags: ['opensource','favorite','adminui','product'],
  },
  {
    title: 'SagooIOT',
    description: 'SagooIOT是一个基于Golang开发的开源的企业级物联网基础开发平台。负责设备管理和协议数据管理，支持跨平台的物联网接入及管理方案，平台实现了物联网开发相关的基础功能，基于该功能可以快速的搭建起一整套的IOT相关的业务系统...',
    preview: require('./showcase/sagooiot.png'),
    website: 'https://iotdoc.sagoo.cn/',
    source: 'https://github.com/sagoo-cloud/sagooiot',
    tags: ['opensource','favorite','adminui','product'],
  },
  {
    title: 'GF2-Demo',
    description: 'GF2-Demo 是一个基于 GoFrameV2 用来快速开发后端服务的脚手架, 目标使开发者只需关注业务逻辑的编写, 快速且规范地交付项目。',
    preview: require('./showcase/gf2-demo.png'),
    website: 'https://github.com/windvalley/gf2-demo',
    source: 'https://github.com/windvalley/gf2-demo',
    tags: ['opensource'],
  },
  {
    title: 'Oldme-API',
    description: 'Oldme-API 是一个基于GoFrame 的前后端分离的个人博客系统，可做为学习 GoFrame 的参考项目。欢迎访问我们博客来一起交流学习。',
    preview: require('./showcase/oldme-api.png'),
    website: 'https://github.com/oldme-git/oldme-api',
    source: 'https://github.com/oldme-git/oldme-api',
    tags: ['opensource','frontui'],
  },
  {
    title: 'ZzeAdminGo',
    description: '基于 Golang GoFrame + vue3 的、前后端分离的后台管理系统快捷使用模板，支持按钮级别的 RBAC。',
    preview: require('./showcase/zze-admin-go.png'),
    website: 'http://admin.zze.xyz/#/login',
    source: 'https://github.com/zze326/zze-admin-go',
    tags: ['opensource','adminui'],
  },
  {
    title: 'GF-CMS',
    description: '基于GoFrame v2的企业网站内容管理系统。',
    preview: require('./showcase/gf-cms.jpg'),
    website: 'https://github.com/demozx/gf_cms',
    source: 'https://github.com/demozx/gf_cms',
    tags: ['opensource','adminui','frontui'],
  },
  {
    title: 'UniTranslate',
    description: '基于 Go 实现的一个 百度 有道 谷歌 Deepl ChatGPTFree Google Translator API 免费的Google翻译 翻译统一管理接入平台 统一API 调用规范 多平台翻译...',
    preview: require('./showcase/uni-translate.png'),
    website: 'https://github.com/xgd16/UniTranslate',
    source: 'https://github.com/xgd16/UniTranslate',
    tags: ['opensource'],
  },
  {
    title: 'kkdl-go',
    description: '基于 GoFrameV2 的短链生成及管理管理平台。',
    preview: require('./showcase/kkdl-go.png'),
    website: 'https://github.com/vaebe/kkdl-go',
    source: 'https://github.com/vaebe/kkdl-go',
    tags: ['opensource'],
  },
  {
    title: 'VncProxy',
    description: 'VncProxy 是使用Golang实现的Vnc远程桌面代理组件，完全解析rfb协议，支持远程桌面代理，rbs文件录屏，rbs文件回放，截图，录制视频。',
    preview: require('./showcase/vncproxy.png'),
    website: 'https://github.com/vprix/vncproxy',
    source: 'https://github.com/vprix/vncproxy',
    tags: ['opensource'],
  },
  {
    title: 'gdb-adapter',
    description: 'GoFrame ORM adapter for Casbin.',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/vance-liu/gdb-adapter',
    source: 'https://github.com/vance-liu/gdb-adapter',
    tags: ['opensource','library'],
  },
  {
    title: 'gf-casbin-adapter',
    description: 'GoFrame ORM adapter for Casbin.',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/hailaz/gf-casbin-adapter',
    source: 'https://github.com/hailaz/gf-casbin-adapter',
    tags: ['opensource','library'],
  },
  {
    title: 'csrf',
    description: 'CSRF middleware for GoFrame web server.',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/gogf/csrf',
    source: 'https://github.com/gogf/csrf',
    tags: ['opensource','library'],
  },
  {
    title: 'goframe-jsonrpc',
    description: '基于 goframe 实现的 jsonrpc2.0可以和 hyperf 的 jsonrpc 无缝对接。',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/zhouyaozhouyao/goframe-jsonrpc',
    source: 'https://github.com/zhouyaozhouyao/goframe-jsonrpc',
    tags: ['opensource','library'],
  },
  {
    title: 'gf-x-tool',
    description: 'GoFrame 的便利性使用扩展 —— GrayLog —— 快速返回处理 —— 在线翻译支持(百度,有道,google,deepl)。',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/xgd16/gf-x-tool',
    source: 'https://github.com/xgd16/gf-x-tool',
    tags: ['opensource','library'],
  },
  {
    title: 'gf-x-mqtt',
    description: '快速接入 MQTT。',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/xgd16/gf-x-mqtt',
    source: 'https://github.com/xgd16/gf-x-mqtt',
    tags: ['opensource','library'],
  },
  {
    title: 'x-object-storage',
    description: '基于 GoFrame 快速接入 亚马逊 AMS 存储。',
    preview: require('./showcase/library.png'),
    website: 'https://github.com/xgd16/x-object-storage',
    source: 'https://github.com/xgd16/x-object-storage',
    tags: ['opensource','library'],
  },
  {
    title: 'go-orm-helper',
    description: '一个为了让你在 Goland 上写 ORM 能自动补全数据库字段、Tag、生成Struct的插件。支持：Gorm、Xorm、Beego、GoFrame...）',
    preview: require('./showcase/go-orm-helper.png'),
    website: 'https://github.com/johnmai-dev/go-orm-helper',
    source: 'https://github.com/johnmai-dev/go-orm-helper',
    tags: ['opensource'],
  },
  {
    title: 'GoFrame-Helper',
    description: 'GoFrame Helper 是一款针对 GoFrame 框架 的 Goland/IntelliJ 插件，它提供了代码提示，代码模板，gf 工具自动监听等功能，让您的 GoFrame 之旅更为愉快。',
    preview: require('./showcase/goframe-helper.png'),
    website: 'https://github.com/oldme-git/GoFrame-Helper',
    source: 'https://github.com/oldme-git/GoFrame-Helper',
    tags: ['opensource'],
  },
];

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  favorite: {
    label: translate({message: 'Favorite'}),
    description: translate({
      message:
        '我们喜欢并推荐给大家的案例，感兴趣可以瞧瞧。',
      id: 'showcase.tag.favorite.description',
    }),
    color: '#e9669e',
  },
  opensource: {
    label: translate({message: 'OpenSource'}),
    description: translate({
      message: '开源项目案例，通常是开源站点或组件，带有参考的源码案例。',
      id: 'showcase.tag.opensource.description',
    }),
    color: '#39ca30',
  },
  product: {
    label: translate({message: 'Product'}),
    description: translate({
      message: '带有商业授权案例，该案例可能同时具有源码和商业授权。',
      id: 'showcase.tag.product.description',
    }),
    color: '#dfd545',
  },
  frontui: {
    label: translate({message: 'FrontUI'}),
    description: translate({
      message:
        '带有前台UI的使用案例。',
      id: 'showcase.tag.frontui.description',
    }),
    color: '#0E8A16',
  },
  adminui: {
    label: translate({message: 'AdminUI'}),
    description: translate({
      message:
        '带有管理后台UI的使用案例。',
      id: 'showcase.tag.adminui.description',
    }),
    color: '#14cfc3',
  },
  library: {
    label: translate({message: 'Library'}),
    description: translate({
      message:
        'Go源码组件，供import使用。',
      id: 'showcase.tag.library.description',
    }),
    color: '#1D76DB',
  },
  i18n: {
    label: translate({message: 'I18n'}),
    description: translate({
      message:
        '该案例支持不同语言的国际化。',
      id: 'showcase.tag.i18n.description',
    }),
    color: '#5319E7',
  },
  micro: {
    label: translate({message: 'MicroService'}),
    description: translate({
      message:
        '该案例支持微服务开发架构。',
      id: 'showcase.tag.micro.description',
    }),
    color: '#E99695',
  },
  cloudnative: {
    label: translate({message: 'CloudNative'}),
    description: translate({
      message:
        '该案例支持云原生开发架构。',
      id: 'showcase.tag.cloudnative.description',
    }),
    color: '#C5DEF5',
  },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedUsers = sortUsers();
