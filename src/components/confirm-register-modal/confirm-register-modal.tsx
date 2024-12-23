import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './confirm-register-modal.module.css'

interface ConfirmRegisterModalProps {
  onClose: () => void;
}

export default function ConfirmRegisterModal({ onClose }: ConfirmRegisterModalProps) {
  return (
    <>
      <h1 className={styles.title}>Письмо отправлено!</h1>
      <p className={styles.text}>Для использования личного кабинета нажмите кнопку подтверждения в письме, отправленном на адрес ezample@urfu.me</p>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
