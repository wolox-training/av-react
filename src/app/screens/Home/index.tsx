import React from 'react';

import styles from './styles.module.scss';
import Appbar from './components/Appbar';

export default function Home() {
  return (
    <div className={`${styles.home} column`}>
      <Appbar />
    </div>
  );
}
