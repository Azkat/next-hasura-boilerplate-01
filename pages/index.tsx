import { useContext, useCallback, useState, useEffect } from 'react'
import { AuthContext } from '../lib/authProvider'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts, fetchFirstPosts } from '../hooks/useQueryPosts'
import { Post } from '../types/types'
import { QueryClient, useQueryClient } from 'react-query'
import Cookies from 'universal-cookie'
import PostList from '../components/PostList'

export default function Home(props) {
  const cookie = new Cookies()
  const queryClient = useQueryClient()
  const postsData = queryClient.getQueryData<Post[]>('posts')
  const { currentUser } = useContext(AuthContext)

  return (
    <Layout title="Home">
      <PostList postsData={postsData} currentUser={currentUser} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', fetchFirstPosts)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}
