import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { User, CreateUser } from '../types/types'
import { GET_USERS, GET_USERBY_ID_PK, CREATE_USER } from '../queries/queries'

interface UsersRes {
  users: User[]
}
interface UserByIdRes {
  users_by_pk: User
}
interface CreateUserRes {
  insert_users_one: CreateUser
}

const useQueryUsers = () => {
  return useQuery<User[], Error>({
    queryKey: 'users',
    queryFn: fetchUsers,
    staleTime: Infinity,
  })
}
const useQueryUserById = (user_id) => {
  return useQuery<User, Error>({
    queryKey: ['user_by_id', user_id],
    queryFn: () => fetchUserById(user_id),
    staleTime: Infinity,
  })
}
const useQueryCreateUser = () => {
  return useQuery<CreateUser, Error>({
    queryKey: 'createUser',
    queryFn: createUser,
    staleTime: Infinity,
  })
}

export const fetchUsers = async () => {
  const { users: data } = await request<UsersRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_USERS
  )
  return data
}
export const fetchUserById = async (id) => {
  const { users_by_pk: data } = await request<UserByIdRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_USERBY_ID_PK,
    { id: id }
  )
  return data
}
export const createUser = async (firebase_id) => {
  const { insert_users_one: data } = await request<CreateUserRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    CREATE_USER,
    { id: firebase_id }
  )
  return data
}
