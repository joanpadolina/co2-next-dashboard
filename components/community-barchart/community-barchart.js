import React, { useState, useEffect } from 'react';

export default function CommunityBarchart({ carbonGoal }) {
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
    calcCarbonToKm(carbonGoal)
  },[carbonGoal]);
  
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
