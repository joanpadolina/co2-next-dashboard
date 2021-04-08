import React, { useState, useEffect } from 'react';
import carbonSaving from '../../lib/carbon-saving-calculation';
import diff from '../../lib/time-calculation';
import { useSelector, useDispatch } from 'react-redux';
import { addCharge, addTotal } from '../../redux/actions';
import HistoryCharge from '../history-charge/history-charge';

export default function ChargeTime() {
  const [carbon, setCarbon] = useState(0);
  const userCarbon = useSelector((state) => state.user);
  const userHistory = userCarbon.historyCharge;
  const { userData } = userCarbon;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userCarbon)
    try {
      const chargeCarbonTotal = userHistory.reduce(
        (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
        0,
      );
      dispatch(addTotal(carbon));
      setCarbon(chargeCarbonTotal);
    } catch (err) {
      console.error(err);
    }
  }, [carbon, dispatch, userHistory]);

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
      const total = carbonSaving(duration, userData);
      return total / 100;
    };

    const savings = () => Math.floor(Math.random() * 20) + '%';
    return {
      date,
      startTime,
      endTime,
      duration,
      savedCarbon,
      savings,
    };
  }

  // function today() {
  //   return new Date().toISOString().substr(0, 10);
  // }

  return (
    <section className="h-screen px-6 py-5">
      {carbon} kg
      <h2 className="text-xl font-bold text-center my-5">
        At what time did you charge?
      </h2>
      <HistoryCharge />
      <form className="charge-time" action="" onSubmit={(e) => handleSubmit(e)}>
        <label className="charge-time__label" htmlFor="date">
          date
        </label>
        <input
          className="charge-time__input"
          id="date"
          type="date"
          // value={today()}
        ></input>
        <div className="flex justify-between">
          <label className="charge-time__label" htmlFor="start">
            start
            <input
              className="charge-time__input"
              id="start"
              type="time"
              min="00:00"
              max="23:59"
              required
            ></input>
          </label>
          <label className="charge-time__label" htmlFor="end">
            end
            <input
              className="charge-time__input"
              id="end"
              type="time"
              min="00:00"
              max="23:59"
              required
            ></input>
          </label>
        </div>
        <button className="button my-3">save changes</button>
      </form>
    </section>
  );
}
