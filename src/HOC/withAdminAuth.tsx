import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '@/contexts/AuthContext'

const withAuthTest = (WrappedComponent: React.FC) => {
  return(prop: any) => {
    const { currentUser } = useContext(AuthContext)
    const isAdmin = currentUser?.role === 'admin'
    const router = useRouter()

    useEffect(() => {
      if(!isAdmin) {
        console.log('navigate user to login page')
        router.push('/')
      } else {
        router.push('/admin')
      }
    }, [isAdmin])

    return isAdmin ? <WrappedComponent {...prop}/> : null
  }
}

export default withAuthTest
