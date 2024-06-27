'use client'

import React, { useEffect, useState } from 'react'
import UserTable, { TableType } from '@/components/admin/UserTable'
import { NextPage } from 'next'

import { LocalStorage } from '@/utils/getData'

const ManageUserPage: NextPage = () => {
  const [userData, setUserData] = useState<TableType[]>([])

  useEffect(() => {
    const users = LocalStorage().getUsers()
    setUserData(users)
  }, [])

  return (
    <section>
      <h1 className='text-3xl mb-5'>Manage Users</h1>
      <UserTable dataSource={userData}/>
    </section>
  )
}

export default ManageUserPage