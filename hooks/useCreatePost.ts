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
  const [videoData, setVideoData] = useState({})
  const [visualFormat, setVisualFormat] = useState('')

  const { state, dispatch } = useContext(Store)

  const createPostMutation = useMutation(
    (createPost: CreatePost) => graphQLClient.request(CREATE_POST, createPost),
    {
      onSuccess: (res) => {
        console.log(res.insert_posts_one.id)

        if (visualFormat == 'Image') {
          uploadPhoto(res.insert_posts_one.id)
        } else if (visualFormat == 'Video') {
          uploadVideo(res.insert_posts_one.id)
        }

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
              prefix: 'post_image',
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
          .then((res) => {
            console.log(res)
            dispatch({ type: 'setImageFile', payload: '' })
          })
      })
  }

  const uploadVideo = async (id) => {
    const file = state.videoFile
    const extention = file.name.split('.').pop()
    axios
      .get('/api/upload-url', {
        params: {
          filename: id + '.' + extention,
          filetype: file.type,
          prefix: 'post_video',
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
      .then((res) => {
        console.log(res)
      })
  }

  const uploadAudio = async (id) => {
    const file = state.audioFile
    const extention = file.name.split('.').pop()
    axios
      .get('/api/upload-url', {
        params: {
          filename: id + '.' + extention,
          filetype: file.type,
          prefix: 'audio',
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
      .then((res) => {
        console.log(res)
      })
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

  const videoDataChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setVideoData(files[0])
    }
  }, [])

  const visualFormatChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setVisualFormat(e.target.value)
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

  const createPost = useCallback(async () => {
    //e.preventDefault()
    console.log('createpost')
    const param = {
      title: title,
      description: description,
      audio_url: audioUrl,
      image_url: imageUrl,
      user_id: cookie.get('user_id'),
    }
    createPostMutation.mutate(param)
  }, [title, description, audioUrl, imageUrl])

  return {
    title,
    audioUrl,
    imageUrl,
    description,
    videoData,
    visualFormat,
    titleChange,
    audioUrlChange,
    imageUrlChange,
    descriptionChange,
    resetInput,
    videoDataChange,
    visualFormatChange,
    createPost,
  }
}
