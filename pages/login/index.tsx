import React, { Component, useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Auth } from '../../components/Auth'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import { useRouter } from 'next/router'
import { useUser } from '../../hooks/useUser'
import firebase from '../../firebaseConfig'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsUser(true)
        router.push('/account')
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
        <>
          <Auth></Auth>
        </>
      </Layout>
    )
  } else {
    return <></>
  }
}
