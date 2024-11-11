import './action-button.css'

interface ActionButtonProps {
  text: string;
}

export default function ActionButton({text}: ActionButtonProps) {

  return (
    <button className="book-button">{text}</button>
  )
}
