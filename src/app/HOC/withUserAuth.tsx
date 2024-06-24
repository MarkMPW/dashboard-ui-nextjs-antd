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
        route.push("/login");
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
