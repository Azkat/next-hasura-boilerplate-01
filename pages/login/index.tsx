import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { Auth } from '../../components/Auth'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import { useRouter } from 'next/router'
import { useUser } from '../../hooks/useUser'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')
  const router = useRouter()
  const { uid } = useUser()
  uid ? router.push('/account') : ''

  return (
    <Layout title="Login">
      <>
        <Auth></Auth>
      </>
    </Layout>
  )
}
