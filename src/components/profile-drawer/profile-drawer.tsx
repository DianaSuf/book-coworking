import { useState, useEffect } from 'react';
import { Drawer, ButtonToolbar, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './profile-drawer.module.css';
import DatePickerComponent from '../date-picker/date-picker';
import { useAppDispatch } from '../../hooks';
import { formatDateForRequest } from '../../utils';
import { IUserReserval } from '../../types/admin-data';
import { SearchDateAction } from '../../store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ProfileDrawer() {
  const dispatch = useAppDispatch();
  const [isOpenDrawerDoc, setIsOpenDrawerDoc] = useState(false);
  const [isOpenDrawerPeople, setIsOpenDrawerPeople] = useState(false);
  const [reservations, setReservations] = useState<IUserReserval[]>([]);

  const handleToggleDrawerDoc = () => setIsOpenDrawerDoc((prev) => !prev);
  const handleToggleDrawerPeople = () => setIsOpenDrawerPeople((prev) => !prev);

  const handleSubmit = async (date: string) => {
    try {
      const data = await dispatch(SearchDateAction({ date })).unwrap();
      setReservations(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      date: null,
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      date: Yup.date().nullable().required('Дата обязательна'),
    }),
    onSubmit: (values) => {
      const formattedDate = values.date ? formatDateForRequest(values.date) : '';
      handleSubmit(formattedDate);
    },
  });

  useEffect(() => {
    if (formik.values.date) {
      const formattedDate = formatDateForRequest(formik.values.date);
      handleSubmit(formattedDate);
    }
  }, [formik.values.date]);

  return (
    <>
      <ButtonToolbar>
        <Button
          className={`${styles.drawerButtonDoc} ${isOpenDrawerDoc ? styles.open : ''}`}
          onClick={handleToggleDrawerDoc}
          style={{
            backgroundColor: '#ef3b24',
          }}
        >
          <img src='/img/icon_doc.svg'/>
        </Button>
      </ButtonToolbar>

      <Drawer
        open={isOpenDrawerDoc}
        closeButton={false}
        placement="right"
        size="sm"
        backdrop={false}
        style={{
          width: '400px',
          // marginTop: '54px',
        }}
      >
        <Drawer.Body
          style={{
            padding: '40px'
          }}
        >
          <p className={styles.text}>Список актуальных бронирований</p>
          <div className={styles.content}>
            <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
              <p className={styles.text}>Фильтр по дате:</p>
              <DatePickerComponent
                value={formik.values.date}
                onChange={(value) => formik.setFieldValue('date', value)}
                touched={formik.touched.date}
                error={formik.errors.date}
                placement='bottomEnd'
              />
            </form>
            <div className={styles.reservations}>
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <div key={reservation.id} className={styles.reservation}>
                    <div className={styles.title}>
                      <p className={styles.text}>{reservation.realname}</p>
                      <p className={styles.email}>{reservation.username}</p>
                    </div>
                    <p className={styles.textGrey}>{reservation.dateReserval} с {reservation.timeStartReserval} до {reservation.timeEndReserval}</p>
                    <p className={styles.textGrey}>{reservation.table} место</p>
                    <div className={styles.cancel}><button className={styles.cancelButton}>отменить</button></div>
                  </div>
                ))
              ) : (
                <p>Нет бронирований на выбранную дату.</p>
              )}
            </div>
          </div>
        </Drawer.Body>
      </Drawer>

      <ButtonToolbar>
        <Button
          className={`${styles.drawerButtonPeople} ${isOpenDrawerPeople ? styles.open : ''}`}
          onClick={handleToggleDrawerPeople}
          style={{
            backgroundColor: '#F5887A',
          }}
        >
          <img src='/img/icon_people.svg'/>
        </Button>
      </ButtonToolbar>

      <Drawer
        open={isOpenDrawerPeople}
        closeButton={false}
        placement="right"
        size="sm"
        className={styles.drawer}
        backdrop={false}
        style={{
          width: '400px',
          // marginTop: '54px',
        }}
      >
        <Drawer.Body
          style={{
            padding: '40px'
          }}
        >
          <h4>Список пользователей</h4>
          <div className={styles.content}></div>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
