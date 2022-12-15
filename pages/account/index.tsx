import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../lib/authProvider'
import { Post } from '../../types/types'
import { Layout } from '../../components/Layout'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from '../../hooks/useUserChanged'
import { useRouter } from 'next/router'
import { useUpdateFirebaseEmail } from '../../hooks/useUpdateFirebaseEmail'
import AvatarName from '../../components/AvatarName'
import UserInfomation from '../../components/UserInfomation'
import { PlusSmIcon } from '@heroicons/react/solid'
import { useQueryUserById } from '../../hooks/useQueryUserById'
import Link from 'next/link'
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

  if (!isUser) {
    return <></>
  } else {
    return (
      <Layout title="Account">
        <AvatarName data={data} status={status} />
        <div className="block sm:hidden">
          <UserInfomation data={data} status={status} />
        </div>

        <div className="px-4">
          <Link href="/account/createPost">
            <button className="btn btn-block btn-primary">
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
      </Layout>
    )
  }
}
