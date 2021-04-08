import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import CommunityBarchart from '../components/community-barchart/community-barchart';
import { members } from '../lib/members';

export default function Community() {
  const userCarbon = useSelector((state) => state.user);
  const [membersContribution, setMembersContribution] = useState([]);
  const [totalCarbon, setTotalCarbon] = useState();
  const [userContribution, setUserContribution] = useState(
    userCarbon.historyCharge[0].savedCarbon,
  );

  useEffect(() => {
    const users = [
      { name: 'Jasper', savedCarbon: 20 },
      {
        name: 'Joan',
        savedCarbon: 12,
      },
      {
        name: 'Kees',
        savedCarbon: 16,
      },
    ];

    const history = userCarbon.historyCharge;
    const historyLast = history.slice(-1).map((data) => data.savedCarbon);
    const userContribution =  typeof userCarbon.total !== 'function' ? userCarbon.total : historyLast[0];
    
    users.push({
      name: 'Jon',
      savedCarbon: userContribution,
    });
    
    // last update first on the list
    setMembersContribution(users.reverse());
    
    const total = users.reduce(
      (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
      0,
    );
    setTotalCarbon(total);
    setUserContribution(userCarbon.total);
  }, [setMembersContribution, userCarbon.historyCharge, userCarbon.total]);

  return (
    <main>
      <Link href="/">back</Link>
      <h1>Your community</h1>
      <article>
        <section className="community-saved__datavisual">
          <article>
            <h2>Community total saved CO2</h2>
            <p>{totalCarbon}</p>
          </article>

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

      <CommunityBarchart carbonGoal={totalCarbon} />

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
