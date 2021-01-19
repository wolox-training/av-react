import React from 'react';

import styles from './styles.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  inputRef?: (ref: HTMLInputElement) => void;
  error?: string;
}

export default function CustomInput({ inputRef, error, ...props }: Props) {
  return (
    <>
      <input {...props} ref={inputRef} className={styles.customInputs} />
      {error && <span className={styles.errorLabels}>{error}</span>}
    </>
  );
}
