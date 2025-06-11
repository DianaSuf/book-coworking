import styles from './status.module.scss'

type StatusProps = {
  type: 'green' | 'red' | 'grey'
  text: string
}

export default function Status({ type, text }: StatusProps) {
  const getStatusClass = () => {
    switch (type) {
      case 'green':
        return styles.greenStatus
      case 'red':
        return styles.redStatus
      case 'grey':
        return styles.greyStatus
      default:
        return styles.greenStatus
    }
  }

  return <span className={getStatusClass()}>{text}</span>
}
