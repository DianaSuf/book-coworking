import ActionButton from "../../action-button/action-button";
import { ActionButtonType } from "../../../const";
import styles from './success-reset-password-modal.module.css'

interface SuccessResetPasswordProps {
  onClose: () => void;
}

export default function SuccessResetPasswordModal({ onClose }: SuccessResetPasswordProps) {
  return (
    <>
      <h1 className={styles.title}>Успешно!</h1>
      <p className={styles.text}>Ваш пароль изменён.</p>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
