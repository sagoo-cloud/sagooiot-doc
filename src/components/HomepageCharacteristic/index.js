import clsx from "clsx"
import Heading from "@theme/Heading"
import styles from "./styles.module.css"
import Translate, { translate } from "@docusaurus/Translate"

const FeatureList = [
  {
    title: "统一物模型",
    description: (
      <>
        通过统一物模型定义设备接入标准，实现设备相关属性、服务、事件等数据的直接获取，同时支持开发者自定义物模型。
      </>
    ),
  },
  {
    title: "多协议适配",
    description: (
      <>
        支持多种通信协议(MQTT，MODBUS，TCP,UDP，HTTP,CoAP)等，支持自定义消息协议，灵活接入不同厂商不同设备。
      </>
    ),
  },
  {
    title: "远程控制",
    description: (
      <>
        可以实现服务器对设备的精准控制和设备主动向服务器发送请求通知。也可基于属性对设备进行远程控制。
      </>
    ),
  },
  {
    title: "场景联动",
    description: (
      <>
        提供可配置的场景联动功能，支持手动、设备输出、定时等场景类型，支持设备到设备，设备到业务等多种场景。
      </>
    ),
  },
  {
    title: "OTA升级",
    description: (
      <>
        提供设备固件版本管理，及远程升级能力。支持按产品，模块进行手动升级，也支持自动升级。
      </>
    ),
  },
  {
    title: "远程配置",
    description: (
      <>
        提供的远程配置功能，可在不用重启设备或中断设备运行的情况下，在线远程更新设备的系统参数、网络参数等配置信息。
      </>
    ),
  },
  {
    title: "安全保障",
    description: (
      <>
        支持MQTT SSL配置、HTTP SSL配置、CoAP DTLS配置；支持访问令牌（Access
        Tokens）鉴权模式。
      </>
    ),
  },
  {
    title: "实时报警",
    description: (
      <>
        可按产品或是指定设备进行实时检测异常，支持企业微信、短信、语音、Webhook等多种通知方式。
      </>
    ),
  },
  {
    title: "插件系统",
    description: (
      <>
        强大的插件系统，支持跨语言接入，可以通过Golang,C/C++,Python等编写的插件进行功能增强。
      </>
    ),
  },
  {
    title: "跨平台运行",
    description: (
      <>
        支持跨平台运行，能运行于各类操作系统，快速实现边缘计算、自动预警，自动执行等功能。
      </>
    ),
  },
  {
    title: "低代码开发",
    description: (
      <>提供代码生成工具，通过低代码开发工具进行业务快速开发，提升开发效率。</>
    ),
  },
  {
    title: "开放的数据接口",
    description: (
      <>
        提供南向、北向开发接口，提供OpenAPIs系统接口，支持多应用接入认证及数据权限处理。
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("card col")} style={{ minWidth: "30%", marginBottom: 0 }}>
      <div className="{styles.text--center} padding-horiz--md">
        <Heading as="h4">{title}</Heading>
        <p className={styles.details}>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={clsx("text--center")}>
          <Translate> 系统特性 </Translate>
        </Heading>
        <div className="row" style={{ gap: "20px" }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
