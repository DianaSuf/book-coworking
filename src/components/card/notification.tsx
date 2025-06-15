import { INotification } from '../../types/notification-data'
import Card from './base-card/card'

type NotificationProps = {
  notifications: INotification[]
}

export default function Notification({ notifications }: NotificationProps) {
  return (
    <>
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          title={<h5>{notification.title}</h5>}
          timeText={notification.timeSend}
          text={notification.text}
        />
      ))}
    </>
  )
}
