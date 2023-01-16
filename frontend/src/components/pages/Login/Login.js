import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/icons/logo.svg';

const Login = () => {

    return (
      <main className="login">
        <form
          className="login__form"
          name="login"
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
      </main>
    );
}

export default Login;
