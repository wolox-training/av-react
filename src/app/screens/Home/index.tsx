import React from 'react';

import styles from './styles.module.scss';
import Appbar from './components/Appbar';
import BookList from './components/BookList';

function Home() {
  return (
    <div className={`${styles.home} column`}>
      <Appbar />
      <BookList />
    </div>
  );
}

export default Home;
