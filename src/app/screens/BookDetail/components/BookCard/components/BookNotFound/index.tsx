import i18next from 'i18next';
import React from 'react';

import styles from './styles.module.scss';

function BookNotFound() {
  return (
    <div className={`${styles.wrapper} row center`}>
      <span className={styles.notFound}>{i18next.t('BookNotFound:notFound')}</span>
    </div>
  );
}

export default BookNotFound;
