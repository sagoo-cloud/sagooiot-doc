import { ref } from 'vue'

interface Sponsors {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

interface Sponsor {
  name: string
  img: string
  url: string
}

// shared data across instances so we load only once.
const data = ref()

const dataJson = {
  platinum: [
    {
      name: '可视化组态工具',
      logo: `/imgs/confingure.svg`,
      img: `/imgs/confingure.svg`,
      url: '/guide/configure/start.html',
      message: '可视化快速在线进行组态编辑'
    },
    {
      name: 'GoFrame V2',
      logo: `/imgs/goframe-logo.svg`,
      img: `/imgs/goframe-logo.svg`,
      url: 'https://goframe.org/',
      message: '是一款模块化、高性能、企业级的Go基础开发框架'
    }
  ],
  gold: []
}
export function useCooperative() {
  data.value = mapCooperative(dataJson)
  return {
    data
  }
}

function mapCooperative(cooperative: { gold: any[]; platinum: ({ img: string; name: string; logo: string; message: string; url: string } | { img: string; name: string; logo: string; message: string; url: string })[] }, splice = false) {
  return [
    {
      tier: 'SagooIOT提供了支持私有化或容器化形式的部署，用户可以将其轻松部署在单机、集群或容器服务环境中，并且支持横向扩展，以满足不同规模的业务需求。使用SagooIOT能够获得出色的性能表现，提供优异的IOT服务能力。',
      size: 'medium',
      items: mapImgPath(cooperative['platinum'], splice)
    },
    // {
    //   tier: '系统价值',
    //   size: 'big',
    //   items: mapImgPath(cooperative['gold'], splice)
    // }
  ]
}

function mapImgPath(cooperative: Sponsor[], splice = false) {
  return cooperative.map(sponsor => ({
    ...sponsor
  }))
}
