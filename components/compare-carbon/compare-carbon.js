import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGimmicks } from '../../redux/actions';

export default function Comparable() {
  const userCarbon = useSelector((state) => state.user);
  const [carbonInDistance, setCarbonInDistance] = useState();
  const [totalCharge, setTotalCharge] = useState();
  const [gimmicksValue, setGimmicksValue] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const chargeCarbonTotal = userCarbon.historyCharge.reduce(
      (sum, { savedCarbon }) => sum + savedCarbon,
      0,
    );
    async function dataFetch() {
      const data = await fetch('http://localhost:4000/gimmick');
      const response = await data.json();
      return response;
    }
    setTotalCharge(chargeCarbonTotal);
    async function calcCarbon(carbonValue) {
      const average = 121.8;
      const resultDistance = (carbonValue * 100) / average;
      const distance = Math.ceil(resultDistance);
      return setCarbonInDistance(distance);
    }

    async function calcGimmick(value) {
      if (value) {
        const washer = 2.1;
        const tv = 0.206;
        const amountWash = Math.floor(value / washer);
        const valueHour = Math.floor(value / tv);
        let tvInDays;

        if (valueHour >= 24) {
          tvInDays = Math.floor(valueHour / 24);
        }

        setGimmicksValue({ amountWash, valueHour, tvInDays });
        dispatch(addGimmicks({ amountWash, valueHour, tvInDays }));
      }
    }
    calcCarbon(chargeCarbonTotal);
    calcGimmick(totalCharge);
  }, [dispatch, totalCharge, userCarbon.historyCharge]);

  return (
    <article className="compare-item">
      <h2 className="title--small">More about your footprint</h2>
      <div className="compare-item__wrapper">
        <article className="compare-item__article">
          <h3 className="text-xl font-bold compare-item__article-title">
            {gimmicksValue.tvInDays} days
          </h3>
          <p className="compare-item__wrapper-body">of watching television</p>
        </article>
        <article className="compare-item__article">
          <h3 className="compare-item__article-title text-xl font-bold">
            {carbonInDistance} km
          </h3>
          <p className="compare-item__wrapper-body">driving in a petrol car.</p>
        </article>
      </div>
    </article>
  );
}
