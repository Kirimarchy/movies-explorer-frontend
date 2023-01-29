import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/icons/logo.svg';
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import PopUp from "../../PopUp/PopUp";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import useValidatedForm from '../../../hooks/useValidatedForm';

const Login = () => {

  const { errors, handleChange, isValid } = useValidatedForm();
  const { isAuth, setIsAuth } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const [isPopUp, setIsPopUp] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });

  function closePopUp() {
    setIsPopUp({ ...isPopUp, isOpen: false });
  }

  function handleLogin({ email, password }) {

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
      <main className="login">
        <form
          className="login__form"
          name="login"
          onSubmit={handleLogin}
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
                placeholder="E-mail"
                onChange={handleChange}
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
                placeholder="Пароль"
                onChange={handleChange}
                minLength="2"
                maxLength="40"
                required
              />
              <span className="login__error">{errors.password}</span>
            </label>
          </div>
          <button
            type="submit"
            className={`login__button ${!isValid && 'login__button_disabled'}`}
            disabled = {!isValid}      
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
        {/*{isPopUp&&<PopUp/>}*/}
      </main>
    );
}

export default Login;
