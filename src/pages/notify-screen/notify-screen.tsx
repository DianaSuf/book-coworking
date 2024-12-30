import styles from './notify-screen.module.css'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

export default function NotifyScreen() {

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header/>
      <main className={styles.notify}>
        <h2>Уведомления</h2>
      </main>
      <Footer/>
    </>
  )
}
