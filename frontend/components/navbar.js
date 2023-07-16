import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const nameFromCookie = Cookies.get('name');
    if (nameFromCookie) {
      setUserName(nameFromCookie);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('name');
    Cookies.remove('token');
    setUserName('');
  };

  return (
    <nav className="bg-primary py-5">
      <div className="container mx-auto px-4">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/">
              <button className="text-white text-sm font-bold sm:text-2xl">
                Tech <span className="text-secondary">Universe</span>
              </button>
            </Link>
          </li>
          <li className="flex items-center">
            {userName ? (
              <>
                <h1 className="text-white text-sm font-bold sm:text-2xl">
                  Hi <span className="text-secondary">{userName}!</span>
                </h1>
                <button
                  className="text-primary text-sm  bg-secondary font-bold sm:text-sm ml-4 border border-white rounded-lg px-3 py-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="text-secondary bg-white inline-block rounded-full pb-1 px-6 text-sm font-bold sm:text-2xl">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
