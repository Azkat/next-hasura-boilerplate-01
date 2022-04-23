import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'

export default function UserList(props) {
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

  /*   useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsUser(true)
      } else {
        router.push('/login')
      }
    })
    return () => {
      unSubUser()
    }
  }, []) */

  return (
    <Layout title="Account">
      <h1>Create new post</h1>
      <form
        onSubmit={createPost}
        className="mt-8 flex justify-center items-center flex-col"
      >
        <label>Title:</label>
        <input
          className="my-3 px-3 py-1 border border-gray-300"
          placeholder="title ?"
          type="text"
          value={title}
          onChange={titleChange}
        />

        <label>Description:</label>
        <input
          className="my-3 px-3 py-1 border border-gray-300"
          placeholder="description ?"
          type="text"
          value={description}
          onChange={descriptionChange}
        />
        <button
          disabled={!title}
          type="submit"
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
        >
          Post
        </button>
      </form>
    </Layout>
  )
}
