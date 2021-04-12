import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();
  const currentRouter = router.asPath;


  // 1. Open modal if clicked on the link 
  // 2. if modal active change link to closing button 
  // 3. problem the button is one click behind when clicked
  // on another link in navigation

  const changeLink = () => {
    if (isBrowser) {
      return "/charge-input";
    } else {
      return "";
    }
  };
  function handleModal() {
    return setIsBrowser(!isBrowser);
  }

  return (
    <nav className='nav'>
      <ul className='nav__list flat-list'>
        <li
          className={`nav__item ${
            router.pathname === "/" ? "nav--active" : ""
          }`}
        >
          <Link href='/'>
            <a>Homepage</a>
          </Link>
        </li>
        <li className='nav__item'>
          <Link href={`?state=1`} as={changeLink()}>
            <a
              className={`nav__button--add nav__item${
                currentRouter === "/charge-input"
                  ? " nav-input--active"
                  : ""
              }`}
              aria-label='add new charge'
              onClick={handleModal}
            ></a>
          </Link>
        </li>
        <li className={`nav__item`}>
          <Link href='/community'>
            <a
              className={`${
                currentRouter === "/community" ? "nav--active" : ""
              }`}
            >
              Community
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
