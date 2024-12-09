// import './action-button.css'
import styles from './action-button.module.css'

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  variant: 'red' | 'black';
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
