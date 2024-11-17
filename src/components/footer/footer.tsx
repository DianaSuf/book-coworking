import './footer.css'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">
          <h1 className="footer__title">Связаться  с нами</h1>
          <hr className="footer__line"></hr>
          <p className="footer__text footer__title-ul">Свяжитесь с нами, и мы решим Вашу проблему</p>
          <ul className="footer__list">
            <li className="footer__text footer__item">
              <img className="footer__img" src='../img/icon_mail.svg'/>
              Почта администратора: pochta_admina@mail.ru
            </li>
            <li className="footer__text footer__item">
              <img className="footer__img" src='../img/icon_mail.svg'/>
              Почта команды поддержки: support_team@mail.ru
            </li>
            <li className="footer__text footer__item">
              <img className="footer__img" src='../img/icon_geo_red.svg'/>
              Где мы находимся: г. Екатеринбург, ул. Мира, 17
            </li>
          </ul>
          <p className="footer__text footer__name-company">&copy; &quot;Women moment&quot; 2024</p>
        </div>
        <iframe className="footer__map-iframe" src="https://yandex.ru/map-widget/v1/?um=constructor%3A747fbfd6e3aecb4f68eaf70bce9c56f5639941a5a87885773715f6c8e1ea4db5&amp;source=constructor"></iframe>
      </footer>
    </>
  )
}
