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
import Modal from 'react-modal'
import { useRouter } from 'next/router'

const modalStyles = {
  content: {
    background: '#000',
  },
  overlay: {
    background: 'none',
  },
}

export default function Home(props) {
  const cookie = new Cookies()
  const queryClient = useQueryClient()
  const postsData = queryClient.getQueryData<Post[]>('posts')
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  const Post = ({ id, pathname }) => {
    return (
      <div className="w-80 background-black">
        I am the post {id}; my pathname is: {pathname}
      </div>
    )
  }

  return (
    <Layout title="Home">
      <Modal
        isOpen={!!router.query.modalId}
        onRequestClose={() => router.push('/', undefined, { scroll: false })}
        contentLabel="Post modal"
        style={modalStyles}
      >
        <Post id={router.query.modalId} pathname={router.pathname} />
      </Modal>
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
