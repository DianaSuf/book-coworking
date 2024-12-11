import { Dialog } from '@mui/material';
import styles from './modal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
       <div className={styles.modal}>
        <img src='../img/logo_white.svg' className={styles.logo}/>
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;
