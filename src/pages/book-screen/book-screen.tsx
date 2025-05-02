import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ReactSVG } from 'react-svg';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './book-screen.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus, getUserData } from '../../store/slices/user-slice';
import { fetchUsersDataAction, fetchBusyTablesAction, reservalTablesAction, reservalTablesAdminAction, checkAuthAction } from '../../store/api-actions';
import { IUserDataWithId } from '../../types/user-data';
import { IDataReserval } from '../../types/book-data';
import { AuthorizationStatus, ActionButtonType, ModalType, seatColorsType } from '../../const';
import { generateTimeOptions, timeOptions, formatDateForRequest, paintSeat } from '../../utils';
import ActionButton from '../../components/action-button/action-button';
import AuthModals from '../../components/modal/authModalManager';
import { openModal, setReservationData } from '../../store/slices/modal-slice';
import 'rsuite/dist/rsuite.min.css';
import { Toggle, InputPicker, Checkbox } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePickerComponent from '../../components/date-picker/date-picker';
import SelectPickerComponent from '../../components/select-picker/select-picker';
import { keycloak } from '../../keycloak';

const useUsers = (defaultUsers: IUserDataWithId[] = []) => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUserDataWithId[]>(defaultUsers);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (word: string) => {
    setLoading(true);
    try {
      const trimmedWord = word.trim();
      if (trimmedWord) {
        const response = await dispatch(fetchUsersDataAction({ user: trimmedWord }));
        const payload = response.payload as IUserDataWithId[];
        setUsers(payload);
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.log('Oops, error', e);
    } finally {
      setLoading(false);
    }
  };

  return [users, loading, fetchUsers] as const;
};

