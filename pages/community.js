import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { communitySavings } from '../redux/actions/';
import { members } from '../lib/members';
import { calcCarbonToKm } from '../lib/gimmick-calc';
import ProgressBar from '../components/progress-bar';
import BubbleComparison from '../components/bubble-comparison';

export default function Community() {
  const store = useSelector((state) => state.store);
  const users = store.community.users;
  const dispatch = useDispatch();
  const { chargingSession } = store;
  const [membersContribution, setMembersContribution] = useState([]);
  const [totalCarbon, setTotalCarbon] = useState();
  const [carbonInKm, setCarbonInKm] = useState(12);
  const [userContribution, setUserContribution] = useState(
    chargingSession[0].savedCarbon,
  );

  useEffect(() => {
    async function calcInKm() {
      const petrolDistance = await calcCarbonToKm(totalCarbon);
      setCarbonInKm(petrolDistance);
    }
    calcInKm();

    const historyLast = chargingSession
      .slice(-1)
      .map((data) => data.savedCarbon);

    const userContribution =
      typeof store.total !== 'function' ? store.total : historyLast[0];

    // last update first on the list
    setMembersContribution(users.reverse());

    const total = users.reduce(
      (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
      0,
    );
    setTotalCarbon(total + store.total);
    setUserContribution(store.total);
    dispatch(communitySavings(totalCarbon));
  }, [
    setMembersContribution,
    chargingSession,
    store.total,
    dispatch,
    totalCarbon,
    users,
  ]);

  return (
    <main>
      <Link href="/">back</Link>
      <h1>Your community</h1>
      <article>
        <section className="community-saved__datavisual">
          <article>
            <h2>Community total saved CO2</h2>
            <p>{totalCarbon} kg</p>
          </article>
          <BubbleComparison />
          <article>
            <h2>Your contribution</h2>
            <p>
              {userContribution}
              kg
            </p>
          </article>
        </section>

        <section>
          <article>
            <h3>amsterdam</h3>
            <h3>rotterdam</h3>
          </article>
          <article>
            <p>
              The amount of CO2 saved is the same as driving from Amsterdam to
              Maastricht in a petrol car,{' '}
              <span className="font-bold"> which is 212,5 km </span> .
            </p>
          </article>
        </section>
      </article>
      <article>
        <h2>Next destination</h2>
        <section>
          <h3>Amsterdam -- Luxembourg</h3>

          <ProgressBar
            totalSavingsCommunity={totalCarbon}
            totalCommunityGoal={500}
          />

          <h3>{carbonInKm}km</h3>
        </section>
      </article>

      <article>
        <h3>Activiy</h3>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Name</th>
              <th>CO2 saved</th>
            </tr>

            {membersContribution.map((user, key) => (
              <tr key={key}>
                <td>
                  {members.map((data) => {
                    if (data.name.includes(user.name)) {
                      return (
                        <img
                          alt={user.name}
                          key={key}
                          src={data.name.includes(user.name) ? data.imgSrc : ''}
                        />
                      );
                    }
                    return '';
                  })}
                </td>
                <td> {user.name}</td>
                <td>{user.savedCarbon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <article>
        <h3>Community members</h3>
        <ul>
          {members.map((member, key) => (
            <li key={key}>
              <figure>
                <img src={member.imgSrc} alt={member.name} />
                <figcaption>{member.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
