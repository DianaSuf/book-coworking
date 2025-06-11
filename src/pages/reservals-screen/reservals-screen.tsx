import styles from './reservals-screen.module.scss'
import { Helmet } from "react-helmet-async";
import Header from '../../components/header/header'
import Footer from "../../components/footer/footer";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOldReservals, getReservalsMonth, getReservalsToday, getReservalsWeek } from '../../store/slices/reservals-slice';
import { useEffect } from 'react';
import { fetchReservalsAction } from '../../store/api-actions';
import Reserval from '../../components/card/reserval';

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
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main className={styles.reservals}>
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
      </main>
      <Footer />
    </>
  )
}
