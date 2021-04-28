import React, { useState, useEffect } from 'react'
import { carbonReducer } from '../../lib/carbon-saving-calculation.js'
import { useSelector } from 'react-redux'

export default function BubbleComparison() {
  const store = useSelector((state) => state.store)
  const { community, chargingSession } = store
  const [contribution, setContribution] = useState(0)
  const [carbonTotal, setCarbonTotal] = useState(0)
  const [communityContribution, setCommunityContribution] = useState(0)

  useEffect(() => {
    const totalOfUsers = carbonReducer(community.users)
    const totalUser = carbonReducer(chargingSession)
    setCarbonTotal(totalUser)

    const data = {
      total: community.total,
      yours: totalUser
    }
    const progressScale = (1 * data.yours) / data.total
    setContribution(progressScale)

    if (totalUser >= totalOfUsers) {
      const progressCommunity = (1 * totalOfUsers) / totalUser
      setCommunityContribution(progressCommunity)
      setContribution(1)
    } else setCommunityContribution(1)
  }, [
    contribution,
    community,
    chargingSession,
    communityContribution,
    setCommunityContribution
  ])
  return (
    <article className='bubble-comparison'>
      <div className='bubble-comparison__bubbles'>
        <svg className='bubble-comparison__bubble-wrapper' viewBox='0 0 50 50'>
          <g>
            <circle
              className='bubble-comparison__bubble-circle bubble-comparison__bubble-community'
              style={{ transform: `scale(${communityContribution})` }}
              cx='35%'
              cy='50%'
              r='20'
              fill='#red'
            />
            <text
              fill='white'
              x='200'
              y='200'
              fontSize='120'
              textAnchor='middle'
              alignmentBaseline='central'
            >
              A
            </text>
          </g>
          <circle
            className='bubble-comparison__bubble-circle'
            style={{ transform: `scale(${contribution})` }}
            cx='80%'
            cy='50%'
            r='20'
            fill='#88B2D8'
          />
        </svg>
      </div>

      <article className='bubble-comparison__body'>
        <p className='bubble-comparison__body-community bubble-comparison__body--inside'>
          <span className='bubble-comparison__carbon'>
            {community.total} kg
          </span>
          CO2 saved
        </p>
        <p
          className={
            'bubble-comparison__body--inside bubble-comparison__body-contribution'
          }
        >
          <span className='bubble-comparison__carbon'>{carbonTotal} kg</span>
          Your contribution
        </p>
      </article>
    </article>
  )
}

// return (
//   <article className='bubble-comparison'>
//     <div className='bubble-comparison__bubbles'>
//       <div
//         // className='bubble-comparison__circle bubble-comparison__community'
//         className='bubble-comparison__bubble-wrapper'
//         // style={{ transform: `scale(${communityContribution})` }}
//       >
//         <svg>
//           <circle
//             className='bubble-comparison__bubble-svg'
//             style={{ transform: `scale(${communityContribution})` }}
//             cx='50'
//             cy='50'
//             r='40'
//             fill='#red'
//           />
//         </svg>
//         <p
//           className={`${
//             communityContribution < 0.6 ? 'bubble-comparison--remove' : ''
//           } bubble-comparison__body--inside`}
//         >
//           <span className='bubble-comparison__carbon'>
//             {community.total} kg
//           </span>
//           CO2 saved
//         </p>
//       </div>

//       <div
//       // className='bubble-comparison__bubble-wrapper'
//       // className='bubble-comparison__circle bubble-comparison__contribution'
//       // style={{ transform: `scale(${contribution})` }}
//       >
//         <svg>
//           <circle
//             style={{ transform: `scale(${contribution})` }}
//             cx='50'
//             cy='50'
//             r='40'
//             fill='#88B2D8'
//           />
//         </svg>
//         <p
//           className={`${
//             contribution < 0.6 ? 'bubble-comparison--remove' : ''
//           } bubble-comparison__body--inside bubble-comparison__body--right`}
//         >
//           <span className='bubble-comparison__carbon'>{carbonTotal} kg</span>
//           Your contribution
//         </p>
//       </div>
//     </div>

//     <p
//       className={`${
//         communityContribution > 0.6 ? 'bubble-comparison--remove' : ''
//       } bubble-comparison__body`}
//     >
//       <span className='bubble-comparison__carbon'>{community.total} kg</span>
//       CO2 saved
//     </p>
//     <p
//       className={`${
//         contribution >= 0.6 ? 'bubble-comparison--remove' : ''
//       } bubble-comparison__body bubble-comparison__body--right`}
//     >
//       <span className='bubble-comparison__carbon'>{carbonTotal} kg</span>
//       Your contribution
//     </p>
//   </article>
// )
