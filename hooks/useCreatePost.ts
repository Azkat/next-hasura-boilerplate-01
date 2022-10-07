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

export const useCreatePost = () => {
  const [title, setTitle] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')

  const { state, dispatch } = useContext(Store)

  const createPostMutation = useMutation(
    (createPost: CreatePost) => graphQLClient.request(CREATE_POST, createPost),
    {
      onSuccess: (res) => {
        console.log(res.insert_posts_one.id)
        uploadPhoto(res.insert_posts_one.id)
        uploadAudio(res.insert_posts_one.id)
      },
      onError: (res) => {
        console.log(res)
      },
    }
  )

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

  const uploadAudio = async (id) => {
    const file = state.audioFile
    console.log(file)
    const extention = file.name.split('.')[1]
    axios
      .get('/api/upload-url', {
        params: {
          filename: id + '.' + extention,
          filetype: file.type,
        },
      })
      .then((res) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        }
        return axios.put(res.data.url, file, options)
      })
      .then((res) => {})
  }

  const titleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  const audioUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.target.value)
  }, [])

  const imageUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }, [])

  const descriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value)
    },
    []
  )

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
        audio_url: audioUrl,
        image_url: audioUrl,
        user_id: cookie.get('user_id'),
      }
      createPostMutation.mutate(param)
    },
    [title, description]
  )

  return {
    title,
    audioUrl,
    imageUrl,
    description,
    titleChange,
    audioUrlChange,
    imageUrlChange,
    descriptionChange,
    resetInput,
    createPost,
  }
}
