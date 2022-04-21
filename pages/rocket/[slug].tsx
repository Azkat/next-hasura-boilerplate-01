import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { fetchRocketById } from '../../hooks/useQueryRocket'
import { QueryClient, useQueryClient } from 'react-query'
import { Rocket } from '../../types/types'
import { dehydrate } from 'react-query/hydration'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Rocket[]>('rocket')

  return <Layout title="Rocket">rocket</Layout>
}
export async function getServerSideProps(context) {
  const id = await context.params.slug
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('rocket', () => fetchRocketById(id))

  return {
    props: {
      user_id: id,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
