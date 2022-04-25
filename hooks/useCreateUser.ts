import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { CREATE_USER, UPDATE_USER_NAME } from '../queries/queries'
import { CreateUser, UpdateUserName } from '../types/types'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useCreateUser = () => {
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])

  const updateUserName = (param) => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
    const user_id = param.insert_users_one.id
    const default_user_name = user_id.substr(0, 8)
    const updateParam = {
      id: user_id,
      name: default_user_name,
    }
    updateUserNameMutation.mutate(updateParam)
  }

  const createUser = (param) => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
    createUserMutation.mutate(param)
  }

  const createUserMutation = useMutation(
    (createUser: CreateUser) => graphQLClient.request(CREATE_USER, createUser),
    {
      onSuccess: (res) => {
        updateUserName(res)
        cookie.set('user_id', res.insert_users_one.id, {
          path: '/',
        })
      },
      onError: () => {},
    }
  )

  const updateUserNameMutation = useMutation(
    (updateParam: UpdateUserName) =>
      graphQLClient.request(UPDATE_USER_NAME, updateParam),
    {
      onSuccess: (res) => {},
      onError: () => {},
    }
  )

  return {
    createUserMutation,
    createUser,
  }
}
