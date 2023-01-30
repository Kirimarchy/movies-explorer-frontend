import "./Profile.css";
import useValidatedForm from "../../../hooks/useValidatedForm";
import { useContext } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";

const Profile = ({handleSubmit}) => {

  const { values, errors, handleChange, isValid, resetFields } = useValidatedForm();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => resetFields(), [resetFields]);
  
  function submitForm(e){
    e.preventDefault();
    const {name, email} = values;
    handleSubmit(name, email);
  }

  function handleLogout(e) {
    e.preventDefault()
    localStorage.clear();
    setIsAuth(false)
    navigate('/');
  }

  return (
    <main className="profile">
      <form 
        className="profile__form" 
        name="profile"
        onSubmit={submitForm}
      >
        <h1 className="profile__title">Привет {currentUser.name}!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className="profile__input"
              type="text"
              onChange={handleChange}
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
              required
            />
            <span className="profile__error">{errors.email}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${!isValid && 'profile__button-edit_disabled'}`}
            onClick = {submitForm}
            disabled = {!isValid}
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
