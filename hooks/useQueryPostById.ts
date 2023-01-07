import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post } from '../types/types'
import { GET_POST_BY_ID_PK } from '../queries/queries'

interface PostRes {
  posts_by_pk: Post[]
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
