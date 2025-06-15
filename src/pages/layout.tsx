import { Outlet } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';


export default function Layout() {
  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}