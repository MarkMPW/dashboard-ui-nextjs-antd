'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Space, Table, TableProps, Button } from 'antd'

export interface TableType {
  id: number
  userName: string
  email: string
  password: string
}

const UserTable = ({ dataSource }: { dataSource: TableType[] }) => {

  const route = useRouter()

  const handleEdit = (id: number) => {
    route.push(`/admin/edit/${id}`)
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
          <Button danger type='primary'>Delete</Button>
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