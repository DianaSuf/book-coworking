import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './confirm-register-modal.module.css'

interface ConfirmRegisterModalProps {
  onClose: () => void;
  email: string;
}

export default function ConfirmRegisterModal({ onClose, email }: ConfirmRegisterModalProps) {
  return (
    <>
      <h1 className={styles.title}>Письмо отправлено!</h1>
      <p className={styles.text}>Для использования личного кабинета нажмите кнопку подтверждения в письме, отправленном на адрес {email}</p>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
