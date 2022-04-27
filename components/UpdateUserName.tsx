import React, { useState, useEffect } from 'react'
import { useAppMutate } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedNews, selectNews } from '../slices/uiSlice'
import { QueryClient, useQueryClient } from 'react-query'
import { fetchUserById } from '../hooks/useQueryUsers'
import { User } from '../types/types'
import Cookie from 'universal-cookie'

export default function UpdateUserName() {
  const cookie = new Cookie()
  const queryClient = useQueryClient()
  /* await queryClient.prefetchQuery('user_by_id', () =>
    fetchUserById(cookie.get('user_id'))
  ) */
  /* const data = queryClient.prefetchQuery<User>('user_by_id', () =>
    fetchUserById(cookie.get('user_id'))
  ) */
  const { updateUserNameMutation } = useAppMutate()

  /* const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNews.id === '') {
      updateUserNameMutation.mutate(editedNews.content)
    } else {
      updateNewsMutation.mutate(editedNews)
    }
  } */

  return (
    <div className="mt-14 mb-8">
      <h3>Your user name </h3>
      {/* <form onSubmit={updateUserNameMutation}>
        <input
          type="text"
          className="my-3 px-3 py-1 border border-gray-300"
          value={email}
          onChange={emailChange}
        />
        <button
          disabled={!email}
          type="submit"
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
        >
          update
        </button>
      </form> */}
    </div>
  )
}
