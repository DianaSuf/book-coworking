import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Modal from './modal/modal';
import LoginModal from './login-modal/login-modal';
import RegisterModal from './register-modal/register-modal';
import ForgotPasswordModal from './forgot-password-modal/forgot-password-modal';
import ConfirmRegisterModal from './confirm-register-modal/confirm-register-modal';
import SuccessReservalModal from './success-reserval-modal/success-reserval-modal';
import ConfirmBookingModal from './confirm-booking-modal/confirm-booking-modal';
import SuccessConfirmPasswordModal from './success-confirm-password-modal/success-confirm-password-modal';
import { closeModal, openModal } from '../store/slices/modal-slice';
import { ModalType } from '../const';

export default function AuthModals() {
  const dispatch = useAppDispatch();
  const { currentModal } = useAppSelector((state) => state.modal);
  const [email, setEmail] = useState<string>('');

  const closeCurrentModal = () => {
    dispatch(closeModal());
  };

  const handleRegisterSuccess = (email: string) => {
    setEmail(email);
    dispatch(openModal(ModalType.ConfirmRegister));
  };

  return (
    <>
      {currentModal === ModalType.Login && (
        <Modal isOpen onClose={closeCurrentModal}>
          <LoginModal
            onSwitch={() => dispatch(openModal(ModalType.Register))}
            onClose={closeCurrentModal}
            onForgotPassword={() => dispatch(openModal(ModalType.ForgotPassword))}
          />
        </Modal>
      )}
      {currentModal === ModalType.Register && (
        <Modal isOpen onClose={closeCurrentModal}>
          <RegisterModal
            onSwitch={() => dispatch(openModal(ModalType.Login))}
            onClose={closeCurrentModal}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </Modal>
      )}
      {currentModal === ModalType.ForgotPassword && (
        <Modal isOpen onClose={closeCurrentModal}>
          <ForgotPasswordModal
            onSuccess={() => dispatch(openModal(ModalType.SuccessConfirmPassword))}
          />
        </Modal>
      )}
      {currentModal === ModalType.ConfirmRegister && (
        <Modal isOpen onClose={closeCurrentModal}>
          <ConfirmRegisterModal onClose={closeCurrentModal}  email={email}/>
        </Modal>
      )}
      {currentModal === ModalType.SuccessReserval && (
        <Modal isOpen onClose={closeCurrentModal}>
          <SuccessReservalModal
            onClose={closeCurrentModal}
          />
        </Modal>
      )}
      {currentModal === ModalType.ConfirmBooking && (
        <Modal isOpen onClose={closeCurrentModal}>
          <ConfirmBookingModal />
        </Modal>
      )}
      {currentModal === ModalType.SuccessConfirmPassword && (
        <Modal isOpen onClose={closeCurrentModal}>
          <SuccessConfirmPasswordModal
            onClose={closeCurrentModal}
          />
        </Modal>
      )}
    </>
  );
};
