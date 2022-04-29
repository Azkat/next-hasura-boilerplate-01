import { useEffect } from 'react'
import { request, GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import { User } from '../types/types'
import { GET_USERBY_ID_PK } from '../queries/queries'
import Cookie from 'universal-cookie'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

interface UserByIdRes {
  users_by_pk: User
}

export const fetchUserById = async (id) => {
  const { users_by_pk: data } = await request<UserByIdRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_USERBY_ID_PK,
    { id: id }
  )
  return data
}

export const useQueryUserById = (user_id) => {
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])
  return useQuery<User, Error>({
    queryKey: ['user_by_id', user_id],
    queryFn: () => fetchUserById(user_id),
    staleTime: 0,
  })
}
