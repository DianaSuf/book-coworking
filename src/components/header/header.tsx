import styles from './header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, ActionButtonType } from '../../const';
import { useState } from 'react';
import { Popper, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { openModal } from '../../store/slices/modal-slice';
import AuthModals from '../authModalManager';
import ActionButton from '../action-button/action-button';
import { logoutUser, getAuthorizationStatus } from '../../store/slices/user-slice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [notifyAnchorEl, setNotifyAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const openNotifyPopper = Boolean(notifyAnchorEl);
  const openProfilePopper = Boolean(profileAnchorEl);

  const handleNotifyClick = (event: React.MouseEvent<HTMLElement>) => {
    if (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
      setNotifyAnchorEl(notifyAnchorEl ? null : event.currentTarget);
    } else {
      navigate(AppRoute.Notify);
    }
  };

  const handleProfileToggle = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(profileAnchorEl ? null : event.currentTarget);
  };

  const handleNotifyMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if ((authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) && !notifyAnchorEl) {
      setNotifyAnchorEl(event.currentTarget);
    }
  };
  
  const handleNotifyMouseLeave = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
      setNotifyAnchorEl(null);
    }
  };

  const handleProfileMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!profileAnchorEl) setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMouseLeave = () => {
    if (profileAnchorEl) setProfileAnchorEl(null);
  };

  const handleAuthModal = () => {
    dispatch(openModal('login'));
  };

  const handleClose = () => {
    dispatch(logoutUser());
  }

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <Link className={styles.logo} to={AppRoute.Root}></Link>
        <div className={styles.nav}>
          <div className={styles.infoCity}>
            <span className={styles.city}><img className={styles.geo} src="../img/icon_geo_white.svg" alt="Geo Icon" />Екатеринбург</span>
          </div>
          {(authorizationStatus !== AuthorizationStatus.ADMIN) && (
            <div
              className={styles.container}
              onMouseEnter={handleNotifyMouseEnter}
              onMouseLeave={handleNotifyMouseLeave}
            >
              <button className={styles.notify} onClick={handleNotifyClick}></button>
              <Popper open={openNotifyPopper} anchorEl={notifyAnchorEl} placement="bottom-end" sx={{ width: 360 }} disablePortal>
                <Paper
                  elevation={0}
                  sx={{
                    py: { xs: '8px', sm: '12px', md: '14px' },
                    px: { xs: '10px', sm: '15px', md: '17px' },
                    mt: '9px',
                  }}
                >
                  <p className={styles.title}>Ой! Мы еще не знакомы :(</p>
                  <ActionButton
                    text="Войти или зарегистрироваться"
                    onClick={handleAuthModal}
                    variant={ActionButtonType.Red}
                  />
                </Paper>
              </Popper>
            </div>
          )}

          <div
            className={styles.container}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <button className={styles.profile} onClick={handleProfileToggle}></button>
            <Popper open={openProfilePopper} anchorEl={profileAnchorEl} placement="bottom-end" sx={{ width: 360 }} disablePortal>
              <Paper
                elevation={0}
                sx={{
                  py: { xs: '8px', sm: '12px', md: '14px' },
                  px: { xs: '10px', sm: '15px', md: '17px' },
                  mt: '9px',
                }}
              >
                {(authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) ? (
                  <>
                    <p className={styles.title}>Личный кабинет</p>
                    <p className={styles.text}>
                      Получите возможность бронировать места и отслеживать статус брони.
                    </p>
                    <ActionButton text="Войти или зарегистрироваться" onClick={handleAuthModal} variant={ActionButtonType.Red} />
                  </>
                ) : (
                  <>
                    <Link className={styles.containerText} to={AppRoute.Profile}>
                      <img className={styles.profileImg} src="../img/profile.svg" alt="profile icon" />
                      <p className={styles.title}>Личный кабинет</p>
                    </Link>
                    <div className={styles.containerButton}>
                      <ActionButton text="Выйти" onClick={handleClose} variant={ActionButtonType.Red} />
                    </div>
                  </>
                )}
              </Paper>
            </Popper>
          </div>
        </div>
      </nav>
      <AuthModals />
    </header>
  );
}
