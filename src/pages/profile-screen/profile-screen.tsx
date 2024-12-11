import styles from './profile-screen.module.css'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

export default function ProfileScreen() {

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header/>
      <main className={styles.profile}>
        <h2>Личный кабинет</h2>
      </main>
      <Footer/>
    </>
  )
}
