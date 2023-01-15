import React, { Component, useEffect, useState, useContext } from 'react'
import { Layout } from '../../components/Layout'
import { Auth } from '../../components/Auth'
import { AuthGoogle } from '../../components/AuthGoogle'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import { useRouter } from 'next/router'
import { useUser } from '../../hooks/useUser'
import firebase from '../../firebaseConfig'
import { Store } from '../../reducer/reducer'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsUser(true)
        dispatch({
          type: 'setAlert',
          payload: { text: 'Login succeeded', type: 'success' },
        })
        router.replace('/')
      } else {
        return
      }
    })
    return () => {
      unSubUser()
    }
  }, [isUser])

  if (!isUser) {
    return (
      <Layout title="Login">
        <div className="px-4 mb-32">
          <>
            <Auth></Auth>
            <AuthGoogle></AuthGoogle>
          </>
        </div>
      </Layout>
    )
  } else {
    return <></>
  }
}
