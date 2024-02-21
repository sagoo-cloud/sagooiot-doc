import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageCharacteristic from '@site/src/components/HomepageCharacteristic';

import Heading from '@theme/Heading';
import styles from './index.module.css';

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
                    快速上手
                </Link>
                <Link
                    className="button button--secondary"
                    to="https://github.com/sagoo-cloud/sagooiot">
                    SagooIoT源码
                </Link>
                <Link
                    className="button button--secondary"
                    to="https://zhgy.sagoo.cn">
                    在线演示
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
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
            <main>
                <HomepageFeatures/>
                <HomepageCharacteristic/>
            </main>
        </Layout>
    );
}
