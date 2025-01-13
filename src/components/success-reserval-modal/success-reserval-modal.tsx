import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './success-reserval-modal.module.css'

interface ConfirmBookingModalProps {
  onClose: () => void;
}

export default function SuccessReservalModal({ onClose }: ConfirmBookingModalProps) {
  return (
    <>
      <h1 className={styles.title}>Успешно!</h1>
      <p className={styles.text}>Вы забронировали коворкинг.</p>
      {/* <p className={styles.text}>Вы забронировали коворкинг на 19.01.22 с 9:00 до 10:00.</p> */}
      <p className={styles.text}>Ждём Вас!</p>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
