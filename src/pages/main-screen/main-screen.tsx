import styles from './main-screen.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import ActionButton from '../../components/action-button/action-button';
import { ActionButtonType } from '../../const';

export default function MainScreen() {
  const navigate = useNavigate();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.img}><img className={styles.heroImage} src="../img/image_1.jpg" alt="photo of coworking" /></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Добро пожаловать в наш коворкинг!</h1>
          <p className={styles.heroText}>
            В нашем коворкинге вы откроете для себя идеальную обстановку, способствующую вашему
            творческому процессу и высокой производительности. Мы предлагаем стильный интерьер,
            комфортные зоны для работы и вдохновляющую атмосферу, которая способствует
            эффективному сотрудничеству и плодотворной работе.
          </p>
          <ActionButton
            text="Забронировать коворкинг"
            onClick={() => navigate(AppRoute.Book)}
            variant={ActionButtonType.Red}
          />
        </div>
      </section>
      <section className={styles.about}>
        <div className={styles.aboutContent}>
          <p className={styles.aboutTitleUl}>
            Мы предлагаем<br />
            <span className={styles.aboutTitleDecor}>современный формат</span> и{' '}
            <span className={styles.aboutTitleDecor}>комфортное использование</span>
          </p>
          <ul className={styles.aboutList}>
            <li className={styles.aboutItem}>
              <img
                className={styles.aboutItemImg}
                src="../img/icon_smile.svg"
                alt="smile icon"
              />
              <div>
                <span className={styles.aboutItemTitle}>Бронирование рабочих мест в коворкинге</span>
                <div>
                  Посетители могут выбирать удобные им рабочие столы.
                </div>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img className={styles.aboutItemImg} src="../img/icon_mail.svg" alt="mail icon" />
              <div>
                <span className={styles.aboutItemTitle}>Подтверждение бронирований</span>
                <div>
                  Уведомление придет на почту, а также в личный кабинет.
                </div>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img className={styles.aboutItemImg} src="../img/icon_map.svg" alt="map icon" />
              <div>
                <span className={styles.aboutItemTitle}>Понятный план коворкинга</span>
                <div>
                  Карта поможет гостям сориентироваться в коворкинге, чтобы найти нужное место.
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.img}>
          <img
            className={styles.aboutImage}
            src="../img/image_2.jpg"
            alt="photo of coworking"
          />
        </div>
      </section>
    </>
  );
}
