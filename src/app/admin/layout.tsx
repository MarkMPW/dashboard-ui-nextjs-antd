import "../globals.css";

import ThemeProvider from "../components/ThemeContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
