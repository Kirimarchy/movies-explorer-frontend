import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import {useMediaQuery} from "react-responsive";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../utils/context/AuthContext";

const Navigation = () => {

  const isAuth = useContext(AuthContext);
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });
  const activeLink = `navigation__link_active_${isMobile ? 'mobile' : 'desktop'}`;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isAuth ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to='/signup' className='navigation__link navigation__link_landing'>
                Регистрация
              </Link>
            </li>
            <li>
              <Link to='/signin' className='navigation__link navigation__link_landing navigation__link_signin'>
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation navigation_state_${isOpen ? 'opened' : 'closed'}`} >
          {isMobile ? <BurgerMenu isOpen = {isOpen} onClick = {onClickBurger}/>
            :
            <ul
            className={`navigation__list navigation__list_logged navigation__list_state_${isOpen ? 'opened' : 'closed'}`}
            onClick={handleClickOverlay}>

            <li className="navigation__item">
              <NavLink exact to='/' className='navigation__link' activeClassName={activeLink}>
                Главная
              </NavLink>
            </li>

            <li className="navigation__item">
              <NavLink to='/movies' className='navigation__link' activeClassName={activeLink}>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to='/saved-movies' className='navigation__link' activeClassName={activeLink}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to='/profile' className='navigation__link navigation__link_type_account'
                       activeClassName={activeLink}>
                Аккаунт
              </NavLink>
            </li>
          </ul>}
        </nav>
      )}
    </>
  );
}

export default Navigation;
