"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import TotalCard from "@/components/admin/TotalCard";
import { Layout, List } from "antd";

import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { NextPage } from "next";

import { AuthContext } from "@/contexts/AuthContext";
import withAuthTest from "@/HOC/withAdminAuth";

const { Content } = Layout;

const AdminPage: NextPage = () => {
  const { setCurrentUser } = useContext(AuthContext);
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
      const getLocalStorageCurrentUser = localStorage.getItem("currentUser");

      if (getLocalStorageCurrentUser) {
        setCurrentUser(JSON.parse(getLocalStorageCurrentUser));
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
