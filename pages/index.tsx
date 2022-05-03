import { Auth } from '../components/Auth'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '../hooks/useQueryPosts'
import { fetchPostById } from '../hooks/useQueryPostById'
import { useAppMutate } from '../hooks/useAppMutate'
import { Post, CreateLike } from '../types/types'
import { QueryClient, useQueryClient } from 'react-query'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'

export default function Home() {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post[]>('posts')
  const { createLikeMutation } = useAppMutate()

  return (
    <Layout title="Home">
      <p className="mb-5 text-blue-500 text-xl">Post</p>
      {data?.map((post) => (
        <p className="font-bold my-3" key={post.id}>
          <Link href={'/post/' + post.id}>{post.title}</Link> /
          <Link href={'/user/' + post.user.id}>{post.user.name}</Link>
          <span className="flex float-right ml-4">
            <HeartIconOutline
              className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
              onClick={() => {
                const param = {
                  user_id: '0a69d2c7-5d52-430c-8968-d2153c3fce9e',
                  post_id: post.id,
                }
                createLikeMutation.mutate(param)
              }}
            />
          </span>
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
