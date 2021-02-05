import React from 'react';
import i18next from 'i18next';

import { Books } from '~utils/types';

import styles from './styles.module.scss';

interface BookProps {
  books: Books[];
}

export default function Book({ books }: BookProps) {
  return (
    <>
      {books.map(book => (
        <div key={book.id} className={`${styles.book} column`}>
          <img
            src={book.imageUrl}
            alt={i18next.t('BooksList:bookAlt') as string}
            className={styles.bookImage}
          />
          <div className={styles.bookTitle}>{book.title}</div>
          <div className={styles.bookAuthor}>{book.author}</div>
        </div>
      ))}
    </>
  );
}
