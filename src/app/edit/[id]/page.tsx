"use client";

import FooterCompo from "@/app/components/FooterCompo";
import Navbar from "@/app/components/Navbar";
import { AllPostsType } from "@/app/welcome/page";
import { Button, Input, Layout, Popconfirm, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";

const EditPage = ({ params }: { params: { id: number } }) => {
  const route = useRouter();
  const { Content } = Layout;
  const [post, setPost] = useState<AllPostsType | null>(null);

  const [openPopup, setOpenPopup] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Edit successfully ",
    });
  };

  const showPopconfirm = () => {
    setOpenPopup(true);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    success();

    setTimeout(() => {
      setOpenPopup(false);
      setConfirmLoading(false);
      formik.submitForm().then(() => {
        route.push("/welcome");
      });
    }, 2000);
  };

  useEffect(() => {
    const getEditPost = localStorage.getItem("posts");
    const posts = getEditPost ? JSON.parse(getEditPost) : [];

    const editPost = posts.find(
      (post: AllPostsType) => post.id === Number(params.id)
    );

    if (editPost) {
      setPost(editPost);

      formik.setValues({
        title: editPost.title,
        imageUrl: editPost.imageUrl,
        description: editPost.description,
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      imageUrl: post?.imageUrl,
      description: post?.description,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Reached the maximum 15")
        .required("Required"),
      imageUrl: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      updatedPost(values)
    },
  });

  const updatedPost = (values: any) => {
    const getAllPosts = localStorage.getItem("posts");
    const posts = getAllPosts ? JSON.parse(getAllPosts) : [];

    const updatePost = posts.map((p: AllPostsType) =>
      p.id === Number(params.id)
        ? {
            ...p,
            title: values.title,
            imageUrl: values.imageUrl,
            description: values.description,
          }
        : p
    );

    localStorage.setItem("posts", JSON.stringify(updatePost));
  };

  return (
    <Layout>
      {contextHolder}
      <Content>
        <div className="flex-grow">
          <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
            <Link
              href="/welcome"
              className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
            >
              Go back
            </Link>
            <hr className="my-3" />
            <h3 className="text-xl">Edit Post</h3>

            <form onSubmit={formik.handleSubmit}>
              <Input
                type="text"
                className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                placeholder="Post title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              <Input
                type="text"
                className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                placeholder="Post Img url"
                name="imageUrl"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
              />
              <textarea
                cols={30}
                rows={10}
                placeholder="Enter your post content"
                className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
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
                  Edit post
                </Button>
              </Popconfirm>
            </form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default EditPage;
