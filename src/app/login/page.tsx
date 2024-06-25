"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input, Button, message } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "../register/page";
import { NextPage } from "next";

import InitialUserData from "../../../users.json";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/enums/role-enum";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { setCurrentUser, isAuthHandler, isAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const failed = () => {
    message.error({
      content: "Fail to login!",
    });
  };

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
    onSubmit: async (values, { setSubmitting }) => {
      handleLogin(values, setSubmitting);
    },
  });

  const handleLogin = async (
    values: { email: string; password: string },
    setSubmitting: any
  ) => {
    return new Promise<void>((resolve) => {
      try {
        setLoading(true);
        const userLocalData = localStorage.getItem("userData");
        const users = userLocalData ? JSON.parse(userLocalData) : [];

        const allUser = [...InitialUserData, ...users];

        const findUser = allUser.find(
          (user: UserType) =>
            user.email === values.email && user.password === values.password
        );

        if (!findUser) {
          // ไม่เจอ user
          failed();
          return;
        }

        setCurrentUser(findUser);
        isAuthHandler(true);
        localStorage.setItem("currentUser", JSON.stringify(findUser));
        message.success("Login successful!", 2, () => {
          const { role } = findUser || undefined;
          if (role === UserRole.user) {
            router.push("/welcome");
          } else if (role === UserRole.admin) {
            router.push("/admin");
          }
        });
      } catch (error: unknown) {
        console.log("Login failed: ", error);
        failed();
      } finally {
        setLoading(false);
        resolve();
        console.log("finally");
      }
    }).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <section className="flex-grow">
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
              type="primary"
              size="large"
              htmlType="submit"
              //   loading={loading}
              disabled={formik.isSubmitting}
            >
              Sign Up
            </Button>
            <hr className="my-3" />

            <p>
              Do not have an account? Go to{" "}
              <Link href="/register" className="text-blue-700 hover:underline">
                Sign Up
              </Link>
              Page
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
