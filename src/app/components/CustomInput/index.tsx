import React, { Ref } from 'react';

import styles from './styles.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  inputRef?: Ref<HTMLInputElement>;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  label?: string;
  labelClassName?: string;
}

export default function CustomInput({
  inputRef,
  error,
  type = 'text',
  label,
  labelClassName,
  name,
  ...props
}: Props) {
  return (
    <div className={`${styles.inputContainer} column`}>
      {label && (
        <label className={labelClassName} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        className={`${styles.input} full-width`}
        id={name}
        name={name}
        {...props}
      />
      {error && (
        <span role="alert" className={styles.errorLabels}>
          {error}
        </span>
      )}
    </div>
  );
}
