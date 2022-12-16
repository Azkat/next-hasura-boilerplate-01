import React, { useEffect, useState, memo, FormEvent, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setEditedPost,
  resetEditedPost,
  selectPost,
} from '../../slices/uiSlice'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useAppMutate } from '../../hooks/useAppMutate'
import { AccountPostListMemo } from '../../components/AccountPostList'
import { AuthContext } from '../../lib/authProvider'

export default function Posts(props) {
  const dispatch = useDispatch()
  const editedPost = useSelector(selectPost)
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const { updatePostMutation } = useAppMutate()
  const {
    title,
    description,
    titleChange,
    descriptionChange,
    resetInput,
    createPost,
  } = useCreatePost()

  const { currentUser } = useContext(AuthContext)
  !currentUser ? router.push('/login') : ''

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(editedPost.title)
    dispatch(resetEditedPost())
    console.log(editedPost)
    updatePostMutation.mutate(editedPost)
  }

  return (
    <Layout title="Create new post">
      <h1>my posts</h1>
      <AccountPostListMemo />
    </Layout>
  )
}
