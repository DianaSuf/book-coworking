import ActionButton from "../../action-button/action-button";
import { ActionButtonType } from "../../../const";
import { useAppSelector } from "../../../hooks";
import { getReservationData } from "../../../store/slices/modal-slice";
import styles from './success-reserval-modal.module.css'

interface SuccessReservalProps {
  onClose: () => void;
}

export default function SuccessReservalModal({ onClose }: SuccessReservalProps) {
  const reservationData = useAppSelector(getReservationData);

  return (
    <>
      <h1 className={styles.title}>Успешно!</h1>
      <div className={styles.content}>
        <p className={styles.text}>Вы забронировали коворкинг на {reservationData?.date} с {reservationData?.timeStart} до {reservationData?.timeEnd}.</p>
        <p className={styles.text}>Ждём Вас!</p>
      </div>
      <ActionButton text="Отлично!" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
