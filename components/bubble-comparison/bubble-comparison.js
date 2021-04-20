import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function BubbleComparison() {
  const store = useSelector((state) => state.store);
  const { community, total } = store;
  const [contribution, setContribution] = useState(1);
  const [contribution1, setContribution1] = useState(1);

  useEffect(() => {
    const totalOfUsers = community.users.reduce(
      (sum, { savedCarbon }) => sum + savedCarbon,
      0,
    );

    const data = {
      total: community.total,
      yours: total,
    };

    const progressScale = (1 * data.yours) / data.total;
    setContribution(progressScale);
    if (total >= totalOfUsers) {
      console.log((1 * totalOfUsers) / total);
      const progressCommunity = (1 * totalOfUsers) / total;
      setContribution1(progressCommunity);
      setContribution(1);
    } else setContribution1(1);
  }, [contribution, community, total, contribution1, setContribution1]);

  return (
    <article className="bubble-comparison">
      <div
        className="bubble-comparison__circle bubble-comparison__community"
        style={{ transform: `scale(${contribution1})` }}
      >
        <span className="font--medium bubble-comparison__carbon">
          {community.total} kg
        </span>
        <span className="bubble-comparison__subtitle">CO2 saved</span>
      </div>
      <div className="bubble-comparion__user">
        <div
          className="bubble-comparison__circle bubble-comparison__contribution"
          style={{ transform: `scale(${contribution})` }}
        >
          <span className="font--medium bubble-comparison__carbon">
            {total}
          </span>
          <span className="font--medium bubble-comparison__subtitle">
            Your contribution
          </span>
        </div>
      </div>
    </article>
  );
}
