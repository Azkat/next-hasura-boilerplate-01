import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useEditProfile } from '../../hooks/useEditProfile'
import Cookie from 'universal-cookie'
import { useQueryUserById } from '../../hooks/useQueryUserById'
import { useForm, SubmitHandler } from 'react-hook-form'

const cookie = new Cookie()
interface IFormInput {
  title: string
}

export default function EditProfile(props) {
  const router = useRouter()

  const { status, data } = useQueryUserById(cookie.get('user_id'))

  const {
    name,
    website,
    bio,
    nameChange,
    websiteChange,
    bioChange,
    updateProfile,
  } = useEditProfile()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateProfile()
  }

  return (
    <Layout title="Create new post">
      <div className="px-4 mb-32">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <h2 className="header-h2">Edit Profile</h2>
          {status == 'success' ? (
            <div className="card w-full bg-backgroundGray shadow-xl mt-8">
              <div className="card-body">
                <div className="form-control w-full  mt-6">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="text-input-1"
                    value={name}
                    onChange={nameChange}
                  />
                </div>

                <div className="form-control w-full  mt-6">
                  <label className="label">
                    <span className="label-text">Website</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Website URL"
                    className="text-input-1"
                    value={website}
                    onChange={websiteChange}
                  />
                </div>

                <div className="form-control  w-full mt-6">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea
                    className="textarea-1"
                    placeholder="Bio"
                    value={bio}
                    onChange={bioChange}
                  ></textarea>
                </div>

                <div className="mt-20">
                  <button className="btn  btn-primary">Submit</button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </Layout>
  )
}
