import React from 'react';

import styles from './styles.module.scss';

interface Props {
  errors: string[];
}

function CustomErrorDisplayer({ errors }: Props) {
  return (
    <div className="column">
      {errors.map(error => (
        <p role="alert" key={error} className={styles.error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default CustomErrorDisplayer;
