import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux';

export default function Header() {
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const userCarbon = useSelector((state) => state.user);
  const userGimmick = useSelector((state) =>
    state.user.gimmicks.map((data) => data.amountWash),
  );
  
  useEffect(() => {
    const chargeCarbonTotal = userCarbon.historyCharge.reduce(
      (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
      0,
    );
    setCurrentCarbon(chargeCarbonTotal);
  }, [userCarbon.historyCharge]);

  return (
    <header className="header">
      <div>
        <h1 className="header__intro">Hello J,</h1>
        <div className="header__account"></div>
      </div>
      <Link
        className="header__carbon flex flex-col justify-center items-center h-2/4"
        href="/profile"
      >
        <section>
          <span className="header__carbon-subtitle">your carbon saved</span>
          <h2 className="header__carbon-amount text-5xl font-extrabold">
            {currentCarbon} kg
          </h2>
        </section>
      </Link>
      <p className="header__body">
        You have saved the same amount of Co2 as washing and drying your clothes{' '}
        <span>{userGimmick} times.</span>
      </p>
    </header>
  );
}
