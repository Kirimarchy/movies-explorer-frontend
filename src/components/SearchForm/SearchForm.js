import './SearchForm.css';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox.js';
import { useState } from 'react';


const SearchForm = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isShortMoviesFilter, setShortMoviesFilter] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(searchQuery, isShortMoviesFilter);
  }

  const handleCheckBox = (e) => {
    setShortMoviesFilter(!isShortMoviesFilter);
    handleSearch(searchQuery, isShortMoviesFilter);
  }


  return (
    <section className="search">
      <form className="search__form" name="search">
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
      <FilterCheckbox handleCheckBox={handleCheckBox}/>
    </section>
  )
}

export default SearchForm;

