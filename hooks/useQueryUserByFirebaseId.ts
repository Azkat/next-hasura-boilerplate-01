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
  /* useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')]) */

  const fetchUserByFirebaseId = async (firebase_id) => {
    const { users: data } = await request<UserByIdRes>(
      process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
      GET_USER_BY_FIREBASEID,
      { firebase_id: firebase_id }
    )
    return data
  }

  const getUserByFirebaseId = (firebase_id) => {
    /* useEffect(() => {
      graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
      })
    }, [cookie.get('token')]) 
    return useQuery<User, Error>({
      queryKey: ['user_by_firebase_id', firebase_id],
      queryFn: () => fetchUserByFirebaseId(firebase_id),
      staleTime: 0,
    })
    */
  }

  return {
    getUserByFirebaseId,
  }
}

/* export const fetchUserByFirebaseId = async (id) => {
  const { users: data } = await request<UserByIdRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_USER_BY_FIREBASEID,
    { id: id }
  )
  return data
}

export const useQueryUserByFirebaseId = (firebase_id) => {
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])
  return useQuery<User, Error>({
    queryKey: ['user_by_firebase_id', firebase_id],
    queryFn: () => fetchUserByFirebaseId(firebase_id),
    staleTime: 0,
  })
} */
