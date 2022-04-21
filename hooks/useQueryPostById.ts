import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post } from '../types/types'
import { GET_POST_BY_ID } from '../queries/queries'

interface PostRes {
  post: Post[]
}
export const fetchPostById = async (id) => {
  const { post: data } = await request<PostRes>({
    url: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    document: GET_POST_BY_ID,
    variables: { id: id },
  })
  console.log(data)
  return data
}
export const useQueryPostById = (id) => {
  return useQuery<Post[], Error>({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    staleTime: Infinity,
  })
}
