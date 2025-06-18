import { ReactNode } from 'react'
import { useMediaQuery } from '@mui/material'
import styles from './card.module.scss'

type CardProps = {
  title: ReactNode
  timeText: string
  text: string
  actionButtons?: ReactNode[]
  status?: ReactNode
}

export default function Card({ title, timeText, text, actionButtons, status }: CardProps) {
  const isTablet = useMediaQuery('(max-width: 768px)')

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {isTablet && status}
        <div className={styles.title}>
          {title}
          <p className={styles.timeText}>{timeText}</p>
          {!isTablet && status}
        </div>
        <p className={styles.text}>{text}</p>
      </div>
      {actionButtons && actionButtons.length > 0 && (
        <div className={styles.actions}>
          {actionButtons.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
        </div>
      )}
    </div>
  )
}
