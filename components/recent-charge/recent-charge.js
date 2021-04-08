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
    <article className="recent-charge">
      <h2 className="recent-charge__title">Your latest charge</h2>
      <ul className="recent-charge__list">
        <li>
          <h3 className="recent-charge__subject">date</h3>
          <span className="">{lastCharge.date}</span>
          <p>
            {' '}
            {lastCharge.start} - {lastCharge.end}{' '}
          </p>
        </li>
        <li>
          <h3 className="recent-charge__subject">savings</h3>
          <p>{lastCharge.savingsInPercentage}</p>
        </li>
        <li>
          <h3 className="recent-charge__subject">emission</h3>
          <p className="text--bold">{lastCharge.savedCarbon}kg</p>
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
