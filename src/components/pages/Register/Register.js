import React, {useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import "./Register.css";
import logo from '../../../images/icons/logo.svg';
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import useValidatedForm from "../../../hooks/useValidatedForm";

const Register = () => {

  const { errors, handleChange, isValid } = useValidatedForm();  
  const { isAuth, setIsAuth } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  function handleRegister({ name, email, password }) {

    setIsAuth(true);
    localStorage.setItem('isAuth', true);
    navigate('/movies');
    setIsPopUp({
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
              onChange={handleChange}
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="register__error">{errors.name}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              className="register__input"
              type="email"
              onChange={handleChange}
              required
            />
            <span className="register__error">{errors.email}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className="register__input"
              type="password"
              onChange={handleChange}
              required
            />
            <span className="register__error">{errors.password}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`register__button ${!isValid && 'register__button_disabled'}`}
          disabled={!isValid}
          onClick={handleRegister}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  )
}

export default Register;
