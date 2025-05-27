import { INotification } from '../../types/notification-data'
import styles from './notification.module.scss'

type NotificationProps = {
  notifications: INotification[]
}

export default function Notification({ notifications }: NotificationProps) {
  return (
    <>
      {notifications.map((notification) => (
        <div className={styles.book} key={notification.id}>
          <div className={styles.content}>
            <p className={styles.text}>
              Вы забронировали коворкинг {notification.dateReserval} с {notification.timeStartReserval} до{' '}
              {notification.timeEndReserval}! Место {notification.table}.
            </p>
            <p className={styles.text}>Необходимо подтвердить присутствие.</p>
          </div>
        </div>
      ))
      }
    </>
  )
}
