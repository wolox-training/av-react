import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { User, UserRequestSuccess } from '~utils/types';
import { login } from '~services/UserService';
// eslint-disable-next-line import/namespace
import { useLazyRequest } from '~app/hooks/useRequest';
import Loading from '~components/Spinner/components/loading';
import CustomErrorDisplayer from '~components/CustomErrorDisplayer';
import { PATHS } from '~constants/paths';
import { CLIENT_KEY, TOKEN_KEY, UID_KEY } from '~utils/constants';
import LocalStorageService from '~services/LocalStorageService';
import CustomInput from '~components/CustomInput';

import WoloxImg from '../Assets/wolox-logo.png';

import { LOGIN_FIELDS } from './constants';
import styles from './styles.module.scss';

export default function Login() {
  const history = useHistory();

  const loginSuccess = (data?: UserRequestSuccess) => {
    if (data) {
      LocalStorageService.setValue(TOKEN_KEY, data.accessToken);
      LocalStorageService.setValue(UID_KEY, data.uid);
      LocalStorageService.setValue(CLIENT_KEY, data.client);
      history.push(PATHS.home);
    }
  };

  const { register, handleSubmit, errors } = useForm<User>({ mode: 'all' });
  const [, loading, error, sendRequest] = useLazyRequest({
    request: login,
    withPostSuccess: loginSuccess
  });
  const onSubmit = handleSubmit(data => sendRequest(data));
  return (
    <div className="column center">
      <form className={`column ${styles.loginForm}`} onSubmit={onSubmit}>
        <img src={WoloxImg} alt={i18next.t('Login:logoAlt') as string} className={styles.logo} />
        <CustomInput
          name={LOGIN_FIELDS.email}
          inputRef={register({
            required: { value: true, message: i18next.t('Login:required') },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: i18next.t('Login:invalidEmail')
            }
          })}
          error={errors.email?.message}
          label={i18next.t('Login:email') as string}
          labelClassName={styles.customLabel}
          type="email"
        />
        <CustomInput
          name={LOGIN_FIELDS.password}
          inputRef={register({
            required: { value: true, message: i18next.t('Login:required') }
          })}
          error={errors.password?.message}
          label={i18next.t('Login:password') as string}
          labelClassName={styles.customLabel}
          type="password"
        />
        <div className={`column ${styles.loginButtonContainer}`}>
          <button className={`${styles.customButton} ${styles.loginButton}`} disabled={loading} type="submit">
            {i18next.t('Login:login')}
          </button>
        </div>
        <Link to={PATHS.signup} className="row">
          <button
            className={`${styles.customButton} ${styles.signupButton} full-width`}
            type="button"
            disabled={loading}
          >
            {i18next.t('Login:signUp')}
          </button>
        </Link>
      </form>
      {loading && <Loading className={styles.loading} />}
      {error?.errorData?.errors.length && <CustomErrorDisplayer errors={error.errorData?.errors} />}
    </div>
  );
}
