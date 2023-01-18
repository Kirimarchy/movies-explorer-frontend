import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import {useMediaQuery} from "react-responsive";
import {useContext, useEffect, useState} from "react";
import useEscButton from "../../hooks/useEscButton";
import CurrentUserContext from "../../utils/context/CurrentUserContext";

const Navigation = () => {

  const { isAuth } = useContext(CurrentUserContext);
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });
  const [isOpenBurger, setisOpenBurger] = useState(false);

  function onClickBurger() {
    setisOpenBurger(!isOpenBurger);
  }
  useEscButton(onClickBurger, isOpenBurger);

  useEffect(() => {
    if (!isMobile && isOpenBurger) {
      setisOpenBurger(false);
    }
  }, [isOpenBurger, isMobile, onClickBurger]);

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
        <nav className={`navigation navigation_state_${isOpenBurger ? 'opened' : 'closed'}`} onClick={isOpenBurger ? onClickBurger : undefined}>
          <BurgerMenu isOpenBurger = {isOpenBurger} onClickBurger = {onClickBurger}/>

          <ul className={`navigation__list navigation__list_logged navigation__list_state_${isOpenBurger ? 'opened' : 'closed'}`}
            onClick={handleClickOverlay}>
            {isMobile&&(
                  <li className="navigation__item">
                    <NavLink exact to='/' className={'navigation__link'} activeClassName="navigation__link_active">
                      Главная
                    </NavLink>
                  </li>
              )}
                  <li className="navigation__item">
                    <NavLink to='/movies' className='navigation__link' activeClassName="navigation__link_active">
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="navigation__item">
                    <NavLink to='/saved-movies' className='navigation__link' activeClassName="navigation__link_active">
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
