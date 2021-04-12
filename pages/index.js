import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { carbonReducer } from '../lib/carbon-saving-calculation';
import HeaderCarbon from '../components/header/header-main/header-main';
import SavingsTime from '../components/savings-time';
import CommunityUpdate from '../components/community-update/community-update';

export default function Index() {
  const userCarbon = useSelector((state) => state.user);
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const [trees, setTrees] = useState(0);
  const user = userCarbon.userData;

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(userCarbon.historyCharge);
    setCurrentCarbon(chargeCarbonTotal);

    function calcTreeSavings() {
      const averageTree = 20;
      const totalTrees = Math.floor(currentCarbon / averageTree);
      return setTrees(totalTrees);
    }

    calcTreeSavings();
  }, [userCarbon.historyCharge, userCarbon, currentCarbon]);

  const data = {
    currentCarbon,
    trees,
  };

  return (
    <div className="home__body">
      <HeaderCarbon props={data} user={user} />
      <main>
        <SavingsTime />
        <CommunityUpdate />
      </main>
    </div>
  );
}
