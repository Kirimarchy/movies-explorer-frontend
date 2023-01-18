import { useState } from 'react'
import './FilterCheckBox.css';

const FilterCheckbox = ({ shortMovies, handleShortFilms }) => {
  const [isChecked, setChecked] = useState(false);

  const handleChangeCheck = () => {
    setChecked(!isChecked);
    handleShortFilms()
  }

  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onInput={handleShortFilms}
        defaultChecked={isChecked}
      />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
