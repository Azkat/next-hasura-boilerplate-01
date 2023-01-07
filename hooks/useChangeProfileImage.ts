import {
  useState,
  useCallback,
  useContext,
  ChangeEvent,
  FormEvent,
} from 'react'
import { Store } from '../reducer/reducer'
import { CREATE_POST } from '../queries/queries'
import { CreatePost } from '../types/types'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { useEffect } from 'react'
import axios from 'axios'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useChangeProfileImage = () => {
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])

  const uploadPhoto = async (id) => {
    const dataURL = state.imageFile
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        return axios
          .get('/api/upload-url', {
            params: {
              filename: id + '.jpg',
              filetype: 'image/jpeg',
              width: state.canvasWidth,
              prefix: 'user_icon',
            },
          })
          .then((res) => {
            const options = {
              headers: {
                'Content-Type': 'image/jpeg',
              },
            }
            return axios.put(res.data.url, blob, options)
          })
          .then((res) => {})
      })
  }

  return {
    uploadPhoto,
  }
}
