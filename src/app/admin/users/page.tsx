'use client'

import React, { useEffect, useState } from 'react'
import UserTable, { TableType } from '@/components/admin/UserTable'
import { NextPage } from 'next'

import { getUsers } from '@/utils/getData'

const ManageUserPage: NextPage = () => {
  const [userData, setUserData] = useState<TableType[]>([])

  useEffect(() => {
    const users = getUsers()
    setUserData(users)
  }, [])

  return (
    <div>
      <h1 className='text-3xl mb-5'>Manage Users</h1>
      <UserTable dataSource={userData}/>
    </div>
  )
}

export default ManageUserPage