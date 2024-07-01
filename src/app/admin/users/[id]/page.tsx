"use client";

import React, { useEffect, useState } from "react";

import { Button, Popconfirm, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "@/app/register/page";
import { NextPage } from "next";

import { LocalStorage } from "@/utils/getData";
import CustomInput from "@/components/CustomInput";

interface PageProp {
  params: {
    id: number;
  };
}

const yupValidationSchema = Yup.object({
  userName: Yup.string().max(10, "Reached the maximum 10").required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().max(15, "Reached the maximum 10").required("Required"),
});

const EditUserPage: NextPage<PageProp> = ({ params }) => {
  const route = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: yupValidationSchema,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const users = LocalStorage().getUsers();

    const findUser = users.find(
      (user: UserType) => user.id === Number(params.id)
    );

    if (findUser) {
      formik.setValues({
        userName: findUser.userName,
        email: findUser.email,
        password: findUser.password,
      });
    }
  }, []);

  const handleShowPopup = () => {
    setOpenPopup(true);
  };

  const handleCancelPopup = () => {
    setOpenPopup(false);
  };

  const handleConfirmPopup = () => {
    setConfirmLoading(true);

    if (Object.keys(formik.errors).length !== 0) {
      setConfirmLoading(false);
      setOpenPopup(false);
      message.error("Failed to edit", 2);
    } else {
      setTimeout(() => {
        setOpenPopup(false);
        setConfirmLoading(false);

        message.success("Edit success", 2);

        formik.submitForm().then(() => {
          route.push("/admin/users");
        });
      }, 500);
    }
  };

  const handleResetField = () => {
    formik.resetForm();
  };

  const handleUpdateUser = (values: any) => {
    const users = LocalStorage().getUsers()

    const updateUser = users.map((user: UserType) =>
      user.id === Number(params.id)
        ? {
            ...user,
            userName: values.userName,
            email: values.email,
            password: values.password,
          }
        : user
    );

    localStorage.setItem("userData", JSON.stringify(updateUser));
  };

  return (
    <section className="flex-grow">
      <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
        <Link
          href="/admin/users"
          className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
        >
          Go back
        </Link>
        <hr className="my-3" />
        <h3 className="text-2xl font-semibold">Edit User</h3>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput 
            form={formik}
            field={formik.getFieldProps('userName')}
            type='text'
            topic='Username'
            placeholder="Enter username"
            editWidth
            meta={{
              value: formik.values.userName,
              error: formik.errors.userName,
              touched: formik.touched.userName as boolean,
              initialTouched: formik.initialTouched as boolean,
            }}
          />
          <CustomInput 
            form={formik}
            field={formik.getFieldProps('email')}
            type='text'
            topic="Email"
            placeholder="Enter email"
            editWidth
            meta={{
              value: formik.values.email,
              error: formik.errors.email,
              touched: formik.touched.email as boolean,
              initialTouched: formik.initialTouched as boolean,
            }}
          />
          <CustomInput 
             form={formik}
             field={formik.getFieldProps('password')}
             type='text'
             topic="Password"
             placeholder="Enter password"
             editWidth
             meta={{
               value: formik.values.password,
               error: formik.errors.password,
               touched: formik.touched.password as boolean,
               initialTouched: formik.initialTouched as boolean,
             }}
          />

          <Popconfirm
            title="You want to edit this post?"
            open={openPopup}
            onCancel={handleCancelPopup}
            onConfirm={handleConfirmPopup}
            okButtonProps={{ loading: confirmLoading }}
          >
            <Button
              type="primary"
              className="py-2 px-3 rounded-md text-lg my-2"
              onClick={handleShowPopup}
            >
              Edit user
            </Button>
          </Popconfirm>

          <Button
            className="py-2 px-3 rounded-md text-lg my-2 bg-slate-200 text-black hover:bg-slate-100 ml-4"
            onClick={handleResetField}
          >
            Cancel
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditUserPage;