export default function BookScreen() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [freeTables, setFreeTables] = useState<number[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUserDataWithId[]>([]);
  const [timeStart, setTimeStart] = useState<string | null>(null);
  const [timeEnd, setTimeEnd] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [users, loading, fetchUsers] = useUsers();
  const [pickerValue, setPickerValue] = useState(null);

  const resetPage = () => {
    // Сброс значений формы
    formik.resetForm();
  
    // Сброс состояния
    setSelectedSeats([]);
    setFreeTables([]);
    setSelectedUsers([]);
    setTimeStart(null);
    setTimeEnd(null);
    setPickerValue(null);
  
    // Восстановление цветов мест
    restoreSeatColors();
  };

  const handleSubmit = async (dataToSend: IDataReserval) => {
    try {
      if (AuthorizationStatus.USER === authorizationStatus) {
        await dispatch(reservalTablesAction(dataToSend)).unwrap();
      }
      if (AuthorizationStatus.ADMIN === authorizationStatus) {
        const adminData = {
          date: dataToSend.date,
          timeStart: dataToSend.timeStart,
          timeEnd: dataToSend.timeEnd,
          tables: dataToSend.tables,
        };
        await dispatch(reservalTablesAdminAction(adminData)).unwrap();
      }
      dispatch(setReservationData({
        date: dataToSend.date || '',
        timeStart: dataToSend.timeStart || '',
        timeEnd: dataToSend.timeEnd || '',
      }));
      resetPage();
      handleReservalModal();
    } catch (error) {
      console.error('Ошибка при бронировании:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      date: null,
      timeStart: null,
      timeEnd: null,
      tables: selectedSeats,
      usernames: selectedUsers.map((user) => user.username),
    },
    validationSchema: Yup.object({
      date: Yup.date().nullable().required('Дата обязательна'),
      timeStart: Yup.string().nullable().required('Время начала обязательно'),
      timeEnd: Yup.string().nullable().required('Время окончания обязательно'),
      tables: Yup.array()
        .min(1, 'Выберите место')
        .required('Выберите место')
        .test('tables-usernames', 'Выберите место другу', function (value) {
          const usernames = this.parent.usernames || [];
          if (authorizationStatus === AuthorizationStatus.ADMIN) {
            return true;
          }
          if (!value) return false;
          return value.length === usernames.length + 1;
        }),
      usernames: Yup.array().of(Yup.string()),
    }),
    onSubmit: (values) => {
      const formattedDate = values.date ? formatDateForRequest(values.date) : '';
      const dataToSend = {
        ...values,
        date: formattedDate,
        usernames: [userData?.username ?? '', ...values.usernames],
      };
      handleSubmit(dataToSend);
    },
  });

  useEffect(() => {
    formik.setFieldValue('tables', selectedSeats);
    formik.setFieldValue('usernames', selectedUsers.map((user) => user.username));
  }, [selectedSeats]);

  const handleAuthModal = () => {
    keycloak.login();
    dispatch(checkAuthAction());
  };

  const handleReservalModal = () => {
    dispatch(openModal(ModalType.SuccessReserval));
  };

  const handleToggleChange = (checked: boolean) => {
    setIsToggleOn(checked);
  };

  const onClickHandler = (event: MouseEvent) => {
    const target = event.target as SVGElement;
    const match = target.id.match(/(?:UnionSeat-|RectangeSeat-|^)(\d+)(?:-|$)/);
    const seatId = match ? parseInt(match[1], 10) : null;
  
    if (!seatId || freeTables.includes(seatId)) return;
  
    let maxSeatsToSelect = 1 + selectedUsers.length;
    if (authorizationStatus === AuthorizationStatus.ADMIN) {
      maxSeatsToSelect = 24;
    }
  
    if (selectedSeats.length < maxSeatsToSelect) {
      if (
        target.id &&
        (
          target.id.startsWith('UnionSeat-') ||
          target.id.startsWith('RectangeSeat-') ||
          (
            target.id.startsWith(`${seatId}-`) &&
            seatId >= 1 && seatId <= 24
          )
        )
      ) {

        if (!selectedSeats.includes(seatId)) {
          paintSeat(seatId, seatColorsType.Selected);
          setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
        }
      }
    }
  };  

  const handleRemoveSeat = (seatId: number) => {
    paintSeat(seatId, seatColorsType.Available);
    setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((seat) => seat !== seatId));
  };

  const restoreSeatColors = () => {
    // Сбрасываем цвет всех выбранных мест
    selectedSeats.forEach((seatId) => {
      // Проверяем, не находится ли место в списке занятых
      if (freeTables.includes(seatId)) {
        paintSeat(seatId, seatColorsType.Busy);
      } else {
        // Если место не занято, сбрасываем его цвет как доступного
        paintSeat(seatId, seatColorsType.Selected);
      }
    });
  
    // Обрабатываем все занятые места, которые не находятся в selectedSeats
    freeTables.forEach((seatId) => {
      if (!selectedSeats.includes(seatId)) {
        paintSeat(seatId, seatColorsType.Busy);
      }
    });
  };

  useEffect(() => {
    const renderBusySeats = () => {
      freeTables.forEach((seatId) => {
        paintSeat(seatId, seatColorsType.Busy);
      });
    };
  
    renderBusySeats();
  }, [freeTables]);

  useEffect(() => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.filter((seatId) => !freeTables.includes(seatId))
    );
  }, [freeTables]);  

  const handleStartTimeChange = (value: string | null) => {
    setTimeStart(value);
    formik.setFieldValue('timeStart', value);
    if (value) {
      const startMinutes = parseInt(value.split(':')[0]) * 60 + parseInt(value.split(':')[1]);
      const availableEndTimes = generateTimeOptions().filter(
        (time) => parseInt(time.value.split(':')[0]) * 60 + parseInt(time.value.split(':')[1]) > startMinutes
      );
      setTimeEnd(availableEndTimes[0]?.value || null);
      formik.setFieldValue('timeEnd', availableEndTimes[0]?.value || null);
    }
  };

  const handleEndTimeChange = (value: string | null) => {
    setTimeEnd(value);
    formik.setFieldValue('timeEnd', value);
  };

  const handleSelect = (user: IUserDataWithId) => {
    setSelectedUsers((prevUsers) => {
      if (!prevUsers.some((existingUser) => existingUser.id === user.id)) {
        return [...prevUsers, user];
      }
      return prevUsers;
    });
  };

  const fetchBusyTables = async (date: string, timeStart: string, timeEnd: string) => {
    try {
      const formattedDate = formatDateForRequest(date);
      
      const response = await dispatch(fetchBusyTablesAction({
        date: formattedDate,
        timeStart,
        timeEnd
      }));
      
      const payload = response.payload as number[];
      setFreeTables(payload);
    } catch (error) {
      console.error('Error fetching free tables:', error);
    }
  };

  useEffect(() => {
    if (formik.values.date && timeStart && timeEnd) {
      fetchBusyTables(formik.values.date, timeStart, timeEnd);
    }
  }, [formik.values.date, timeStart, timeEnd]);

  useEffect(() => {
    const maxSeatsToSelect = 1 + selectedUsers.length;
    setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.slice(0, maxSeatsToSelect));
  
    restoreSeatColors();
  }, [selectedUsers]);
  
  const handleRemoveUser = (userId: number) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
  };

  const handleSelectAllSeats = (checked: boolean) => {
    if (checked) {
      // Сначала находим все доступные места (не занятые)
      const allSeats = Array.from({ length: 24 }, (_, i) => i + 1).filter(
        (seatId) => !freeTables.includes(seatId) // Оставляем только доступные места
      );
  
      setSelectedSeats(allSeats); // Добавляем все доступные места в selectedSeats
  
      // Перекрашиваем доступные места
      allSeats.forEach((seatId) => {
        paintSeat(seatId, seatColorsType.Selected);
      });
    } else {
      // Если сняли выбор с "Забронировать всё", сбрасываем выбранные места
      setSelectedSeats([]);
      restoreSeatColors(); // Восстанавливаем исходные цвета мест
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main className={styles.main}>
        {!(authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN) ?  
          <section className={styles.bookNoAuth}>
            <p className={styles.textNoAuth}>Чтобы забронировать место для работы в нашем коворкинге, пожалуйста, зарегистрируйтесь на нашем сайте. 
            Регистрация займет всего лишь несколько минут, и после этого вы сможете легко и быстро выбрать место для работы.</p>
            <p className={styles.textNoAuth}>Не упустите возможность получить удобство и комфорт в работе – присоединяйтесь к нашему сообществу уже сегодня!
            Ждем вас в нашем коворкинге!</p>
            <ActionButton
              text="Войти или зарегистрироваться"
              onClick={handleAuthModal}
              variant={ActionButtonType.Red}
            />
          </section> :
          <section className={styles.book}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
              <div className={styles.content}>
                <DatePickerComponent
                  value={formik.values.date}
                  onChange={(value) => formik.setFieldValue('date', value)}
                  touched={formik.touched.date}
                  error={formik.errors.date}
                />
                <div className={styles.timeSelects}>
                  <p className={styles.seatText}>с</p>
                  <SelectPickerComponent
                    value={timeStart}
                    onChange={handleStartTimeChange}
                    data={timeOptions}
                    touched={formik.touched.timeStart}
                    error={formik.errors.timeStart}
                    placeholder="с"
                  />

                  <p className={styles.seatText}>до</p>
                  <SelectPickerComponent
                    value={timeEnd}
                    onChange={handleEndTimeChange}
                    data={timeOptions.filter((time) => timeStart && parseInt(time.value.split(':')[0]) * 60 + parseInt(time.value.split(':')[1]) > parseInt(timeStart.split(':')[0]) * 60 + parseInt(timeStart.split(':')[1]))}
                    touched={formik.touched.timeEnd}
                    error={formik.errors.timeEnd}
                    placeholder="до"
                    disabled={!timeStart}
                  />
                </div>
                <div>
                  <p className={styles.seatText}>Выбранные места:</p>
                  <ul className={styles.selectedList}>
                  {selectedSeats && selectedSeats.length > 0 ? (
                    selectedSeats.map((seat) => (
                      <li key={seat} className={styles.selectedItem}>
                        {seat}
                        <button
                          className={styles.deleteBtn}
                          type="button"
                          onClick={() => handleRemoveSeat(seat)}
                        >
                          Удалить
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className={styles.noSelection}>Пусто</p>
                  )}
                  </ul>

                  {formik.errors.tables && formik.touched.tables && (
                    <p className={styles.errorText}>{formik.errors.tables}</p>
                  )}
                </div>
                {(authorizationStatus !== AuthorizationStatus.ADMIN) && (
                  <div className={styles.invitation}>
                    <div className={styles.toggle}>
                      <Toggle 
                        color="red"
                        checked={isToggleOn}
                        onChange={handleToggleChange}
                      />
                      <p className={styles.seatText}>Я приду не один</p>
                    </div>
                    {isToggleOn && (
                      <div className={styles.search}>
                        <p className={styles.seatText}>Приглашенные люди:</p>
                        <ul className={styles.selectedList}>
                          {selectedUsers.length > 0 ? (
                            selectedUsers.map((user) => (
                              <li key={user.id} className={styles.selectedItem}>
                                {user.username}
                                <button
                                  className={styles.deleteBtn}
                                  type="button"
                                  onClick={() => handleRemoveUser(user.id)}
                                >
                                  Удалить
                                </button>
                              </li>
                            ))
                          ) : (
                            <p className={styles.noSelection}>Пусто</p>
                          )}
                        </ul>
                        <InputPicker
                          data={users}
                          style={{ width: 224 }}
                          labelKey="username"
                          valueKey="id"
                          value={pickerValue}
                          onSearch={fetchUsers}
                          placeholder="Введите email"
                          onSelect={(_value, item) => {
                            handleSelect(item as IUserDataWithId);
                            setPickerValue(null);
                          }}
                          renderMenu={(menu) => {
                            if (loading) {
                              return (
                                <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
                                  <SpinnerIcon spin /> Загрузка...
                                </p>
                              );
                            }
                            return menu;
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {authorizationStatus === AuthorizationStatus.ADMIN && (
                <div className={styles.checkbox}>
                  <Checkbox
                    color="red"
                    indeterminate={selectedSeats.length > 0 && selectedSeats.length < (24 - freeTables.length)}
                    checked={selectedSeats.length === (24 - freeTables.length)} 
                    onChange={(_value, checked) => handleSelectAllSeats(checked)}
                  >
                    <p className={styles.text}>Забронировать всё</p>
                  </Checkbox>
                </div>
              )}
              <div className={styles.buttonContainer}>
                <ActionButton
                  text="Забронировать коворкинг"
                  buttonType="submit"
                  variant={ActionButtonType.Red}
                />
              </div>
            </form>
          </section>
        }
        <section className={styles.map}>
          <ul className={styles.colorList}>
            <li className={styles.color}>
              <div className={styles.red}></div>
              <p className={styles.text}>Место свободно</p>
            </li>
            <li className={styles.color}>
              <div className={styles.grey}></div>
              <p className={styles.text}>Место уже забронировано</p>
            </li>
            <li className={styles.color}>
              <div className={styles.green}></div>
              <p className={styles.text}>Выбрано</p>
            </li>
          </ul>

          <ReactSVG 
            src="../../../img/map2.svg"
            afterInjection={(svg) => {
              svg.removeAttribute('width');
              svg.removeAttribute('height');
              svg.setAttribute('viewBox', '0 0 1102 819');
              svgRef.current = svg;
              svg.addEventListener('click', onClickHandler);
              restoreSeatColors();
            }} 
          />
        </section>
        <AuthModals />
      </main>
      <Footer />
    </>
  );
}
