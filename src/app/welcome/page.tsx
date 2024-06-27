"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Popconfirm, Button } from "antd";
import { AuthContext } from "@/contexts/AuthContext";
import { NextPage } from "next";
import withAuth from "@/HOC/withAuth";

import { LocalStorage } from "@/utils/getData";

export interface AllPostsType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

const WelcomePage: NextPage = () => {

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState<AllPostsType[]>([]);
  const [openPopup, setOpenPopup] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    try {
      const getLocalStoragePosts = LocalStorage().getPost()

      setAllPosts(getLocalStoragePosts)

      const storedUser = LocalStorage().getCurrentUser()

      setCurrentUser(storedUser)

    } catch (error: unknown) {
      console.log("failed to get currentUser: ", error);
    }
  }, []);

  const handleShowPopup = (id: number) => {
    setOpenPopup(id);
  };

  const handleCancelPopup = () => {
    setOpenPopup(null);
  };

  const handleDeletePost = (id: number) => {
    setConfirmLoading(true);

    setTimeout(() => {
      const deletePost = allPosts.filter(
        (post: AllPostsType) => post.id !== id
      );

      localStorage.setItem("posts", JSON.stringify(deletePost));
      setAllPosts(deletePost);
      setOpenPopup(null);
      setConfirmLoading(false);
    }, 500);

  };

  return (
    <section className="flex-grow p-2">
      <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl border-2 border-red-200 ">
        <div className="flex justify-between">
          <div>
            <h3 className="text-3xl">Profile</h3>
            <p>Welcome, {currentUser?.userName}</p>
          </div>

          <div>
            <Link
              href="/create"
              className="bg-green-500 text-white border py-2 px-3 rounded-md my-2"
            >
              Create Post
            </Link>
          </div>
        </div>

        {allPosts.map((post) => (
          <div key={post.id}>
            <div className="shadow-xl my-10 p-10 rounded-xl border-2">
              <h4 className="text-2xl">{post.title}</h4>
              <Image
                className="my-3 rounded-md w-auto h-auto"
                src={post.imageUrl}
                width={300}
                height={0}
                alt="this is an image"
                priority={true}
                quality={50}
              />
              <p>{post.description}</p>
              <div className="mt-5">
                <Link
                  className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  href={`/edit/${post.id}`}
                >
                  Edit
                </Link>
                <Popconfirm
                  title="Do you want to delete"
                  open={openPopup === post?.id}
                  onCancel={handleCancelPopup}
                  okButtonProps={{ loading: confirmLoading }}
                  onConfirm={() => handleDeletePost(post?.id)}
                >
                  <Button
                    className="bg-red-500 py-5 px-3 rounded-md text-lg my-2"
                    onClick={() => handleShowPopup(post?.id)}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default withAuth(WelcomePage);
