import React, { ComponentType, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '@/contexts/AuthContext'

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const { currentUser } = useContext(AuthContext)
    const isAdmin = currentUser?.role === 'admin'
    const router = useRouter()

    useEffect(() => {
      if(!isAdmin) {
        router.push('/')
      } else {
        router.push('/admin')
      }
    }, [isAdmin])

    return isAdmin ? <WrappedComponent {...props}/> : null
  }
  return Wrapper
}

export default withAdminAuth
