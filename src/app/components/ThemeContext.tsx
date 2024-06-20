'use client'

import React from 'react'

import { createContext, useState, useEffect } from 'react'
import { UserType } from '../register/page'

interface ThemeContextType {
  currentUser: UserType | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

const initialThemeContext: ThemeContextType = {
  currentUser: undefined,
  setCurrentUser: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(initialThemeContext)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserType>()

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

  return(
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
