import { Auth } from '../components/Auth'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '../hooks/useQueryPosts'
import { fetchPostById } from '../hooks/useQueryPostById'
import { Post } from '../types/types'
import { QueryClient, useQueryClient } from 'react-query'

export default function Home() {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post[]>('posts')

  return (
    <Layout title="Home">
      <p className="mb-5 text-blue-500 text-xl">Post</p>
      {data?.map((post) => (
        <p className="font-bold" key={post.id}>
          <Link href={'/post/' + post.id}>{post.title}</Link>/
          <Link href={'/user/' + post.user.id}>
            {post.user.name ? post.user.name : ''}
          </Link>
        </p>
      ))}
      {/* <Auth /> */}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', fetchPosts)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}
