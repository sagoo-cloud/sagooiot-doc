import { ref, onMounted } from 'vue'

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

const asideJson = {}
// const asideJson = {
//   platinum: [
//     {
//       name: '夏日傍晚，海风轻拂，',
//       url: '',
//       img: ''
//     },
//     {
//       name: '落日余晖， 人间一分糖。',
//       url: '',
//       img: ''
//     },
//     {
//       name: '',
//       url: '',
//       img: ''
//     },
//     {
//       name: '感谢所有参与建设小伙伴',
//       url: '',
//       img: ''
//     }
//   ],
//   gold: [
//     {
//       name: '欢迎合作',
//       url: '',
//       img: ''
//     },
//     {
//       name: '广告招租',
//       url: '',
//       img: ''
//     }
//   ]
// }

export function useSponsor() {
  // @ts-ignore
  onMounted(async () => {
    if (data.value) {
      return
    }
    data.value = mapSponsors(<Sponsors>asideJson)
  })

  return {
    data
  }
}

function mapSponsors(sponsors: Sponsors) {
  return [
    {
      tier: 'Platinum Sponsor',
      size: 'big',
      items: mapImgPath(sponsors['platinum'])
    },
    {
      tier: 'Gold Sponsors',
      size: 'medium',
      items: mapImgPath(sponsors['gold'])
    }
  ]
}

function mapImgPath(sponsors: Sponsor[]) {
  return sponsors.map(sponsor => ({
    ...sponsor,
    img: `/sponsor/${sponsor.img}`
  }))
}
