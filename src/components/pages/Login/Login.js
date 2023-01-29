import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/icons/logo.svg';
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import PopUp from "../../PopUp/PopUp";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import useValidatedForm from '../../../hooks/useValidatedForm';
import { mainApi } from '../../../utils/api/MainApi';

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(CurrentUserContext);
  const { errors, handleChange, isValid } = useValidatedForm();
  const [isPopUp, setPopUp] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });

  function closePopUp() {
    setPopUp({ ...isPopUp, isOpen: false });
  }

  function handleLogin({ email, password }) {

          MainApi.loginUser(email,password)
          .then(jwt => {
            if (jwt.token) {
              localStorage.setItem('jwt', jwt.token);
              setIsAuth(true);
              navigate('/movies');
              setPopUp({
                isOpen: true,
                successful: true,
                text: 'Добро пожаловать!',
              });
            }
          })
          .catch(err =>
            setPopUp({
              isOpen: true,
              successful: false,
              text: err,
            })
          )
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
        {isPopUp&&<PopUp/>}
      </main>
    );
}

export default Login;
