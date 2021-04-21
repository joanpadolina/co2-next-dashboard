import { useState, useEffect } from 'react';
import { modalActive } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function PopupAmount({props}) {
  const [popupActive, setPopupActive] = useState(true);
  console.log(props)
  const dispatch = useDispatch();
//   const props = {
//     totalAmount: 30,
//     date: '2021-21-04',
//   };

//   useEffect(() => {
//     dispatch(modalActive(popupActive));
//   }, dispatch);

  function handleButton() {
    setPopupActive(!popupActive);
    dispatch(modalActive(false));
  }
  return (
    <>
      {popupActive && (
        <div className="popup-amount">
          <article className="popup-amount__body">
            <p className="popup-amount__date"> {props.date} </p>
            <p> Good job! </p>
            <p className="popup-amount__subtext">
              You just saved{' '}
              <span className="font--medium popup-amount__carbon">
                {props.total} kg
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
