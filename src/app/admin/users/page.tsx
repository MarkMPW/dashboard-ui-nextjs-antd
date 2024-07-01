'use client'

import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { LocalStorage } from '@/utils/getData'
import DataTable from '@/components/admin/DataTable'
import { Button, Popconfirm, Space, TableProps } from 'antd'
import { useRouter } from 'next/navigation'
import { delayTimeout } from '@/utils/dalay'

export interface UserTableType {
  id: number;
  userName: string;
  email: string;
  password: string;
}

const ManageUserPage: NextPage = () => {
  const [userData, setUserData] = useState<UserTableType[]>([])

  const route = useRouter();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleNavigateToEdit = (id: number) => {
    route.push(`/admin/users/${id}`);
  };

  const handleOkPopupConfirm = async (userId: number) => {
    setConfirmLoading(true);

    const updateDataSource = userData.filter(
      (data: UserTableType) => data.id !== userId
    );

    await delayTimeout(500)

    localStorage.setItem("userData", JSON.stringify(updateDataSource));

    setConfirmLoading(false);
    window.location.reload();

  };

  const columns: TableProps<UserTableType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleNavigateToEdit(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title="You want to delete this user?"
            okButtonProps={{ loading: confirmLoading }}
            onConfirm={() => handleOkPopupConfirm(record.id)}
          >
            <Button
              danger
              type="primary"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  useEffect(() => {
    const users = LocalStorage().getUsers()
    setUserData(users)
  }, [])

  return (
    <section>
      <h1 className='text-3xl mb-5'>Manage Users</h1>
      <DataTable 
        columns={columns}
        dataSource={userData}
      />
    </section>
  )
}

export default ManageUserPage