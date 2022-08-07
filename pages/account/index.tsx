import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../lib/authProvider'
import { Post } from '../../types/types'
import { Layout } from '../../components/Layout'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from '../../hooks/useUserChanged'
import { useRouter } from 'next/router'
import { useUpdateFirebaseEmail } from '../../hooks/useUpdateFirebaseEmail'
import UpdateEmail from '../../components/UpdateEmail'
import UpdateUserName from '../../components/UpdateUserName'
import { DeleteUser } from '../../components/DeleteUser'
import { Forms } from '../../components/Forms'
import { CropImage } from '../../components/imageCrop/CropImage'
import { ImageUploadTest } from '../../components/ImageUploadTest'
import AvatarName from '../../components/AvatarName'
import UserInfomation from '../../components/UserInfomation'
import { PlusSmIcon } from '@heroicons/react/solid'
import { useQueryUserById } from '../../hooks/useQueryUserById'
import Link from 'next/link'
import PostList from '../../components/PostList'
import { QueryClient, useQueryClient } from 'react-query'

const cookie = new Cookie()

export default function Account(props) {
  const router = useRouter()
  const {
    uid,
    providerId,
    email,
    emailChange,
    updateEmail,
    password,
    passwordChange,
  } = useUpdateFirebaseEmail()
  const queryClient = useQueryClient()
  const postsData = queryClient.getQueryData<Post[]>('posts')
  const { currentUser } = useContext(AuthContext)

  const [isUser, setIsUser] = useState(false)

  const { status, data } = useQueryUserById(cookie.get('user_id'))

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsUser(true)
        return
      } else {
        router.push('/login')
      }
    })
    return () => {
      unSubUser()
    }
  }, [])

  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    cookie.remove('token')
    cookie.remove('user_id')
    cookie.remove('token_expire')
    router.push('/login')
  }

  if (!isUser) {
    return <></>
  } else {
    return (
      <Layout title="Account">
        <AvatarName />
        <div className="block sm:hidden">
          <UserInfomation />
        </div>

        <div className="px-4">
          <Link href="/account/createpost">
            <button className="btn btn-outline btn-block btn-primary">
              <PlusSmIcon className="h-5 w-5" />
              New Post
            </button>
          </Link>
        </div>

        {/* <PostList postsData={postsData} currentUser={currentUser} /> */}

        <section className="overflow-hidden mt-10 ">
          <div className="container px-4 py-2 mx-auto ">
            <div className="flex flex-wrap -m-1 md:-m-2">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2  aspect-square">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full"
                    src="https://random.imagecdn.app/400/400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <CropImage />

        <Forms />

        <div className="cursor-pointer mt-16">
          <Link href="/account/createpost">create new post</Link>
        </div>
        <div className="cursor-pointer mt-16">
          <Link href="/account/posts">my posts</Link>
        </div>
        {providerId == 'password' ? <UpdateEmail /> : ''}
        <UpdateUserName data={data} status={status} />

        <ImageUploadTest />

        <div className="cursor-pointer mt-16" onClick={logout}>
          Logout
        </div>

        <DeleteUser />
      </Layout>
    )
  }
}
