'use client'

import Link from "next/link";
import React from "react";
import Image from 'next/image'
import Navbar from "../components/Navbar";
import { Layout } from 'antd'
import FooterCompo from "../components/FooterCompo";

const WelcomePage = () => {

  const { Content } = Layout

  return (
    <Layout>
      <Navbar />
      <Content>
        <div className="flex-grow p-2">
          <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl border-2 border-red-200 ">
            <div className="flex justify-between">
              <div>
                <h3 className="text-3xl">Profile</h3>
                <p>Welcome, John Doe</p>
              </div>

              <div>
                <Link
                  href="/create"
                  className="bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                >
                  Create Post
                </Link>
              </div>
            </div>

            {/* User Posts Data */}
            <div>
              <div className="shadow-xl my-10 p-10 rounded-xl border-2">
                <h4 className="text-2xl">Post title</h4>
                <Image
                  className="my-3 rounded-md"
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww"
                  width={300}
                  height={0}
                  alt="image"
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil
                numquam, voluptatum veniam animi dolores architecto qui, omnis est
                quasi nisi quidem corporis sed fugit. Voluptatibus doloribus magnam
                cupiditate alias.
              </p>

              <div className="mt-5">
                <Link
                  className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  href="/edit"
                >
                  Edit
                </Link>
                <Link
                  className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  href="/delete"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <FooterCompo />
    </Layout>
  );
};

export default WelcomePage;
