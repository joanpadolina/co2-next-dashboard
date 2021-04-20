import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { carbonReducer } from '../lib/carbon-saving-calculation';
import HeaderCarbon from '../components/header/header-main/header-main';
import SavingsTime from '../components/savings-time';
import CommunityUpdate from '../components/community-update/community-update';
import HistoryCharge from '../components/history-charge/history-charge';

export default function Index() {
  const user = useSelector((state) => state.store.user);
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const store = useSelector((state) => state.store);
  const { chargingSession } = store;

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(chargingSession);
    setCurrentCarbon(chargeCarbonTotal);
  }, [chargingSession, currentCarbon]);

  return (
    <div className="home__body">
      <HeaderCarbon user={user} currentCarbon={currentCarbon} />
      <main className="index__main">
        <SavingsTime />
        <HistoryCharge />
        <div className="button__align--right">
          <Link href="/">
            <a className="button button--dark index__link-sessions">
              Charge overview
            </a>
          </Link>
        </div>
        <CommunityUpdate />
      </main>
    </div>
  );
}
