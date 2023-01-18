import React, {useContext} from "react";
import "./Profile.css";
import {AuthContext} from "../../../utils/context/AuthContext";
import {useHistory, useNavigate} from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const {isAuth, setIsAuth} = useContext(AuthContext);

  function handleEditProfile ({ name, email }) {

    setIsLoader(true);
    setTimeout(setIsLoader(false), 500);

    currentUser = {name, email};
    localStorage.setItem('User', currentUser);

    setIsInfoTooltip({
      isOpen: true,
      successful: true,
      text: 'Ваши данные обновлены!',
    });

  }

  function handleLogout(e) {
    e.preventDefault()

    // setLoggedIn(false);
    localStorage.clear();
    setIsAuth(false)
    navigate('/');

  }

  return (
    <main className="profile">
    <form className="profile__form" name="profile">
      <h1 className="profile__title">Привет %Username!</h1>
      <div className="profile__labels-container">
        <label className="profile__label">
          <span className="profile__label-text">Имя</span>
          <input
            name="name"
            className="profile__input"
            type="text"
            required
            minLength="2"
            maxLength="30"
            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
          />
          <span className="profile__error-name">Ошибка</span>
        </label>
        <label className="profile__label">
          <span className="profile__label-text">E-mail</span>
          <input
            name="email"
            className={"profile__input"}
            type="email"
            required
          />
          <span className="profile__error">Ошибка</span>
        </label>
      </div>
      <div className="profile__button-container">
        <button
          type="submit"
          className="profile__button-edit"
        >
          Редактировать
        </button>
        <button type="button" className="profile__button-exit" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </form>
  </main>
);
}

export default Profile;
