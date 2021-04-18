import React, { useState, useEffect } from 'react';

export default function CommunityBarchart({ carbonGoal }) {
  // Bar diagram
  // 1. Total km devided by 3
  // 2. calculate in percentage
  // 3. the percentage is the width of each bar

  const gimmick = (carbon) => {
    const math = (data) => Math.floor((carbon * 100) / data);

    return {
      plane: math(195),
      car: math(121),
      train: math(30),
    };
  };

  function diagram(carbon) {
    const data = gimmick(carbon);
    const average = [data.plane, data.car, data.train];
    const reduce = average.reduce((a, b) => a + b);
    for (let i = 0; i <= average.length; i++) {
      const barWidth = Math.ceil((average[i] / reduce) * 100);
      return barWidth;
    }
  }

  const [destination, setDestination] = useState('Luxembourg');
  const [carbonInKm, setCarbonInKm] = useState();

  useEffect(() => {
    async function distance() {
      const url = await fetch('http://localhost:4000/gimmick');
      const response = await url.json();
      const petrol = await response.gimmick.petrolCar;
      return petrol;
    }

    async function calcCarbonToKm(carbon) {
      const averagePetrol = await distance();
      const resultDistance = (carbon * 100) / averagePetrol;
      return setCarbonInKm(Math.ceil(resultDistance));
    }
    calcCarbonToKm(carbonGoal);
  }, [carbonGoal]);

  return (
    <article>
      <h2>Next destination</h2>
      <section>
        <h3>AMS -- {destination}</h3>
        <h3>{carbonInKm}km</h3>
      </section>
    </article>
  );
}
