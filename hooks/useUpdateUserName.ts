import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { request, GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { useAppMutate } from './useAppMutate'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useUpdateUserName = () => {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const { updateUserNameMutation } = useAppMutate()

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])

  useEffect(() => {
    setUserId(cookie.get('user_id'))
  }, [cookie.get('user_id')])

  const userNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }, [])

  const updateUserName = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const param = {
        id: userId,
        name: userName,
      }
      updateUserNameMutation.mutate(param)
    },
    [userName]
  )

  return {
    userNameChange,
    setUserName,
    userName,
    updateUserName,
  }
}
