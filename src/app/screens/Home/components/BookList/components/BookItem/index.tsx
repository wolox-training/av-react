import React from 'react';
import i18next from 'i18next';

import { Book } from '~utils/types';

import styles from './styles.module.scss';

interface BookProps {
  book: Book;
}

export default function BookItem({ book }: BookProps) {
  return (
    <div key={book.id} className={`${styles.book} column`}>
      <img src={book.imageUrl} alt={i18next.t('BooksList:bookAlt') as string} className={styles.bookImage} />
      <div className={styles.bookTitle}>{book.title}</div>
      <div className={styles.bookAuthor}>{book.author}</div>
    </div>
  );
}
