import React from 'react';

import { useSelector } from 'react-redux';

export default function HistoryCharge() {
  const userCarbon = useSelector((state) => state.user);

  return (
    <ul className="mb-30 ">
      {userCarbon.historyCharge.map((charging, index) => (
        <li className="py-1" key={index}>
          <article className="flex justify-between">
            <article>
              <h3 className="title--small">date</h3>
              <p> {charging.date} </p>
              <p>
                {' '}
                {charging.start} - {charging.end}{' '}
              </p>
            </article>
            <article>
              <h3 className="title--small">savings</h3>
              <p> {charging.savingsInPercentage} </p>
            </article>
            <article>
              <h3 className="title--small">emission</h3>
              <p className="font-bold"> {charging.savedCarbon}kg</p>
            </article>
          </article>{' '}
        </li>
      ))}
    </ul>
  );
}
