import React from 'react';
import i18next from 'i18next';
import { useHistory } from 'react-router';

import { BookRequestSuccess } from '~utils/types';

import BackArrow from '../../Assets/back-arrow.png';
import Badge from '../../Assets/badge.png';

import styles from './styles.module.scss';
import BookNotFound from './components/BookNotFound';

interface BookProps {
  data: BookRequestSuccess | undefined;
}

export default function BookData({ data }: BookProps) {
  const history = useHistory();
  return (
    <div>
      <div className={`${styles.backWrapper} row middle`} onClick={() => history.goBack()}>
        <img
          src={BackArrow}
          alt={i18next.t('BookCard:backArrowAlt') as string}
          className={styles.backArrow}
        />
        <span className={styles.backText}>{i18next.t('BookCard:back')}</span>
      </div>
      {data ? (
        <div className={`${styles.bookCard} row`}>
          <img
            src={data?.imageUrl}
            alt={i18next.t('BookCard:bookAlt') as string}
            className={styles.bookImg}
          />
          <img src={Badge} alt={i18next.t('BookCard:badgeAlt') as string} className={styles.badge} />
          <div className={`${styles.bookInfo} column`}>
            <div className={styles.titleWrapper}>
              <span className={styles.bookTitle}>{data?.title}</span>
              <span className={styles.bookGenre}>{data?.genre}</span>
            </div>
            <div className={styles.bookDetails}>
              <span className={styles.bookDetailsIndex}>{i18next.t('BookCard:author')}</span>
              <span className={styles.bookDetailsItem}>{data?.author}</span>
            </div>
            <div className={styles.bookDetails}>
              <span className={styles.bookDetailsIndex}>{i18next.t('BookCard:editor')}</span>
              <span className={styles.bookDetailsItem}>{data?.editor}</span>
            </div>
            <div className={styles.bookDetails}>
              <span className={styles.bookDetailsIndex}>{i18next.t('BookCard:publishYearh')}</span>
              <span className={styles.bookDetailsItem}>{data?.year}</span>
            </div>
          </div>
        </div>
      ) : (
        <BookNotFound />
      )}
    </div>
  );
}
