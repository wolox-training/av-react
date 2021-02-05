import React from 'react';

// eslint-disable-next-line import/namespace
import { useRequest } from '~app/hooks/useRequest';
import { getBooks } from '~services/BooksService';
import Loading from '~components/Spinner/components/loading';

import styles from './styles.module.scss';
import Book from './components/Book';

export default function BookList() {
  const [state, loading] = useRequest(
    {
      request: getBooks,
      payload: []
    },
    []
  );

  return (
    <div className={styles.bookList}>{loading ? <Loading /> : state && <Book books={state.page} />}</div>
  );
}
