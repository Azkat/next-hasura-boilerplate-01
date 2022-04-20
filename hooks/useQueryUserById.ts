import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { User } from '../types/types'
import { GET_USER_BY_ID } from '../queries/queries'

interface UserRes {
  user: User[]
}
export const fetchUserById = async (user_id) => {
  const { user: data } = await request<UserRes>({
    url: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    document: GET_USER_BY_ID,
    variables: { id: user_id },
  })
  console.log(data)
  return data
}
export const useQueryUsers = (user_id) => {
  return useQuery<User[], Error>({
    queryKey: ['user', user_id],
    queryFn: () => fetchUserById(user_id),
    staleTime: Infinity,
  })
}
