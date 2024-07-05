import React, { useState, useEffect, useContext, ComponentType } from "react";

import { useRouter } from "next/navigation";

import { AuthContext } from "@/contexts/AuthContext";
import { Spin } from "antd";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const route = useRouter();
    const { currentUser } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true)
    const isUser = currentUser?.role === 'user'

    useEffect(() => {
      if(!isUser) {
        route.push('/login')
        setIsLoading(false)
      } else {
        route.push('/welcome')
        setIsLoading(false)
      }
    }, [isUser])

    if(isLoading) {
      return <Spin/>
    }

    return isUser ? <WrappedComponent {...props} /> : null
  };
  return Wrapper
};

export default withAuth;
