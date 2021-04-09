import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav({ showModal = () => {} }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useState(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    setIsBrowser(!isBrowser);
  };

  return (
    <nav className='nav'>
      <ul className='nav__list flat-list'>
        <li className='nav__item'>
          <Link href='/'>
            <a>Homepage</a>
          </Link>
        </li>
        <li className='nav__item'>
          {" "}
          <Link href='/charge-input'>
            <a
              className='nav__button--add nav__item'
              onClick={(e) => handleClose(e)}
              aria-label='add new charge'
            >
              +
            </a>
          </Link>
        </li>
        <li className='nav__item'>
          <Link href='/community'>
            <a>Community</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
