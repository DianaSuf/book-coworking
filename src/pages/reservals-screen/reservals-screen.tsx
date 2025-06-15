import styles from './reservals-screen.module.scss'
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOldReservals, getReservalsMonth, getReservalsToday, getReservalsWeek } from '../../store/slices/reservals-slice';
import { useEffect } from 'react';
import { fetchReservalsAction } from '../../store/api-actions';
import Reserval from '../../components/card/reserval';
import AuthModals from '../../components/modal/authModalManager';

export default function ReservalsScreen() {
  const dispatch = useAppDispatch()
  const reservalsToday = useAppSelector(getReservalsToday)
  const reservalsWeek = useAppSelector(getReservalsWeek)
  const reservalsMonth = useAppSelector(getReservalsMonth)
  const reservalsOld = useAppSelector(getOldReservals)

  useEffect(() => {
    dispatch(fetchReservalsAction())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Бронирования.Коворкинг</title>
      </Helmet>
      <section className={styles.reservals}>
        <div className={styles.reservalsSection}>
          <h2>Бронирования</h2>
          {reservalsToday.length === 0 && reservalsWeek.length === 0 && reservalsMonth.length === 0 && reservalsOld.length === 0 ? (
            <h3>Пусто</h3>
          ) : (
            <>
              {(reservalsToday.length > 0 || reservalsWeek.length > 0 || reservalsMonth.length > 0) && (
                <section className={styles.reservalsLast}>
                  <h3 className={styles.title}>Последние бронирования</h3>
                  {reservalsToday.length > 0 && (
                    <>
                      <h4 className={styles.titleReservals}>сегодня</h4>
                      <Reserval reservals={reservalsToday} />
                    </>
                  )}
                  {reservalsWeek.length > 0 && (
                    <>
                      <h4 className={styles.titleReservals}>за неделю</h4>
                      <Reserval reservals={reservalsWeek} />
                    </>
                  )}
                  {reservalsMonth.length > 0 && (
                    <>
                      <h4 className={styles.titleReservals}>за месяц</h4>
                      <Reserval reservals={reservalsMonth} />
                    </>
                  )}
                </section>
              )}
              {reservalsOld.length > 0 && (
                <section className={styles.reservalsOld}>
                  <h3 className={styles.title}>Старые бронирования</h3>
                  <Reserval reservals={reservalsOld} />
                </section>
              )}
            </>
          )}
        </div>
        <AuthModals />
      </section>
    </>
  )
}
