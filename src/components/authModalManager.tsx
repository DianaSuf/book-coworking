import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Modal from './modal/modal';
import LoginModal from './login-modal/login-modal';
import RegisterModal from './register-modal/register-modal';
import ForgotPasswordModal from './forgot-password-modal/forgot-password-modal';
import ConfirmRegisterModal from './confirm-register-modal/confirm-register-modal';
import SuccessReservalModal from './success-reserval-modal/success-reserval-modal';
import { closeModal, openModal } from '../store/slices/modal-slice';

export default function AuthModals() {
  const dispatch = useAppDispatch();
  const { currentModal } = useAppSelector((state) => state.modal);
  const [email, setEmail] = useState<string>('');

  const closeCurrentModal = () => {
    dispatch(closeModal());
  };

  const handleRegisterSuccess = (email: string) => {
    setEmail(email);
    dispatch(openModal('confirmRegister'));
  };

  return (
    <>
      {currentModal === 'login' && (
        <Modal isOpen onClose={closeCurrentModal}>
          <LoginModal
            onSwitch={() => dispatch(openModal('register'))}
            onClose={closeCurrentModal}
            onForgotPassword={() => dispatch(openModal('forgotPassword'))}
          />
        </Modal>
      )}
      {currentModal === 'register' && (
        <Modal isOpen onClose={closeCurrentModal}>
          <RegisterModal
            onSwitch={() => dispatch(openModal('login'))}
            onClose={closeCurrentModal}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </Modal>
      )}
      {currentModal === 'forgotPassword' && (
        <Modal isOpen onClose={closeCurrentModal}>
          <ForgotPasswordModal />
        </Modal>
      )}
      {currentModal === 'confirmRegister' && (
        <Modal isOpen onClose={closeCurrentModal}>
          <ConfirmRegisterModal onClose={closeCurrentModal}  email={email}/>
        </Modal>
      )}
      {currentModal === 'successReserval' && (
        <Modal isOpen onClose={closeCurrentModal}>
          <SuccessReservalModal
            onClose={closeCurrentModal}
          />
        </Modal>
      )}
    </>
  );
};
