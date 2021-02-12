import React from 'react';

import { useRequest } from '~app/hooks/useRequest';
import { getBooks } from '~services/BooksService';
import Loading from '~components/Spinner/components/loading';

import styles from './styles.module.scss';
import BookItem from './components/BookItem';

export default function BookList() {
  const [state, loading] = useRequest(
    {
      request: getBooks,
      payload: []
    },
    []
  );

  return (
    <div className={styles.booksList}>
      {loading ? <Loading /> : state?.page.map(book => <BookItem key={book.id} book={book} />)}
    </div>
  );
}
