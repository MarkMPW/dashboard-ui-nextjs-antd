'use client'

import React, { useEffect, useState } from 'react'
import UserTable, { TableType } from '../components/UserTable'

const ManageUserPage = () => {
  const [userData, setUserData] = useState<TableType[]>([])

  useEffect(() => {
    const getUsers = localStorage.getItem('userData')
    const users = getUsers ? JSON.parse(getUsers) : null

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