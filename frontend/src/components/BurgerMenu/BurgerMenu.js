import './BurgerMenu.css';
import { useMediaQuery } from 'react-responsive';
import {useEffect, useState} from 'react';

const BurgerMenu = (props) => {

  let isBurgerOpened = { props };

  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  function onClickBurger() {
    isBurgerOpened = !isBurgerOpened;
  }

  useEffect(() => {
    if (!isMobile && isBurgerOpened) {
      onClickBurger();
    }
  }, [isBurgerOpened, isMobile, onClickBurger]);

  return (
    <button
      type="button"
      className={`burgermenu-button burgermenu-button_${
        isBurgerOpened ? 'on' : 'off'
      }`}
      onClick={onClickBurger}
    >
      <span></span>
    </button>
  );
}

export default BurgerMenu;
