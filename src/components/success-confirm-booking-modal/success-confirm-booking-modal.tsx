import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './success-confirm-booking-modal.module.css'

interface ConfirmBookingModalProps {
  onClose: () => void;
}

export default function ConfirmBookingModal({ onClose }: ConfirmBookingModalProps) {
  return (
    <>
      <h1 className={styles.title}>Бронь подтверждена!</h1>
      <p className={styles.text}>Ждем Вас у нас в коворкинге</p>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
