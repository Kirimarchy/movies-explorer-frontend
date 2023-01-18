import React, {useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import "./Register.css";
import logo from '../../../images/icons/logo.svg';
import {AuthContext} from "../../../utils/context/AuthContext";

const Register = () => {

  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleRegister({ name, email, password }) {

    setIsAuth(true);
    localStorage.setItem('isAuth', true);
    navigate('/movies');
    setIsInfoTooltip({
      isOpen: true,
      successful: true,
      text: 'Добро пожаловать!',
    });
  }

  return (
    <main className="register">
      <form className="register__form" name="register">
        <Link to="/" className="register__link">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              name="name"
              className="register__input"
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="register__error">Ошибка</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              className="register__input"
              type="email"
              required
            />
            <span className="register__error">Неправильный E-mail</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className="register__input"
              type="password"
              required
            />
            <span className="register__error">Недопустимый пароль</span>
          </label>
        </div>
        <button
          type="submit"
          className="register__button"
          disabled={false}
          onClick={handleRegister}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  )
}

export default Register;
