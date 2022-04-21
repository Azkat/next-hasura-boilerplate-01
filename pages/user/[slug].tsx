import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { fetchUserById } from '../../hooks/useQueryUsers'
import { QueryClient, useQueryClient } from 'react-query'
import { User } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User>('user_by_id')

  return (
    <Layout title={data.name}>
      <>
        <h1>{data.name}</h1>
        {data.posts?.map((post) => (
          <Link href={'/post/' + post.id} key={post.id}>
            {post.title}
          </Link>
        ))}
      </>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const user_id = await context.params.slug
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('user_by_id', () => fetchUserById(user_id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
