import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post } from '../types/types'
import { GET_POSTS } from '../queries/queries'

interface PostRes {
  posts: Post[]
}
export const fetchPosts = async () => {
  const { posts: data } = await request<PostRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_POSTS
  )

  return data
}
export const useQueryPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: fetchPosts,
    staleTime: 10,
  })
}
