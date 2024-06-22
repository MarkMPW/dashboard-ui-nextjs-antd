"use client";

import { useEffect, useState } from "react";
import TotalCard from "./components/TotalCard";
import { Layout, Row, Col, Flex, List } from "antd";

import { SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Content } = Layout;

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    const getPosts = localStorage.getItem("posts");
    const getUsers = localStorage.getItem("userData");

    const posts = getPosts ? JSON.parse(getPosts).length : 0;
    const users = getUsers ? JSON.parse(getUsers).length : 0;

    setTotalPosts(posts);
    setTotalUsers(users);
  }, []);

  const data = [
    {
      title: "Total Users",
      icon: <UserOutlined />,
      totalNumber: totalUsers,
    },
    {
      title: "Total Posts",
      icon: <SearchOutlined />,
      totalNumber: totalPosts,
    },
  ];

  return (
    <Content>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <TotalCard
              icon={item.icon}
              title={item.title}
              totalNumber={item.totalNumber}
            />
          </List.Item>
        )}
      />
    </Content>
  );
};

export default AdminPage;
