import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'
import { CropImage } from '../../components/imageCrop/CropImage'

export default function Create_post(props) {
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const {
    title,
    description,
    titleChange,
    descriptionChange,
    resetInput,
    createPost,
  } = useCreatePost()

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

  return (
    <Layout title="Create new post">
      <div className="px-4 mb-32">
        <h2 className="header-h2">Create New Post</h2>

        <div className="card w-full bg-backgroundGray shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title mb-6">Audio</h2>
            <input
              className="text-sm text-grey-500 file:cursor-pointer
          file:mr-5 file:py-2 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-medium
          file:bg-gray-300 file:text-secondary"
              type="file"
              accept="image/*"
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
