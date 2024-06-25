"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import TotalCard from "./components/TotalCard";
import { Layout, List } from "antd";

import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { NextPage } from "next";

import { ThemeContext } from "../components/ThemeContext";
import withAuthTest from "../HOC/withAdminAuth";

const { Content } = Layout;

const AdminPage: NextPage = () => {
  const { setCurrentUser } = useContext(ThemeContext);
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


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");

      console.log("currentUser in admin: ", storedUser);

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        setCurrentUser(undefined);
      }
    } catch (error: unknown) {
      console.log("Failed to get currentUser: ", error);
    }
  }, [setCurrentUser]);

  const dataOverview = [
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
        dataSource={dataOverview}
        renderItem={(item, key) => (
          <List.Item key={key}>
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

export default withAuthTest(AdminPage);
