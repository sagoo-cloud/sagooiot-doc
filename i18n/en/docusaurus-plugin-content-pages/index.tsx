import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from './index.module.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageCharacteristic from '@site/src/components/HomepageCharacteristic';
function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <img className="title--logo"
                     src='/img/sagooiot.svg'
                />
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__title">{siteConfig.tagline}</p>
                <p className="hero__subtitle">{siteConfig.deploymentBranch}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary"
                        to="/docs/base/introduce">
                        快速上手2222
                    </Link>
                    <Link
                        className="button button--secondary"
                        to="https://github.com/sagoo-cloud/sagooiot">
                        SagooIoT源码222
                    </Link>
                    <Link
                        className="button button--secondary"
                        to="https://zhgy.sagoo.cn">
                        在线演示222
                    </Link>
                    <Link
                        className="button button--secondary"
                        to="/docs/base/version">
                        许可版本
                    </Link>
                </div>
            </div>
        </header>

    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`沙果开源物联网系统 ${siteConfig.title}`}
            description="SagooIoT是一个企业级开源物联网平台系统，提供高性能、低成本、易用的企业级物联网解决方案。我们的核心组件包括基于物模型的设备管理、可视化规则引擎、可视化组态工具、视频监控中心和统一的数据处理中心。SagooIoT支持多种接入协议，如TCP、MQTT、UDP、CoAP、HTTP、GRPC、RPC等，适配多种设备和平台，旨在通过可复用的组件减少开发工作，简化和加速物联网开发交付。加入我们，体验高效、灵活的物联网解决方案。">
            <HomepageHeader />
            <main>
                <HomepageFeatures/>
                <HomepageCharacteristic/>
            </main>
        </Layout>
    );
}
