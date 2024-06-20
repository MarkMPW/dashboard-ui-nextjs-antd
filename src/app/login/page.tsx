"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import Link from "next/link";
import FooterCompo from "../components/FooterCompo";

import { Input, Button, message } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "../register/page";

const LoginPage = () => {

  const { Content, Footer } = Layout;
  const router = useRouter()

  const [messageContent, setMessageContent] = useState<{ type: string, content: string }>();

  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    setMessageContent({
      type: "success",
      content: "Login success",
    });
  };

  const failed = () => {
    setMessageContent({
      type: 'error',
      content: 'Failed to login'
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Reached the maximum 20")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const getUsersData = localStorage.getItem("userData");
      const users = getUsersData ? JSON.parse(getUsersData) : [];

      const user = users.find(
        (user: UserType) =>
          user.email === values.email && user.password === values.password
      );

      console.log('user: ', user)

      if (user) {
        console.log("login successful");

        setLoading(true);

        await new Promise((resolve) => {
          setTimeout(resolve, 4000);
        });

        setLoading(false);

        success()
        localStorage.setItem('currentUser', JSON.stringify(user))

        if(user.role === 'user') {
          router.push('/welcome')
        } else if (user.role === 'admin') {
          router.push('/admin')
        }

      } else {
        
        setLoading(true);
        
        await new Promise((resolve) => {
          setTimeout(resolve, 4000);
        });
        
        console.log("Failed to login");
        setLoading(false);

        failed()
      }

      console.log("users: ", users);
    },
  });

  useEffect(() => {
    if(messageContent) {
      messageApi.open({
        type: messageContent.type as any,
        content: messageContent.content
      })
    }
  }, [messageContent]);

  return (
    <Layout>
      <Navbar />
      {contextHolder}
      <Content>
        <div className="flex-grow">
          <div className="flex justify-center items-center">
            <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl bg-[#cdd7e5]">
              <h3 className="text-3xl text-[#424b66]">Login</h3>
              <hr className="my-3" />

              <form onSubmit={formik.handleSubmit}>
                <Input
                  type="text"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  status={formik.errors.email ? "error" : ""}
                  name="email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500">{formik.errors.email}</p>
                ) : null}
                <Input
                  type="password"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  status={formik.errors.password ? "error" : ""}
                  name="password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-red-500">{formik.errors.password}</p>
                ) : null}
                <Button
                  className="border py-2 px-3 rounded text-lg my-2"
                  type='primary'
                  htmlType="submit"
                  loading={loading}
                >
                  Sign Up
                </Button>
                <hr className="my-3" />

                <p>
                  Do not have an acount? Go to{" "}
                  <Link
                    href="/register"
                    className="text-blue-700 hover:underline"
                  >
                    Sign Up
                  </Link>{" "}
                  Page
                </p>
              </form>
            </div>
          </div>
        </div>
      </Content>
      <FooterCompo />
    </Layout>
  );
};

export default LoginPage;
