import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import HeaderCarbon from '../components/header/header-main/header-main';
import Compare from '../components/compare-carbon/compare-carbon';
import Recent from '../components/recent-charge/recent-charge';
import CommunityUpdate from '../components/community-update/community-update';
import InputCharge from '../components/charge-input/charge-input';

export default function Home({props}) {

  return (
    <div className="home__body">
      <HeaderCarbon />
      <main>
        <Compare />
        <Recent />
        <CommunityUpdate />
        <InputCharge />
      </main>
    </div>
  );
}
