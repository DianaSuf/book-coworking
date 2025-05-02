import styles from './notify-screen.module.css'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useEffect } from 'react'
import { ReservalType, ModalType, StateType, AuthorizationStatus } from '../../const'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchNotificationsAction, ConfirmReservalGroupAction, CancelReservalAction } from '../../store/api-actions'
import { getReservals, getNotificationsToday, getNotificationsWeek, getNotificationsMonth } from '../../store/slices/notifications-slice'
import { INotification } from '../../types/notification-data'
import AuthModals from '../../components/modal/authModalManager'
import { openModal, setNotificationId } from '../../store/slices/modal-slice'
import { getAuthorizationStatus } from '../../store/slices/user-slice'

export default function NotifyScreen() {
  const dispatch = useAppDispatch()
  const reservals = useAppSelector(getReservals)
  const authorizationStatus = useAppSelector(getAuthorizationStatus)
  const notificationsToday = useAppSelector(getNotificationsToday)
  const notificationsWeek = useAppSelector(getNotificationsWeek)
  const notificationsMonth = useAppSelector(getNotificationsMonth)

  useEffect(() => {
    dispatch(fetchNotificationsAction())
  }, [dispatch])

  const handleConfirmModal = (id: number) => {
    dispatch(setNotificationId(id));
    dispatch(openModal(ModalType.ConfirmBooking));
  };

  const handleConfirmGroupModal = async (id: number) => {
    try {
      await dispatch(ConfirmReservalGroupAction({ id })).unwrap();
      dispatch(openModal(ModalType.SuccessConfirmBooking));
    } catch (error) {
      console.error("Ошибка при подтверждении группового бронирования:", error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await dispatch(CancelReservalAction({ id })).unwrap();
      if (AuthorizationStatus.USER === authorizationStatus) {
        await dispatch(fetchNotificationsAction());
      }
    } catch (error) {
      console.error("Ошибка при отмене бронирования:", error);
    }
  };

  const renderNotification = (notification: INotification) => {
    return notification.type === ReservalType.CODE ? (
      <div className={styles.book} key={notification.id}>
        <div className={styles.content}>
          <div className={styles.time}><p className={styles.text}>А Вы придёте? Мы Вас ждем ♥</p><p className={styles.timeText}>{notification.timeSend}</p></div>
          <p className={styles.text}>
            Вы забронировали коворкинг {notification.dateReserval} с {notification.timeStartReserval} до {notification.timeEndReserval}! Место {notification.table}.
          </p>
          {(notification.state === StateType.TRUE) && (
            <p className={styles.bookBtn}>
              Необходимо подтвердить присутствие.
            </p>
          )}
          {(notification.state === StateType.FALSE) && (
            <p className={styles.bookBtn}>
              Бронь отменена(
            </p>
          )}
          {(notification.state === StateType.CONFIRMED) && (
            <p className={styles.bookBtn}>
              Мы Вас ждем!
            </p>
          )}
        </div>
        {(notification.state === StateType.TRUE) && (
          <button className={styles.bookBtn} onClick={() => handleConfirmModal(notification.id)}>Подтвердить</button>
        )}
      </div>
    ) : (
      <div className={styles.book} key={notification.id}>
        <div className={styles.content}>
        <div className={styles.time}><p className={styles.text}>Пользователь забронировал для Вас место в коворкинге</p><p className={styles.timeText}>{notification.timeSend}</p></div>
          <p className={styles.text}>
            {notification.invit} забронировал для Вас место в коворкинге {notification.dateReserval} с {notification.timeStartReserval} до {notification.timeEndReserval}. Место {notification.table}.
          </p>
          {(notification.state === StateType.TRUE) && (
            <p className={styles.bookBtn}>
              Необходимо подтвердить присутствие.
            </p>
          )}
          {(notification.state === StateType.FALSE) && (
            <p className={styles.bookBtn}>
              Бронь отменена(
            </p>
          )}
          {(notification.state === StateType.CONFIRMED) && (
            <p className={styles.bookBtn}>
              Мы Вас ждем!
            </p>
          )}
        </div>
        {(notification.state === StateType.TRUE) && (
          <button className={styles.bookBtn} onClick={() => handleConfirmGroupModal(notification.id)}>Подтвердить</button>
        )}
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
                  <button className={styles.bookBtn} onClick={() => handleCancel(reserval.id)}>Отменить</button>
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
                  <h3 className={styles.titleNotifications}>сегодня</h3>
                  {notificationsToday.map(renderNotification)}
              </>
            )}
            {notificationsWeek.length > 0 && (
              <>
                <h3 className={styles.titleNotifications}>за неделю</h3>
                  {notificationsWeek.map(renderNotification)}
              </>
            )}
            {notificationsMonth.length > 0 && (
              <>
                <h3 className={styles.titleNotifications}>за месяц</h3>
                  {notificationsMonth.map(renderNotification)}
              </>
            )}
          </div>
        </section>
        <AuthModals />
      </main>
      <Footer />
    </>
  )
}
