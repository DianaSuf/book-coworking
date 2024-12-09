import './error-screen.module.css'
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
      <Footer/>
    </>
  )
}
