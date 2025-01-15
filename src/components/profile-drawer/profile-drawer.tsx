import { useState, useEffect } from 'react';
import { Drawer, ButtonToolbar, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import SearchIcon from '@mui/icons-material/Search';
import styles from './profile-drawer.module.css';
import DatePickerComponent from '../date-picker/date-picker';
import { useAppDispatch } from '../../hooks';
import { formatDateForRequest, getCorrectWordEnding } from '../../utils';
import { IUserReserval } from '../../types/admin-data';
import { SearchDateAction, SearchBlockAction, CancelReservalAction, BlockUserAction, UnblockUserAction } from '../../store/api-actions';
import { IUserBlock } from '../../types/admin-data';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ProfileDrawer() {
  const dispatch = useAppDispatch();
  const [isOpenDrawerDoc, setIsOpenDrawerDoc] = useState(false);
  const [isOpenDrawerPeople, setIsOpenDrawerPeople] = useState(false);
  const [reservations, setReservations] = useState<IUserReserval[]>([]);
  const [usersBlock, setUsersBlock] = useState<IUserBlock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCancel = async (id: number) => {
    try {
      await dispatch(CancelReservalAction({ id })).unwrap();
      const currentFormattedDate = formik.values.date
        ? formatDateForRequest(formik.values.date)
        : '';
      if (currentFormattedDate) {
        await handleSubmit(currentFormattedDate);
      }
    } catch (error) {
      console.error("Ошибка при отмене бронирования:", error);
    }
  };

  const handleBlock = async (id: number) => {
    try {
      await dispatch(BlockUserAction({ id })).unwrap();
      await fetchUsersBlock(searchTerm);
    } catch (error) {
      console.error('Ошибка при блокировке пользователя:', error);
    }
  };
  
  const handleUnblock = async (id: number) => {
    try {
      await dispatch(UnblockUserAction({ id })).unwrap();
      await fetchUsersBlock(searchTerm);
    } catch (error) {
      console.error('Ошибка при разблокировке пользователя:', error);
    }
  };
  
  const fetchUsersBlock = async (word: string) => {
    try {
      const trimmedWord = word.trim();
      if (trimmedWord) {
        const response = await dispatch(SearchBlockAction({ user: trimmedWord }));
        const payload = response.payload as IUserBlock[];
        setUsersBlock([...payload]);
      } else {
        setUsersBlock([]);
      }
    } catch (e) {
      console.error('Ошибка при получении пользователей:', e);
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

  useEffect(() => {
    fetchUsersBlock(searchTerm);
  }, [searchTerm]);

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
            <div className={styles.list}>
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <div key={reservation.id} className={styles.item}>
                    <div className={styles.title}>
                      <p className={styles.text}>{reservation.realname}</p>
                      <p className={styles.email}>{reservation.username}</p>
                    </div>
                    <p className={styles.textGrey}>{reservation.dateReserval} с {reservation.timeStartReserval} до {reservation.timeEndReserval}</p>
                    <p className={styles.textGrey}>{reservation.table} место</p>
                    <div className={styles.listButton} onClick={() => handleCancel(reservation.id)}><button className={styles.textButton}>отменить</button></div>
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
          <div className={styles.content}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.inputText}
                placeholder="Введите имя пользователя"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon
                className={styles.searchIcon}
                sx={{ position: 'absolute' }}
              />
            </div>
            <div className={styles.list}>
              {usersBlock.length > 0 ? (
                usersBlock.map((user) => (
                  <div key={user.id} className={styles.itemBlock}>
                    <div className={styles.titleBlock}>
                      <p className={styles.text}>{user.realname}</p>
                      <p className={styles.email}>{user.username}</p>
                    </div>
                    <div className={styles.contentBlock}>
                      {(user.stateBlock === 'TRUE') ? <p className={`${styles.countBlock} ${
                          user.countBlock === 0
                            ? styles.greenText
                            : user.countBlock <= 3
                            ? styles.orangeText
                            : styles.redText
                        }`}
                      >
                        {user.countBlock} {getCorrectWordEnding(user.countBlock)}
                      </p> : ''}
                      {(user.stateBlock === 'TRUE') ? 
                        <div className={styles.listButton}><button className={styles.textButton} onClick={() => handleBlock(user.id)}>забанить</button></div> :
                        <div className={styles.listButton}><button className={styles.textButton} onClick={() => handleUnblock(user.id)}>разбанить</button></div>
                      }
                    </div>
                  </div>
                ))
              ) : (
                <p>Нет таких пользователей.</p>
              )}
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
