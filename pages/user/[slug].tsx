import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { fetchUserById } from '../../hooks/useQueryUserById'
import { QueryClient, useQueryClient } from 'react-query'
import { User } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User>('user')

  return (
    <Layout title={data.name}>
      <>
        <h1>{data.name}</h1>
        {data.posts?.map((post) => (
          <Link href={'/post/' + post.id}>{post.title}</Link>
        ))}
      </>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const user_id = await context.params.slug
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('user', () => fetchUserById(user_id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
