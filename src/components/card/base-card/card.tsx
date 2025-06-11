import { ReactNode } from 'react'
import styles from './card.module.scss'

type CardProps = {
  title: ReactNode
  timeText: string
  text: string
  actionButton?: ReactNode
  status?: ReactNode
}

export default function Card({ title, timeText, text, actionButton, status }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>
          {title}
          <p className={styles.timeText}>{timeText}</p>
          {status}
        </div>
        <p className={styles.text}>{text}</p>
      </div>
      {actionButton}
    </div>
  )
}
