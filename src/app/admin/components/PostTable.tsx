"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Table, TableProps, Button, Space, Popconfirm } from "antd";
import Image from "next/image";

interface PostTableType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

interface PostTableProps {
  dataSource: PostTableType[];
}

const PostTable: React.FC<PostTableProps> = ({ dataSource }) => {
  const route = useRouter();

  const [open, setOpen] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = (id: number) => {
    setOpen(id);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(null);
  };

  const handleNaviEdit = (id: number) => {
    route.push(`/admin/posts/${id}`);
  };

  const handleOk = (postId: number) => {
    setConfirmLoading(true);

    if (dataSource) {
      const updateDataSource = dataSource.filter(
        (data: PostTableType) => data.id !== postId
      );

      setTimeout(() => {
        localStorage.setItem("posts", JSON.stringify(updateDataSource));
        setOpen(null);
        setConfirmLoading(false);
        window.location.reload();
      }, 2000);
    }
  };

  const columns: TableProps<PostTableType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image Url",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (_, record) => (
        <Image
          src={record.imageUrl}
          height={100}
          width={100}
          alt="user image"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleNaviEdit(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title="You want to delete this post?"
            onCancel={handleCancel}
            open={open === record?.id}
            okButtonProps={{ loading: confirmLoading }}
            onConfirm={() => handleOk(record.id)}
          >
            <Button
              danger
              type="primary"
              onClick={() => showPopconfirm(record?.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{ defaultPageSize: 5 }}
    />
  );
};

export default PostTable;
