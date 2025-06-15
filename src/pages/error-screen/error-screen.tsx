import styles from './error-screen.module.scss'
import { Helmet } from 'react-helmet-async';

export default function ErrorScreen() {
  return (
    <>
      <Helmet>
        <title>Oops</title>
      </Helmet>
      <section className={styles.error}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>Такая страница не найдена :(</p>
      </section>
    </>
  )
}
