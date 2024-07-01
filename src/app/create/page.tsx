"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";

import { delayTimeout } from "@/utils/dalay";
import CustomInput from "@/components/CustomInput";

const yupValidationSchema = Yup.object({
  title: Yup.string().max(15, "Reached the maximum 15").required("Required"),
  imageUrl: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const CreatePost: NextPage = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrl: "",
      description: "",
    },
    validationSchema: yupValidationSchema,
    onSubmit: async (values) => {
      handleCreatePost(values);
    },
  });

  const handleCreatePost = async (values: any) => {
    setLoading(true);

    const storedPosts = localStorage.getItem("posts");

    await delayTimeout(500);

    const newPost = {
      id: Date.now(),
      title: values.title,
      imageUrl: values.imageUrl,
      description: values.description,
    };

    const posts = storedPosts ? JSON.parse(storedPosts) : [];

    setLoading(false);

    message.success("Post success", 2);

    posts.push(newPost);

    localStorage.setItem("posts", JSON.stringify(posts));

    route.push("/welcome");
  };

  return (
    <section className="flex-grow">
      <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
        <Link
          href="/welcome"
          className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
        >
          Go back
        </Link>
        <hr className="my-3" />
        <h3 className="text-xl">Create Post</h3>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            field={formik.getFieldProps("title")}
            form={formik}
            type="text"
            placeholder="Post title"
            meta={{
              value: formik.values.title,
              error: formik.errors.title,
              touched: formik.touched.title as boolean,
              initialTouched: formik.initialTouched as boolean,
            }}
            editWidth
          />
          <CustomInput
            field={formik.getFieldProps("imageUrl")}
            form={formik}
            type="text"
            placeholder="Post imageUrl"
            meta={{
              value: formik.values.imageUrl,
              error: formik.errors.imageUrl,
              touched: formik.touched.imageUrl as boolean,
              initialTouched: formik.initialTouched as boolean,
            }}
            editWidth
          />
          <CustomInput 
            field={formik.getFieldProps('description')}
            form={formik}
            placeholder="Enter your post content"
            meta={{
              value: formik.values.description,
              error: formik.errors.description,
              touched: formik.touched.description as boolean,
              initialTouched: formik.initialTouched as boolean,
            }}
            editWidth
            cols={30}
            rows={10}
            textArea
          />
          <Button
            type="primary"
            className="py-2 px-3 rounded-md text-lg my-2"
            htmlType="submit"
            loading={loading}
          >
            Post
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
