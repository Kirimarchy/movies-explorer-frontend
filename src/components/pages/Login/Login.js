import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../images/icons/logo.svg';
import {useEffect, useContext, useState} from "react";
import useValidatedForm from '../../../hooks/useValidatedForm';
import CurrentUserContext from '../../../utils/context/CurrentUserContext';

const Login = ({ handleSubmit, isLocked, lastInputs }) => {
  
  const { values, errors, handleChange, isValid, setFormFields } = useValidatedForm();
  const { isAuth } = useContext(CurrentUserContext);

  useEffect(() => {
    if(lastInputs!=={})  {
      setFormFields(lastInputs, {}, true)
    };
  }, [lastInputs]);
  
  function submitForm(e){
    e.preventDefault();
    const {email, password} = values;
    handleSubmit(email, password);
  }

  if (isAuth) {
    return <Navigate to="/movies" replace />;
  }

    return (
      <main className="login">
        <form
          className="login__form"
          name="login"
          noValidate
          onSubmit={submitForm}
        >
          <Link to='/' className='login__link'>
            <img src={logo} alt="Логотип" className="login__logo" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <div className="login__labels-container">
            <label className="login__label">
              <span className="login__label-text">E-mail</span>
              <input
                name="email"
                className="login__input"
                type="email"
                value={values?.email||''}
                onChange={handleChange}
                disabled={isLocked}
                required
              />
              <span className="login__error">{errors.email}</span>
            </label>
            <label className="login__label">
              <span className="login__label-text">Пароль</span>
              <input
                name="password"
                className="login__input"
                type="password"
                value={values?.password||''}
                onChange={handleChange}
                disabled={isLocked}
                minLength="2"
                maxLength="40"
                required
              />
              <span className="login__error">{errors.password}</span>
            </label>
          </div>
          <button
            type="submit"
            className={`login__button ${(!isValid||isLocked)&& 'login__button_disabled'}`}
            disabled = {!isValid||isLocked}      
          >
            Войти
          </button>
          <span className="login__support">
            Ещё не зарегистрированы?&nbsp;
            <Link to='/signup' className="login__link">
            Регистрация
            </Link>
          </span>
        </form>

      </main>
    );
}

export default Login;
