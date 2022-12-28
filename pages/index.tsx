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
import { useRouter } from 'next/router'
import { useWindowSize } from '../hooks/useWindowSize'
import ModalBase from '../components/ModalBase'

const modalStyles = {
  content: {
    backgroundColor: 'rgba(30, 30, 30, 1)',
    border: 'none',
    inset: '110px 80px',
    padding: '0px',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
}

const modalStylesMobile = {
  content: {
    backgroundColor: 'rgba(30, 30, 30, 1)',
    border: 'none',
    inset: '0px 0px',
    padding: '0px',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
}

export default function Home(props) {
  const cookie = new Cookies()
  const queryClient = useQueryClient()
  const postsData = queryClient.getQueryData<Post[]>('posts')
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const { windowWidth, windowHeight } = useWindowSize()

  return (
    <Layout title="Home">
      <ModalBase aspath="/" />
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
