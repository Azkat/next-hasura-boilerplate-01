import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { CREATE_POST } from '../queries/queries'
import { CreatePost } from '../types/types'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { useEffect } from 'react'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useCreatePost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const createPostMutation = useMutation(
    (createPost: CreatePost) => graphQLClient.request(CREATE_POST, createPost),
    {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: () => {},
    }
  )

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])

  const titleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])
  const descriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }, [])
  const resetInput = useCallback(() => {
    setTitle('')
    setDescription('')
  }, [])

  const createPost = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const param = {
        title: title,
        description: description,
        user_id: cookie.get('user_id'),
      }
      createPostMutation.mutate(param)
    },
    [title, description]
  )

  return {
    title,
    description,
    titleChange,
    descriptionChange,
    resetInput,
    createPost,
  }
}
