import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post, UpdatePost } from '../types/types'
import { GET_POST_BY_ID_PK, GET_USER_POSTS } from '../queries/queries'

interface PostRes {
  posts_by_pk: Post[]
}
interface UserPostsRes {
  posts: UpdatePost[]
}

export const fetchPostById = async (id) => {
  const { posts_by_pk: data } = await request<PostRes>({
    url: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    document: GET_POST_BY_ID_PK,
    variables: { id: id },
  })
  return data
}
export const useQueryPostById = (id) => {
  return useQuery<Post[], Error>({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    staleTime: Infinity,
  })
}

export const fetchUserPosts = async (user_id) => {
  const { posts: data } = await request<UserPostsRes>({
    url: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    document: GET_USER_POSTS,
    variables: { user_id: user_id },
  })
  return data
}
export const useQueryUserPosts = (user_id) => {
  return useQuery<UpdatePost[], Error>({
    queryKey: ['userposts'],
    queryFn: () => fetchUserPosts(user_id),
    staleTime: 0,
  })
}
