import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import { SIGN_UP_FIELDS } from './constants';
import styles from './styles.module.scss';
import WoloxImg from './assets/wolox-logo.png';
import CustomInput from './components/CustomInput';

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  locale?: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, errors } = useForm<UserProps>({ mode: 'all' });
  const onSubmit = handleSubmit(data => {
    data.locale = i18next.language;
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <div className="row center">
      <form onSubmit={onSubmit} className={`column ${styles.signupForm}`}>
        <div className={styles.header} />
        <div className={styles.logoContainer}>
          <img src={WoloxImg} alt={i18next.t('SignUp:logoAlt') as string} className={styles.logo} />
        </div>
        <label className={styles.customLabels}>{i18next.t('SignUp:firstName')}</label>
        <CustomInput
          name={SIGN_UP_FIELDS.firstName}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
          error={errors?.firstName?.message}
        />
        <label className={styles.customLabels}>{i18next.t('SignUp:lastName')}</label>
        <CustomInput
          name={SIGN_UP_FIELDS.lastName}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
          error={errors?.lastName?.message}
        />
        <label className={styles.customLabels}>{i18next.t('SignUp:email')}</label>
        <CustomInput
          name={SIGN_UP_FIELDS.email}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: i18next.t('SignUp:invalidEmail')
            }
          })}
          error={errors?.email?.message}
          type="email"
        />
        <label className={styles.customLabels}>{i18next.t('SignUp:password')}</label>
        <CustomInput
          name={SIGN_UP_FIELDS.password}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
          error={errors?.password?.message}
          type="password"
        />
        <label className={styles.customLabels}>{i18next.t('SignUp:confirmPassword')}</label>
        <CustomInput
          name={SIGN_UP_FIELDS.passwordConfirmation}
          inputRef={register({
            required: { value: true, message: i18next.t('SignUp:required') },
            validate: value => value === watch('password') || (i18next.t('SignUp:passwordsNoMatch') as string)
          })}
          error={errors?.passwordConfirmation?.message}
          type="password"
        />
        <button className={`${styles.customButton} ${styles.signupButton}`} type="submit">
          {i18next.t('SignUp:signUp')}
        </button>
        <hr className={styles.separator} />
        <button className={`${styles.customButton} ${styles.loginButton}`} type="button">
          {i18next.t('SignUp:login')}
        </button>
      </form>
    </div>
  );
}
