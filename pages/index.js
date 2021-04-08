import React from "react";
import { useDispatch } from "react-redux";
import HeaderCarbon from "../components/header/header-main/header-main";
import Compare from "../components/compare-carbon/compare-carbon";
import Recent from "../components/recent-charge/recent-charge";
import CommunityUpdate from "../components/community-update/community-update";
import InputCharge from "../components/charge-input/charge-input";
import { fetchUser } from "../redux/actions";

export default function Home() {

  const dispatch = useDispatch();
  dispatch(fetchUser);

  return (
    <div className='home__body'>
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
