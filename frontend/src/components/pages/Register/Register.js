import React from "react";
import { Link } from 'react-router-dom';
import "./Register.css";
import logo from '../../../images/icons/logo.svg';

const Register = () => {
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
              value=""
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
              value=''
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
              value=""
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
