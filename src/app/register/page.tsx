"use client";

import React, { useState } from "react";
import { Layout, Input, Button } from "antd";
import Navbar from "../components/Navbar";
import Link from "next/link";
import FooterCompo from "../components/FooterCompo";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";

export interface UserType {
  id: number,
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterPage: NextPage = () => {

  const { Content, Footer } = Layout;
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: 'admin'
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(10, "Reached the maximum 10")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Reached the maximum 20")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Required"),
    }),
    onSubmit: (values) => {

      const storedUsers = localStorage.getItem('userData')

      let users = [];
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
          if (!Array.isArray(users)) {
            users = [];
          }
        } catch (e) {
          users = [];
        }
      }

      users.push({
        id: Date.now(),
        userName: values.userName,
        email: values.email,
        password: values.password,
        role: values.role
      })

      console.log("user from formik: ", values);
      
      localStorage.setItem("userData", JSON.stringify(users));

      if(values.role === 'user') {
        router.push('/login')
      } else router.push('/admin')
    },
  });

  // const handleChange = (name: string, value: string) => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  // const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   localStorage.setItem("userData", JSON.stringify(user));
  // };

  return (
    <Layout>
      <Content>
        <div className="flex-grow">
          <div className="flex justify-center items-center">
            <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl bg-[#cdd7e5]">
              <h3 className="text-3xl text-[#424b66]">Register</h3>
              <hr className="my-3" />

              <form onSubmit={formik.handleSubmit}>
                <Input
                  type="text"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your name"
                  name="userName"
                  value={formik.values.userName}
                  onBlur={formik.handleBlur}
                  // onChange={(e) => handleChange(e.target.name, e.target.value)}
                  onChange={formik.handleChange}
                  status={formik.errors.userName ? "error" : ""}
                />
                {formik.errors.userName && formik.touched.userName ? (
                  <p className="text-red-500">{formik.errors.userName}</p>
                ) : null}
                <Input
                  type="email"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter your email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  status={formik.errors.email ? "error" : ""}
                  // onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                  name="password"
                  status={formik.errors.password ? "error" : ""}
                  // onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-red-500">{formik.errors.password}</p>
                ) : null}

                <Input
                  type="password"
                  className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  status={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "error"
                      : ""
                  }
                  // onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                   {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <p className="text-red-500">{formik.errors.confirmPassword}</p>
                ) : null}

                <Button
                  className="border py-2 px-3 rounded text-lg my-2"
                  htmlType="submit"
                  type='primary'
                >
                  Sign Up
                </Button>
                <hr className="my-3" />

                <p>
                  Already have an acount? Go to{" "}
                  <Link href="/login" className="text-blue-700 hover:underline">
                    Login
                  </Link>{" "}
                  Page
                </p>
              </form>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default RegisterPage;
