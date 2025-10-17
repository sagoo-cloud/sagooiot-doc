import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// 客户LOGO数据
const CustomerLogos = [
  {
    name: '中铁一局',
    logo: '/img/customers/001.png',
  },
  {
    name: '中建五局',
    logo: '/img/customers/005.png',
  },
  {
    name: '亨通集团',
    logo: '/img/customers/003.png',
  },
  {
    name: '中能国宏',
    logo: '/img/customers/004.png',
  },
  {
    name: '青山控股',
    logo: '/img/customers/002.png',
  },
  {
    name: '昂为环保',
    logo: '/img/customers/006.png',
  },
  {
    name: '国信能源',
    logo: '/img/customers/007.png',
  },
  {
    name: '华电测控',
    logo: '/img/customers/008.png',
  },
  {
    name: '达能电气',
    logo: '/img/customers/009.png',
  },
  {
    name: '普隆科技',
    logo: '/img/customers/010.png',
  },
  {
    name: '华运天成',
    logo: '/img/customers/012.png',
  },
  {
    name: '伴悦科技',
    logo: '/img/customers/011.png',
  },

];

interface CustomerLogoProps {
  name: string;
  logo: string;
}

function CustomerLogo({name, logo}: CustomerLogoProps) {
  return (
    <div className={clsx('col col--2', styles.customerLogo)}>
      <div className={styles.logoContainer}>
        <img src={logo} alt={name} className={styles.logo} />
      </div>
    </div>
  );
}

export default function CustomerLogosSection(): JSX.Element {
  return (
    <section className={styles.customers}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.title}>我们的客户</h2>
            <p className={styles.subtitle}>感谢以下客户对我们的信任与支持</p>
          </div>
        </div>
        <div className="row">
          {CustomerLogos.map((props, idx) => (
            <CustomerLogo key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
