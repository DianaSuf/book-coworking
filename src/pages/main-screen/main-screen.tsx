import './main-screen.css'
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ActionButtonProps from '../../components/action-button/action-button';

export default function MainScreen() {

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header/>
      <main>
        <section className="hero">
          <img className="hero__image" src="../img/image_1.jpg" alt="photo of coworking" />
          <div className="hero__content">
            <h1 className="hero__title">Добро пожаловать в наш коворкинг!</h1>
            <p className="hero__text">В нашем коворкинге вы откроете для себя идеальную обстановку, способствующую вашему творческому процессу и высокой производительности. Мы предлагаем стильный интерьер, комфортные зоны для работы и вдохновляющую атмосферу, которая способствует эффективному сотрудничеству и плодотворной работе.</p>
            <ActionButtonProps text="Забронировать коворкинг" />
          </div>
        </section>
        <section className="about">
          <div className="about__content">
            <p className="about__title-ul">
              Мы предлагаем<br />
              <span className="about__title-decor">современный формат</span> и <span className="about__title-decor">комфортное использование</span>
            </p>
            <ul className="about__list">
              <li className="about__item">
                <img className="about__item-img" src='../img/icon_smile.svg'/>
                <div className="about__item-text">
                  <span className="about__item-title">Бронирование рабочих мест в коворкинге</span>
                  <div className="about__item-description">Посетители могут выбирать удобные им рабочие столы.</div>
                </div>
              </li>
              <li className="about__item">
                <img className="about__item-img" src='../img/icon_mail.svg'/>
                <div className="about__item-text">
                  <span className="about__item-title">Подтверждение бронирований</span>
                  <div className="about__item-description">Уведомление придет на почту, а также в личный кабинет.</div>
                </div>
              </li>
              <li className="about__item">
                <img className="about__item-img" src='../img/icon_map.svg'/>
                <div className="about__item-text">
                  <span className="about__item-title">Понятный план коворкинга</span>
                  <div className="about__item-description">Карта поможет гостям сориентироваться в коворкинге, чтобы найти нужное место.</div>
                </div>
              </li>
            </ul>
          </div>
          <img className="about__image" src="../img/image_2.jpg" alt="photo of coworking" />
        </section>
      </main>
      <Footer/>
    </>
  )
}
