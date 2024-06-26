"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";

const yupValidationSchema = Yup.object({
  title: Yup.string()
    .max(15, "Reached the maximum 15")
    .required("Required"),
  imageUrl: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

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
      handleCreatePost(values)
    },
  });

  const handleCreatePost = async (values: any) => {
    setLoading(true);

    const storedPosts = localStorage.getItem("posts");

    await new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });

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
  }

  return (
    <div className="flex-grow">
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
          <Input
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
            placeholder="Post title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            status={formik.errors.title ? "error" : ""}
          />
          {formik.errors.title && formik.touched ? (
            <p className="text-red-400">{formik.errors.title}</p>
          ) : null}
          <Input
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
            placeholder="Post Img url"
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            status={formik.errors.imageUrl ? "error" : ""}
          />
          {formik.errors.imageUrl && formik.touched ? (
            <p className="text-red-400">{formik.errors.imageUrl}</p>
          ) : null}
          <textarea
            cols={30}
            rows={10}
            placeholder="Enter your post content"
            className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          {formik.errors.description && formik.touched ? (
            <p className="text-red-400">{formik.errors.description}</p>
          ) : null}
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
    </div>
  );
};

export default CreatePost;
