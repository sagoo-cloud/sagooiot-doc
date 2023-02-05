<script setup lang="ts">
import { computed, toRaw } from 'vue'
import { VPDocAsideSponsors } from 'vitepress/theme'
import { useSponsor } from '../composables/sponsor'
import { useCooperative } from '../composables/cooperative'

const { data: cooperativeData } = useCooperative()
const { data: sponsorData } = useSponsor()

// 广告
const slogan = {
  name: 'SagooIOT v1.0',
  img: '/imgs/logo.svg',
  extra: '欢迎更多小伙伴参与建设！'
}

const sponsorList = toRaw(cooperativeData.value)[0].items

// 底部
const sponsors = computed(() => {
  return (
    sponsorData?.value.map(sponsor => {
      return {
        size: sponsor.size === 'big' ? 'mini' : 'xmini',
        items: sponsor.items
      }
    }) ?? []
  )
})
</script>

<template>
  <!-- 广告 -->
  <a
    class="go-view-tip sponsor-style"
    v-for="(item, index) in sponsorList"
    :key="index"
    :href="item.url"
    target="_blank"
  >
    <img width="22" height="22" :src="item.logo" />
    <span>
      <p class="heading">{{ item.name }}</p>
    </span>
  </a>
  <!-- slogan -->
  <div
    class="go-view-tip slogan-style"
    style="margin-top: 1rem; margin-bottom: 1rem"
  >
    <img width="22" height="22" :src="slogan.img" />
    <span>
      <p class="extra-info">&nbsp;</p>
      <p class="heading">{{ slogan.name }}</p>
      <p class="extra-info">{{ slogan.extra }}</p>
    </span>
  </div>
  <!-- 诗句 -->
  <div class="VPDocAsideSponsors" v-if="sponsorData">
    <div class="VPSponsors vp-sponsor aside">
      <section
        class="vp-sponsor-section"
        v-for="(item, index) in sponsors"
        :key="index"
      >
        <div
          class="VPSponsorsGrid vp-sponsor-grid"
          :class="[item.size === 'mini' ? 'mini' : 'xmini']"
          :data-vp-grid="item.size === 'mini' ? 1 : 2"
        >
          <div
            v-for="(iitem, ii) in item.items"
            :key="ii"
            class="vp-sponsor-grid-item vp-sponsor-grid-item-pd"
            style="color: var(--vp-c-text-2)"
          >
            <p>{{ iitem.name }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.go-view-tip {
  border-radius: 14px;
  padding-left: 2.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1rem;
  filter: grayscale(100%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-bg-alt);
  transition: border-color 0.5s;
}
/* 广告的样式 */
.sponsor-style {
  display: flex;
  width: 100%;
  padding: 1.2rem;
  padding-left: 3.7rem;
  padding-right: 0.8rem;
  margin-top: 1rem;
  color: #5dc7d1;
  border: 2px solid #68a9d1 !important;
}

.slogan-style {
  display: flex;
  width: 100%;
  padding-left: 3.7rem;
  padding-right: 0;
}
.sponsor-style .extra-info {
  opacity: 1;
}

.sponsor-style img {
  /* filter: grayscale(0.3) invert(2) !important; */
}

.go-view-tip.sponsor-style .heading {
  background-image: linear-gradient(
    120deg,
    #54b6d0 16%,
    var(--vp-c-brand-light),
    var(--vp-c-brand-light)
  ) !important;
}
/* 原hover */
.go-view-tip {
  filter: grayscale(0%);
  border: 2px solid var(--vp-c-brand-light);
}
.go-view-tip img {
  position: absolute;
  left: 1rem;
  transition: transform 0.5s;
  height: 30px;
  width: auto;
}
.go-view-tip:hover img {
  transform: scale(1.2);
}

/* 原hover */
.go-view-tip .heading {
  background-image: linear-gradient(
    120deg,
    #54b6d0 16%,
    var(--vp-c-brand-light),
    var(--vp-c-brand-light)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.go-view-tip .extra-info {
  color: var(--vp-c-text-1);
  opacity: 0;
  font-size: 0.7rem;
  padding-left: 0.1rem;
  transition: opacity 0.5s;
}
.go-view-tip:hover .extra-info {
  opacity: 0.9;
}
.vp-sponsor-grid-item-pd {
  padding: 10px 20px;
  cursor: default;
}
.dark .aside .vp-sponsor-grid-item-pd:hover {
  background-color: var(--vp-c-bg-mute) !important;
}
</style>
