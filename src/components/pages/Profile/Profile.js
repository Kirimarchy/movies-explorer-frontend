import "./Profile.css";
import useValidatedForm from "../../../hooks/useValidatedForm";
import { useContext , useEffect } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = ({ handleSubmit, isLocked, lastInputs }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { values, errors, handleChange, isValid, setFormFields } = useValidatedForm();
  const { currentUser, setIsAuth, setUserMovies, setCurrentUser } = useContext(CurrentUserContext)||{};
  const { name, email } = currentUser;

  const isDuplicatedInfo = values.email===email && values.name===name;
  const isLockedButton = !isValid||isDuplicatedInfo||isLocked;

  useEffect(() => {
    if(lastInputs!=={})  {
      setFormFields(lastInputs, {}, true)
    } else {
      setFormFields({name, email});
    };
  }, [lastInputs]);
  

  function submitForm(e){
    e.preventDefault();
    handleSubmit(values.name, values.email);
  }

  function handleLogout(e) {
    e.preventDefault()
    localStorage.clear();
    setIsAuth(false);
    setUserMovies([]);
    setCurrentUser(null);
    navigate('/');
  }

  return (
    <main className="profile">
      <form 
        className="profile__form" 
        name="profile"
        onSubmit={submitForm}
      >
        <h1 className="profile__title">Привет {currentUser?.name}!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className="profile__input"
              type="text"
              onChange={handleChange}
              value={values?.name||''}
              disabled={isLocked}
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="profile__error-name">{errors.name}</span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className={"profile__input"}
              type="email"
              onChange={handleChange}
              value={values?.email||''}
              disabled={isLocked}
              required
            />
            <span className="profile__error">{errors.email}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${isLockedButton && 'profile__button-edit_disabled'}`}
            onClick={submitForm}
            disabled={isLockedButton}
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
