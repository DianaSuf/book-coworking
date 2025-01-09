import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus } from '../../store/slices/user-slice';
import { AuthorizationStatus, ActionButtonType } from '../../const';
import ActionButton from '../../components/action-button/action-button';
import AuthModals from '../../components/authModalManager';
import { openModal } from '../../store/slices/modal-slice';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/dist/rsuite.min.css';
import styles from './book-screen.module.css';
import ruRU from 'rsuite/locales/ru_RU';
import { CustomProvider, SelectPicker } from 'rsuite';
import { ReactSVG } from 'react-svg';

const predefinedBottomRanges = [
  {
    label: `Сегодня ${new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    value: new Date(),
    closeOverlay: false,
  }
];

const generateTimeOptions = () => {
  const options = [];
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

export default function BookScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  console.log(selectedSeats);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleAuthModal = () => {
    dispatch(openModal('login'));
  };

  const onClickHandler = (event: MouseEvent) => {
    const target = event.target as SVGElement;

    const match = target.id.match(/(?:UnionSeat-|RectangeSeat-|^)(\d+)(?:-|$)/);
    const seatId = match ? match[1] : null;

    if (!seatId) return;

    console.log(`seatId: ${seatId}`);
    console.log(target);

    if (
      target.id &&
      (
        target.id.startsWith('UnionSeat-') ||
        target.id.startsWith('RectangeSeat-') ||
        (
          target.id.startsWith(`${seatId}-`) &&
          Number(seatId) >= 1 && Number(seatId) <= 24
        )
      )
    ) {
      const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
      const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
      const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);

      console.log(selectedSeats);

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
  };

  const handleRemoveSeat = (seatId: string) => {
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
    selectedSeats.forEach((seatId) => {
      const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
      const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
      const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);

      if (unionSeat) {
        unionSeat.setAttribute('fill', '#9ACA3C');
      }

      if (rectangeSeat) {
        rectangeSeat.setAttribute('fill', '#C1DC8B');
      }

      if (numberSeat) {
        numberSeat.setAttribute('fill', '#9ACA3C');
      }
    });
  };


  const handleStartTimeChange = (value: string | null) => {
    setStartTime(value);
    if (value) {
      const startMinutes = parseInt(value.split(':')[0]) * 60 + parseInt(value.split(':')[1]);
      const availableEndTimes = generateTimeOptions().filter(
        (time) => parseInt(time.value.split(':')[0]) * 60 + parseInt(time.value.split(':')[1]) > startMinutes
      );
      setEndTime(availableEndTimes[0]?.value || null);
    }
  };

  const handleEndTimeChange = (value: string | null) => {
    setEndTime(value);
  };

  const timeOptions = generateTimeOptions();

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
                />
              </CustomProvider>
            </div>
            <div className={styles.timeSelects}>
              <SelectPicker
                value={startTime || ''}
                onChange={handleStartTimeChange}
                data={timeOptions}
                placeholder="Выберите время начала"
                className={styles.timeSelect}
              />
  
              <SelectPicker
                value={endTime || ''}
                onChange={handleEndTimeChange}
                data={timeOptions.filter((time) => startTime && parseInt(time.value.split(':')[0]) * 60 + parseInt(time.value.split(':')[1]) > parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]))}
                placeholder="Выберите время конца"
                className={styles.timeSelect}
                disabled={!startTime}
              />
            </div>
            <div>
              <p className={styles.seat}>Выбранные места:</p>
              <ul className={styles.selectedList}>
                {selectedSeats.length > 0 ? (
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
            </div>
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
