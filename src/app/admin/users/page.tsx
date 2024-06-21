'use client'

import React, { useEffect, useState } from 'react'
import UserTable from '../components/UserTable'
import { UserType } from '@/app/register/page'

const ManageUserPage = () => {
  const [userData, setUserData] = useState<UserType[]>([])

  useEffect(() => {
    const getUsers = localStorage.getItem('userData')
    const users = getUsers ? JSON.parse(getUsers) : null

    setUserData(users)

  }, [])

  console.log(userData)

  return (
    <div>
      <h1 className='text-3xl mb-5'>Manage Users</h1>
      <UserTable dataSource={userData}/>
    </div>
  )
}

export default ManageUserPage