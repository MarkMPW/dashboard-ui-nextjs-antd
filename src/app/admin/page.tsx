"use client";

import { useEffect, useState } from "react";
import TotalCard from "./components/TotalCard";
import { Layout, Row, Col, Flex } from "antd";
import { UserType } from "../register/page";
import { AllPostsType } from "../welcome/page";

const { Content } = Layout;

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalPosts, setTotalPosts] = useState<number>(0)

  useEffect(() => {
    const getPosts = localStorage.getItem('posts')
    const getUsers = localStorage.getItem('userData')

    const posts = getPosts ? JSON.parse(getPosts).length : 0
    const users = getUsers ? JSON.parse(getUsers).length : 0

    setTotalPosts(posts)
    setTotalUsers(users)

  }, [])

  return (
    <Content>
      <Row gutter={24}>
        <Col span={12}>
          <TotalCard title='Total Users' totalNumber={totalPosts}/>
        </Col>
        <Col span={12}>
          <TotalCard title='Total Posts' totalNumber={totalUsers} />
        </Col>
      </Row>
    </Content>
  );
};

export default AdminPage;
