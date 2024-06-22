'use client'

import React from 'react'

import { Table, TableProps, Button, Space } from 'antd'

interface PostTableType {
  id: number
  title: string
  imageUrl: string
  description: string
}

const PostTable = ({ dataSource }: { dataSource: PostTableType[] }) => {

  const columns: TableProps<PostTableType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Image Url',
      dataIndex: 'imageUrl',
      key: 'imageUrl'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='primary'>Edit</Button>
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
      pagination={{ defaultPageSize: 5 }}
    />
  )
}

export default PostTable
