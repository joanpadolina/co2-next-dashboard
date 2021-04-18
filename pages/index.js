import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { carbonReducer } from '../lib/carbon-saving-calculation';
import HeaderCarbon from '../components/header/header-main/header-main';
import CommunityUpdate from '../components/community-update/community-update';
import HistoryCharge from '../components/history-charge/history-charge';
import SavingsTime from '../components/savings-time';

export default function Index() {
  const userCarbon = useSelector((state) => state.user);
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const user = userCarbon.userData;

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(userCarbon.historyCharge);
    setCurrentCarbon(chargeCarbonTotal);

  }, [userCarbon.historyCharge, userCarbon, currentCarbon]);


  useEffect(() => {}, []);

  return (
    <div className="home__body">
      <HeaderCarbon user={user} currentCarbon={currentCarbon}/>
      <main className="index__main">
        <SavingsTime />
        <HistoryCharge />
        <CommunityUpdate />
      </main>
    </div>
  );
}
