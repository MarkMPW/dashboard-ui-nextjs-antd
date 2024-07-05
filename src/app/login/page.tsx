"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, message } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "@/interfaces/user-interface";
import { NextPage } from "next";

import InitialUserData from "../../../users.json";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/enums/role-enum";
import { delayTimeout } from "@/utils/dalay";
import CustomInput from "@/components/CustomInput";
import { LocalStorage } from "@/utils/getData";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { setCurrentUser, isAuthHandler } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
      handleLogin(values);
    },
  });

  const failed = () => {
    message.error({
      content: "Fail to login!",
    });
  };

  const handleLogin = async (
    values: { email: string; password: string },
  ) => {
    setIsLoading(true);
  
    try {
      const users = LocalStorage().getUsers()
  
      const allUser = [...InitialUserData, ...users];
  
      const findUser = allUser.find(
        (user: UserType) =>
          user.email === values.email && user.password === values.password
      );
  
      if (!findUser) {
        failed();
        return;
      }
  
      setCurrentUser(findUser);
      isAuthHandler(true);
      localStorage.setItem("currentUser", JSON.stringify(findUser));

      message.success("Login successful!", 1, () => {
        const { role } = findUser;
        if (role === UserRole.user) {
          router.push("/welcome");
        } else if (role === UserRole.admin) {
          router.push("/admin");
        }
      });

    } catch (error: unknown) {
      failed();
    } finally {
      await delayTimeout(1000)
      setIsLoading(false)
    }
  };
  
  return (
    <section className="flex-grow">
      <div className="flex justify-center items-center">
        <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl bg-[#cdd7e5]">
          <h3 className="text-3xl text-[#424b66]">Login</h3>
          <hr className="my-3" />

          <form onSubmit={formik.handleSubmit}>
            <CustomInput 
              type='text'
              placeholder="Enter your email"
              field={formik.getFieldProps('email')}
              form={formik}
              meta={{
                touched: formik.touched.email as boolean,
                error: formik.errors.email,
                value: formik.values.email,
                initialTouched: formik.initialTouched as boolean,
              }}   
            />
            <CustomInput 
              type='password'
              placeholder="Enter your password"
              field={formik.getFieldProps('password')}
              form={formik}
              meta={{
                touched: formik.touched.password as boolean,
                error: formik.errors.password,
                value: formik.values.password,
                initialTouched: formik.initialTouched as boolean,
              }}
            />
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
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
