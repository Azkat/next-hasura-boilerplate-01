import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { Auth } from '../../components/Auth'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import Link from 'next/link'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')

  return (
    <Layout title="Login">
      <>
        <Auth></Auth>
      </>
    </Layout>
  )
}
