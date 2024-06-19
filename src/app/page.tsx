"use client";

import { Typography, Layout } from "antd";
import Navbar from "./components/Navbar";
import FooterCompo from "./components/FooterCompo";

export default function Home() {
  const { Title } = Typography;
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Navbar />
      <Content>
        <div className="flex-grow text-center p-10">
          <h3 className="text-5xl font-semibold">NextJs Dashboard</h3>
          <p>Become full-stack developer with NextJs</p>

          <div className="flex justify-center my-10">
            <Title>Welcome to my project</Title>
          </div>
        </div>
      </Content>
      <FooterCompo />
    </Layout>
  );
}
