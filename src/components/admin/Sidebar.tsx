"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import type { MenuProps } from "antd";

import { Menu, Layout } from "antd";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: "/admin",
    label: "Dashboard",
  },
  {
    type: "divider",
    className: "custom-divider",
    key: "divider1",
  },
  {
    key: "/admin/users",
    label: "Users",
  },
  {
    key: "/admin/posts",
    label: "Posts",
  },
];

const Sidebar: React.FC = () => {
  const route = useRouter();
  const pathname = usePathname();

  return (
    <Sider width={200} className="h-screen">
      <Menu
        mode="vertical"
        selectedKeys={[pathname]}
        items={items}
        style={{ height: "100%", borderRight: 0 }}
        onClick={({ key }) => route.push(key)}
      />
    </Sider>
  );
};

export default Sidebar;
