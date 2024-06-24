import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import { ThemeContext } from "../components/ThemeContext";

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const route = useRouter();
    const { currentUser } = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (!currentUser) {
        console.log('current user: ', currentUser)
        route.push("/login");
        localStorage.removeItem('currentUser')
      } else {
        return (() => setIsLoading(false))
      }
    }, []);

    if(isLoading) {
      return <p>Please login first ;P</p>
    }

    return <WrappedComponent {...props} />;
  };
  return Wrapper
};

export default withAuth;
