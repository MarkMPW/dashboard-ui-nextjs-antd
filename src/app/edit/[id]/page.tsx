"use client";

import { AllPostsType } from "@/app/welcome/page";
import { Button, Input, Popconfirm, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";

interface PageProp {
  params: {
    id: number;
  };
}

const yupValidationSchema = Yup.object({
  title: Yup.string().max(15, "Reached the maximum 15").required("Required"),
  imageUrl: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const EditPage: NextPage<PageProp> = ({ params }) => {
  const route = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [post, setPost] = useState<AllPostsType | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      imageUrl: post?.imageUrl,
      description: post?.description,
    },
    validationSchema: yupValidationSchema,
    onSubmit: (values) => {
      updatedPost(values);
    },
  });

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

  const handleShowPopup = () => {
    setOpenPopup(true);
  };

  const handleCancelPopup = () => {
    setOpenPopup(false);
  };

  const handleOkPopupConfirm = () => {
    setConfirmLoading(true);

    messageApi.open({
      type: "success",
      content: "Edit successfully ",
    });

    setTimeout(() => {
      setOpenPopup(false);
      setConfirmLoading(false);
      formik.submitForm().then(() => {
        route.push("/welcome");
      });
    }, 2000);
  };

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
    <section>
      {contextHolder}
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
              onCancel={handleCancelPopup}
              onConfirm={handleOkPopupConfirm}
              okButtonProps={{ loading: confirmLoading }}
            >
              <Button
                type="primary"
                className="py-2 px-3 rounded-md text-lg my-2"
                // htmlType="submit"
                // loading={loading}
                onClick={handleShowPopup}
              >
                Edit post
              </Button>
            </Popconfirm>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPage;
