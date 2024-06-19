'use client'

import { Typography } from "antd";
import Navbar from "./components/Navbar";

export default function Home() {

  const { Title } = Typography

  return (
    <main>
      <Navbar />
      <div className="flex-grow text-center p-10">
        <h3 className="text-5xl font-semibold">NextJs Dashboard</h3>
        <p>Become full-stack developer with NextJs</p>

        <div className="flex justify-center my-10">
          <Title style={{ color: 'white' }}>Welcome to my project</Title>
        </div>
      </div>
    </main>
  );
}
