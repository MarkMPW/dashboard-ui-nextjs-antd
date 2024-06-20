"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Layout, Input, Button, message } from "antd";
import Navbar from "../components/Navbar";
import FooterCompo from "../components/FooterCompo";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";

const CreatePost = () => {

  const { Content } = Layout;
  const route = useRouter()

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Create post success'
    })
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrl: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Reached the maximum 15")
        .required("Required"),
      imageUrl: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {

      setLoading(true)
      
      const storedPosts = localStorage.getItem('posts')

      await new Promise((resolve) => {
        setTimeout(resolve, 4000);
      });

      const newPost = {
        title: values.title,
        imageUrl: values.imageUrl,
        description: values.description
      }

      const posts = storedPosts ? JSON.parse(storedPosts) : []

      setLoading(false);

      success()

      posts.push(newPost)

      localStorage.setItem('posts', JSON.stringify(posts));

      route.push('/welcome')

    },
  });

  return (
    <Layout>
      <Navbar />
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
            <h3 className="text-xl">Create Post</h3>

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
      </Content>
      <FooterCompo />
    </Layout>
  );
};

export default CreatePost;
