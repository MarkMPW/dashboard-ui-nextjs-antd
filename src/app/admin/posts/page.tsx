"use client";

import { AllPostsType } from "@/app/welcome/page";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { LocalStorage } from "@/utils/getData";
import DataTable from "@/components/admin/DataTable";
import { Button, Popconfirm, Space, TableProps } from "antd";
import { useRouter } from "next/navigation";
import { delayTimeout } from "@/utils/dalay";

import Image from 'next/image'

export interface PostTableType {
  id: number
  title: string
  imageUrl: string
  description: string
}

const ManagePostPage: NextPage = () => {
  const [postData, setPostData] = useState<AllPostsType[]>([]);

  const route = useRouter();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleNaviEdit = (id: number) => {
    route.push(`/admin/posts/${id}`)
  }

  const handleConfirmPopup = async (postId: number) => {
    setConfirmLoading(true)

    if(postData) {
      const updateDataSource = postData.filter((data: PostTableType) => data.id !== postId)

      await delayTimeout(1000)

      localStorage.setItem('posts', JSON.stringify(updateDataSource))
        setConfirmLoading(false)
        window.location.reload()

    }
  }

  useEffect(() => {
    const loadPost = () => {
      const posts = LocalStorage().getPost();
      setPostData(posts);
    };

    loadPost();
  }, []);

  const columns: TableProps<PostTableType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Image Url',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (_, record) => (
        <Image src={record.imageUrl} height={100} width={100} alt='user image'/>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={()=> handleNaviEdit(record.id)}>Edit</Button>
          <Popconfirm
            title='You want to delete this post?'
            okButtonProps={{ loading: confirmLoading }}
            onConfirm={()=> handleConfirmPopup(record.id)}
          >
            <Button 
              danger 
              type='primary'
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <section>
      <h1 className="text-3xl mb-5">Manage Posts</h1>
      <DataTable columns={columns} dataSource={postData} />
    </section>
  );
};

export default ManagePostPage;
