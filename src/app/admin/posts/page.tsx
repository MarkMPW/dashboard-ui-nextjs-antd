'use client'

import { AllPostsType } from '@/app/welcome/page'
import React, { useEffect, useState } from 'react'
import PostTable from '@/components/admin/PostTable'
import { NextPage } from 'next'

import { LocalStorage } from '@/utils/getData'

const ManagePostPage: NextPage = () => {

  const [postData, setPostData] = useState<AllPostsType[]>([])

  useEffect(()=> {
    const loadPost = () => {
      const posts = LocalStorage().getPost()
      setPostData(posts)
    }

    loadPost()
  }, []) 

  return (
    <section>
      <h1 className='text-3xl mb-5'>Manage Posts</h1>
      <PostTable dataSource={postData}/>
    </section>
  )
}

export default ManagePostPage
