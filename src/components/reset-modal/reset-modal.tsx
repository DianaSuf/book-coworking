import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './confirm-modal.module.css'

interface ResetModalProps {
  onClose: () => void;
}

export default function ResetModal({ onClose }: ResetModalProps) {
  return (
    <>
      <h1 className={styles.title}>Забыли пароль?</h1>
      <ActionButton text="Применить" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
