import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function HistoryCharge() {
  const userChargeHistory = useSelector((state) => state.user.historyCharge);
  const [lastCharge, setLastCharge] = useState({});

  useEffect(() => {
    function getLatestCharge() {
      const lastItem = userChargeHistory[userChargeHistory.length - 1];
      setLastCharge(lastItem);
    }

    getLatestCharge();
  }, [lastCharge, userChargeHistory]);


  return (
    <article className="recent-charge my-10 ">
      <h2 className="title--small">Your latest charge</h2>
      <ul className="flex justify-between mb-10 bg-gray-100 p-3 rounded-lg">
        <li>
          <h3 className="recent-charge__subject">date</h3>
          <span className="">{lastCharge.date}</span>
          <p>
            {' '}
            {lastCharge.start} - {lastCharge.end}{' '}
          </p>
        </li>
        <li>
          <h3 className="recent__subject">savings</h3>
          <p>{lastCharge.savingsInPercentage}</p>
        </li>
        <li>
          <h3 className="recent-charge__subject">emission</h3>
          <p className="font-bold">{lastCharge.savedCarbon}kg</p>
        </li>
      </ul>

      <article>
        <p>
          Charging today between 13:00 and 16:00 saves up to 16% on CO2
          emissions
        </p>
      </article>
    </article>
  );
}
