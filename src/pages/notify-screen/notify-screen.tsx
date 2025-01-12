import styles from './notify-screen.module.css'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useEffect } from 'react'
import { ReservalType } from '../../const'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchNotificationsAction } from '../../store/api-actions'
import { getReservals, getNotificationsToday, getNotificationsWeek, getNotificationsMonth } from '../../store/slices/notifications-slice'
import { INotification } from '../../types/user-data'

export default function NotifyScreen() {
  const dispatch = useAppDispatch()
  const reservals = useAppSelector(getReservals)
  const notificationsToday = useAppSelector(getNotificationsToday)
  const notificationsWeek = useAppSelector(getNotificationsWeek)
  const notificationsMonth = useAppSelector(getNotificationsMonth)

  useEffect(() => {
    dispatch(fetchNotificationsAction())
  }, [dispatch])

  const renderNotification = (notification: INotification) => {
    return notification.type === ReservalType.CODE ? (
      <div className={styles.book} key={notification.id}>
        <div className={styles.content}>
          <p className={styles.text}>А Вы придёте? Мы Вас ждем</p>
          <p className={styles.text}>
            Вы забронировали коворкинг {notification.dateReserval} с {notification.timeStartReserval} до {notification.timeEndReserval}! Место {notification.table}. Необходимо подтвердить присутствие.
          </p>
        </div>
        <button className={styles.bookBtn}>Подтвердить</button>
      </div>
    ) : (
      <div className={styles.book} key={notification.id}>
        <div className={styles.content}>
          <p className={styles.text}>Пользователь забронировал для Вас место в коворкинге</p>
          <p className={styles.text}>
            {notification.invit} забронировал для Вас место в коворкинге {notification.dateReserval} с {notification.timeStartReserval} до {notification.timeEndReserval}. Место {notification.table}.
          </p>
          <p className={styles.text}>Необходимо подтвердить присутствие.</p>
        </div>
        <button className={styles.bookBtn}>Подтвердить</button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main className={styles.notify}>
        <section className={styles.reservals}>
          <h2 className={styles.title}>Последние бронирования</h2>
          <div className={styles.group}>
            {reservals.length === 0 ? (
              <p className={styles.empty}>Здесь ничего нет(</p>
            ) : (
              reservals.map((reserval) => (
                <div className={styles.book} key={reserval.id}>
                  <div className={styles.content}>
                    <p className={styles.text}>
                      Вы забронировали коворкинг {reserval.dateReserval} с {reserval.timeStartReserval} до {reserval.timeEndReserval}! Место {reserval.table}.
                    </p>
                    <p className={styles.text}>Необходимо подтвердить присутствие.</p>
                  </div>
                  <button className={styles.bookBtn}>Отменить</button>
                </div>
              ))
            )}
          </div>
        </section>
        <section className={styles.notifications}>
          <h2 className={styles.title}>Уведомления</h2>
          <div className={styles.group}>
            {(notificationsToday.length === 0 &&
              notificationsWeek.length === 0 &&
              notificationsMonth.length === 0) && (
              <p className={styles.empty}>Здесь ничего нет(</p>
            )}
            {notificationsToday.length > 0 && (
              <>
                <div className={styles.today}>
                  <h3 className={styles.titleNotifications}>сегодня</h3>
                  {notificationsToday.map(renderNotification)}
                </div>
              </>
            )}
            {notificationsWeek.length > 0 && (
              <>
                <h3 className={styles.titleNotifications}>за неделю</h3>
                <div className={styles.week}>
                  {notificationsWeek.map(renderNotification)}
                </div>
              </>
            )}
            {notificationsMonth.length > 0 && (
              <>
                <h3 className={styles.titleNotifications}>за месяц</h3>
                <div className={styles.month}>
                  {notificationsMonth.map(renderNotification)}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
