import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { User } from '../types/types'
import { GET_USERS } from '../queries/queries'

interface UsersRes {
  users: User[]
}
export const fetchUsers = async () => {
  const { users: data } = await request<UsersRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_USERS
  )
  return data
}
export const useQueryUsers = () => {
  return useQuery<User[], Error>({
    queryKey: 'users',
    queryFn: fetchUsers,
    staleTime: Infinity,
  })
}
