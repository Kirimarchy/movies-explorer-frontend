import './SearchForm.css';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox.js';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../utils/context/CurrentUserContext';
import useValidatedForm from '../../hooks/useValidatedForm';


const SearchForm = ({ handleSubmitQuery, isShortFilter, handleShortFilter }) => {
  const {currentUser} = useContext(CurrentUserContext);
  const { values, errors, setErrors, handleChange, isValid, setIsValid } = useValidatedForm();

  const submitSearchQuery = (e) => {
    e.preventDefault();  
    isValid ? handleSubmitQuery(values.search) : setErrors({search: 'Нужно ввести ключевое слово'}) ;
  }

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email}|searchQuery`)) {
      values.search = localStorage.getItem(`${currentUser.email}|searchQuery`);
      setIsValid(true);
    }
    
  }, [currentUser]);

  useEffect(() => {
    if (location.pathname === '/saved-movies' && values.search === '') {
      setErrors({search: ''});
    }
  },[values])

  return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={submitSearchQuery}>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          onChange={handleChange}
          value={values.search||''}
          required
        />
        <span className="search__error">{errors.search}</span>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox isShortFilter = {isShortFilter} handleShortFilter = {handleShortFilter}/>
    </section>
  )
}

export default SearchForm;

