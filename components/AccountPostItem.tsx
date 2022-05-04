import React, { memo, FormEvent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedPost, resetEditedPost, selectPost } from '../slices/uiSlice'
import { useRouter } from 'next/router'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useAppMutate } from '../hooks/useAppMutate'

const AccountPostItem = ({ post }) => {
  const dispatch = useDispatch()
  const editedPost = useSelector(selectPost)
  const router = useRouter()
  const { updatePostMutation } = useAppMutate()
  const { deletePostMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(editedPost.title)
    updatePostMutation.mutate(editedPost)
  }
  if (updatePostMutation.error) {
    return <p>Error</p>
  }
  return (
    <li className="my-3">
      {editedPost.id == post.id ? (
        <form onSubmit={submitHandler}>
          <input
            className="mb-3 px-3 py-2 border border-gray-300"
            placeholder="new post ?"
            type="text"
            value={editedPost.title}
            onChange={(e) =>
              dispatch(setEditedPost({ ...editedPost, title: e.target.value }))
            }
          />
          <button
            className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
            disabled={!editedPost.title}
          >
            Update
          </button>
        </form>
      ) : (
        <span className="font-bold">{post.title}</span>
      )}

      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedPost({
                id: post.id,
                title: post.title,
                description: post.description,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            deletePostMutation.mutate(post.id)
          }}
        />
      </div>
    </li>
  )
}
export const AccountPostItemMemo = memo(AccountPostItem)
