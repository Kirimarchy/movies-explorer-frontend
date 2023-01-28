import './PopUp.css';
import useEscapeButton from "../../hooks/useEscapeButton";

export default function PopUp({ onClose, status: { isOpen, successful, text } }) {

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  useEscapeButton(onClose, isOpen);

  return (
          <div
            className={`pop-up ${isOpen && 'pop-up_opened'}`}
            onClick={onClose}
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
                onClick={onClose}
                ></button>
            </div>
          </div>
          );
}
