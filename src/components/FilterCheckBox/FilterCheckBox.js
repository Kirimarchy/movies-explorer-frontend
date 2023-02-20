import { useState } from 'react'
import './FilterCheckBox.css';

const FilterCheckbox = ({ handleShortFilter, isShortFilter }) => {

  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShortFilter}
        checked={isShortFilter}
      />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
