import styles from './book-screen.module.css'
import { Helmet } from 'react-helmet-async'
import { ReactSVG } from 'react-svg'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useState, useEffect } from 'react'

export default function BookScreen() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
  
      const currentUnionFill = unionSeat?.getAttribute('fill');
      const currentRectangeFill = rectangeSeat?.getAttribute('fill');
      const currentNumberFill = numberSeat?.getAttribute('fill');
  
      if (unionSeat) {
        unionSeat.setAttribute('fill', currentUnionFill === '#F5887A' ? '#9ACA3C' : '#F5887A');
      }
  
      if (rectangeSeat) {
        rectangeSeat.setAttribute('fill', currentRectangeFill === '#F9B2A4' ? '#C1DC8B' : '#F9B2A4');
      }
  
      if (numberSeat) {
        numberSeat.setAttribute('fill', currentNumberFill === '#F5887A' ? '#9ACA3C' : '#F5887A');
      }
  
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seatId)
          ? prevSelectedSeats.filter((seat) => seat !== seatId)
          : [...prevSelectedSeats, seatId]
      );
    }
  };
  

  useEffect(() => {
    const addClickListener = () => {
      const svgElement = document.querySelector('svg');
      if (svgElement) {
        svgElement.addEventListener('click', onClickHandler);
      }
    };

    const timeoutId = setTimeout(addClickListener, 1000);

    return () => {
      clearTimeout(timeoutId);
      const svgElement = document.querySelector('svg');
      if (svgElement) {
        svgElement.removeEventListener('click', onClickHandler);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main className={styles.main}>
        <section className={styles.book}>
          <p className={styles.seat}>Выбранные места:</p>
          <ul className={styles.selectedList}>
            {selectedSeats.length > 0 ? (
              selectedSeats.map((seat) => (
                <li key={seat} className={styles.selectedItem}>
                  {seat}
                  <button
                    className={styles.deleteBtn}
                    type="button"
                    onClick={() => setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((s) => s !== seat))}
                  >
                    Удалить
                  </button>
                </li>
              ))
            ) : (
              <p className={styles.noSelection}>Пусто</p>
            )}
          </ul>
        </section>

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
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
