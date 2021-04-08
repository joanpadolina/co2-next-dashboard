import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const [trees, setTrees] = useState();
  const userCarbon = useSelector((state) => state.user);
  const user = userCarbon.userData;

  const userGimmick = useSelector((state) =>
    state.user.gimmicks.map((data) => data.amountWash)
  );

  useEffect(() => {
    const chargeCarbonTotal = userCarbon.historyCharge.reduce(
      (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
      0
    );
    setCurrentCarbon(chargeCarbonTotal);

    function calcTreeSavings() {
      const averageTree = 20;
      const totalTrees = Math.floor(currentCarbon / averageTree);
      return setTrees(totalTrees);
    }

    calcTreeSavings();
  }, [userCarbon.historyCharge, userCarbon]);

  return (
    <header className='header'>
      <div>
        <h1 className='header__intro'>Hello {user.name},</h1>
        <div className='header__account'></div>
      </div>
      <Link
        className='header__carbon flex flex-col justify-center items-center h-2/4'
        href='/profile'
      >
        <section>
          <span className='header__carbon-subtitle'>Your total saved CO2</span>
          <h2 className='header__carbon-amount font--big'>
            {currentCarbon} kg
          </h2>
        </section>
      </Link>
      <p className='header__body'>
        Your total CO2 saving is the same amount as {trees} trees absorbs CO2
        in 1 year.
      </p>
    </header>
  );
}
