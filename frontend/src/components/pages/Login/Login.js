import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/icons/logo.svg';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";

const Login = () => {

  const navigate = useNavigate();

  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });

  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  function handleLogin({ email, password }) {

          localStorage.setItem('isAuth', true);
          navigate('/movies');
          setIsInfoTooltip({
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
                required
              />
              <span className="login__error">Неверный E-Mail</span>
            </label>
            <label className="login__label">
              <span className="login__label-text">Пароль</span>
              <input
                name="password"
                className="login__input"
                type="password"
                required
              />
              <span className="login__error">Неверный пароль</span>
            </label>
          </div>
          <button
            type="submit"
            className="login__button"
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
        {/*{isInfoTooltip&&<InfoTooltip/>}*/}
      </main>
    );
}

export default Login;
