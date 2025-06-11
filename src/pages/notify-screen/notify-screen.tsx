import styles from './notify-screen.module.scss'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Notification from '../../components/card/notification'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchNotificationsAction } from '../../store/api-actions'
import { getNotificationFormsFalse, getNotificationFormsTrue } from '../../store/slices/notifications-slice'

export default function NotifyScreen() {
  const dispatch = useAppDispatch()
  const notificationFormsFalse = useAppSelector(getNotificationFormsFalse)
  const notificationFormsTrue = useAppSelector(getNotificationFormsTrue)

  useEffect(() => {
    dispatch(fetchNotificationsAction())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main className={styles.notify}>
        <div className={styles.notifySection}>
          <h2>Уведомления</h2>
          {notificationFormsFalse.length === 0 && notificationFormsTrue.length === 0 ? (
            <h3>Пусто</h3>
          ) : (
            <>
              {notificationFormsFalse.length > 0 && (
                <section className={styles.notificationsNew}>
                  <h3 className={styles.title}>Новые</h3>
                  <Notification notifications={notificationFormsFalse} />
                </section>
              )}
              {notificationFormsTrue.length > 0 && (
                <section className={styles.notificationsOld}>
                  <h3 className={styles.title}>Прочитанные</h3>
                  <Notification notifications={notificationFormsTrue} />
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
