import React, { useState, useEffect } from 'react'

export default function ProgressBar({
  totalSavingsCommunity,
  totalCommunityGoal,
  color
}) {
  const [currentProgress, setCurrentProgress] = useState('')

  useEffect(() => {
    const progressWidthPercentage =
      (100 * totalSavingsCommunity) / totalCommunityGoal
    setCurrentProgress(
      `${progressWidthPercentage >= 100 ? 100 : progressWidthPercentage}%`
    )
  }, [totalSavingsCommunity, totalCommunityGoal])

  const barColor = color === 'community' ? '#88B2D8' : '#F59B01'
  const barBackground = color === 'community' ? '#E3E6E8' : '#9E9AA7'

  return (
    <div
      className='progress-bar__wrapper'
      style={{ backgroundColor: barBackground }}
    >
      <div
        className='progress-bar__bar'
        style={{ width: currentProgress, backgroundColor: barColor }}
      ></div>
    </div>
  )
}
