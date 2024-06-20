"useClient";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Logo from "/public/next.svg";
import Image from "next/image";
import { ThemeContext } from "./ThemeContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const route = useRouter();
  const { currentUser, setCurrentUser } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('currentUser'),
    setTimeout(() => {
      setCurrentUser(undefined)
      route.push('/')
    })
  }

  return (
    <nav className="shadow-xl bg-slate-400">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <div>
            <Link href="/">
              <Image src={Logo} width={100} height={100} alt="NextJs Logo" />
            </Link>
          </div>
          {currentUser ? (
            <ul>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="flex">
              <li className="mx-3">
                <Link href="/login">Login</Link>
              </li>
              <li className="mx-3">
                <Link href="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
