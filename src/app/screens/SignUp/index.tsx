import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import CustomInput from '../../components/CustomInput';

import { SIGN_UP_FIELDS } from './constants';
import styles from './styles.module.scss';
import WoloxImg from './assets/wolox-logo.png';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  locale?: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, errors } = useForm<FormData>({ mode: 'all' });
  const onSubmit = handleSubmit(data => {
    data.locale = i18next.language;
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <div className="row center">
      <form onSubmit={onSubmit} className={`column ${styles.signupForm}`}>
        <img src={WoloxImg} alt={i18next.t('SignUp:logoAlt') as string} className={styles.logo} />
        <CustomInput
          name={SIGN_UP_FIELDS.firstName}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
          error={errors.firstName?.message}
          label={i18next.t('SignUp:firstName') as string}
          labelClassName={styles.customLabel}
        />
        <CustomInput
          name={SIGN_UP_FIELDS.lastName}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
          error={errors.lastName?.message}
          label={i18next.t('SignUp:lastName') as string}
          labelClassName={styles.customLabel}
        />
        <CustomInput
          name={SIGN_UP_FIELDS.email}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: i18next.t('SignUp:invalidEmail')
            }
          })}
          error={errors.email?.message}
          type="email"
          label={i18next.t('SignUp:email') as string}
          labelClassName={styles.customLabel}
        />
        <CustomInput
          name={SIGN_UP_FIELDS.password}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
          error={errors.password?.message}
          type="password"
          label={i18next.t('SignUp:password') as string}
          labelClassName={styles.customLabel}
        />
        <CustomInput
          name={SIGN_UP_FIELDS.passwordConfirmation}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') },
            validate: value => value === watch('password') || (i18next.t('SignUp:passwordsNoMatch') as string)
          })}
          error={errors.passwordConfirmation?.message}
          type="password"
          label={i18next.t('SignUp:passwordsNoMatch') as string}
          labelClassName={styles.customLabel}
        />
        <div className={`column ${styles.signupButtonContainer}`}>
          <button className={`${styles.customButton} ${styles.signupButton}`} type="submit">
            {i18next.t('SignUp:signUp')}
          </button>
        </div>
        <button className={`${styles.customButton} ${styles.loginButton}`} type="button">
          {i18next.t('SignUp:login')}
        </button>
      </form>
    </div>
  );
}
