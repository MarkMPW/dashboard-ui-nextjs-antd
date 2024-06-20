'use client'

import { AllPostsType } from '@/app/welcome/page'
import React, { useEffect, useState } from 'react'

const EditPage = ({ params }: { params: { id: number } }) => {
  const [post, setPost] = useState<AllPostsType | null>(null)

  useEffect(() => {
    const getEditPost = localStorage.getItem('posts')

    const posts = getEditPost ? JSON.parse(getEditPost) : []

    const editPost = posts.find((post: AllPostsType) => post.id === Number(params.id))

    if(editPost) {
      setPost(editPost)
    }
    
  }, [])


  return (
    <div>EditPage</div>
  )
}

export default EditPage