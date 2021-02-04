import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { User } from '~utils/types';
import { signUp } from '~services/UserService';
import CustomErrorDisplayer from '~components/CustomErrorDisplayer';
import Loading from '~components/Spinner/components/loading';
import CustomInput from '~components/CustomInput';
import { PATHS } from '~constants/paths';
// eslint-disable-next-line import/namespace
import { useLazyRequest } from '~hooks/useRequest';

import WoloxImg from '../Assets/wolox-logo.png';

import { SIGN_UP_FIELDS } from './constants';
import styles from './styles.module.scss';

interface FormData extends User {
  passwordConfirmation?: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, errors } = useForm<FormData>({ mode: 'all' });
  const [, loading, error, sendRequest] = useLazyRequest({
    request: signUp
  });
  const onSubmit = handleSubmit(data => {
    data.locale = i18next.language;
    sendRequest(data);
  });

  return (
    <div className="column center">
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
            validate: value =>
              value === watch(SIGN_UP_FIELDS.password) || (i18next.t('SignUp:passwordsNoMatch') as string)
          })}
          error={errors.passwordConfirmation?.message}
          type="password"
          label={i18next.t('SignUp:confirmPassword') as string}
          labelClassName={styles.customLabel}
        />
        <div className={`column ${styles.signupButtonContainer}`}>
          <button
            className={`${styles.customButton} ${styles.signupButton} `}
            type="submit"
            disabled={loading}
          >
            {i18next.t('SignUp:signUp')}
          </button>
        </div>
        <Link to={PATHS.login} className="row">
          <button
            className={`${styles.customButton} ${styles.loginButton}  full-width`}
            type="button"
            disabled={loading}
          >
            {i18next.t('SignUp:login')}
          </button>
        </Link>
      </form>
      {loading && <Loading className={styles.loading} />}
      {error?.errorData?.errors.fullMessages.length && (
        <CustomErrorDisplayer errors={error.errorData?.errors.fullMessages} />
      )}
    </div>
  );
}
