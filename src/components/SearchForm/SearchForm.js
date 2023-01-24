import './SearchForm.css';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox.js';


const SearchForm = () => {

  return (
    <section className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          required
        />
        <span className="search__error"></span>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox/>
    </section>
  )
}

export default SearchForm;

