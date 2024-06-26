'use client'

import { AllPostsType } from '@/app/welcome/page'
import React, { useEffect, useState } from 'react'
import PostTable from '@/components/admin/PostTable'
import { NextPage } from 'next'

import { getPosts } from '@/utils/getData'

const ManagePostPage: NextPage = () => {

  const [postData, setPostData] = useState<AllPostsType[]>([])

  useEffect(()=> {
    const posts = getPosts()
    setPostData(posts)
  }, []) 

  return (
    <div>
      <h1 className='text-3xl mb-5'>Manage Posts</h1>
      <PostTable dataSource={postData}/>
    </div>
  )
}

export default ManagePostPage
