import React, { useState, useEffect } from 'react';

export default function ProgressBar({
  totalSavingsCommunity,
  totalCommunityGoal,
  noShow
}) {
  const [currentProgress, setCurrentProgress] = useState('');

  useEffect(() => {
    const progressWidthPercentage =
      (100 * totalSavingsCommunity) / totalCommunityGoal;
    setCurrentProgress(`${progressWidthPercentage >= 100 ? 100 : progressWidthPercentage}%`);
  }, [totalSavingsCommunity, totalCommunityGoal]);

  return (
    <div className="progress-bar__wrapper">
      <div
        className="progress-bar__bar"
        style={{ width: currentProgress }}
      ></div>
    </div>
  );
}
