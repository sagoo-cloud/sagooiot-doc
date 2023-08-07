<template>
  <div class="advantage">
    <div class="container">
      <div class="title">
        <h3>- SagooIOT 系统优势 -</h3>
        <p class="subtitle">
          SagooIOT提供了支持私有化或容器化形式的部署，用户可以将其轻松部署在单机、集群或容器服务环境中，并且支持横向扩展，以满足不同规模的业务需求。使用SagooIOT能够获得出色的性能表现，提供优异的IOT服务能力。
        </p>
      </div>

      <div class="items">
        <div class="item grid-2">
          <h2 class="item-title">百万级</h2>
          <span class="item-subtitle">数据并发</span>
          <p class="details">系统可分布式部署，支持百万级数据并发。</p>
        </div>

        <div class="item grid-2">
          <h2 class="item-title">千万级</h2>
          <span class="item-subtitle">设备接入</span>
          <p class="details">设备网关水平扩容，支持千万级设备接入。</p>
        </div>

        <div class="item grid-2">
          <h2 class="item-title">亿万级</h2>
          <span class="item-subtitle">数据采集</span>
          <p class="details">TDengine时序数据库，支持上亿数据采集点</p>
        </div>

        <div class="item grid-2">
          <h2 class="item-title">低延迟</h2>
          <span class="item-subtitle">数据通讯</span>
          <p class="details">高性能网络组件，非阻塞网络编程，具有极低的通讯延迟。</p>
        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>


.title {
  padding-top: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title h3 {
  font-size: 2rem;
}

.title .subtitle {
  padding-top: 30px;
  font-size: 1rem;
  width: 80%;
  line-height: 36px;
}

.advantage {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .advantage {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .advantage {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.items {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}

.item-title {
  margin: 20px;
  font-size: 2.5rem;
  color: #10b981;
}

.item-subtitle {
  margin: 20px;
  font-size: 1.5rem;

}

@media (min-width: 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (min-width: 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}
</style>
