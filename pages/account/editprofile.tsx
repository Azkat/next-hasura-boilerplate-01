import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'

export default function EditProfile(props) {
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
        <h2 className="header-h2">Edit Profile</h2>

        <div className="card w-full bg-backgroundGray shadow-xl mt-8">
          <div className="card-body">
            <div className="flex items-center space-x-4">
              <img
                className="w-20 h-20 rounded-full"
                src="https://placeimg.com/192/192/people"
                alt=""
              />
              <div className="font-medium dark:text-white">
                <div className="text-sm text-secondary cursor-pointer">
                  Change Profile Photo
                </div>
              </div>
            </div>

            <div className="form-control w-full  mt-6">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="text-input-1"
              />
            </div>

            <div className="form-control w-full  mt-6">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="text-input-1"
              />
            </div>

            <div className="form-control  w-full mt-6">
              <label className="label">
                <span className="label-text">Your bio</span>
              </label>
              <textarea className="textarea-1" placeholder="Bio"></textarea>
            </div>

            <div className="mt-20">
              <button className="btn  btn-primary">Submit</button>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center space-x-4 mt-12">
          <img
            className="w-20 h-20 rounded-full"
            src="https://placeimg.com/192/192/people"
            alt=""
          />
          <div className="font-medium dark:text-white">
            <div className="text-sm text-secondary cursor-pointer">
              Change Profile Photo
            </div>
          </div>
        </div>

        <div className="form-control w-full  mt-6">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Type here" className="text-input-1" />
        </div>

        <div className="form-control w-full  mt-6">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Type here" className="text-input-1" />
        </div>

        <div className="form-control  w-full mt-6">
          <label className="label">
            <span className="label-text">Your bio</span>
          </label>
          <textarea className="textarea-1" placeholder="Bio"></textarea>
        </div>

        <div className="mt-20">
          <button className="btn btn-wide btn-primary">Submit</button>
        </div> */}
      </div>
    </Layout>
  )
}
