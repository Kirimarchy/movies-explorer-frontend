import './BurgerMenu.css';
import { useMediaQuery } from 'react-responsive';
import {useEffect, useState} from 'react';

const BurgerMenu = ({isOpen, onClickBurger}) => {
  const isMobile = useMediaQuery({query: '(max-width: 800px)'});

  useEffect(()=> { if(!isMobile && isOpen) {
    onClickBurger();
  }}, [isOpen, isMobile, onClickBurger]);


  return (
    <button
      type="button"
      className={`burgermenu-button burgermenu-button_${
        isOpen ? 'on' : 'off'
      }`}
      onClick={onClickBurger}
    >
      <span></span>
    </button>
  );
}

export default BurgerMenu;
