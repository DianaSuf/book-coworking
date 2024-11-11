import './header.css'
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <nav className="menu">
          <Link className="header__logo" to={AppRoute.Root}></Link>
          <div className="header__info-city">
            <img className="header__geo" src="../img/icon_geo.svg"/>
            <span className="header__city">Екатеринбург</span>
          </div>
          <button className="header__notify" onClick={() => navigate(AppRoute.Root)}></button>
          <button className="header__profile" onClick={() => navigate(AppRoute.Root)}></button>
        </nav>
      </header>
    </>
  )
}
