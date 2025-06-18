import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, ActionButtonType } from '../../const';
import { useState } from 'react';
import { Popper, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import ActionButton from '../action-button/action-button';
import { logoutUser, getAuthorizationStatus } from '../../store/slices/user-slice';
import { keycloak } from '../../keycloak';
import { checkAuthAction } from '../../store/api-actions';
import { useMediaQuery } from '@mui/material';
import { getCountNewNotification, getCountExpectationCode } from '../../store/slices/new-notifications-slice';
import { getCorrectNewEnding, getCorrectNotificationEnding } from '../../utils';

export default function Header() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const newNotificationsCount = useAppSelector(getCountNewNotification);
  const expectationsResevalCount = useAppSelector(getCountExpectationCode);

  const isTablet = useMediaQuery('(max-width: 768px)');

  const [reservalsAnchorEl, setReservalsAnchorEl] = useState<null | HTMLElement>(null);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const openReservalsPopper = Boolean(reservalsAnchorEl);
  const openNotifyPopper = Boolean(notifyAnchorEl);
  const openProfilePopper = Boolean(profileAnchorEl);

  const handleReservalsToggle = (event: React.MouseEvent<HTMLElement>) => {
    setReservalsAnchorEl(reservalsAnchorEl ? null : event.currentTarget);
  };

  const handleNotifyToggle = (event: React.MouseEvent<HTMLElement>) => {
    setNotifyAnchorEl(notifyAnchorEl ? null : event.currentTarget);
  };

  const handleProfileToggle = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(profileAnchorEl ? null : event.currentTarget);
  };

  const handleReservalsMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!reservalsAnchorEl) setReservalsAnchorEl(event.currentTarget);
  };
  
  const handleReservalsMouseLeave = () => {
    if (reservalsAnchorEl) setReservalsAnchorEl(null);
  };

  const handleNotifyMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!notifyAnchorEl) setNotifyAnchorEl(event.currentTarget);
  };
  
  const handleNotifyMouseLeave = () => {
    if (notifyAnchorEl) setNotifyAnchorEl(null);
  };

  const handleProfileMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!profileAnchorEl) setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMouseLeave = () => {
    if (profileAnchorEl) setProfileAnchorEl(null);
  };
  
  const handleAuthModal = () => {
    keycloak.login();
    dispatch(checkAuthAction());
  };

  const handleClose = () => {
    keycloak.logout();
    dispatch(logoutUser());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.topMenu}>
          <Link className={styles.logo} to={AppRoute.Root}></Link>
          <div className={styles.desktopNav}>
            <span className={styles.city}>
              <img className={styles.geo} src="../img/icon_geo_white.svg" alt="Geo Icon" />
              Екатеринбург
            </span>

            {(authorizationStatus !== AuthorizationStatus.ADMIN) && (
              <div
                className={styles.container}
                onMouseEnter={handleReservalsMouseEnter}
                onMouseLeave={handleReservalsMouseLeave}
              >
                <button className={styles.book} onClick={handleReservalsToggle}></button>
                <Popper
                  open={openReservalsPopper} 
                  anchorEl={reservalsAnchorEl} 
                  placement="bottom-end" 
                  sx={{
                    width: isTablet ? '50%' : '356px',
                    boxShadow: '0px 4px 16px 0px rgba(20, 25, 26, 0.08)',
                  }}
                  disablePortal
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: { xs: '8px', sm: '12px', md: '14px' },
                      px: { xs: '10px', sm: '15px', md: '17px' },
                      mt: '9px',
                    }}
                  >
                    {!(authorizationStatus === AuthorizationStatus.USER) ? (
                      <>
                        <p className={styles.titlePopper}>Ой! Мы еще не знакомы :(</p>
                        <ActionButton
                          text="Войти или зарегистрироваться"
                          onClick={handleAuthModal}
                          variant={ActionButtonType.Red}
                        />
                      </>
                    ) : (
                      <>
                        <Link className={styles.containerText} to={AppRoute.Reservals}>
                          <img className={styles.profile} src="../img/book.svg" alt="book icon" />
                          <p className={styles.title}>Бронирования</p>
                        </Link>
                        {expectationsResevalCount > 0 
                          ? <p className={styles.text}>Необходимо подтвердить бронь!</p> 
                          : <p className={styles.text}>У Вас нет предстоящих бронирований(</p>
                        }
                      </>
                    )}
                  </Paper>
                </Popper>
              </div>
            )}

            {(authorizationStatus !== AuthorizationStatus.ADMIN) && (
              <div
                className={styles.container}
                onMouseEnter={handleNotifyMouseEnter}
                onMouseLeave={handleNotifyMouseLeave}
              >
                <button className={styles.notify} onClick={handleNotifyToggle}></button>
                <Popper 
                  open={openNotifyPopper} 
                  anchorEl={notifyAnchorEl} 
                  placement="bottom-end" 
                  sx={{
                    width: isTablet ? '50%' : '356px',
                    boxShadow: '0px 4px 16px 0px rgba(20, 25, 26, 0.08)',
                  }}
                  disablePortal
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: { xs: '8px', sm: '12px', md: '14px' },
                      px: { xs: '10px', sm: '15px', md: '17px' },
                      mt: '9px',
                    }}
                  >
                    {!(authorizationStatus === AuthorizationStatus.USER) ? (
                      <>
                        <p className={styles.titlePopper}>Ой! Мы еще не знакомы :(</p>
                        <ActionButton
                          text="Войти или зарегистрироваться"
                          onClick={handleAuthModal}
                          variant={ActionButtonType.Red}
                        />
                      </>
                    ) : (
                      <>
                        <Link className={styles.containerText} to={AppRoute.Notify}>
                          <img className={styles.profile} src="../img/notify.svg" alt="notify icon" />
                          <p className={styles.title}>Уведомления</p>
                        </Link>
                        {newNotificationsCount > 0 
                          ? <p className={styles.text}>У Вас <span className={styles.count}> {newNotificationsCount} {getCorrectNewEnding(newNotificationsCount)}</span> {getCorrectNotificationEnding(newNotificationsCount)}</p> 
                          : <p className={styles.text}>У Вас нет новых уведомлений(</p>
                        }
                      </>
                    )}
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
              <Popper 
                open={openProfilePopper} 
                anchorEl={profileAnchorEl} 
                placement="bottom-end" 
                sx={{ 
                  width: isTablet ? '50%' : '356px',
                }}
                disablePortal
              >
                <Paper
                  elevation={0}
                  sx={{
                    py: { xs: '8px', sm: '12px', md: '14px' },
                    px: { xs: '10px', sm: '15px', md: '17px' },
                    mt: '9px',
                  }}
                >
                  {!(authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN) ? (
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
                        <img className={styles.profile} src="../img/profile.svg" alt="profile icon" />
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
        </div>
        <div className={styles.bottomMenu}>
          <Link 
            to={AppRoute.Profile} 
            className={styles.mobileLink}
            onClick={() => {
              if (!(authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN)) {
                handleAuthModal();
              }
            }}
          >
            Личный кабинет
          </Link>
          <Link 
            to={AppRoute.Notify} 
            className={styles.mobileLink}
            onClick={(e) => {
              if (!(authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN)) {
                e.preventDefault();
                handleAuthModal();
              }
            }}
          >
            Уведомления
          </Link>
          {(authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN) && (
            <button 
              className={styles.mobileLink}
              onClick={handleClose}
            >
              Выйти
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
