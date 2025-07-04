import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post, UserLikes, UserLikesShow } from '../types/types'
import {
  GET_POSTS,
  GET_USER_LIKES,
  GET_FIRST_POSTS,
  GET_USER_LIKES_SHOW,
  GET_ALL_POSTS,
} from '../queries/queries'
import { graphQLClient } from '../lib/graphql-client'

interface PostRes {
  posts: Post[]
}

interface LikesRes {
  likes: UserLikes[]
}

interface LikesShowRes {
  likes: UserLikesShow[]
}

export const fetchPosts = async () => {
  const { posts: data } = await graphQLClient.request(GET_POSTS)
  return data
}

export const fetchFirstPosts = async () => {
  const { posts: data } = await graphQLClient.request(GET_FIRST_POSTS)
  return data
}

export const fetchAllPosts = async () => {
  const { posts: data } = await graphQLClient.request(GET_ALL_POSTS)
  return data
}

export const useQueryPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: fetchPosts,
    staleTime: 3000,
  })
}

export const fetchUserLikes = async (user_id) => {
  const { likes: likesData } = await graphQLClient.request(GET_USER_LIKES, {
    user_id: user_id,
  })
  return likesData
}

export const useQueryUserLikes = (user_id) => {
  return useQuery<UserLikes[], Error>({
    queryKey: 'likes',
    queryFn: () => fetchUserLikes(user_id),
    staleTime: 3000,
  })
}

export const fetchUserLikesShow = async (user_id) => {
  const { likes: likesData } = await graphQLClient.request(
    GET_USER_LIKES_SHOW,
    {
      user_id: user_id,
    }
  )
  return likesData
}

export const useQueryUserLikesShow = (user_id) => {
  return useQuery<UserLikesShow[], Error>({
    queryKey: 'likesShow',
    queryFn: () => fetchUserLikesShow(user_id),
    staleTime: 3000,
  })
}
