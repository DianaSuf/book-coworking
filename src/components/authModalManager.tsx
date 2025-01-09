import { useAppDispatch, useAppSelector } from '../hooks';
import Modal from './modal/modal';
import LoginModal from './login-modal/login-modal';
import RegisterModal from './register-modal/register-modal';
import ForgotPasswordModal from './forgot-password-modal/forgot-password-modal';
import ConfirmRegisterModal from './confirm-register-modal/confirm-register-modal';
import { closeModal, openModal } from '../store/slices/modal-slice';

export default function AuthModals() {
  const dispatch = useAppDispatch();
  const { currentModal } = useAppSelector((state) => state.modal);

  const closeCurrentModal = () => {
    dispatch(closeModal());
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
            onRegisterSuccess={() => dispatch(openModal('confirmRegister'))}
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
          <ConfirmRegisterModal onClose={closeCurrentModal} />
        </Modal>
      )}
    </>
  );
};
