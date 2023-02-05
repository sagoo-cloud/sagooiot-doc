<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'
import { useCooperative } from '../composables/cooperative'

const { data } = useCooperative()
</script>

<template>
  <!-- 首页底部的合作伙伴声明 -->
<!--  <VPHomeSponsors-->
<!--    message="如有商业需要请与我们联系"-->
<!--    actionText="查看合作伙伴"-->
<!--    actionLink="./cooperative/"-->
<!--    :data="data"-->
<!--  ></VPHomeSponsors>-->




</template>



<style>
.vp-sponsor-grid-item {
  cursor: default;
}

/* 图片 */
.vp-sponsor-grid-image {
  filter: grayscale(0);
}

.vp-sponsor-grid.big .vp-sponsor-grid-image {
  max-width: 400px !important;
  max-height: 70px !important;
}
.vp-sponsor-grid.medium .vp-sponsor-grid-image {
  max-width: 180px !important;
  max-height: 50px;
}
</style>
