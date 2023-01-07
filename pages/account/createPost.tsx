import React, { useEffect, useState, useContext, useRef } from 'react'
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
  imageUrl: string
  audioUrl: string
  description: string
}

export default function CreatePost(props) {
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const [isAudioFile, setIsAudioFile] = useState(false)
  const [isVideoFile, setIsVideoFile] = useState(false)
  const [selected, setSelected] = useState('')

  const { state, dispatch } = useContext(Store)
  const {
    title,
    audioUrl,
    imageUrl,
    description,
    videoData,
    visualFormat,
    doneCreatePost,
    titleChange,
    imageUrlChange,
    audioUrlChange,
    descriptionChange,
    resetInput,
    videoDataChange,
    visualFormatChange,
    createPost,
  } = useCreatePost()

  const videoRef = useRef(null)

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
    maxLength: { value: 200, message: `Up to 200 characters` },
  }

  const fileRules = {
    required: 'Select your file',
  }

  const audioUrlRules = {
    pattern: {
      value: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
      message: 'Input URL',
    },
  }

  const imageUrlRules = {
    pattern: {
      value: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
      message: 'Input URL',
    },
  }

  const descriptionRules = {
    maxLength: { value: 1000, message: `Up to 1000 characters` },
  }

  /*** when done create, redirect to account page ***/
  useEffect(() => {
    if (doneCreatePost) {
      router.push('/account')
    }
  }, [doneCreatePost])

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

  const checkVideoFile = async (e) => {
    const file = e.target.files
    if (file[0].size > 20000000) {
      //20MB以下しかダメ
      const videofile = document.getElementById(
        'videofile'
      ) as HTMLInputElement | null
      alert('Too big file. Upload under 20MB video file.')
      videofile.value = ''
    } else {
      dispatch({ type: 'setVideoFile', payload: file[0] })
      dispatch({
        type: 'setCanvasWidth',
        payload: 300,
      })
    }
  }

  const changeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value)
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
                //accept="audio/m4a, audio/mp3, audio/wav, audio/aac"
                accept=".mp3, .wav, .aac, .aif, .m4a"
                onChange={checkAudioFile}
              />
              <div className="form-control w-full  mt-6">
                <label className="label">
                  <span className="label-text">Audio URL (Optional)</span>
                </label>
                <input
                  className="text-input-1"
                  {...register('audioUrl', audioUrlRules)}
                  placeholder="Spotify, Soundcloud, Youtube..."
                  type="text"
                  value={audioUrl}
                  onChange={audioUrlChange}
                />
                <div className="text-red-500">
                  {errors.audioUrl && errors.audioUrl.message}
                </div>
              </div>

              <div className="divider "></div>

              <h2 className="card-title mb-6">Image</h2>

              <div className="flex">
                <div className="form-control flex-row mr-8">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio mr-2"
                      value="Video"
                      onChange={visualFormatChange}
                    />
                    <span className="label-text">Video</span>
                  </label>
                </div>
                <div className="form-control flex-row">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio mr-2"
                      value="Image"
                      onChange={visualFormatChange}
                    />
                    <span className="label-text">Image</span>
                    {/* <video
                      ref={videoRef}
                      playsInline
                      autoPlay
                      loop
                      muted
                      src={videoData}
                      className="w-full absolute"
                    ></video> */}
                  </label>
                </div>
              </div>

              {visualFormat == 'Image' ? <CropImage /> : ''}

              {visualFormat == 'Video' ? (
                <input
                  id="videofile"
                  title="imagefile"
                  className="text-sm text-grey-500 file:cursor-pointer
          file:mr-5 file:py-2 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-medium
          file:bg-gray-300 file:text-secondary"
                  type="file"
                  accept="image/gif, video/mp4, video/x-msvideo, video/webm, video/quicktime"
                  onChange={checkVideoFile}
                />
              ) : (
                ''
              )}

              {visualFormat ? (
                <div className="form-control w-full  mt-6">
                  <label className="label">
                    <span className="label-text">
                      {visualFormat} URL (Optional)
                    </span>
                  </label>
                  <input
                    className="text-input-1"
                    {...register('imageUrl', imageUrlRules)}
                    placeholder="Tumblr, Instagram, Flickr..."
                    type="text"
                    value={imageUrl}
                    onChange={imageUrlChange}
                  />
                  <div className="text-red-500">
                    {errors.imageUrl && errors.imageUrl.message}
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="divider "></div>

              <h2 className="card-title mb-6">Title / Description</h2>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  className="text-input-1"
                  {...register('title', titleRules)}
                  placeholder="Title (Up to 200 characters)"
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
                  {...register('description', descriptionRules)}
                  placeholder="Description (Up to 100 characters)"
                  value={description}
                  onChange={descriptionChange}
                />
                <div className="text-red-500">
                  {errors.description && errors.description.message}
                </div>
              </div>

              <div className="mt-20 flex items-center">
                <input
                  disabled={
                    !title ||
                    !state.canvasWidth ||
                    !isAudioFile ||
                    state.tryingCreatePost
                  }
                  className="btn btn-primary disabled:bg-gray-600"
                  type="submit"
                />

                {state.tryingCreatePost ? (
                  <div role="status" className="ml-4">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}
