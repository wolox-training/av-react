import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import WoloxImg from './assets/wolox-logo.png';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  locale?: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, errors } = useForm<User>({ mode: 'all' });
  const onSubmit = handleSubmit(data => {
    data.locale = i18next.language;
    console.log(data);
  });

  return (
    <div className="row center">
      <form onSubmit={onSubmit} className={`column ${styles.signupForm}`}>
        <div className={styles.header} />
        <div className={styles['wolox-logo-wrapper']}>
          <img src={WoloxImg} alt={i18next.t('SignUp:logoAlt') as string} className={styles['wolox-logo']} />
        </div>
        <label className={styles['custom-labels']}>{i18next.t('SignUp:firstName')}</label>

        <input
          name="first_name"
          className={styles['custom-inputs']}
          ref={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
        />
        {errors.first_name && <label className={styles['error-labels']}>{errors.first_name.message}</label>}
        <label className={styles['custom-labels']}>{i18next.t('SignUp:lastName')}</label>
        <input
          name="last_name"
          className={styles['custom-inputs']}
          ref={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
        />
        {errors.last_name && <label className={styles['error-labels']}>{errors.last_name.message}</label>}
        <label className={styles['custom-labels']}>{i18next.t('SignUp:email')}</label>
        <input
          name="email"
          className={styles['custom-inputs']}
          type="email"
          ref={register({
            required: { value: true, message: i18next.t('SignUp:required') },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: i18next.t('SignUp:invalidEmail')
            }
          })}
        />
        {errors.email && <label className={styles['error-labels']}>{errors.email.message}</label>}
        <label className={styles['custom-labels']}>{i18next.t('SignUp:password')}</label>
        <input
          name="password"
          type="password"
          className={styles['custom-inputs']}
          ref={register({
            required: { value: true, message: i18next.t('SignUp:required') }
          })}
        />
        {errors.password && <label className={styles['error-labels']}>{errors.password.message}</label>}
        <label className={styles['custom-labels']}>{i18next.t('SignUp:confirmPassword')}</label>
        <input
          name="password_confirmation"
          className={styles['custom-inputs']}
          type="password"
          ref={register({
            required: { value: true, message: i18next.t('SignUp:required') },
            validate: value => value === watch('password') || (i18next.t('SignUp:passwordsNoMatch') as string)
          })}
        />
        {errors.password_confirmation && (
          <label className={styles['error-labels']}>{errors.password_confirmation.message}</label>
        )}
        <button className={`${styles['custom-button']} ${styles['signup-button']}`} type="submit">
          {i18next.t('SignUp:signUp')}
        </button>
        <hr className={styles.separator} />
        <button className={`${styles['custom-button']} ${styles['login-button']}`} type="button">
          {i18next.t('SignUp:login')}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
