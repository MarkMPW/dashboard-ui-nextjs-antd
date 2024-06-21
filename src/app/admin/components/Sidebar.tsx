'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Menu, Layout } from 'antd'

const { Sider } = Layout

const Sidebar = () => {

  const route = useRouter()

  const items: any = [
    {
      key: '/admin',
      label: 'Dashboard',
    },
    {
      key: '/admin/users',
      label: 'Users'
    },
    {
      type: 'divider',
      className: 'custom-divider',
      key: 'divider1'
    },
    {
      key: '/admin/posts',
      label: 'Posts'
    },
  ]

  return (
    <Sider width={200} className='h-screen'>
      <Menu
        mode='vertical'
        defaultSelectedKeys={["/admin"]}
        items={items}
        style={{ height: '100%', borderRight: 0 }}
        onClick={({ key }) => route.push(key)}
      />
    </Sider>
  )
}

export default Sidebar
