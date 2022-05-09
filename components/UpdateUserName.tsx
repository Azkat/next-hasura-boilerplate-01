import React, { useState, useEffect } from 'react'
import { useAppMutate } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import {} from '../slices/uiSlice'
import { QueryClient, useQueryClient } from 'react-query'
import { useUpdateUserName } from '../hooks/useUpdateUserName'
import { User } from '../types/types'
import Cookie from 'universal-cookie'

export default function UpdateUserName(props, status) {
  const cookie = new Cookie()
  const queryClient = useQueryClient()
  const { updateUserNameMutation } = useAppMutate()
  const { userName, userNameChange, setUserName, updateUserName } =
    useUpdateUserName()

  useEffect(() => {
    if (props.data != undefined) {
      setUserName(props.data.name)
    }
  }, [props.data])

  return (
    <div className="mt-14 mb-8">
      <h3>Username</h3>
      {props.status == 'loading' ? <h3>Loading...</h3> : ''}
      {props.status == 'success' && props.data.name ? (
        <form onSubmit={updateUserName}>
          <input
            type="text"
            placeholder="username"
            className="my-3 px-3 py-1 border border-gray-300"
            value={userName}
            onChange={userNameChange}
          />
          <button
            disabled={!userName}
            type="submit"
            className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
          >
            update
          </button>
        </form>
      ) : (
        ''
      )}
    </div>
  )
}
