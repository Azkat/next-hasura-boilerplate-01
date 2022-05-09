import React, { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'

export const DeleteUser = (props) => {
  const cookie = new Cookies()
  const now = new Date()
  const { deleteAccountMutation, deleteUserProfileMutation } = useAppMutate()

  useEffect(() => {}, [])

  const deleteAccountParam = {
    id: cookie.get('user_id'),
  }

  const deleteFirebase = (uid) => {
    console.log('deleteFirebase発火 :' + Date.now())
  }

  const deleteUserProfile = (profile_id) => {
    console.log(
      'deleteUserProfile発火 :' + Date.now() + ' profile_idは' + profile_id
    )
    const deleteUserProfileParam = {
      id: profile_id,
    }
    deleteUserProfileMutation.mutate(deleteUserProfileParam, {
      onError: (res) => {
        console.log(res)
      },
      onSuccess: (res) => {
        console.log('deleteUserProfile成功 :' + Date.now())
      },
    })
  }

  const deleteAccount = () => {
    console.log('deleteAccount発火 :' + Date.now())
    deleteAccountMutation.mutate(deleteAccountParam, {
      onError: (res) => {
        console.log(res)
      },
      onSuccess: (res) => {
        console.log('deleteAccount成功 :' + Date.now())
        cookie.remove('token')
        cookie.remove('user_id')
        cookie.remove('token_expire')
        //deleteUserProfile(res.delete_users_by_pk.profile_id)
      },
    })
  }

  return (
    <div
      className="flex float-right ml-4 cursor-pointer text-red-700 mt-24"
      onClick={async () => {
        deleteAccount()
        deleteFirebase('uid')
      }}
    >
      Delete Account (All your data completely remove)
    </div>
  )
}
