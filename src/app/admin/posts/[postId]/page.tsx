"use client";

import React, { useEffect, useState } from "react";

import { Button, Input, Layout, Popconfirm, message } from "antd";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { AllPostsType } from "@/app/welcome/page";

const { Content } = Layout;

const PostIdPage = ({ params }: { params: { postId: number } }) => {

  const route = useRouter();
  const [editPost, setEditPost] = useState<AllPostsType | null>(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showPopconfirm = () => {
    setOpenPopup(true);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const handleCancelField = () => {
    if (editPost) {
      formik.resetForm();
    }
  };

  const handleUpdatePost = (values: any) => {
    const storedPost = localStorage.getItem('posts')
    const posts = storedPost ? JSON.parse(storedPost) : []

    const updatedPost = posts.map((post: AllPostsType) => 
      post.id === Number(params.postId)
       ? {
        ...post,
        title: values.title,
        imageUrl: values.imageUrl,
        description: values.description,
       }
      : post
    )

    localStorage.setItem('posts', JSON.stringify(updatedPost))
  }

  useEffect(() => {
    const storedPost = localStorage.getItem("posts");
    const posts = storedPost ? JSON.parse(storedPost) : null;

    const findEditPost = posts.find(
      (post: AllPostsType) => post.id === Number(params.postId)
    );

    if (findEditPost) {
      setEditPost(findEditPost);

      formik.setValues({
        title: findEditPost?.title,
        imageUrl: findEditPost?.imageUrl,
        description: findEditPost?.description,
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: editPost?.title,
      imageUrl: editPost?.imageUrl,
      description: editPost?.imageUrl
    },
    validationSchema: Yup.object({
      title: Yup.string().max(15, 'Reached maximum 15').required('Required'),
      imageUrl: Yup.string().required('Required'),
      description: Yup.string().max(50, 'Reached maimum 50').required('Required')
    }),
    onSubmit: (values) => {
      handleUpdatePost(values)
    },
  });

  const handleOk = () => {
    formik.submitForm()
    // setConfirmLoading(true);

    // if(Object.keys(formik.errors).length !== 0) {
    //   setConfirmLoading(false)
    //   setOpenPopup(false)
    //   message.error('Failed to edit', 2)

    // } else {
    //   setTimeout(() => {
    //     setOpenPopup(false);
    //     setConfirmLoading(false);
  
    //     message.success("Edit success", 2);
  
    //     formik.submitForm().then(() => {
    //       route.push("/admin/users");
    //     });
    //   }, 2000);
    // }
  };

  return (
    <Layout>
      <Content>
        <div className="flex-grow">
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
              <div className="mt-3">
                <h1 className="text-xl">Title:</h1>
                <Input
                  type="text"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                  placeholder="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  status={formik.errors.title && formik.touched ? 'error' : ''}
                />
                {formik.errors.title && formik.touched && (
                  <p className='text-red-400'>{formik.errors.title}</p>
                )}
              </div>
              <div className="mt-3">
                <h1 className="text-xl">Image URL:</h1>
                <Input
                  type="text"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                  placeholder="image URL"
                  name="imageUrl"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  status={formik.errors.imageUrl && formik.touched ? 'error' : ''}
                />
                {formik.errors.imageUrl && formik.touched && (
                  <p className='text-red-400'>{formik.errors.imageUrl}</p>
                )}
              </div>
              <div className="mt-3">
                <h1 className="text-xl">Description:</h1>
                <textarea
                  className="w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  required
                  // status={formik.errors.password && formik.touched ? 'error' : ''}
                />
                {formik.errors.description && formik.touched && (
                  <p className='text-red-400'>{formik.errors.description}</p>
                )}
              </div>

              <Popconfirm
                title="You want to edit this post?"
                // open={openPopup}
                // onCancel={handleCancel}
                onConfirm={handleOk}
                // okButtonProps={{ loading: confirmLoading }}
              >
                <Button
                  type="primary"
                  className="py-2 px-3 rounded-md text-lg my-2"
                  // htmlType="submit"
                  // loading={loading}
                  // onClick={showPopconfirm}
                >
                  Edit post
                </Button>
              </Popconfirm>

              <Button
                className="py-2 px-3 rounded-md text-lg my-2 bg-slate-200 text-black hover:bg-slate-100 ml-4"
                // onClick={handleCancelField}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default PostIdPage;
