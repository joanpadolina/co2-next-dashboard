import React from 'react';
import { useSelector } from 'react-redux';

export default function HistoryCharge() {
  const userCarbon = useSelector((state) => state.store.chargingSession);

  return (
    <>
    <h2> Your recent charge </h2>
    <table className="history-charge">
      {userCarbon.historyCharge.map((charging, index) => (
          <tbody className="history-charge__body">
            <tr className="history-charge__heading-wrapper">
              <th className="history-charge__heading">date</th>
              <th className="history-charge__heading">savings</th>
              <th className="history-charge__heading">CO2 saved</th>
            </tr>
            <tr key={index} className="history-charge__row">
              <td className="history-charge__value">
                <th>{charging.date}</th>
                {charging.start} - {charging.end}
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
