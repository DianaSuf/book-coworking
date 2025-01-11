import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './success-forgot-password-modal.module.css'

interface ConfirmPasswordModalProps {
  onClose: () => void;
}

export default function SuccessConfirmPasswordModal({ onClose }: ConfirmPasswordModalProps) {
  return (
    <>
      <h1 className={styles.title}>Забыли пароль?</h1>
      <p className={styles.text}>Проверьте почту!</p>
      <p className={styles.text}>Письмо для смены пароля уже ждет Вас.</p>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
