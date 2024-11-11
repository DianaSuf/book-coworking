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
          <div className="about__content"></div>
          <img className="about__image" src="../img/image_2.jpg" alt="photo of coworking" />
        </section>
      </main>
      <Footer/>
    </>
  )
}
