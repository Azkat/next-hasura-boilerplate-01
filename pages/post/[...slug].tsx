import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { fetchPostById } from '../../hooks/useQueryPostById'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')

  return (
    <Layout title={data.title}>
      <>
        <h1>{data.title}</h1>
        {data.title} /{' '}
        <Link href={'/user/' + data.user.id}>
          {data.user.name ? data.user.name : ''}
        </Link>
      </>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const post_id = await context.params.slug[0]
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('post', () => fetchPostById(post_id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
