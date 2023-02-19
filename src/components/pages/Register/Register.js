import "./Register.css";
import logo from '../../../images/icons/logo.svg';
import { useEffect, useContext } from "react";
import { Link, Navigate } from 'react-router-dom';
import useValidatedForm from "../../../hooks/useValidatedForm";
import CurrentUserContext from '../../../utils/context/CurrentUserContext';

const Register = ({ handleSubmit, isLocked }) => {

  const { values, errors, handleChange, isValid, resetFields } = useValidatedForm();
  const { isAuth } = useContext(CurrentUserContext);

  useEffect(() => {resetFields(),console.log('isValid',isValid,'isLocked',isLocked,"disabled", !isValid||isLocked)}, [resetFields]);
  
  function submitForm(e){
    e.preventDefault();
    const {name, email, password} = values;
    handleSubmit(name, email, password);
  }

  if (isAuth) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <main className="register">
      <form 
        className="register__form" 
        name="register"
        onSubmit={submitForm}
        noValidate
      >
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
              value={values.name||''}
              onChange={handleChange}
              disabled={isLocked}
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
              value={values.email||''}
              onChange={handleChange}
              disabled={isLocked}
              required
            />
            <span className="register__error">{errors?.email}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className="register__input"
              type="password"
              value={values.password||''}
              onChange={handleChange}
              disabled={isLocked}
              required
            />
            <span className="register__error">{errors?.password}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`register__button ${(!isValid||isLocked)&& 'register__button_disabled'}`}
          disabled={!isValid||isLocked}
          onClick={submitForm}
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
