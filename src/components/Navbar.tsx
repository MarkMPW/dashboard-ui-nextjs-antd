"use Client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const route = useRouter();
  const { setCurrentUser, isAuth, isAuthHandler } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    isAuthHandler(false)
    setCurrentUser(undefined);
    route.push("/");
  };

  return (
    <nav className="shadow-xl bg-slate-400">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <div>
            <Link href="/">
              <Image src='/next.svg' width={100} height={100} alt="NextJs Logo" />
            </Link>
          </div>
          {isAuth ? (
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
