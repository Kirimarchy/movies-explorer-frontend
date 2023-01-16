import React from "react";
import "./Profile.css";

const Profile = () => {
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
            value=''
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
            value={''}
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
        <button type="submit" className="profile__button-exit">
          Выйти из аккаунта
        </button>
      </div>
    </form>
  </main>
);
}

export default Profile;
