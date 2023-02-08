import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import {useMediaQuery} from "react-responsive";
import {useContext, useEffect, useState} from "react";
import CurrentUserContext from '../../utils/context/CurrentUserContext';

const Navigation = () => {

  const { isAuth } = useContext(CurrentUserContext);
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });
  const [isOpen, setIsOpen] = useState(false);

  function onClickBurger() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, isMobile, onClickBurger]);

  function handleClickOverlay(e) {
    e.stopPropagation();
    onClickBurger();
  }

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
        <nav className={`navigation navigation_state_${isOpen ? 'opened' : 'closed'}`} onClick={isOpen ? onClickBurger : undefined}>
          <BurgerMenu isOpen = {isOpen} onClickBurger = {onClickBurger}/>

          <ul className={`navigation__list navigation__list_logged navigation__list_state_${isOpen ? 'opened' : 'closed'}`}
            onClick={handleClickOverlay}>
            {isMobile&&(
                  <li className="navigation__item">
                    <NavLink exact to='/' className={'navigation__link'} activeClassName="navigation__link_active">
                      Главная
                    </NavLink>
                  </li>
              )}
                  <li className="navigation__item">
                    <NavLink to='/movies' className={({ isActive }) => isActive ? "navigation__link_active" : 'navigation__link'}>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="navigation__item">
                    <NavLink to='/saved-movies' className={({ isActive }) => isActive ? "navigation__link_active" : 'navigation__link'}>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                  <li className="navigation__item">
                    <NavLink to='/profile' className='navigation__link navigation__link_type_account'>
                      Аккаунт
                    </NavLink>
                  </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
