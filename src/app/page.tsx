'use client'

import Image from "next/image";
import VercelLogo from "/public/vercel.svg";

import { Typography } from "antd";

export default function Home() {

  const { Title } = Typography

  return (
    <main>
      <div className="flex-grow text-center p-10">
        <h3 className="text-5xl font-semibold">NextJs Dashboard</h3>
        <p>Become full-stack developer with NextJs</p>

        <div className="flex justify-center my-10">
          {/* <Image src={VercelLogo} width={200} height={200} alt="vercel logo" /> */}
          <Title style={{ color: 'white' }}>Welcome to my project</Title>
        </div>
      </div>
    </main>
  );
}
