import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../components/ThemeContext'
import { useRouter } from 'next/navigation'

const withAuthTest = (WrappedComponent: React.FC) => {
  return(prop: any) => {
    const { currentUser } = useContext(ThemeContext)
    const isAdmin = currentUser?.role === 'admin'
    const router = useRouter()

    console.log('currentUser: ', currentUser)
    console.log('isAdmin: ', isAdmin)

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
