'use client'

import { Inter } from "next/font/google";
import "./globals.css";

import { Layout } from "antd";

import Navbar from "./components/Navbar";
import FooterCompo from "./components/FooterCompo";
import AuthContextProvider from "./contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const { Content } = Layout;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>
          <Layout>
            <Navbar />
            <main className='flex flex-col min-h-screen'>
              <Content>
                {children}
              </Content>
            </main>
            <FooterCompo />
          </Layout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
