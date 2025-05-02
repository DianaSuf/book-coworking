import { Dialog } from '@mui/material';
import styles from './base-modal.module.css'

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
       <div className={styles.modal}>
        <img src='../img/logo_white.svg' className={styles.logo}/>
        {children}
      </div>
    </Dialog>
  );
};

export default BaseModal;
