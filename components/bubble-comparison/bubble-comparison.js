import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function BubbleComparison() {
  const store = useSelector((state) => state.store);
  const { community, total } = store;
  const [contribution, setContribution] = useState(0);
  const [communityContribution, setCommunityContribution] = useState(0);

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
      const progressCommunity = (1 * totalOfUsers) / total;
      setCommunityContribution(progressCommunity);
      setContribution(1);
    } else setCommunityContribution(1);
  }, [
    contribution,
    community,
    total,
    communityContribution,
    setCommunityContribution,
  ]);

  return (
    <article className="bubble-comparison">
      <div className="bubble-comparison__bubbles">
        <div
          className="bubble-comparison__circle bubble-comparison__community"
          style={{ transform: `scale(${communityContribution})` }}
        >
          <p
            className={`${
              communityContribution < 0.6 ? 'bubble-comparison--remove' : ''
            } bubble-comparison__body--inside`}
          >
            <span className="bubble-comparison__carbon">
              {community.total} kg
            </span>
            <span className="bubble-comparison__subtitle">CO2 saved</span>
          </p>
        </div>
        <div
          className="bubble-comparison__circle bubble-comparison__contribution"
          style={{ transform: `scale(${contribution})` }}
        >
          <p
            className={`${
              contribution < 0.6 ? 'bubble-comparison--remove' : ''
            } bubble-comparison__body--inside bubble-comparison__body--right`}
          >
            <span className="bubble-comparison__carbon">
              {total} kg
            </span>
            <span className="bubble-comparison__subtitle">
              Your contribution
            </span>
          </p>
        </div>
      </div>

      <p
        className={`${
          communityContribution > 0.6 ? 'bubble-comparison--remove' : ''
        } bubble-comparison__body`}
      >
        <span className="bubble-comparison__carbon">
          {community.total} kg
        </span>
        <span className="bubble-comparison__subtitle">CO2 saved</span>
      </p>
      <p
        className={`${
          contribution >= 0.6 ? 'bubble-comparison--remove' : ''
        } bubble-comparison__body bubble-comparison__body--right`}
      >
        <span className="bubble-comparison__carbon">{total} kg</span>
        <span className="bubble-comparison__subtitle">Your contribution</span>
      </p>
    </article>
  );
}
