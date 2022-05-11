import { useEffect } from 'react'
import { request, GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import { User } from '../types/types'
import { GET_USER_BY_FIREBASEID } from '../queries/queries'
import Cookie from 'universal-cookie'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

interface UserByIdRes {
  users: User
}

export const useQueryUserByFirebaseId = () => {
  const fetchUserByFirebaseId = async (firebase_id) => {
    const { users: data } = await request<UserByIdRes>(
      process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
      GET_USER_BY_FIREBASEID,
      { firebase_id: firebase_id }
    )
    return data
  }

  const getUserByFirebaseId = (firebase_id) => {
    return useQuery<User, Error>({
      queryKey: ['user_by_firebase_id', firebase_id],
      queryFn: () => fetchUserByFirebaseId(firebase_id),
      staleTime: 0,
    })
  }

  return {
    getUserByFirebaseId,
  }
}
