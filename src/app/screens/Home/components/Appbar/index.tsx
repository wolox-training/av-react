import i18next from 'i18next';
import React from 'react';
import { useHistory } from 'react-router';

import { PATHS } from '~constants/paths';
import LocalStorageService from '~services/LocalStorageService';
import { TOKEN_KEY } from '~config/api/constants';
import WoloxImg from '~app/assets/wolox-logo.png';

import styles from './styles.module.scss';

function Appbar() {
  const history = useHistory();
  const logout = () => {
    LocalStorageService.removeValue(TOKEN_KEY);
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
