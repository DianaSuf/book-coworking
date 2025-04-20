import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.content}>
          <h1 className={styles.title}>Связаться с нами</h1>
          <hr className={styles.line} />
          <p className={`${styles.text} ${styles.titleUl}`}>
            Свяжитесь с нами, и мы решим Вашу проблему
          </p>
          <ul className={styles.list}>
            <li className={`${styles.text} ${styles.item}`}>
              <img className={styles.img} src="../img/icon_mail.svg" alt="mail icon" />
              Почта администратора: pochta_admina@mail.ru
            </li>
            <li className={`${styles.text} ${styles.item}`}>
              <img className={styles.img} src="../img/icon_mail.svg" alt="mail icon" />
              Почта команды поддержки: support_team@mail.ru
            </li>
            <li className={`${styles.text} ${styles.item}`}>
              <img className={styles.img} src="../img/icon_geo_red.svg" alt="geo icon" />
              Где мы находимся: г. Екатеринбург, ул. Мира, 17
            </li>
          </ul>
          <p className={`${styles.text} ${styles.company}`}>&copy; &quot;Women moment&quot; 2024</p>
        </div>
      </div>
      <iframe
        className={styles.mapIframe}
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A747fbfd6e3aecb4f68eaf70bce9c56f5639941a5a87885773715f6c8e1ea4db5&amp;source=constructor"
        title="map"
      ></iframe>
    </footer>
  );
}
