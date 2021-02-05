import React from 'react';
import i18next from 'i18next';
import { useHistory } from 'react-router';

import { Books } from '~utils/types';
import { PATHS } from '~constants/paths';

import styles from './styles.module.scss';

interface BookProps {
  books: Books[];
}

export default function Book({ books }: BookProps) {
  const history = useHistory();
  const bookClicked = (id: number) => {
    history.push(PATHS.bookDetail.replace(':id', `${id}`));
  };

  return (
    <>
      {books.map(book => (
        <div key={book.id} className={`${styles.book} column`} onClick={() => bookClicked(book.id)}>
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
