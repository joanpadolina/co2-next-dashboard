import { useState } from 'react';

export default function PopupAmount() {
  const [popupActive, setPopupActive] = useState(false);
  const props = {
    totalAmount: 30,
    date: '2021-21-04',
  };

  function handleButton() {
    setPopupActive(!popupActive);
  }
  return (
    <>
      {popupActive && (
        <div className="popup-amount">
          <article className="popup-amount__body">
            <p> {props.date} </p>
            <p> Good job! </p>
            <p className="popup-amount__subtext">
              You just saved{' '}
              <span className="font--medium popup-amount__carbon">
                {props.totalAmount} kg
              </span>{' '}
              CO2
            </p>
          </article>
          <button
            className="popup-amount__button"
            aria-label="close amount co2"
            onClick={handleButton}
          ></button>
        </div>
      )}
    </>
  );
}
