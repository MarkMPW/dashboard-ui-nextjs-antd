"use client";

import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

import InitailUserData from "../../../users.json";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";

import CustomInput from "@/components/CustomInput";
import { LocalStorage } from "@/utils/getData";
import { UserType } from "@/interfaces/user-interface";
import { UserRole } from "@/enum/userRole.enum";

const yupValidationSchema = Yup.object({
  userName: Yup.string().max(10, "Reached the maximum 10").required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().max(20, "Reached the maximum 20").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Required"),
});

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const handleRegister = (values: UserType) => {
    try {
      const getLocalStroageUser = LocalStorage().getUsers()
      let users = []

      if(getLocalStroageUser) {
        try {
          if(Array.isArray(getLocalStroageUser)){
            users = getLocalStroageUser
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        users = [...InitailUserData, ...getLocalStroageUser]
      }

      const newUser = {
        id: Date.now(),
        userName: values.userName,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      users.push(newUser)

      localStorage.setItem("userData", JSON.stringify(users));

      if (values.role === UserRole.user) {
        router.push("/login");
      } else router.push("/admin");
    } catch (error: unknown) {
      console.log("failed to register: ", error);
    }
  };

  return (
    <Formik
      initialValues={{
        id: 0,
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: UserRole.user,
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values) => {
        console.log(values)
        handleRegister(values);
      }}
    >
      {(formik) => (
        <section className="flex-grow">
          <div className="flex justify-center items-center">
            <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl bg-[#cdd7e5]">
              <h3 className="text-3xl text-[#424b66]">Register</h3>
              <hr className="my-3" />
              
              <Form>
                <CustomInput
                  placeholder="Enter your username"
                  type="text"
                  field={formik.getFieldProps("userName")}
                  form={formik}
                  meta={{
                    value: formik.values.userName,
                    touched: formik.touched.userName as boolean,
                    error: formik.errors.userName,
                    initialTouched: formik.initialTouched.userName as boolean,
                  }}
                />
                <CustomInput
                  placeholder="Enter your email"
                  type="text"
                  field={formik.getFieldProps("email")}
                  form={formik}
                  meta={{
                    value: formik.values.email,
                    touched: formik.touched.email as boolean,
                    error: formik.errors.email,
                    initialTouched: formik.initialTouched.email as boolean,
                  }}
                />
                <CustomInput
                  placeholder="Enter your password"
                  type="password"
                  field={formik.getFieldProps("password")}
                  form={formik}
                  meta={{
                    value: formik.values.password,
                    touched: formik.touched.password as boolean,
                    error: formik.errors.password,
                    initialTouched: formik.initialTouched.password as boolean,
                  }}
                />
                <CustomInput
                  placeholder="Confirm password"
                  type="password"
                  field={formik.getFieldProps("confirmPassword")}
                  form={formik}
                  meta={{
                    value: formik.values.confirmPassword,
                    touched: formik.touched.confirmPassword as boolean,
                    error: formik.errors.confirmPassword,
                    initialTouched: formik.initialTouched.confirmPassword as boolean,
                  }}
                />
                <Button
                  className="border py-2 px-3 rounded text-lg my-2"
                  htmlType="submit"
                  type="primary"
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
};

export default RegisterPage;
