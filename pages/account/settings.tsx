import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useCreatePost } from '../../hooks/useCreatePost'

export default function Settings(props) {
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

  return (
    <Layout title="Create new post">
      <div className="px-4 mb-32">
        <h2 className="header-h2">Settings</h2>

        <div className="card w-full bg-backgroundGray shadow-xl mt-8">
          <div className="card-body">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="text-input-1"
              />
            </div>

            <div className="form-control w-full  mt-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="text-input-1"
              />
            </div>

            <div className="mt-20">
              <button className="btn  btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
