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
    plane: 200,
    car: 130,
    train: 300,
  });

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
          <h2>Your garden so far</h2>
          <p>Amount of trees saved in one year</p>
          <section className="profile__trees-wrapper">
            <p>An average tree absorbs around 20kg of CO2 in one year.</p>
            <section className="profile__trees">
              {arrayOfTrees.map((tree, index) => (
                <img key={index} className="profile__tree" src={tree} />
              ))}
            </section>
          </section>
        </article>
        <article>
          <h2>Your total savings equivalence</h2>
          <span> in kilometer </span>
          <section>
            <table>
              <tbody>
                <tr>
                  <td>plane</td>
                  <td className="profile__equivalence-bar">
                    <ProgressBar
                      totalSavingsCommunity={150}
                      totalCommunityGoal={300}
                    />
                  </td>
                  <td className="profile__equivalence-body">
                    {gimmicksInKm.plane} km <span>195 kg/km</span>{' '}
                  </td>
                </tr>
                <tr>
                  <td>car</td>
                  <td className="profile__equivalence-bar">
                    {' '}
                    <ProgressBar
                      totalSavingsCommunity={250}
                      totalCommunityGoal={300}
                    />
                  </td>
                  <td className="profile__equivalence-body">
                    {gimmicksInKm.car} km <span>121 kg/km</span>{' '}
                  </td>
                </tr>
                <tr>
                  <td>train</td>
                  <td className="profile__equivalence-bar">
                    {' '}
                    <ProgressBar
                      totalSavingsCommunity={300}
                      totalCommunityGoal={300}
                    />
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
