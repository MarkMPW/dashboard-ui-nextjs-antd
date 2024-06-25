"use client";

import React, { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { UserType } from "../interfaces/user-interface";
interface ThemeContextType {
  currentUser?: UserType;
  isAuth: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  isAuthHandler: (auth: boolean) => void;
}

interface ChildrenProp {
  children: React.ReactNode;
}

const initialThemeContext: ThemeContextType = {
  currentUser: undefined,
  isAuth: false,
  setCurrentUser: () => {},
  isAuthHandler: (auth: boolean) => {},
};

export const AuthContext = createContext<ThemeContextType>(initialThemeContext);
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC<ChildrenProp> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined
  );
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthHandler = (auth: boolean) => setIsAuth(auth);

  useEffect(() => {
    const getCurrentUserFormLocalStorage = () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        isAuthHandler(true);
      } else {
        isAuthHandler(false);
      }
    };
    getCurrentUserFormLocalStorage();

    return () => {
      isAuthHandler(false);
      setCurrentUser(undefined);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        currentUser,
        setCurrentUser,
        isAuthHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
