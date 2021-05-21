import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { carbonReducer } from '../lib/carbon-saving-calculation'
import useInitUser from '../lib/useInitUser'
import IconPlane from '../public/icons/icon-airplane.svg'
import IconCar from '../public/icons/icon-car.svg'
import IconTrain from '../public/icons/icon-train.svg'

export default function Profile() {
  const store = useSelector((state) => state.store)
  const { chargingSession } = store
  const [totalSavings, setTotalSavings] = useState(
    carbonReducer(chargingSession)
  )
  const [totalTrees, setTotalTrees] = useState(0)
  const [arrayOfTrees, setArrayOfTrees] = useState([])
  const [gimmicksInKm, setGimmicksInKm] = useState({
    plane: 0,
    car: 0,
    train: 0
  })
  const [widthStyle, setWidthStyle] = useState({
    plane: 0,
    car: 0,
    train: 0
  })
  const [selectedYear, setSelectedYear] = useState({
    year: 2021,
    totalTrees: totalTrees
  })

  const carbonPerKm = {
    plane: 195,
    car: 121,
    train: 30
  }

  const years = [
    {
      year: 2018,
      totalTrees: 9
    },
    {
      year: 2019,
      totalTrees: 15
    },
    {
      year: 2020,
      totalTrees: 20
    },
    {
      year: 2021,
      totalTrees: totalTrees
    }
  ]

  useInitUser()

  function calculateDistance(carbon, gimmick) {
    const resultDistance = (carbon * 100) / gimmick
    return Math.ceil(resultDistance)
  }

  useEffect(() => {
    setTotalSavings(carbonReducer(chargingSession))

    function setObjectGimmick() {
      const value = {
        plane: calculateDistance(totalSavings, carbonPerKm.plane),
        car: calculateDistance(totalSavings, carbonPerKm.car),
        train: calculateDistance(totalSavings, carbonPerKm.train)
      }
      setGimmicksInKm(value)
    }
    setObjectGimmick()
  }, [
    carbonPerKm.car,
    carbonPerKm.plane,
    carbonPerKm.train,
    chargingSession,
    totalSavings
  ])

  useEffect(() => {
    function calcPercentageBar() {
      const values = Object.values(gimmicksInKm)
      const max = Math.max(...values)
      const calc = (number) => (100 * number) / max
      const value = {
        plane: calc(gimmicksInKm.plane),
        car: calc(gimmicksInKm.car),
        train: 65
      }
      setWidthStyle(value)
    }
    calcPercentageBar()
  }, [gimmicksInKm])

  useEffect(() => {
    const arraySrc = []

    for (let i = 0; i < totalTrees; i++) {
      const treeImg = '/icons/icon-tree.svg'
      arraySrc.push(treeImg)
    }
    setArrayOfTrees(arraySrc)

    function calcTreeSavings() {
      const averageTree = 20
      const totalTrees = Math.floor(totalSavings / averageTree)
      return setTotalTrees(totalTrees)
    }

    function addImgTrees(amount) {
      const arrayOfTrees = []

      for (let i = 0; i < amount; i++) {
        const treeImg = '/icons/icon-tree.svg'
        arrayOfTrees.push(treeImg)
      }

      return setArrayOfTrees(arrayOfTrees)
    }

    addImgTrees(selectedYear.totalTrees || totalTrees)

    calcTreeSavings()
  }, [selectedYear.totalTrees, totalSavings, totalTrees])

  function handleSelect(e) {
    const value = Number(e.target.value)

    years.filter((year) => {
      let selected
      if (year.year === value) {
        selected = setSelectedYear({
          year: year.year,
          totalTrees: year.totalTrees
        })
      }
      return selected
    })
  }

  return (
    <div className='home__body'>
      <header className='profile__header'>
        <Link href='/'>
          <a className='button--back' aria-label='Go to homepage'></a>
        </Link>
        <h1>
          Your CO<sub>2</sub> savings{' '}
        </h1>
        <h2 className='font--big'>{totalSavings} kg</h2>
      </header>

      <main className='profile__main index__main'>
        <article>
          <h2 className='profile__main-title'>Your garden so far</h2>
          <section className='profile__trees-header'>
            <p className='profile__trees-subtitle'>
              An average tree absorbs around
              <span className='font--highlight'> 20kg</span> of CO<sub>2</sub>{' '}
              in one year.
            </p>
            <label
              htmlFor='years'
              aria-label='select year'
              className='a11y-sr-only'
            >
              Select year
            </label>
            <select
              name='years'
              className='profile__select-year'
              onChange={(e) => handleSelect(e)}
            >
              {years.reverse().map((year, index) => (
                <option key={index} value={year.year}>
                  {year.year}
                </option>
              ))}
            </select>
          </section>
          <p className='profile__subtitle'>
            Total trees saved: {selectedYear.totalTrees || totalTrees}
          </p>

          <section className='profile__trees-wrapper'>
            <section className='profile__trees'>
              <TransitionGroup>
                {arrayOfTrees.map((tree, index) => (
                  <CSSTransition
                    key={'css' + index}
                    timeout={300}
                    in={true}
                    appear={true}
                    classNames='profile__tree'
                  >
                    <img
                      key={index}
                      className='profile__tree'
                      style={{
                        top: `${(Math.floor(Math.random() * 20) + 1) / 10}rem`
                      }}
                      alt
                      src={tree}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </section>
          </section>
        </article>

        <article>
          <h2 className='font--title'>Your total savings equivalence</h2>
          <span> in kilometer </span>

          <section>
            <table className='profile__equivalence'>
              <tbody className='profile__equivalence-wrapper'>
                <tr className='profile__equivalence-row'>
                  <td className='profile__equivalence-title'>
                    <IconPlane className='profile__icon-plane' />
                  </td>
                  <td
                    className='profile__equivalence-bar'
                    style={{ width: `${widthStyle.plane}%` }}
                    aria-label={`${gimmicksInKm.plane} kilometer with a plane`}
                  ></td>

                  <td className='profile__equivalence-body'>
                    {gimmicksInKm.plane} km <span>195 kg/km</span>{' '}
                  </td>
                </tr>

                <tr className='profile__equivalence-row'>
                  <td className='profile__equivalence-title'>
                    <IconCar className='profile__icon-car' />
                  </td>
                  <td
                    className='profile__equivalence-bar'
                    style={{ width: `${widthStyle.car}%` }}
                    aria-label={`${gimmicksInKm.car} kilometer with a car`}
                  ></td>

                  <td className='profile__equivalence-body'>
                    {gimmicksInKm.car} km <span>121 kg/km</span>{' '}
                  </td>
                </tr>

                <tr className='profile__equivalence-row'>
                  <td className='profile__equivalence-title'>
                    <IconTrain className='profile__icon-train' />
                  </td>
                  <td
                    className='profile__equivalence-bar'
                    style={{ width: `${widthStyle.train}%` }}
                    aria-label={`${gimmicksInKm.train} kilometer with a train`}
                  ></td>

                  <td className='profile__equivalence-body'>
                    {gimmicksInKm.train} km <span>30 kg/km </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </article>
      </main>
    </div>
  )
}
