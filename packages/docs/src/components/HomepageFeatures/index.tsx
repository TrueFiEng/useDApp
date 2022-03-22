import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🔌 Connection management',
    description: (
      <ul>
        <li>Read-only mode out-of the box</li>
        <li>Network switching</li>
        <li>Handling multiple networks</li>
      </ul>
    ),
  },
  {
    title: '🔄 Reading blockchain state',
    description: (
      <ul>
        <li>Auto refresh on new block</li>
        <li>Auto refresh on wallet change</li>
        <li>Combine multiple calls into a single multicall</li>
      </ul>
    ),
  },
  {
    title: '✅ Transactions',
    description: (
      <ul>
        <li>Track transaction state</li>
        <li>History</li>
        <li>Notifications</li>
      </ul>
    ),
  },
  {
    title: '⚙️ Browser plugin',
    description: (
      <ul>
        <li>Available in Beta for Firefox and Chrome</li>
        <li>Track under-the-hood events</li>
        <li>Manage ABIs and tags</li>
      </ul>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--left padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
