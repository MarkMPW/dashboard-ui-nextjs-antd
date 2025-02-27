

import "../globals.css";

import { Layout } from "antd";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
        <Sidebar />
        <Layout className="p-[16px]">
          {children}
        </Layout>
    </Layout>
  );
}
