import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { carbonReducer } from "../lib/carbon-saving-calculation";

export default function Profile() {
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalTrees, setTotalTrees] = useState(0);
  const [arrayOfTrees, setArrayOfTrees] = useState([]);
  const store = useSelector((state) => state.store);
  const { chargingSession } = store;

  // tree effect
  // 1. seperate in layers
  // 2. max per row is 9 trees
  // 3. perspective layers is unlimited?

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
      <header>
        <Link href='/'>back</Link>
        <h1>Your CO2 savings </h1>
        <span>{totalSavings}</span>
      </header>
      <main className='profile__main'>
        <article>
          <h2>Your garden so far</h2>
          <p>Amount of trees saved in one year</p>
          <section>
            <p>An average tree absorbs around 20kg of CO2 in one year.</p>
            <section className='profile__trees'>
              {arrayOfTrees.map((tree, index) => (
                <img key={index} className='profile__tree' src={tree} />
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
                  <td className='profile__equivalence-bar'>balk</td>
                  <td>
                    <span>26 km</span> <span>195 kg/km</span>
                  </td>
                </tr>
                <tr>
                  <td>car</td>
                  <td className='profile__equivalence-bar'>balk</td>
                  <td>
                    <span>45 km</span> <span>121 kg/km</span>
                  </td>
                </tr>
                <tr>
                  <td>train</td>
                  <td className='profile__equivalence-bar'>balk</td>
                  <td>
                    <span>200 km</span> <span>30 kg/km</span>
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
