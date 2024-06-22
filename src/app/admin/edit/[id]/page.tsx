"use client";

import React, { useEffect, useState } from "react";

import { Button, Input, Layout, Popconfirm, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "@/app/register/page";

const { Content } = Layout;

const EditUserPage = ({ params }: { params: { id: number } }) => {

  const route = useRouter()
  const [newUser, setNewUser] = useState<UserType | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage()

  const showPopconfirm = () => {
    setOpenPopup(true);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpenPopup(false);
      setConfirmLoading(false);

      message.success('Edit success', 2)

      formik.submitForm().then(()=> {
        route.push('/admin/users')
      });
    }, 2000);
  };

  const handleUpdateUser = (values: any) => {
    const storedUser = localStorage.getItem("userData");
    const users = storedUser ? JSON.parse(storedUser) : [];

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

    localStorage.setItem('userData', JSON.stringify(updateUser))
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const users = storedUser ? JSON.parse(storedUser) : [];

    const findUser = users.find(
      (user: UserType) => user.id === Number(params.id)
    );

    if (findUser) {
      setNewUser(findUser);

      formik.setValues({
        userName: findUser.userName,
        email: findUser.email,
        password: findUser.password,
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: newUser?.userName,
      email: newUser?.email,
      password: newUser?.password,
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(10, "Reached the maximum 10")
        .required("Required"),
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .max(15, "Reached the maximum 10")
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleUpdateUser(values)
    },
  });

  return (
    <Layout>
      <Content>
        <div className="flex-grow">
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
              <div className="mt-3">
                <h1 className="text-xl">Username:</h1>
                <Input
                  type="text"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                  placeholder="username"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mt-3">
                <h1 className="text-xl">Email:</h1>
                <Input
                  type="text"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mt-3">
                <h1 className="text-xl">Password:</h1>
                <Input
                  type="text"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              <Popconfirm
                title="You want to edit this post?"
                open={openPopup}
                onCancel={handleCancel}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
              >
                <Button
                  type="primary"
                  className="py-2 px-3 rounded-md text-lg my-2"
                  // htmlType="submit"
                  // loading={loading}
                  onClick={showPopconfirm}
                >
                  Edit user
                </Button>
              </Popconfirm>
            </form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default EditUserPage;
