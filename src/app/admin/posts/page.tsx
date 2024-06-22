'use client'

import { AllPostsType } from '@/app/welcome/page'
import React, { useEffect, useState } from 'react'
import PostTable from '../components/PostTable'

const ManagePostPage = () => {

  const [postData, setPostData] = useState<AllPostsType[]>([])

  useEffect(()=> {
    const getPosts = localStorage.getItem('posts')
    const posts = getPosts ? JSON.parse(getPosts) : null

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
