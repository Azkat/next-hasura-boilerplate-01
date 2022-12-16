import React, { useEffect, useState, useContext } from 'react'
import { Store } from '../../reducer/reducer'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'
import { CropImage } from '../../components/imageCrop/CropImage'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { AuthContext } from '../../lib/authProvider'

interface IFormInput {
  title: string
}

export default function Create_post(props) {
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const [isAudioFile, setIsAudioFile] = useState(false)
  const { state, dispatch } = useContext(Store)
  const {
    title,
    audioUrl,
    imageUrl,
    description,
    titleChange,
    imageUrlChange,
    audioUrlChange,
    descriptionChange,
    resetInput,
    createPost,
  } = useCreatePost()

  const { currentUser } = useContext(AuthContext)
  !currentUser ? router.push('/login') : ''

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createPost()
  }

  const titleRules = {
    required: 'Required',
    maxLength: { value: 40, message: `Up to 40 characters` },
  }

  const fileRules = {
    required: 'Select your file',
  }

  /*   useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsUser(true)
      } else {
        router.push('/login')
      }
    })
    return () => {
      unSubUser()
    }
  }, []) */

  const uploadAudio = async (e, file) => {
    axios
      .get('/api/upload-url', {
        params: {
          filename: file.name,
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

  const checkAudioFile = async (e) => {
    const file = e.target.files
    if (file[0].size > 1500000) {
      //1.5MB以下しかダメ
      const audiofile = document.getElementById(
        'audiofile'
      ) as HTMLInputElement | null
      alert('Too big file. Upload under 1.5MB audio file.')
      audiofile.value = ''
    } else {
      dispatch({ type: 'setAudioFile', payload: file[0] })
      setIsAudioFile(true)
    }
  }

  return (
    <Layout title="Create new post">
      <div className="px-4 mb-32">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <h2 className="header-h2">Create New Post</h2>

          <div className="card w-full bg-backgroundGray shadow-xl mt-8">
            <div className="card-body">
              <h2 id="audio_heading" className="card-title mb-6">
                Audio
              </h2>
              <input
                title="audiofile"
                id="audiofile"
                className="text-sm text-grey-500 file:cursor-pointer
          file:mr-5 file:py-2 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-medium
          file:bg-gray-300 file:text-secondary"
                type="file"
                accept="audio/m4a, audio/mp3, audio/wav, audio/aac"
                onChange={checkAudioFile}
              />
              <div className="form-control w-full  mt-6">
                <label className="label">
                  <span className="label-text">Audio URL (Optional)</span>
                </label>
                <input
                  className="text-input-1"
                  placeholder="Spotify, Soundcloud, Youtube..."
                  type="text"
                  value={audioUrl}
                  onChange={audioUrlChange}
                />
              </div>

              <div className="divider "></div>

              <h2 className="card-title mb-6">Image</h2>

              <CropImage />

              <div className="form-control w-full  mt-6">
                <label className="label">
                  <span className="label-text">Image URL (Optional)</span>
                </label>
                <input
                  className="text-input-1"
                  placeholder="Tumblr, Instagram, Flickr..."
                  type="text"
                  value={imageUrl}
                  onChange={imageUrlChange}
                />
              </div>

              <div className="divider "></div>

              <h2 className="card-title mb-6">Title / Description</h2>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  className="text-input-1"
                  {...register('title', titleRules)}
                  placeholder="title ?"
                  type="text"
                  value={title}
                  onChange={titleChange}
                />
                <div className="text-red-500">
                  {errors.title && errors.title.message}
                </div>
              </div>

              <div className="form-control  w-full mt-6">
                <label className="label">
                  <span className="label-text">Description (Optional)</span>
                </label>
                <textarea
                  className="textarea-1"
                  placeholder="description ?"
                  value={description}
                  onChange={descriptionChange}
                />
              </div>

              <div className="mt-20">
                <input
                  disabled={!title || !state.canvasWidth || !isAudioFile}
                  className="btn btn-primary disabled:bg-gray-600"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}
