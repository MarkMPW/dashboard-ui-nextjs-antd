'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Table, TableProps, Button, Space } from 'antd'
import Image from 'next/image'

interface PostTableType {
  id: number
  title: string
  imageUrl: string
  description: string
}

const PostTable = ({ dataSource }: { dataSource: PostTableType[] }) => {

  const route = useRouter()

  const handleNaviEdit = (id: number) => {
    route.push(`/admin/posts/${id}`)
  }

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
      key: 'imageUrl',
      render: (_, record) => (
        <Image src={record.imageUrl} height={100} width={100} alt='user image'/>
      ),
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
          <Button type='primary' onClick={()=> handleNaviEdit(record.id)}>Edit</Button>
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
