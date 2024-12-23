import styles from './header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, ActionButtonType } from '../../const';
import { useState } from 'react';
import { Popper, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Modal from '../modal/modal';
import ConfirmRegisterModal from '../confirm-register-modal/confirm-register-modal';
import ForgotModal from '../forgot-modal/forgot-modal';
import LoginModal from '../login-modal/login-modal';
import RegisterModal from '../register-modal/register-modal';
import ActionButton from '../action-button/action-button';
import { logoutUser, getAuthorizationStatus } from '../../store/slices/user-slice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    if (anchorEl) setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const [isForgotModalOpen, setIsForgotModalOpen] = useState<boolean>(false);

  const openForgotModal = () => setIsForgotModalOpen(true);
  const closeForgotModal = () => setIsForgotModalOpen(false);

  const [showLogin, setShowLogin] = useState<boolean>(true);

  const handleClose = () => {
    dispatch(logoutUser());
  }

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <Link className={styles.logo} to={AppRoute.Root}></Link>
        <div className={styles.infoCity}>
          <img className={styles.geo} src="../img/icon_geo_white.svg" alt="Geo Icon" />
          <span className={styles.city}>Екатеринбург</span>
        </div>
        <button className={styles.notify} onClick={() => navigate(AppRoute.Notify)}></button>

        <div
          className={styles.profileContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.profile} onClick={handleToggleClick}></button>
          <Popper open={open} anchorEl={anchorEl} placement="bottom-end" sx={{ width: 360 }} disablePortal>
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
                  <ActionButton text="Войти или зарегистрироваться" onClick={openModal} variant={ActionButtonType.Red} />
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
        <Modal isOpen={isOpen} onClose={closeModal}>
          {showLogin ? (
            <LoginModal onSwitch={() => setShowLogin(false)} onClose={closeModal} onForgotPassword={openForgotModal} />
          ) : (
            <RegisterModal onSwitch={() => setShowLogin(true)} onClose={closeModal} onRegisterSuccess={openConfirmModal} />
          )}
        </Modal>
        <Modal isOpen={isForgotModalOpen} onClose={closeForgotModal}>
          <ForgotModal />
        </Modal>
        <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
          <ConfirmRegisterModal onClose={closeConfirmModal} />
        </Modal>
      </nav>
    </header>
  );
}
