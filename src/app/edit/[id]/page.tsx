"use client";

import { AllPostsType } from "@/interfaces/user-interface";
import { Button, Popconfirm, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";
import CustomInput from "@/components/CustomInput";
import { LocalStorage } from "@/utils/getData";
import { delayTimeout } from "@/utils/dalay";

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
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrl: "",
      description: "",
    },
    validationSchema: yupValidationSchema,
    onSubmit: (values) => {
      updatedPost(values);
    },
  });

  useEffect(() => {
    const posts = LocalStorage().getPost();
    const editPost = posts.find(
      (post: AllPostsType) => post.id === Number(params.id)
    );

    if (editPost) {
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

  const handleOkPopupConfirm = async () => {
    setConfirmLoading(true);

    messageApi.open({
      type: "success",
      content: "Edit successfully ",
    });

    await delayTimeout(1000);

    setOpenPopup(false);
    setConfirmLoading(false);
    formik.submitForm().then(() => {
      route.push("/welcome");
    });
  };

  const updatedPost = (values: AllPostsType) => {
    const localStoragePost = LocalStorage().getPost();

    const updatePost = localStoragePost.map((p: AllPostsType) =>
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
              field={formik.getFieldProps("description")}
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
