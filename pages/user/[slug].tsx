import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { fetchUserById } from '../../hooks/useQueryUserById'
import { QueryClient, useQueryClient } from 'react-query'
import { User } from '../../types/types'
import { dehydrate } from 'react-query/hydration'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User[]>('users')

  console.log(data)

  return <Layout title="User">user</Layout>
}
export async function getServerSideProps(context) {
  const user_id = await context.params.slug
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('user', () => fetchUserById(user_id))

  return {
    props: {
      user_id: user_id,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
