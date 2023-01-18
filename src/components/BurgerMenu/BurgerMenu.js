import './BurgerMenu.css';
import { useMediaQuery } from 'react-responsive';
import {useEffect, useState} from 'react';
import useEscButton from "../../hooks/useEscButton";

const BurgerMenu = ({isOpenBurger, onClickBurger}) => {

  const isMobile = useMediaQuery({query: '(max-width: 800px)'});

  useEffect(()=> { if(!isMobile && isOpenBurger) {
    onClickBurger();
  }}, [isOpenBurger, isMobile, onClickBurger]);

  useEscButton(()=> onClickBurger());

  return (
    <button
      type="button"
      className={`burgermenu-button burgermenu-button_${
        isOpenBurger ? 'on' : 'off'
      }`}
      onClick={onClickBurger}
    >
      <span></span>
    </button>
  );
}

export default BurgerMenu;
