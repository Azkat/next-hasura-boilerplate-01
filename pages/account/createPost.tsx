import React, { useEffect, useState, useContext } from 'react'
import { Store } from '../../reducer/reducer'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'
import { CropImage } from '../../components/imageCrop/CropImage'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function Create_post(props) {
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const { state, dispatch } = useContext(Store)
  const {
    title,
    description,
    titleChange,
    descriptionChange,
    resetInput,
    createPost,
  } = useCreatePost()

  console.log(state.name)

  const testDispatch = () => {
    dispatch({ type: 'testChange', payload: 'YOU' })
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

  const uploadPhoto = async (e) => {
    const dataURL = state.imageUrl
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        return axios
          .get('/api/upload-url', {
            params: {
              filename: 'canvasImage.jpg',
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
          .then((res) => {
            console.log(res)
          })
      })
  }

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
      .then((res) => {
        console.log(res)
      })
  }

  const checkFile = async (e) => {
    const file = e.target.files
    if (file[0].size > 1500000) {
      //1.5MB以下しかダメ
      const audiofile = document.getElementById('audiofile')
      alert('Too big file. Upload under 1.5MB audio file.')
    } else {
      uploadAudio(e, file[0])
    }
  }

  return (
    <Layout title="Create new post">
      <div className="px-4 mb-32">
        <h2 className="header-h2" onClick={uploadPhoto}>
          Create New Post {state.canvasWidth}
        </h2>

        <div className="card w-full bg-backgroundGray shadow-xl mt-8">
          <div className="card-body">
            <h2 id="audio_heading" className="card-title mb-6">
              Audio
            </h2>
            <input
              id="audiofile"
              className="text-sm text-grey-500 file:cursor-pointer
          file:mr-5 file:py-2 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-medium
          file:bg-gray-300 file:text-secondary"
              type="file"
              accept="audio/m4a, audio/mp3, audio/wav, audio/aac"
              onChange={checkFile}
            />
            <div className="form-control w-full  mt-6">
              <label className="label">
                <span className="label-text">Audio URL (Optional)</span>
              </label>
              <input
                className="text-input-1"
                placeholder="Spotify, Soundcloud, Youtube..."
                type="text"
                value={title}
                onChange={titleChange}
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
                value={title}
                onChange={titleChange}
              />
            </div>

            <div className="divider "></div>

            <h2 className="card-title mb-6">Title / Description</h2>
            <form onSubmit={createPost} className="flex flex-col">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  className="text-input-1"
                  placeholder="title ?"
                  type="text"
                  value={title}
                  onChange={titleChange}
                />
              </div>

              <div className="form-control  w-full mt-6">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea-1"
                  placeholder="description ?"
                  value={description}
                  onChange={descriptionChange}
                />
              </div>

              <div className="mt-20">
                <button
                  disabled={!title}
                  type="submit"
                  className="btn btn-primary disabled:bg-gray-600"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
