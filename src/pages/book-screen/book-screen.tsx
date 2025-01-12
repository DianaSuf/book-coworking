import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ReactSVG } from 'react-svg';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus, getUserData } from '../../store/slices/user-slice';
import { fetchUsersDataAction, fetchBusyTablesAction, reservalTablesAction } from '../../store/api-actions';
import { IUserDataWithId } from '../../types/user-data';
import { IDataReserval } from '../../types/book-data';
import { AuthorizationStatus, ActionButtonType, ModalType } from '../../const';
import ActionButton from '../../components/action-button/action-button';
import AuthModals from '../../components/authModalManager';
import { openModal } from '../../store/slices/modal-slice';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/dist/rsuite.min.css';
import styles from './book-screen.module.css';
import ruRU from 'rsuite/locales/ru_RU';
import { CustomProvider, SelectPicker, Toggle, InputPicker, Checkbox } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const predefinedBottomRanges = [
  {
    label: `Сегодня ${new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    value: new Date(),
    closeOverlay: false,
  }
];

interface TimeOption {
  label: string;
  value: string;
}

const generateTimeOptions = (): TimeOption[] => {
  const options: TimeOption[] = [];
  const start = 8 * 60;
  const end = 20 * 60;
  const interval = 15;

  for (let time = start; time <= end; time += interval) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    options.push({ label: formattedTime, value: formattedTime });
  }

  return options;
};

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

  const formatDateForRequest = (date: string | Date): string => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = async (dataToSend: IDataReserval) => {
    try {
      await dispatch(reservalTablesAction(dataToSend)).unwrap();
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
  }, [selectedSeats]);
  
  
  useEffect(() => {
    formik.setFieldValue('usernames', selectedUsers.map((user) => user.username));
  }, [selectedUsers]);

  const handleAuthModal = () => {
    dispatch(openModal(ModalType.Login));
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
  
    const maxSeatsToSelect = 1 + selectedUsers.length;
  
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
        const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
        const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
        const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);
  
        if (!selectedSeats.includes(seatId)) {
          if (unionSeat) {
            unionSeat.setAttribute('fill', '#9ACA3C');
          }
  
          if (rectangeSeat) {
            rectangeSeat.setAttribute('fill', '#C1DC8B');
          }
  
          if (numberSeat) {
            numberSeat.setAttribute('fill', '#9ACA3C');
          }
  
          setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
        }
      }
    }
  };  

  const handleRemoveSeat = (seatId: number) => {
    const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
    const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
    const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);
  
    if (unionSeat) {
      unionSeat.setAttribute('fill', '#F5887A');
    }
  
    if (rectangeSeat) {
      rectangeSeat.setAttribute('fill', '#F9B2A4');
    }
  
    if (numberSeat) {
      numberSeat.setAttribute('fill', '#F5887A');
    }
  
    setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((seat) => seat !== seatId));
  };
  

  const restoreSeatColors = () => {
    // Сбрасываем цвет всех выбранных мест
    selectedSeats.forEach((seatId) => {
      const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
      const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
      const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);
  
      // Проверяем, не находится ли место в списке занятых
      if (freeTables.includes(seatId)) {
        if (unionSeat) {
          unionSeat.setAttribute('fill', '#B8B8B8'); // Цвет для занятых мест
        }
  
        if (rectangeSeat) {
          rectangeSeat.setAttribute('fill', '#D5D0CF'); // Цвет для занятых мест
        }
  
        if (numberSeat) {
          numberSeat.setAttribute('fill', '#B8B8B8'); // Цвет для занятых мест
        }
      } else {
        // Если место не занято, сбрасываем его цвет как доступного
        if (unionSeat) {
          unionSeat.setAttribute('fill', '#9ACA3C');
        }
  
        if (rectangeSeat) {
          rectangeSeat.setAttribute('fill', '#C1DC8B');
        }
  
        if (numberSeat) {
          numberSeat.setAttribute('fill', '#9ACA3C');
        }
      }
    });
  
    // Обрабатываем все занятые места, которые не находятся в selectedSeats
    freeTables.forEach((seatId) => {
      if (!selectedSeats.includes(seatId)) {
        const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
        const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
        const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);
  
        if (unionSeat) {
          unionSeat.setAttribute('fill', '#B8B8B8'); // Цвет для занятых мест
        }
  
        if (rectangeSeat) {
          rectangeSeat.setAttribute('fill', '#D5D0CF'); // Цвет для занятых мест
        }
  
        if (numberSeat) {
          numberSeat.setAttribute('fill', '#B8B8B8'); // Цвет для занятых мест
        }
      }
    });
  };
  

  useEffect(() => {
    const renderBusySeats = () => {
      freeTables.forEach((seatId) => {
        const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
        const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
        const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);
  
        if (unionSeat) {
          unionSeat.setAttribute('fill', '#B8B8B8');
        }
  
        if (rectangeSeat) {
          rectangeSeat.setAttribute('fill', '#D5D0CF');
        }
  
        if (numberSeat) {
          numberSeat.setAttribute('fill', '#B8B8B8');
        }
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

  const timeOptions: TimeOption[] = generateTimeOptions();

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
    // Update selectedSeats based on the new selectedUsers state
    const maxSeatsToSelect = 1 + selectedUsers.length;
    setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.slice(0, maxSeatsToSelect));
  
    // Restore seat colors
    restoreSeatColors();
  }, [selectedUsers]);
  
  const handleRemoveUser = (userId: number) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
  };

  const handleSelectAllSeats = (checked: boolean | undefined) => {
    if (checked) {
      const allSeats = Array.from({ length: 24 }, (_, i) => i + 1).filter(
        (seatId) => !freeTables.includes(seatId)
      );
      setSelectedSeats(allSeats);
  
      allSeats.forEach((seatId) => {
        const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
        const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
        const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);
  
        if (unionSeat) unionSeat.setAttribute('fill', '#9ACA3C');
        if (rectangeSeat) rectangeSeat.setAttribute('fill', '#C1DC8B');
        if (numberSeat) numberSeat.setAttribute('fill', '#9ACA3C');
      });
    } else {
      setSelectedSeats([]);
      restoreSeatColors();
    }
  };  

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main className={styles.main}>
        {(authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) ?  
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
                <div className={styles.container}>
                  <CustomProvider locale={ruRU}>
                    <DatePicker
                      isoWeek
                      format="dd.MM.yyyy"
                      placeholder="Выберите дату"
                      oneTap
                      editable={false}
                      locale={{
                        sunday: 'ВС',
                        monday: 'ПН',
                        tuesday: 'ВТ',
                        wednesday: 'СР',
                        thursday: 'ЧТ',
                        friday: 'ПТ',
                        saturday: 'СБ',
                        ok: 'Сбросить',
                        today: 'Сегодня',
                        formattedMonthPattern: 'MMMM yyyy',
                      }}
                      shouldDisableDate={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      ranges={predefinedBottomRanges}
                      renderCell={(date) => date.getDate()}
                      value={formik.values.date}
                      onChange={(value) => formik.setFieldValue('date', value)}
                    />
                    {formik.errors.date && formik.touched.date && (
                      <p className={styles.errorText}>{formik.errors.date}</p>
                    )}
                  </CustomProvider>
                </div>
                <div className={styles.timeSelects}>
                  <p className={styles.seatText}>с</p>
                  <SelectPicker
                    value={timeStart || ''}
                    onChange={handleStartTimeChange}
                    data={timeOptions}
                    searchable={false}
                    className={styles.timeSelect}
                    renderValue={(_value, item) =>
                      item && typeof item === 'object' && 'label' in item ? (
                        <span style={{ color: '#14191A' }}>{item.label}</span>
                      ) : <span style={{ color: '#8A8C8C' }}>с</span>
                    }
                    style={{ width: 100 }}
                  />
                  {formik.errors.timeStart && formik.touched.timeStart && (
                      <p className={styles.errorText}>{formik.errors.timeStart}</p>
                  )}

                  <p className={styles.seatText}>до</p>
                  <SelectPicker
                    value={timeEnd || ''}
                    onChange={handleEndTimeChange}
                    data={timeOptions.filter((time) => timeStart && parseInt(time.value.split(':')[0]) * 60 + parseInt(time.value.split(':')[1]) > parseInt(timeStart.split(':')[0]) * 60 + parseInt(timeStart.split(':')[1]))}
                    searchable={false}
                    className={styles.timeSelect}
                    disabled={!timeStart}
                    renderValue={(_value, item) =>
                      item && typeof item === 'object' && 'label' in item ? (
                        <span style={{ color: '#14191A' }}>{item.label}</span>
                      ) : <span style={{ color: '#8A8C8C' }}>до</span>
                    }
                    style={{ width: 100, color: '#14191A '}}
                  />

                  {formik.errors.timeEnd && formik.touched.timeEnd && (
                    <p className={styles.errorText}>{formik.errors.timeEnd}</p>
                  )}
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
              </div>
              {authorizationStatus === AuthorizationStatus.ADMIN && (
                <Checkbox
                  color="red"
                  onChange={(checked) => handleSelectAllSeats(!!checked)}
                >
                  Забронировать всё
                </Checkbox>
              )}
              <ActionButton
                text="Забронировать коворкинг"
                buttonType="submit"
                variant={ActionButtonType.Red}
              />
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
            src="../../../img/map.svg" 
            afterInjection={(svg) => {
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
