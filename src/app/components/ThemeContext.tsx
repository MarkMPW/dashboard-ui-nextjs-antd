'use client'

import React from 'react'

import { createContext, useState, useEffect } from 'react'
import { UserType } from '../register/page'

interface ThemeContextType {
  currentUser?: UserType | null
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

interface ChildrenProp {
  children: React.ReactNode
}

const initialThemeContext: ThemeContextType = {
  currentUser: undefined,
  setCurrentUser: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(initialThemeContext)

const ThemeProvider: React.FC<ChildrenProp> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(undefined)

  // useEffect(() => {
  //   try {
  //     const storedUser = localStorage.getItem('currentUser')
  
  //     if(storedUser) {
  //       setCurrentUser(JSON.parse(storedUser))
  //     } else {
  //       setCurrentUser(undefined)
  //     }

  //   } catch(error: unknown) {
  //     console.log('failed to get currentUser: ', error)
  //   }
  // }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  
  return(
    // เปลี่ยนชื่อเป็น AuthContext
    <ThemeContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </ThemeContext.Provider>
  )

}

export default ThemeProvider
