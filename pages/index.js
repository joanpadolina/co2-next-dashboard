import React from "react";
import { useDispatch } from "react-redux";
import HeaderCarbon from "../components/header/header-main/header-main";
import SavingsTime from "../components/savings-time";
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
        <SavingsTime />
        <CommunityUpdate />
        <InputCharge />
      </main>
    </div>
  );
}
