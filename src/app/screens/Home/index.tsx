import React from 'react';

import styles from './styles.module.scss';
import Appbar from './components/Appbar';

function Home() {
  return (
    <div className={`${styles.home} column`}>
      <Appbar />
    </div>
  );
}

export default Home;
