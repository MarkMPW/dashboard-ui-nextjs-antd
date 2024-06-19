"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import Link from "next/link";
import FooterCompo from "../components/FooterCompo";

const LoginPage = () => {
  const { Content, Footer } = Layout;

  return (
    <Layout>
      <Navbar />
      <Content>
        <div className="flex-grow">
          <div className="flex justify-center items-center">
            <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl bg-[#cdd7e5]">
              <h3 className="text-3xl text-[#424b66]">Login</h3>
              <hr className="my-3" />

              <form action="">
                <input
                  type="text"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your Email"
                />
                <input
                  type="password"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your Password"
                />
                <button
                  className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
                  type="submit"
                >
                  Sign Up
                </button>
                <hr className="my-3" />

                <p>
                  Do not have an acount? Go to{" "}
                  <Link
                    href="/register"
                    className="text-blue-700 hover:underline"
                  >
                    Sign Up
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

export default LoginPage;
