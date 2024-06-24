'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Space, Table, TableProps, Button, Popconfirm } from 'antd'
import { UserType } from '@/app/register/page'

export interface TableType {
  id: number
  userName: string
  email: string
  password: string
}

interface TablePropsType {
  dataSource: TableType[]
}

const UserTable: React.FC<TablePropsType> = ({ dataSource }) => {

  const route = useRouter()
  const [open, setOpen] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showPopconfirm = (id: number) => {
    setOpen(id);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(null);
  };

  const handleEdit = (id: number) => {
    route.push(`/admin/users/${id}`)
  }

  const handleOk = (userId: number) => {
    setConfirmLoading(true)

    const updateDataSource = dataSource.filter((data: TableType) => data.id !== userId)

    setTimeout(()=> {
      localStorage.setItem('userData', JSON.stringify(updateDataSource))

      setOpen(null)
      setConfirmLoading(false)
      window.location.reload()
    }, 2000)
  }

  const columns: TableProps<TableType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'username',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'email',
      dataIndex: 'email', 
      key: 'email'
    },
    {
      title: 'password',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={()=> handleEdit(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title='You want to delete this user?'
            onCancel={handleCancel}
            open={open === record?.id}
            okButtonProps={{ loading: confirmLoading }}
            onConfirm={()=> handleOk(record.id)}
          >
            <Button
              danger
              type='primary'
              onClick={()=> showPopconfirm(record?.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <Table 
      columns={columns}
      dataSource={dataSource}
      rowKey='id'
      pagination={{ defaultPageSize: 5}}
    />
  )
}

export default UserTable