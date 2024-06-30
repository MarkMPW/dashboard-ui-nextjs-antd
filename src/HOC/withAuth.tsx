import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import { AuthContext } from "@/contexts/AuthContext";
import { Spin } from "antd";

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const route = useRouter();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (!currentUser) {
        route.push("/login");
        localStorage.removeItem('currentUser')
      } else {
        return (() => setIsLoading(false))
      }
    }, []);

    if(isLoading) {
      return <Spin/>
    }

    return <WrappedComponent {...props} />;
  };
  return Wrapper
};

export default withAuth;
