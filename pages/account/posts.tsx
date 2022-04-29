import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'

export default function posts(props) {
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const {
    title,
    description,
    titleChange,
    descriptionChange,
    resetInput,
    createPost,
  } = useCreatePost()

  return (
    <Layout title="Create new post">
      <h1>my posts</h1>
    </Layout>
  )
}
