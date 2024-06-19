"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import Link from "next/link";
import FooterCompo from "../components/FooterCompo";

interface UserType {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string
}

const RegisterPage = () => {
  const { Content, Footer } = Layout;

  const [user, setUser] = useState<UserType>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <Layout>
      <Navbar />
      <Content>
        <div className="flex-grow">
          <div className="flex justify-center items-center">
            <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl bg-[#cdd7e5]">
              <h3 className="text-3xl text-[#424b66]">Register</h3>
              <hr className="my-3" />

              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your name"
                  name="userName"
                  value={user.userName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <input
                  type="email"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your email"
                  name='email'
                  value={user.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <input
                  type="password"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your Password"
                  value={user.password}
                  name='password'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <input
                  type="password"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Confirm your password"
                  value={user.confirmPassword}
                  name='confirmPassword'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <button
                  className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
                  type="submit"
                >
                  Sign Up
                </button>
                <hr className="my-3" />

                <p>
                  Already have an acount? Go to{" "}
                  <Link href="/login" className="text-blue-700 hover:underline">
                    Login
                  </Link>{" "}
                  Page
                </p>
              </form>
            </div>
          </div>
        </div>
      </Content>
      <FooterCompo />
    </Layout>
  );
};

export default RegisterPage;
