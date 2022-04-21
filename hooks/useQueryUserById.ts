import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { User } from '../types/types'
import {
  GET_USERS,
  GET_USERBY_ID,
  GET_POSTS,
  GET_USERBY_ID_PK,
} from '../queries/queries'

interface UserRes {
  users_by_pk: User
}
export const fetchUserById = async (id) => {
  const { users_by_pk: data } = await request<UserRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_USERBY_ID_PK,
    { id: id }
  )
  return data
}
export const useQueryUsers = (user_id) => {
  return useQuery<User, Error>({
    queryKey: ['user', user_id],
    queryFn: () => fetchUserById(user_id),
    staleTime: Infinity,
  })
}
