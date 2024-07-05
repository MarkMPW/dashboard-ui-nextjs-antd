"use client";

import React, { useEffect, useState } from "react";

import { Button, Popconfirm, message } from "antd";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { AllPostsType } from "@/interfaces/user-interface";
import { NextPage } from "next";

import { LocalStorage } from "@/utils/getData";
import CustomInput from "@/components/CustomInput";
import { delayTimeout } from "@/utils/dalay";

interface PageProp {
  params: {
    postId: number;
  };
}

const yupValidationSchema = Yup.object({
  title: Yup.string().max(15, "Reached maximum 15").required("Required"),
  imageUrl: Yup.string().required("Required"),
  description: Yup.string().max(50, "Reached maimum 50").required("Required"),
});

const PostIdPage: NextPage<PageProp> = ({ params }) => {
  const route = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [postValueFromLocal, setPostValueFromLocal] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

  const formik = useFormik({
    initialValues: {
      title: postValueFromLocal?.title,
      imageUrl: postValueFromLocal?.imageUrl,
      description: postValueFromLocal?.description,
    },
    validationSchema: yupValidationSchema,
    onSubmit: (values) => {
      handleUpdatePost(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const posts = LocalStorage().getPost();
    const findEditPost = posts.find(
      (post: AllPostsType) => post.id === Number(params.postId)
    );
    if (findEditPost) {
      formik.setValues({
        title: findEditPost?.title,
        imageUrl: findEditPost?.imageUrl,
        description: findEditPost?.description,
      });
      setPostValueFromLocal(findEditPost);
    }
  }, []);

  const handleShowPopup = () => {
    setOpenPopup(true);
  };

  const handleCancelPopup = () => {
    setOpenPopup(false);
  };

  const handleConfirmPopup = async () => {
    formik.submitForm();
    setConfirmLoading(true);

    if (Object.keys(formik.errors).length !== 0) {
      setConfirmLoading(false);
      setOpenPopup(false);
      message.error("Failed to edit", 2);
    } else {

      await delayTimeout(500);

      setOpenPopup(false);
      setConfirmLoading(false);
      message.success("Edit success", 2);
      formik.submitForm().then(() => {
        route.push("/admin/posts");
      });
    }
  };

  const handleResetField = () => {
    formik.resetForm();
  };

  const handleUpdatePost = (values: AllPostsType) => {
    const localStoragePost = LocalStorage().getPost();
    const updatedPost = localStoragePost.map((post: AllPostsType) =>
      post.id === Number(params.postId)
        ? {
            ...post,
            title: values.title,
            imageUrl: values.imageUrl,
            description: values.description,
          }
        : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPost));
  };

  return (
    <section className="flex-grow">
      <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
        <Link
          href="/admin/posts"
          className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
        >
          Go back
        </Link>
        <hr className="my-3" />
        <h3 className="text-2xl font-semibold">Edit Post</h3>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            placeholder="title"
            type="text"
            field={formik.getFieldProps("title")}
            form={formik}
            meta={{
              value: formik.values.title,
              touched: formik.touched.title as boolean,
              error: formik.errors.title,
              initialTouched: formik.initialTouched as boolean,
            }}
            topic="Title"
            editWidth
          />
          <CustomInput
            placeholder="imageUrl"
            type="text"
            field={formik.getFieldProps("imageUrl")}
            form={formik}
            meta={{
              value: formik.values.imageUrl,
              touched: formik.touched.imageUrl as boolean,
              error: formik.errors.imageUrl,
              initialTouched: formik.initialTouched as boolean,
            }}
            topic="Image URL"
            editWidth
          />
          <CustomInput
            placeholder="Description"
            field={formik.getFieldProps("description")}
            form={formik}
            meta={{
              value: formik.values.description,
              touched: formik.touched.description as boolean,
              error: formik.errors.description,
              initialTouched: formik.initialTouched as boolean,
            }}
            topic="Description"
            editWidth
            textArea
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
              Edit post
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

export default PostIdPage;
