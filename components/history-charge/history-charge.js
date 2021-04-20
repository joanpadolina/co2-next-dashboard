import React from 'react';
import { useSelector } from 'react-redux';

export default function HistoryCharge() {
  const chargingSessions = useSelector((state) => state.store.chargingSession);

  return (
    <>
      <h2 className="font--title"> Your latest charge </h2>
      <table className="history-charge">
        {chargingSessions
          .slice(Math.max(chargingSessions.length - 3, 0))
          .map((charging, index) => (
            <tbody className="history-charge__body">
              <tr className="history-charge__heading-wrapper">
                <th className="history-charge__heading">date</th>
                <th className="history-charge__heading">savings</th>
                <th className="history-charge__heading">CO2 saved</th>
              </tr>
              <tr key={index} className="history-charge__row">
                <td className="history-charge__value">
                  <span className="history-charge__value-date">
                    {charging.date}{' '}
                  </span>
                  <span>
                    {charging.start} - {charging.end}
                  </span>
                </td>
                <td className="history-charge__value">
                  {' '}
                  {charging.savingsInPercentage}
                </td>
                <td className="history-charge__value">
                  {' '}
                  {charging.savedCarbon} kg
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}
