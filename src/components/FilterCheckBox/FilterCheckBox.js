import { useState } from 'react'
import './FilterCheckBox.css';

const FilterCheckbox = ({ handleChangeFilter, isShortFilter }) => {

  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleChangeFilter}
        checked={isShortFilter||false}
      />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
