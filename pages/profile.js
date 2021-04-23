import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { carbonReducer } from '../lib/carbon-saving-calculation';
import ProgressBar from '../components/progress-bar';

export default function Profile() {
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalTrees, setTotalTrees] = useState(0);
  const [arrayOfTrees, setArrayOfTrees] = useState([]);
  const [gimmicksInKm, setGimmicksInKm] = useState({
    plane: 0,
    car: 0,
    train: 0,
  });
  const [widthStyle, setWidthStyle] = useState({
    plane: 0,
    car: 0,
    train: 0,
  });

  const carbonPerKm = {
    plane: 195,
    car: 121,
    train: 30,
  };

  function calculateDistance(carbon, gimmick) {
    const resultDistance = (carbon * 100) / gimmick;
    return Math.ceil(resultDistance);
  }
  // Needs for calc
  // --> All carbon emission from gimmick
  // --> Calculate user emission in kilometers

  // Steps to km barchart
  // 1. Calculate carbon with all values from gimmicks
  // 2. Find the highest number
  // 3. Calculate remainder gimmicks in % from the highest number
  // 4. Place % it in width

  const store = useSelector((state) => state.store);
  const { chargingSession } = store;

  useEffect(() => {
    calcTreeSavings();
    setTotalSavings(carbonReducer(chargingSession));
    let arraySrc = [];

    for (let i = 0; i < totalTrees; i++) {
      let treeImg = `/icons/icon-tree.svg`;
      arraySrc.push(treeImg);
    }
    setArrayOfTrees(arraySrc);
    addImgTrees(totalTrees);

    let object;

    function setObjectGimmick() {
      const value = {
        plane: calculateDistance(totalSavings, carbonPerKm.plane),
        car: calculateDistance(totalSavings, carbonPerKm.car),
        train: calculateDistance(totalSavings, carbonPerKm.train),
      };
      setGimmicksInKm(value);
    }

    setObjectGimmick();

    function calcPercentageBar() {
      const values = Object.values(gimmicksInKm);
      const max = Math.max(...values);
      const calc = (number) => (100 * number) / max;
      const value = {
        plane: calc(gimmicksInKm.plane),
        car: calc(gimmicksInKm.car),
        train: 65,
      };
      setWidthStyle(value);
    }
    calcPercentageBar();
  }, [totalTrees, totalSavings, chargingSession]);

  function calcTreeSavings() {
    const averageTree = 20;
    const totalTrees = Math.floor(totalSavings / averageTree);
    return setTotalTrees(totalTrees);
  }

  function addImgTrees(amount) {
    let arrayOfTrees = [];

    for (let i = 0; i < amount; i++) {
      let treeImg = `/icons/icon-tree.svg`;
      arrayOfTrees.push(treeImg);
    }

    return setArrayOfTrees(arrayOfTrees);
  }

  return (
    <>
      <header className="profile__header">
        <Link href="/">
          <a className="button--back" aria-label="Go to homepage"></a>
        </Link>
        <h1>Your CO2 savings </h1>
        <h2 className="font--big">{totalSavings} kg</h2>
      </header>

      <main className="profile__main index__main">
        <article>
          <h2 className="profile__main-title">Your garden so far</h2>
          <p className="profile__subtitle">
            Amount of trees saved in one year: {totalTrees}
          </p>

          <section className="profile__trees-wrapper">
            <p className="profile__trees-subtitle">
              An average tree absorbs around
              <span className="font--highlight"> 20kg</span> of CO2 in one year.
            </p>

            <section className="profile__trees">
              {arrayOfTrees.map((tree, index) => (
                <img
                  key={index}
                  className="profile__tree"
                  style={{
                    top: `${(Math.floor(Math.random() * 20) + 1) / 10}rem`,
                  }}
                  src={tree}
                />
              ))}
            </section>
          </section>
        </article>

        <article>
          <h2 className="font--title">Your total savings equivalence</h2>
          <span> in kilometer </span>

          <section>
            <table className="profile__equivalence">
              <tbody className="profile__equivalence-wrapper">
                <tr className="profile__equivalence-row">
                  <td className="profile__equivalence-title">plane</td>
                  <td
                    className="profile__equivalence-bar"
                    style={{ width: `${widthStyle.plane}%` }}
                  >
                    {/* <ProgressBar
                      totalSavingsCommunity={150}
                      totalCommunityGoal={300}
                    /> */}
                  </td>

                  <td className="profile__equivalence-body">
                    {gimmicksInKm.plane} km <span>195 kg/km</span>{' '}
                  </td>
                </tr>

                <tr className="profile__equivalence-row">
                  <td className="profile__equivalence-title">car</td>
                  <td
                    className="profile__equivalence-bar"
                    style={{ width: `${widthStyle.car}%` }}
                  >
                    {' '}
                    {/* <ProgressBar
                      totalSavingsCommunity={250}
                      totalCommunityGoal={300}
                    /> */}
                  </td>

                  <td className="profile__equivalence-body">
                    {gimmicksInKm.car} km <span>121 kg/km</span>{' '}
                  </td>
                </tr>

                <tr className="profile__equivalence-row">
                  <td className="profile__equivalence-title">train</td>
                  <td
                    className="profile__equivalence-bar"
                    style={{ width: `${widthStyle.train}%` }}
                  >
                    {' '}
                    {/* <ProgressBar
                      totalSavingsCommunity={300}
                      totalCommunityGoal={300}
                    /> */}
                  </td>

                  <td className="profile__equivalence-body">
                    {gimmicksInKm.train} km <span>30 kg/km </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </article>
      </main>
    </>
  );
}
