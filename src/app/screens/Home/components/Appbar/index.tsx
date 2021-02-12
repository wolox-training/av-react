import i18next from 'i18next';
import React from 'react';
import { useHistory } from 'react-router';

import { PATHS } from '~constants/paths';
import LocalStorageService from '~services/LocalStorageService';
import { CLIENT_KEY, TOKEN_KEY, UID_KEY } from '~config/api/constants';
import WoloxImg from '~app/assets/wolox-logo.png';
import { actionCreators, useDispatch } from '~app/contexts/User/reducer';

import styles from './styles.module.scss';

function Appbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    LocalStorageService.removeValue(TOKEN_KEY);
    LocalStorageService.removeValue(CLIENT_KEY);
    LocalStorageService.removeValue(UID_KEY);
    dispatch(actionCreators.closeSession());
    history.push(PATHS.login);
  };

  return (
    <nav className={`${styles.appbar} row space-around middle`}>
      <img src={WoloxImg} alt={i18next.t('Home:logoAlt') as string} className={styles.logo} />
      <h2 className={styles.logout} onClick={logout}>
        {i18next.t('Home:logout')}
      </h2>
    </nav>
  );
}

export default Appbar;
