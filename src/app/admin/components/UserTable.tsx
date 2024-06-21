'use client'

import React, { useEffect, useState } from 'react'

import { Table, TableProps } from 'antd'
import { UserType } from '@/app/register/page'

interface TableType {
  id: number
  userName: string
  email: string
  password: string
}

const UserTable = ({ dataSource }: { dataSource: UserType[] }) => {

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
    }
  ]

  return (
    <Table 
      columns={columns}
      dataSource={dataSource}
    />
  )
}

export default UserTable