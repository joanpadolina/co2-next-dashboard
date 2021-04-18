import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  carbonSavingCalculation,
  carbonReduces,
} from "../lib/carbon-saving-calculation";
import diff from "../lib/time-calculation";
import { useSelector, useDispatch } from "react-redux";
import { addCharge, addTotal } from "../redux/actions";

export default function ChargeTime({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();
  const [carbon, setCarbon] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const userCarbon = useSelector((state) => state.user);
  const userHistory = userCarbon.historyCharge;
  const { userData } = userCarbon;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.asPath === "/charge-input") {
      setIsBrowser(!isBrowser);
    }
    setIsBrowser(true);


    try {
      const chargeCarbonTotal = carbonReducer(userHistory);
      dispatch(addTotal(carbon));
      setCarbon(chargeCarbonTotal);
    } catch (err) {
      console.error(err);
    }

    // set date to today
    const setDateToday = new Date().toISOString().substr(0, 10);
    setCurrentDate(setDateToday);

  }, [carbon, dispatch, userHistory, setCurrentDate]);

  function chargeConfig(config = {}) {
    const newCharge = {
      date: config.date,
      start: config.startTime,
      end: config.endTime,
      duration: config.duration,
      savingsInPercentage: config.savings(),
      savedCarbon: config.savedCarbon(),
    };
    return newCharge;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const input = handleInput(e);
    const data = chargeConfig(input);
    
    dispatch(addCharge(data));
  }

  function handleInput(e) {
    const date = e.target[0].value;
    const startTime = e.target[1].value;
    const endTime = e.target[2].value;
    const duration = diff(startTime, endTime);
    
    const savedCarbon = () => {
      const total = carbonSavingCalculation(duration, userData);
      return total / 100;
    };

    const savings = () => Math.floor(Math.random() * 20) + "%";
    return {
      date,
      startTime,
      endTime,
      duration,
      savedCarbon,
      savings,
    };
  }

  function changeDate(e) {
    return setCurrentDate(e.target.value);
  }

  return (
    <section className='charge-input charge-input--modal'>
      <h2 className='charge-input__title font--title'>
        At what time did you charge?
      </h2>
      <form
        className='charge-input__form charge-input__form--modal'
        action=''
        onSubmit={(e) => handleSubmit(e)}
      >
        <label
          className='charge-input__label a11y-sr-only'
          aria-label='date'
          htmlFor='date'
        >
          date
        </label>
        <input
          className='charge-input__date'
          id='date'
          type='date'
          value={currentDate || ""}
          onChange={(e) => changeDate(e)}
        ></input>
        <div className='charge-input__amount-wrapper'>
          <label className='charge-input__label' htmlFor='start'>
            start
            <input
              className='charge-input__time charge-input__border--default'
              id='start'
              type='time'
              min='00:00'
              max='23:59'
              required
            ></input>
          </label>
          <label className='charge-input__label' htmlFor='end'>
            end
            <input
              className='charge-input__time charge-input__border--default'
              id='end'
              type='time'
              min='00:00'
              max='23:59'
              required
            ></input>
          </label>
        </div>

        <div className='charge-input__value-wrapper'>
          <label for='charge-value' className='charge-input__charge-label'>
            Charging amount
          </label>
          <input
            id='charge-value'
            type='number'
            className='charge-input__amount charge-input__border--default'
            required
          ></input>

          <div className='charge-input__toggle'>
            <input
              type='radio'
              className='charge-input__radio'
              id='km'
              name='amount'
              defaultChecked
            />
            <label
              for='km'
              className='charge-input__radio-label'
              aria-label='kilometers'
            >
              km
            </label>

            <input
              type='radio'
              id='kWh'
              className='charge-input__radio'
              name='amount'
            />
            <label
              for='kWh'
              className='charge-input__radio-label'
              aria-label='kilowatt-hour'
            >
              kWh
            </label>
          </div>
        </div>
        <div className='button-wrapper'>
          <button className='button'>save changes</button>
        </div>
      </form>
      <a className='button-flat button--secondary'> add another session</a>
    </section>
  );
}
