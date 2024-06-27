"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import TotalCard from "@/components/admin/TotalCard";
import { Layout, List } from "antd";

import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { NextPage } from "next";

import { AuthContext } from "@/contexts/AuthContext";
import withAuthTest from "@/HOC/withAdminAuth";

import { LocalStorage } from "@/utils/getData";

const { Content } = Layout;

const AdminPage: NextPage = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    const getPosts = LocalStorage().getPost()
    const getUsers = LocalStorage().getUsers()

    const posts = getPosts.length > 0 ? getPosts.length : 0;
    const users = getUsers.length > 0 ? getUsers.length : 0;

    setTotalPosts(posts);
    setTotalUsers(users);
  }, []);


  useEffect(() => {
    try {
      const getLocalStorageCurrentUser = LocalStorage().getCurrentUser()
      setCurrentUser(getLocalStorageCurrentUser)
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
