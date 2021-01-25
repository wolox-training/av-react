import React from 'react';

import styles from './styles.module.scss';

interface Props {
  errors: string[];
}

export default function CustomErrorDisplayer({ errors }: Props) {
  return (
    <div className="column">
      {errors.map(error => (
        <p key={error} className={styles.error}>
          {error}
        </p>
      ))}
    </div>
  );
}
