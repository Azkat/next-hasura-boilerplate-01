import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post, UserLikes } from '../types/types'
import { GET_POSTS, GET_USER_LIKES } from '../queries/queries'

interface PostRes {
  posts: Post[]
}

interface LikesRes {
  user_likes: UserLikes[]
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

export const fetchUserLikes = async (user_id) => {
  const { user_likes: likesData } = await request<LikesRes>({
    url: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    document: GET_USER_LIKES,
    variables: { user_id: user_id },
  })
  return likesData
}
export const useQueryUserLikes = (user_id) => {
  return useQuery<UserLikes[], Error>({
    queryKey: 'likes',
    queryFn: () => fetchUserLikes(user_id),
    staleTime: 10,
  })
}
