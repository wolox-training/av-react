import React from 'react';
import { useParams } from 'react-router-dom';

import { useRequest } from '~app/hooks/useRequest';
import { getBook } from '~services/BooksService';
import Loading from '~components/Spinner/components/loading';

import styles from './styles.module.scss';
import BookCard from './components/BookCard';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [state, loading] = useRequest(
    {
      request: getBook,
      payload: parseInt(id)
    },
    []
  );

  return (
    <div className={`${styles.bookDetail} row center`}>
      {loading ? <Loading /> : <BookCard data={state || undefined} />}
    </div>
  );
}
