import styles from './error-screen.module.scss'
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default function ErrorScreen() {
  return (
    <>
      <Helmet>
        <title>Oops</title>
      </Helmet>
      <Header/>
      <main className={styles.error}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>Такая страница не найдена :(</p>
      </main>
      <Footer/>
    </>
  )
}
