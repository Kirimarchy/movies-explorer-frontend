import './PopUp.css';
import useEscapeButton from "../../hooks/useEscapeButton";
import { useState } from 'react';

export default function PopUp({ isOpen, successful, text }) {
  const [isOpened, setIsOpened] = useState({isOpen});

  function handleClickOverlay(e) {
    e.stopPropagation();
    closePopUp();
  }

  useEscapeButton(closePopUp, isOpen);


  function closePopUp() {
    setIsOpened(false);
  }

  return (
          <div
            className={`pop-up ${isOpened && 'pop-up_opened'}`}
            onClick={closePopUp}
            >
            <div className="pop-up__container" onClick={handleClickOverlay}>
              <div
                className={`pop-up__status ${
                successful
              ? 'pop-up__status_success'
              : 'pop-up__status_fail'
              }`}
                ></div>
              <h2 className="pop-up__title">{text}</h2>
              <button
                type="button"
                className="pop-up__close-button"
                onClick={closePopUp}
                ></button>
            </div>
          </div>
          );
}
