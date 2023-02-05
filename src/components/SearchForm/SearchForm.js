import './SearchForm.css';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox.js';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../utils/context/CurrentUserContext';


const SearchForm = ({ handleSearch }) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isShortMoviesFilter, setShortMoviesFilter] = useState(Boolean(localStorage.getItem(`${currentUser.email}|short_filter`)));

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleCheckBox = (e) => {
    setShortMoviesFilter(e.target.value);
    localStorage.setItem(`${currentUser.email}|short_filter`, e.target.value);
    handleSearch(searchQuery, isShortMoviesFilter);
  }

  const submitSearchQuery = (e) =>{
    e.preventDefault();  
    handleSearch(searchQuery, isShortMoviesFilter);
  }

  useEffect(()=>{
    setSearchQuery(localStorage.getItem(`${currentUser.email}|search_query`)||'');
  }, []);

  return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={submitSearchQuery}>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          onInput={handleInputChange}
          value={searchQuery||''}
          required
        />
        <span className="search__error"></span>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox handleChangeFilter={handleCheckBox} isShortFilter = {isShortMoviesFilter}/>
    </section>
  )
}

export default SearchForm;

