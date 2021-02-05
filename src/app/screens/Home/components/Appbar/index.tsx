import i18next from 'i18next';
import React from 'react';
import { useHistory } from 'react-router';

import { PATHS } from '~constants/paths';
import LocalStorageService from '~services/LocalStorageService';
import { CLIENT_KEY, TOKEN_KEY, UID_KEY } from '~utils/constants';
import { useDispatch, actionCreators } from '~app/contexts/User/reducer';

import WoloxImg from '../../../Assets/wolox-logo.png';

import styles from './styles.module.scss';

export default function Appbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actionCreators.closeSession());
    LocalStorageService.removeValue(TOKEN_KEY);
    LocalStorageService.removeValue(UID_KEY);
    LocalStorageService.removeValue(CLIENT_KEY);
    history.push(PATHS.login);
  };

  return (
    <header className={`${styles.appbar} row space-around middle`}>
      <img src={WoloxImg} alt={i18next.t('Home:logoAlt') as string} className={styles.logo} />
      <h2 className={styles.logout} onClick={logout}>
        {i18next.t('Home:logout')}
      </h2>
    </header>
  );
}
