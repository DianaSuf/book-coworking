import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BaseModal from './base-modal/base-modal';
import LoginModal from './login-modal/login-modal';
import RegisterModal from './register-modal/register-modal';
import ForgotPasswordModal from './forgot-password-modal/forgot-password-modal';
import ConfirmRegisterModal from './confirm-register-modal/confirm-register-modal';
import SuccessReservalModal from './success-reserval-modal/success-reserval-modal';
import ConfirmBookingModal from './confirm-booking-modal/confirm-booking-modal';
import SuccessConfirmPasswordModal from './success-confirm-password-modal/success-confirm-password-modal';
import SuccessConfirmBookingModal from './success-confirm-booking-modal/success-confirm-booking-modal';
import SuccessResetPasswordModal from './success-reset-password-modal/success-reset-password-modal';
import { closeModal, openModal , getCurrentModal} from '../../store/slices/modal-slice';
import { ModalType } from '../../const';

export default function AuthModals() {
  const dispatch = useAppDispatch();
  const currentModal = useAppSelector(getCurrentModal);
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
        <BaseModal isOpen onClose={closeCurrentModal}>
          <LoginModal
            onSwitch={() => dispatch(openModal(ModalType.Register))}
            onClose={closeCurrentModal}
            onForgotPassword={() => dispatch(openModal(ModalType.ForgotPassword))}
          />
        </BaseModal>
      )}
      {currentModal === ModalType.Register && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <RegisterModal
            onSwitch={() => dispatch(openModal(ModalType.Login))}
            onClose={closeCurrentModal}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </BaseModal>
      )}
      {currentModal === ModalType.ForgotPassword && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <ForgotPasswordModal
            onSuccess={() => dispatch(openModal(ModalType.SuccessConfirmPassword))}
          />
        </BaseModal>
      )}
      {currentModal === ModalType.ConfirmRegister && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <ConfirmRegisterModal onClose={closeCurrentModal}  email={email}/>
        </BaseModal>
      )}
      {currentModal === ModalType.SuccessReserval && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <SuccessReservalModal
            onClose={closeCurrentModal}
          />
        </BaseModal>
      )}
      {currentModal === ModalType.ConfirmBooking && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <ConfirmBookingModal />
        </BaseModal>
      )}
      {currentModal === ModalType.SuccessConfirmPassword && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <SuccessConfirmPasswordModal
            onClose={closeCurrentModal}
          />
        </BaseModal>
      )}
      {currentModal === ModalType.SuccessConfirmBooking && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <SuccessConfirmBookingModal
            onClose={closeCurrentModal}
          />
        </BaseModal>
      )}
      {currentModal === ModalType.SuccessResetPassword && (
        <BaseModal isOpen onClose={closeCurrentModal}>
          <SuccessResetPasswordModal
            onClose={closeCurrentModal}
          />
        </BaseModal>
      )}
    </>
  );
};
