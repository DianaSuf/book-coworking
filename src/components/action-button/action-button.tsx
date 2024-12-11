import styles from './action-button.module.css'
import { ActionButtonType } from '../../const';

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  variant: ActionButtonType;
  buttonType?: 'submit' | 'button';
}

export default function ActionButton({text, onClick, variant, buttonType = 'button'}: ActionButtonProps) {
  const buttonClass = styles[`action-button--${variant}`];

  return (
    <button className={buttonClass} onClick={onClick} type={buttonType}>
      {text}
    </button>
  )
}
