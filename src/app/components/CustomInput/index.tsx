import React, { Ref } from 'react';

import styles from './styles.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  inputRef?: Ref<HTMLInputElement>;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  inputStyle: string;
  labelText?: string;
  labelStyle?: string;
}

export default function CustomInput({
  inputRef,
  error,
  type = 'text',
  inputStyle,
  labelText,
  labelStyle,
  ...props
}: Props) {
  return (
    <div className={`${styles.wrapper} column`}>
      {labelText && <label className={labelStyle}>{labelText}</label>}
      <input {...props} ref={inputRef} type={type} className={inputStyle} />
      {error && <span className={styles.errorLabels}>{error}</span>}
    </div>
  );
}
