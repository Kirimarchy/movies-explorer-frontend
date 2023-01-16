import './BurgerMenu.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

const BurgerMenu = ({ isBurgerOpened, onClickBurger }) => {

  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  function handleOnClickBurger() {
    onClickBurger();
  };

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
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
}

export default BurgerMenu;
