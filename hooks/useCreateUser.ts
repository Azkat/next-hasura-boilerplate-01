import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { CREATE_USER } from '../queries/queries'
import { CreateUser } from '../types/types'
import { useAppMutate } from '../hooks/useAppMutate'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useCreateUser = () => {
  const { updateUserName } = useAppMutate()

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])

  const createUserMutation = useMutation(
    (createUser: CreateUser) => graphQLClient.request(CREATE_USER, createUser),
    {
      onSuccess: (res) => {
        /* 
        console.log(res)
        const user_id = res.insert_users_one.id
        const user_name = user_id.substr(0, 8)
        updateUserName.mutate({
          id: user_id,
          name: user_name,
        }) */
      },
      onError: () => {},
    }
  )

  return {
    createUserMutation,
  }
}
